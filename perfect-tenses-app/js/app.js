/* Perfect Tenses Lab — UI + quiz engine. Vanilla JS, no build step. */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const tenseById = Object.fromEntries(TENSES.map(t => [t.id, t]));
const TYPE_LABEL = { choice: 'Multiple choice', fill: 'Fill in the gap', identify: 'Name the tense' };

/* ------------------------------------------------------------------ */
/* Stored progress                                                     */
/* ------------------------------------------------------------------ */

const STORE_KEY = 'perfect-tenses-lab/v1';

const blankStats = () => ({
  perTense: Object.fromEntries(TENSES.map(t => [t.id, { seen: 0, right: 0 }])),
  streak: 0,
  bestStreak: 0
});

function loadStats() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (!saved || !saved.perTense) return blankStats();
    const base = blankStats();
    for (const id of Object.keys(base.perTense)) {
      if (saved.perTense[id]) base.perTense[id] = saved.perTense[id];
    }
    base.streak = saved.streak || 0;
    base.bestStreak = saved.bestStreak || 0;
    return base;
  } catch {
    return blankStats();
  }
}

function saveStats() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(stats)); } catch { /* private mode */ }
}

let stats = loadStats();

function recordAnswer(tenseId, correct) {
  const row = stats.perTense[tenseId];
  row.seen++;
  if (correct) {
    row.right++;
    stats.streak++;
    stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
  } else {
    stats.streak = 0;
  }
  saveStats();
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* Marks up "___" gaps and "(verb)" cues in a question sentence. */
const renderSentence = s =>
  esc(s)
    .replace(/_{2,}/g, '<span class="gap">____</span>')
    .replace(/\(([^)]+)\)/g, '<span class="cue">($1)</span>')
    .replace(/&lt;i&gt;/g, '<i>').replace(/&lt;\/i&gt;/g, '</i>')
    .replace(/&lt;b&gt;/g, '<b>').replace(/&lt;\/b&gt;/g, '</b>');

/* Typed answers are compared loosely: case, punctuation, curly quotes and
 * doubled spaces should never cost a learner a point. */
