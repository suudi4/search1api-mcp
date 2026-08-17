# Perfect Tenses Lab

A small demo web app for learning and practising the six English **perfect tenses**.
Plain HTML, CSS and JavaScript — no framework, no build step, no network calls.

## The six areas covered

| Area | Structure | Looks back from |
| --- | --- | --- |
| Present Perfect | `have / has + past participle` | now |
| Present Perfect Continuous | `have / has been + verb-ing` | now |
| Past Perfect | `had + past participle` | a moment in the past |
| Past Perfect Continuous | `had been + verb-ing` | a moment in the past |
| Future Perfect | `will have + past participle` | a moment in the future |
| Future Perfect Continuous | `will have been + verb-ing` | a moment in the future |

## What's in it

**Learn** — one card per tense with a mini timeline, the positive / negative /
question / short-answer forms, typical uses with examples, signal words, and a
"watch out" note for the mistake learners actually make. Below the cards, a
comparison table lines all six up side by side.

**Practice** — build a set by area (one tense or all six), exercise type and
length. Three exercise types:

- *Multiple choice* — pick the correct form
- *Fill in the gap* — type the missing words; answers are matched loosely, so
  case, punctuation and curly vs. straight apostrophes never cost you a point,
  and contractions are accepted where they're natural
- *Name the tense* — identify the tense in a sentence

Every answer gets an explanation, right or wrong. At the end of a set you can
retry just the ones you missed.

**Progress** — total answered, accuracy, best streak, and a per-tense accuracy
bar so weak areas are obvious. Stored in `localStorage`, on your machine only.

## Running it

No dependencies. Either open the file directly:

```sh
open index.html      # macOS   (xdg-open on Linux, start on Windows)
```

or serve it, which is nicer for reloads:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Layout

```
index.html      markup and view shells
styles.css      theming (light + dark via prefers-color-scheme), layout
js/data.js      all content: the six tense descriptions + 45 practice items
js/app.js       view switching, quiz engine, progress tracking
```

## Adding questions

Append to `QUESTIONS` in `js/data.js`. Each item names the tense it trains, so
it feeds the area filter and the progress bars automatically.

```js
{ id: 'q46', tense: 'past-perf', type: 'choice',
  sentence: 'By the time we arrived, they ___ dinner.',
  options: ['finish', 'have finished', 'had finished', 'will finish'], answer: 2,
  explain: 'The earlier of two past actions takes the past perfect.' }
```

- `type: 'choice'` and `type: 'identify'` take `options` (four of them) plus an
  `answer` index. Options are shuffled at runtime, so the index is only the
  authoring order.
- `type: 'fill'` takes `accept`, an array of valid strings — put the model
  answer first, then any spelling or contraction variants you want to allow.
- In `sentence`, `___` renders as a gap and `(text in parentheses)` renders as a
  greyed-out cue.
