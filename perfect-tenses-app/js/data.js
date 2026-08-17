/* Perfect Tenses Lab — content bank.
 * Six perfect tenses: reference material + graded practice items.
 * Pure data, no DOM. Loaded before app.js. */

const TENSES = [
  {
    id: 'pres-perf',
    name: 'Present Perfect',
    short: 'Pres. Perfect',
    formula: 'have / has + past participle',
    color: '--t1',
    forms: {
      positive: 'She <b>has finished</b> the report.',
      negative: 'She <b>has not (hasn’t) finished</b> the report.',
      question: '<b>Has</b> she <b>finished</b> the report?',
      shortAnswer: 'Yes, she has. / No, she hasn’t.'
    },
    // Timeline: 0 = distant past, 50 = now, 100 = future.
    timeline: { span: [18, 50], marker: 50, markerLabel: 'now', caption: 'Starts in the past, connects to the present moment.' },
    uses: [
      { label: 'Life experience (time not stated)', example: 'I <b>have visited</b> Rome twice.' },
      { label: 'Past action with a result we can see now', example: 'He <b>has broken</b> his arm, so he can’t drive.' },
      { label: 'Unfinished period of time', example: 'We <b>have lived</b> here since 2019.' },
      { label: 'Very recent news', example: 'The bus <b>has just left</b>.' }
    ],
    lookback: 'now', focus: 'The result or the experience',
    signals: ['just', 'already', 'yet', 'ever', 'never', 'since', 'for', 'so far', 'recently', 'this week'],
    watchOut: 'Never use it with a finished time expression. Say <i>I saw her yesterday</i>, not <i>I have seen her yesterday</i>.'
  },
  {
    id: 'pres-perf-cont',
    name: 'Present Perfect Continuous',
    short: 'Pres. Perf. Cont.',
    formula: 'have / has been + verb-ing',
    color: '--t2',
    forms: {
      positive: 'They <b>have been waiting</b> for an hour.',
      negative: 'They <b>have not (haven’t) been waiting</b> long.',
      question: 'How long <b>have</b> they <b>been waiting</b>?',
      shortAnswer: 'Yes, they have. / No, they haven’t.'
    },
    timeline: { span: [15, 52], marker: 50, markerLabel: 'now', caption: 'An activity in progress up to (and maybe past) now.' },
    uses: [
      { label: 'How long an activity has been going on', example: 'I <b>have been studying</b> Japanese for two years.' },
      { label: 'Recent activity that explains the present situation', example: 'Your eyes are red. <b>Have</b> you <b>been crying</b>?' },
      { label: 'Repeated activity over a period', example: 'She <b>has been calling</b> me all morning.' }
    ],
    lookback: 'now', focus: 'How long the activity has run',
    signals: ['for', 'since', 'all day', 'all week', 'lately', 'recently', 'how long'],
    watchOut: 'Stative verbs (<i>know, own, believe, belong</i>) stay simple: <i>I have known her for years</i>, not <i>have been knowing</i>.'
  },
  {
    id: 'past-perf',
    name: 'Past Perfect',
    short: 'Past Perfect',
    formula: 'had + past participle',
    color: '--t3',
    forms: {
      positive: 'The film <b>had started</b> when we arrived.',
      negative: 'The film <b>had not (hadn’t) started</b> yet.',
      question: '<b>Had</b> the film <b>started</b>?',
      shortAnswer: 'Yes, it had. / No, it hadn’t.'
    },
    timeline: { span: [10, 30], marker: 38, markerLabel: 'past point', caption: 'Finished before another moment in the past.' },
    uses: [
      { label: 'The earlier of two past actions', example: 'The train <b>had left</b> before we reached the station.' },
      { label: 'Experience up to a point in the past', example: 'By 2010 she <b>had published</b> four novels.' },
      { label: 'Third conditional', example: 'If I <b>had known</b>, I would have told you.' },
      { label: 'Reported speech (backshift)', example: 'He said he <b>had lost</b> the tickets.' }
    ],
    lookback: 'a moment in the past', focus: 'Which event happened first',
    signals: ['before', 'after', 'by the time', 'already', 'until then', 'when', 'never ... before'],
    watchOut: 'You only need it when the order matters. Two events in a clear sequence can both be past simple: <i>I got up and made coffee</i>.'
  },
  {
    id: 'past-perf-cont',
    name: 'Past Perfect Continuous',
    short: 'Past Perf. Cont.',
    formula: 'had been + verb-ing',
    color: '--t4',
    forms: {
      positive: 'We <b>had been driving</b> for six hours.',
      negative: 'We <b>had not (hadn’t) been driving</b> long.',
      question: 'How long <b>had</b> you <b>been driving</b>?',
      shortAnswer: 'Yes, we had. / No, we hadn’t.'
    },
    timeline: { span: [8, 36], marker: 38, markerLabel: 'past point', caption: 'Activity running up to a moment in the past.' },
    uses: [
      { label: 'Duration before a past moment', example: 'She <b>had been working</b> there for a year when it closed.' },
      { label: 'Cause of a past situation', example: 'The ground was wet because it <b>had been raining</b>.' }
    ],
    lookback: 'a moment in the past', focus: 'The activity leading up to it',
    signals: ['for', 'since', 'before', 'all morning', 'how long'],
    watchOut: 'Use it for the activity; use past perfect for the finished result. <i>He had been painting</i> (that’s why he was covered in paint) vs <i>He had painted the room</i> (it was done).'
  },
  {
    id: 'fut-perf',
    name: 'Future Perfect',
    short: 'Future Perfect',
    formula: 'will have + past participle',
    color: '--t5',
    forms: {
      positive: 'By June they <b>will have finished</b> the bridge.',
      negative: 'They <b>will not (won’t) have finished</b> it by June.',
      question: '<b>Will</b> they <b>have finished</b> it by June?',
      shortAnswer: 'Yes, they will. / No, they won’t.'
    },
    timeline: { span: [50, 74], marker: 80, markerLabel: 'future point', caption: 'Complete before a deadline in the future.' },
    uses: [
      { label: 'Finished before a future deadline', example: 'I <b>will have written</b> the report by Friday.' },
      { label: 'Totals reached at a future time', example: 'Next month he <b>will have saved</b> £2,000.' },
      { label: 'Confident guess about now or the recent past', example: 'Don’t call — she <b>will have landed</b> by now.' }
    ],
    lookback: 'a moment in the future', focus: 'Done by the deadline',
    signals: ['by', 'by then', 'by the time', 'before', 'in two years’ time'],
    watchOut: 'After <i>by the time / before / when</i>, use a present tense, not <i>will</i>: <i>By the time you <u>arrive</u>, I will have left</i>.'
  },
  {
    id: 'fut-perf-cont',
    name: 'Future Perfect Continuous',
    short: 'Fut. Perf. Cont.',
    formula: 'will have been + verb-ing',
    color: '--t6',
    forms: {
      positive: 'In May I <b>will have been teaching</b> for ten years.',
      negative: 'I <b>will not (won’t) have been teaching</b> that long.',
      question: 'How long <b>will</b> you <b>have been teaching</b>?',
      shortAnswer: 'Yes, I will. / No, I won’t.'
    },
    timeline: { span: [30, 78], marker: 80, markerLabel: 'future point', caption: 'How long an activity will have lasted by a future time.' },
    uses: [
      { label: 'Duration up to a future moment', example: 'By 6 p.m. we <b>will have been travelling</b> for twelve hours.' },
      { label: 'Cause of a future situation', example: 'He’ll be exhausted — he <b>will have been working</b> all night.' }
    ],
    lookback: 'a moment in the future', focus: 'How long by then',
    signals: ['by ... for', 'by then', 'in ... time', 'how long'],
    watchOut: 'It almost always needs a duration (<i>for six hours</i>). Without one, plain future perfect is usually the better choice.'
  }
];