const normalise = s =>
  s.toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[.,!?;:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ------------------------------------------------------------------ */
/* Learn view                                                          */
/* ------------------------------------------------------------------ */

function renderLearn() {
  $('#tense-grid').innerHTML = TENSES.map(t => {
    const { span, marker, markerLabel, caption } = t.timeline;
    return `
    <article class="tcard" style="--hue: var(${t.color})">
      <h3>${t.name}</h3>
      <code class="formula">${esc(t.formula)}</code>

      <div class="timeline">
        <div class="tl-rail">
          <div class="tl-line"></div>
          <div class="tl-span" style="left:${span[0]}%; width:${span[1] - span[0]}%"></div>
          <div class="tl-mark" style="left:${marker}%"><span>${markerLabel}</span></div>
        </div>
        <p class="tl-caption">${caption}</p>
      </div>

      <h4>Forms</h4>
      <dl class="forms">
        <div><dt>+</dt><dd>${t.forms.positive}</dd></div>
        <div><dt>−</dt><dd>${t.forms.negative}</dd></div>
        <div><dt>?</dt><dd>${t.forms.question}</dd></div>
        <div><dt>short</dt><dd>${t.forms.shortAnswer}</dd></div>
      </dl>

      <h4>When to use it</h4>
      <ul class="uses">
        ${t.uses.map(u => `<li><span class="use-label">${u.label}</span><span class="use-ex">${u.example}</span></li>`).join('')}
      </ul>

      <h4>Signal words</h4>
      <div class="chips">${t.signals.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>

      <p class="warn"><b>Watch out.</b> ${t.watchOut}</p>

      <button class="practice-link" data-practice="${t.id}">Practise ${t.name} →</button>
    </article>`;
  }).join('');

  $('#compare-body').innerHTML = TENSES.map(t => `
    <tr>
      <td><span class="dot" style="background: var(${t.color})"></span>${t.name}</td>
      <td><code>${esc(t.formula)}</code></td>
      <td>${t.lookback}</td>
      <td>${t.focus}</td>
    </tr>`).join('');

  $$('[data-practice]').forEach(btn => {
    btn.addEventListener('click', () => {
      $('#opt-tense').value = btn.dataset.practice;
      $('#opt-type').value = 'all';
      updatePoolNote();
      showView('practice');
      startQuiz();
    });
  });
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

function showView(name) {
  $$('.view').forEach(v => v.classList.toggle('is-active', v.id === `view-${name}`));
  $$('.tab').forEach(tab => {
    const on = tab.dataset.view === name;
    tab.classList.toggle('is-active', on);
    tab.setAttribute('aria-selected', String(on));
  });
  if (name === 'progress') renderProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ------------------------------------------------------------------ */
/* Quiz engine                                                         */
/* ------------------------------------------------------------------ */

const quiz = {
  items: [],     // questions in this set, options already shuffled
  index: 0,
  correct: 0,
  picked: null,  // selected option index, for 'choice' / 'identify'
  answered: false,
  missed: []
};

function selectedPool() {
  const tense = $('#opt-tense').value;
  const type = $('#opt-type').value;
  return QUESTIONS.filter(q =>
    (tense === 'all' || q.tense === tense) &&
    (type === 'all' || q.type === type)
  );
}

function updatePoolNote() {
  const n = selectedPool().length;
  const note = $('#pool-note');
  note.textContent = n === 0
    ? 'No questions match that combination yet — try another type.'
    : `${n} question${n === 1 ? '' : 's'} available in this selection.`;
  $('#btn-start').disabled = n === 0;
}

/* Options are shuffled per set, so the answer index is remapped. */
function prepareItem(q) {
  if (!q.options) return { ...q, opts: null, answerIndex: null };
  const paired = q.options.map((text, i) => ({ text, right: i === q.answer }));
  const opts = shuffle(paired);
  return { ...q, opts, answerIndex: opts.findIndex(o => o.right) };
}

function startQuiz(pool) {
  const source = pool || selectedPool();
  if (!source.length) return;
  // A retry set (explicit pool) always runs in full; otherwise honour the size picker.
  const wanted = pool ? source.length : (Number($('#opt-count').value) || source.length);

  quiz.items = shuffle(source).slice(0, Math.min(wanted, source.length)).map(prepareItem);
  quiz.index = 0;
  quiz.correct = 0;
  quiz.missed = [];

  $('#quiz-setup').classList.add('hidden');
  $('#quiz-result').classList.add('hidden');
  $('#quiz-runner').classList.remove('hidden');
  renderQuestion();
}

function renderQuestion() {
  const q = quiz.items[quiz.index];
  const tense = tenseById[q.tense];
  quiz.picked = null;
  quiz.answered = false;

  $('#progress-bar').style.width = `${(quiz.index / quiz.items.length) * 100}%`;
  $('#q-counter').textContent = `Question ${quiz.index + 1} of ${quiz.items.length}`;
  $('#q-score').textContent = `${quiz.correct} correct`;

  const tag = $('#q-tag');
  tag.textContent = `${TYPE_LABEL[q.type]} · ${tense.short}`;
  tag.style.setProperty('--hue', `var(${tense.color})`);

  $('#q-sentence').innerHTML = renderSentence(q.sentence);

  const body = $('#q-body');
  if (q.type === 'fill') {
    body.innerHTML = `
      <div class="fill-row">
        <input type="text" id="fill-input" autocomplete="off" autocapitalize="off"
               spellcheck="false" placeholder="Type the missing words…"
               aria-label="Your answer">
      </div>`;
    const input = $('#fill-input');
    input.focus();
    input.addEventListener('keydown', e => { if (e.key === 'Enter') primaryAction(); });
  } else {
    body.innerHTML = `<div class="opts">${q.opts.map((o, i) => `
      <button class="opt" data-i="${i}">
        <span class="key">${'ABCD'[i]}</span>
        <span>${renderSentence(o.text)}</span>
      </button>`).join('')}</div>`;
    $$('.opt', body).forEach(btn => {
      btn.addEventListener('click', () => {
        quiz.picked = Number(btn.dataset.i);
        $$('.opt', body).forEach(b => b.classList.toggle('is-picked', b === btn));
      });
    });
  }

  $('#q-feedback').classList.add('hidden');
  $('#btn-check').classList.remove('hidden');
  $('#btn-next').classList.add('hidden');
}

function checkAnswer() {
  const q = quiz.items[quiz.index];
  let correct = false;
  let given = '';
  let model = '';

  if (q.type === 'fill') {
    const input = $('#fill-input');
    given = input.value.trim();
    if (!given) { input.focus(); return; }
    model = q.accept[0];
    correct = q.accept.some(a => normalise(a) === normalise(given));
    input.disabled = true;
  } else {
    if (quiz.picked === null) return;
    given = q.opts[quiz.picked].text;
    model = q.opts[q.answerIndex].text;
    correct = quiz.picked === q.answerIndex;
    $$('.opt').forEach((btn, i) => {
      btn.disabled = true;
      btn.classList.remove('is-picked');
      if (i === q.answerIndex) btn.classList.add('is-right');
      else if (i === quiz.picked) btn.classList.add('is-wrong');
    });
  }

  quiz.answered = true;
  if (correct) quiz.correct++;
  else quiz.missed.push({ q, given, model });
  recordAnswer(q.tense, correct);

  const fb = $('#q-feedback');
  fb.className = `feedback ${correct ? 'good' : 'bad'}`;
  fb.innerHTML = correct
    ? `<strong>Correct.</strong> ${q.explain}`
    : `<strong>Not quite.</strong> Answer: <span class="fb-answer">${renderSentence(model)}</span><br>${q.explain}`;

  $('#q-score').textContent = `${quiz.correct} correct`;
  $('#btn-check').classList.add('hidden');
  $('#btn-next').classList.remove('hidden');
  $('#btn-next').textContent = quiz.index === quiz.items.length - 1 ? 'See results' : 'Next';
  $('#btn-next').focus();
}

/* Enter and the primary button do the same thing at each step. */
function primaryAction() {
  if (quiz.answered) nextQuestion();
  else checkAnswer();
}

function nextQuestion() {
  if (quiz.index < quiz.items.length - 1) {
    quiz.index++;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const total = quiz.items.length;
  const pct = Math.round((quiz.correct / total) * 100);

  $('#quiz-runner').classList.add('hidden');
  $('#quiz-result').classList.remove('hidden');
  $('#result-score').textContent = `${quiz.correct} / ${total}  ·  ${pct}%`;
  $('#result-note').textContent =
    pct === 100 ? 'Clean sweep. Try a harder area or switch to fill-in-the-gap.'
    : pct >= 70 ? 'Solid. The review below shows what slipped.'
    : 'Worth another pass — reread the Learn card for these areas.';

  $('#result-review').innerHTML = quiz.missed.length === 0 ? '' : `
    <h4 class="section-title">What you missed</h4>
    ${quiz.missed.map(m => `
      <div class="review-item">
        <div class="r-sentence">${renderSentence(m.q.sentence)}</div>
        <div>You wrote <span class="r-given">${esc(m.given)}</span> ·
             correct: <span class="r-right">${esc(m.model)}</span></div>
      </div>`).join('')}`;

  $('#btn-review-wrong').classList.toggle('hidden', quiz.missed.length === 0);
}

function resetQuiz() {
  $('#quiz-runner').classList.add('hidden');
  $('#quiz-result').classList.add('hidden');
  $('#quiz-setup').classList.remove('hidden');
  updatePoolNote();
}

/* ------------------------------------------------------------------ */
/* Progress view                                                       */
/* ------------------------------------------------------------------ */

function renderProgress() {
  const rows = TENSES.map(t => ({ t, ...stats.perTense[t.id] }));
  const seen = rows.reduce((n, r) => n + r.seen, 0);
  const right = rows.reduce((n, r) => n + r.right, 0);

  $('#stat-answered').textContent = seen;
  $('#stat-accuracy').textContent = seen ? `${Math.round((right / seen) * 100)}%` : '—';
  $('#stat-best').textContent = stats.bestStreak;

  $('#progress-list').innerHTML = rows.map(r => {
    const pct = r.seen ? Math.round((r.right / r.seen) * 100) : 0;
    return `
    <div class="prow" style="--hue: var(${r.t.color})">
      <div class="prow-top">
        <b>${r.t.name}</b>
        <span>${r.seen ? `${r.right}/${r.seen} · ${pct}%` : 'not practised yet'}</span>
      </div>
      <div class="bar"><i style="width:${pct}%"></i></div>
    </div>`;
  }).join('');
}

/* ------------------------------------------------------------------ */
/* Wiring                                                              */
/* ------------------------------------------------------------------ */

function init() {
  renderLearn();

  $('#opt-tense').innerHTML =
    `<option value="all">All perfect tenses</option>` +
    TENSES.map(t => `<option value="${t.id}">${t.name}</option>`).join('');

  $$('.tab').forEach(tab => tab.addEventListener('click', () => showView(tab.dataset.view)));
  $('#opt-tense').addEventListener('change', updatePoolNote);
  $('#opt-type').addEventListener('change', updatePoolNote);

  $('#btn-start').addEventListener('click', () => startQuiz());
  $('#btn-check').addEventListener('click', checkAnswer);
  $('#btn-next').addEventListener('click', nextQuestion);
  $('#btn-quit').addEventListener('click', resetQuiz);
  $('#btn-again').addEventListener('click', resetQuiz);
  $('#btn-review-wrong').addEventListener('click', () => startQuiz(quiz.missed.map(m => m.q)));

  $('#btn-reset').addEventListener('click', () => {
    if (!confirm('Clear all saved progress?')) return;
    stats = blankStats();
    saveStats();
    renderProgress();
  });

  updatePoolNote();
}

document.addEventListener('DOMContentLoaded', init);