/* Practice items.
 * type: 'choice'  -> options[] + answer index
 *       'fill'    -> accept[] of valid strings (first one is the model answer)
 *       'identify'-> options[] of tense names + answer index
 * Every item carries the tense it trains so progress can be tracked per area. */
const QUESTIONS = [
  /* ---------- Present Perfect ---------- */
  { id: 'q01', tense: 'pres-perf', type: 'choice',
    sentence: 'I ___ my keys — I can’t open the door.',
    options: ['lost', 'have lost', 'had lost', 'will have lost'], answer: 1,
    explain: 'A past action with a result right now: present perfect.' },
  { id: 'q02', tense: 'pres-perf', type: 'choice',
    sentence: 'We ___ in this town since 2019.',
    options: ['live', 'lived', 'have lived', 'had lived'], answer: 2,
    explain: '<b>Since</b> + a period that is still going: present perfect.' },
  { id: 'q03', tense: 'pres-perf', type: 'fill',
    sentence: 'She ___ (never / eat) sushi before.',
    accept: ['has never eaten', 'hasn’t ever eaten', 'has not ever eaten'],
    explain: 'Life experience with <b>never</b>: has + never + past participle.' },
  { id: 'q04', tense: 'pres-perf', type: 'fill',
    sentence: '___ you ___ (finish) your homework yet?',
    accept: ['have finished', 'have you finished'],
    explain: '<b>Yet</b> in a question pairs with present perfect: Have you finished ... yet?' },
  { id: 'q05', tense: 'pres-perf', type: 'choice',
    sentence: 'Which sentence is correct?',
    options: [
      'I have seen that film last night.',
      'I saw that film last night.',
      'I have saw that film last night.',
      'I had seen that film last night.'
    ], answer: 1,
    explain: '<b>Last night</b> is a finished time, so the past simple is required.' },
  { id: 'q06', tense: 'pres-perf', type: 'choice',
    sentence: 'The train ___ just ___.',
    options: ['is / arriving', 'has / arrived', 'had / arrived', 'will / arrive'], answer: 1,
    explain: '<b>Just</b> + recent news: has arrived.' },
  { id: 'q07', tense: 'pres-perf', type: 'fill',
    sentence: 'They ___ (already / pay) the bill.',
    accept: ['have already paid', 'have already payed'],
    explain: '<b>Already</b> sits between <i>have</i> and the participle: have already paid.' },
  { id: 'q08', tense: 'pres-perf', type: 'choice',
    sentence: '___ you ever ___ to Iceland?',
    options: ['Did / go', 'Have / been', 'Had / been', 'Are / going'], answer: 1,
    explain: '<b>Ever</b> asks about experience in your whole life so far: Have you ever been ...?' },

  /* ---------- Present Perfect Continuous ---------- */
  { id: 'q09', tense: 'pres-perf-cont', type: 'choice',
    sentence: 'I ___ for the bus for forty minutes and it still hasn’t come.',
    options: ['wait', 'waited', 'have been waiting', 'had been waiting'], answer: 2,
    explain: 'An activity still in progress, measured with <b>for</b>: present perfect continuous.' },
  { id: 'q10', tense: 'pres-perf-cont', type: 'fill',
    sentence: 'Your hands are filthy! What ___ you ___ (do)?',
    accept: ['have been doing', 'have you been doing'],
    explain: 'The present evidence points to a recent activity: have you been doing.' },
  { id: 'q11', tense: 'pres-perf-cont', type: 'choice',
    sentence: 'She ___ that novel for months, but she’s only on chapter three.',
    options: ['has read', 'has been reading', 'is reading', 'had read'], answer: 1,
    explain: 'The focus is the ongoing, unfinished activity, not a result.' },
  { id: 'q12', tense: 'pres-perf-cont', type: 'choice',
    sentence: 'Which one is wrong?',
    options: [
      'I have been knowing him for years.',
      'I have known him for years.',
      'I have been living here for years.',
      'I have lived here for years.'
    ], answer: 0,
    explain: '<b>Know</b> is stative — it has no continuous form. Use <i>have known</i>.' },
  { id: 'q13', tense: 'pres-perf-cont', type: 'fill',
    sentence: 'It ___ (rain) all morning — look at the puddles.',
    accept: ['has been raining'],
    explain: 'A recent continuous activity whose result we can see now.' },
  { id: 'q14', tense: 'pres-perf-cont', type: 'choice',
    sentence: 'How long ___ you ___ at this company?',
    options: ['are / working', 'did / work', 'have / been working', 'will / work'], answer: 2,
    explain: '<b>How long</b> + a job you still have: have you been working.' },

  /* ---------- Past Perfect ---------- */
  { id: 'q15', tense: 'past-perf', type: 'choice',
    sentence: 'When we got to the cinema, the film ___ already ___.',
    options: ['has / started', 'had / started', 'was / starting', 'did / start'], answer: 1,
    explain: 'The film started first, then we arrived: the earlier action takes past perfect.' },
  { id: 'q16', tense: 'past-perf', type: 'fill',
    sentence: 'By the time the police arrived, the thief ___ (escape).',
    accept: ['had escaped'],
    explain: '<b>By the time</b> + past simple signals an earlier finished action: had escaped.' },
  { id: 'q17', tense: 'past-perf', type: 'choice',
    sentence: 'If she ___ the instructions, she wouldn’t have made that mistake.',
    options: ['read', 'has read', 'had read', 'would read'], answer: 2,
    explain: 'Third conditional: <i>if</i> + past perfect, <i>would have</i> + participle.' },
  { id: 'q18', tense: 'past-perf', type: 'fill',
    sentence: 'He told me he ___ (lose) his passport.',
    accept: ['had lost'],
    explain: 'Reported speech backshifts the past simple <i>lost</i> to <i>had lost</i>.' },
  { id: 'q19', tense: 'past-perf', type: 'choice',
    sentence: 'It was the first time I ___ an opera.',
    options: ['saw', 'have seen', 'had seen', 'was seeing'], answer: 2,
    explain: 'After <i>It was the first time</i>, English uses the past perfect.' },
  { id: 'q20', tense: 'past-perf', type: 'choice',
    sentence: 'She didn’t recognise the town because she ___ there for twenty years.',
    options: ['wasn’t', 'hasn’t been', 'hadn’t been', 'didn’t go'], answer: 2,
    explain: 'A period reaching up to that past moment: hadn’t been.' },

  /* ---------- Past Perfect Continuous ---------- */
  { id: 'q21', tense: 'past-perf-cont', type: 'choice',
    sentence: 'He was out of breath because he ___.',
    options: ['ran', 'has been running', 'had been running', 'was run'], answer: 2,
    explain: 'The earlier activity explains the past state: had been running.' },
  { id: 'q22', tense: 'past-perf-cont', type: 'fill',
    sentence: 'We ___ (drive) for six hours when the engine finally died.',
    accept: ['had been driving'],
    explain: 'Duration up to a moment in the past: had been + verb-ing.' },
  { id: 'q23', tense: 'past-perf-cont', type: 'choice',
    sentence: 'She ___ at the hospital for a year before she was promoted.',
    options: ['has been working', 'had been working', 'was working', 'worked'], answer: 1,
    explain: '<b>For a year before</b> a past event: past perfect continuous.' },
  { id: 'q24', tense: 'past-perf-cont', type: 'choice',
    sentence: 'Pick the sentence that stresses the <i>activity</i>, not the result.',
    options: [
      'They had painted the kitchen.',
      'They had been painting all afternoon.',
      'They painted the kitchen.',
      'They have painted the kitchen.'
    ], answer: 1,
    explain: 'The continuous form puts the spotlight on the ongoing activity.' },
  { id: 'q25', tense: 'past-perf-cont', type: 'fill',
    sentence: 'How long ___ you ___ (wait) when the doctor finally called you in?',
    accept: ['had been waiting', 'had you been waiting'],
    explain: 'Question form: had + subject + been + verb-ing.' },

  /* ---------- Future Perfect ---------- */
  { id: 'q26', tense: 'fut-perf', type: 'choice',
    sentence: 'By this time next week, I ___ my exams.',
    options: ['will finish', 'will have finished', 'have finished', 'had finished'], answer: 1,
    explain: 'Complete before a future deadline: will have + participle.' },
  { id: 'q27', tense: 'fut-perf', type: 'fill',
    sentence: 'By 2030 the company ___ (open) fifty new stores.',
    accept: ['will have opened', '’ll have opened', 'will’ve opened'],
    explain: '<b>By</b> + a future date: will have opened.' },
  { id: 'q28', tense: 'fut-perf', type: 'choice',
    sentence: 'By the time you ___ home, I ___ dinner.',
    options: [
      'will get / will cook',
      'get / will have cooked',
      'will get / have cooked',
      'got / will have cooked'
    ], answer: 1,
    explain: 'No <i>will</i> after <b>by the time</b>; the main clause takes the future perfect.' },
  { id: 'q29', tense: 'fut-perf', type: 'choice',
    sentence: 'Don’t phone her now — she ___ yet.',
    options: ['won’t have landed', 'hasn’t landed', 'didn’t land', 'doesn’t land'], answer: 0,
    explain: 'A confident assumption about the present moment uses the future perfect.' },
  { id: 'q30', tense: 'fut-perf', type: 'fill',
    sentence: 'In three months’ time they ___ (not / repay) the loan.',
    accept: ['will not have repaid', 'won’t have repaid'],
    explain: 'Negative future perfect: will not / won’t + have + participle.' },
  { id: 'q31', tense: 'fut-perf', type: 'choice',
    sentence: '___ the builders ___ the roof before winter?',
    options: ['Will / have fixed', 'Have / fixed', 'Had / fixed', 'Do / fix'], answer: 0,
    explain: 'Question form: Will + subject + have + participle.' },

  /* ---------- Future Perfect Continuous ---------- */
  { id: 'q32', tense: 'fut-perf-cont', type: 'choice',
    sentence: 'Next March, I ___ here for ten years.',
    options: ['will work', 'will have worked', 'will have been working', 'have been working'], answer: 2,
    explain: 'Duration reaching a point in the future: will have been + verb-ing.' },
  { id: 'q33', tense: 'fut-perf-cont', type: 'fill',
    sentence: 'By midnight we ___ (travel) for fifteen hours.',
    accept: ['will have been travelling', 'will have been traveling', '’ll have been travelling'],
    explain: 'By + future time + a duration: will have been travelling.' },
  { id: 'q34', tense: 'fut-perf-cont', type: 'choice',
    sentence: 'She’ll be tired when she arrives — she ___ all night.',
    options: ['will drive', 'will have driven', 'will have been driving', 'has driven'], answer: 2,
    explain: 'The long activity causes the future state: will have been driving.' },
  { id: 'q35', tense: 'fut-perf-cont', type: 'choice',
    sentence: 'Which sentence needs the future perfect <i>simple</i>, not continuous?',
    options: [
      'By July he ___ for the same firm for a decade.',
      'By July he ___ two hundred reports.',
      'By July they ___ for six months straight.',
      'By July she ___ all summer.'
    ], answer: 1,
    explain: 'A finished quantity (two hundred reports) takes the simple form: will have written.' },
  { id: 'q36', tense: 'fut-perf-cont', type: 'fill',
    sentence: 'How long ___ you ___ (study) English by the end of this course?',
    accept: ['will have been studying', 'will you have been studying'],
    explain: '<b>How long ... by</b> a future point: will have been studying.' },

  /* ---------- Mixed contrast & tense identification ---------- */
  { id: 'q37', tense: 'pres-perf', type: 'identify',
    sentence: 'They have already signed the contract.',
    options: ['Present Perfect', 'Present Perfect Continuous', 'Past Perfect', 'Future Perfect'], answer: 0,
    explain: '<i>have + signed</i> — present perfect.' },
  { id: 'q38', tense: 'past-perf-cont', type: 'identify',
    sentence: 'The kids had been arguing for an hour before their mother stepped in.',
    options: ['Past Perfect', 'Past Perfect Continuous', 'Present Perfect Continuous', 'Future Perfect Continuous'], answer: 1,
    explain: '<i>had been + arguing</i> — past perfect continuous.' },
  { id: 'q39', tense: 'fut-perf', type: 'identify',
    sentence: 'By Friday the decorators will have repainted every room.',
    options: ['Future Perfect Continuous', 'Present Perfect', 'Future Perfect', 'Past Perfect'], answer: 2,
    explain: '<i>will have + repainted</i> — future perfect.' },
  { id: 'q40', tense: 'pres-perf-cont', type: 'identify',
    sentence: 'I’ve been meaning to call you all week.',
    options: ['Present Perfect', 'Present Perfect Continuous', 'Past Perfect Continuous', 'Future Perfect'], answer: 1,
    explain: '<i>’ve been + meaning</i> — present perfect continuous.' },
  { id: 'q41', tense: 'pres-perf', type: 'choice',
    sentence: 'Choose the natural pair: “I ___ three chapters today, so I ___ for hours.”',
    options: [
      'have read / have been reading',
      'have been reading / have read',
      'read / have read',
      'had read / have read'
    ], answer: 0,
    explain: 'Countable result → simple (<i>have read three chapters</i>); duration → continuous (<i>have been reading</i>).' },
  { id: 'q42', tense: 'past-perf', type: 'choice',
    sentence: 'Which sentence puts the events in the right order?',
    options: [
      'When I arrived, she left.',
      'When I arrived, she had left.',
      'When I had arrived, she has left.',
      'When I arrive, she had left.'
    ], answer: 1,
    explain: 'She left first, then I arrived — the earlier action takes <i>had left</i>.' },
  { id: 'q43', tense: 'pres-perf', type: 'fill',
    sentence: 'Correct the error: “I have finished the work two hours ago.” Write the whole corrected sentence.',
    accept: ['i finished the work two hours ago'],
    explain: '<b>Two hours ago</b> is a finished time, so the past simple is required.' },
  { id: 'q44', tense: 'fut-perf', type: 'fill',
    sentence: 'Correct the error: “By the time she will arrive, we will have eaten.” Write the whole corrected sentence.',
    accept: ['by the time she arrives, we will have eaten', 'by the time she arrives we will have eaten'],
    explain: 'After <b>by the time</b> use a present tense, never <i>will</i>.' },
  { id: 'q45', tense: 'past-perf', type: 'fill',
    sentence: 'Join with <i>before</i>: “She left. Then I called.” → She ___ (leave) before I called.',
    accept: ['had left'],
    explain: 'The first event of two takes the past perfect.' }
];
