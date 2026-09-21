import { useState, useEffect, useRef } from 'react'

/* ── Types ── */
type MCQOption = { id: string; text: string }
type MCQAnswer = { correct: string; explanation: Record<string, string> }

/* ── Shared Components ── */

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${((current + 1) / total) * 100}%` }} />
    </div>
  )
}

function MCQ({
  question,
  options,
  answer,
  onCorrect,
}: {
  question: string
  options: MCQOption[]
  answer: MCQAnswer
  onCorrect?: () => void
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const isCorrect = selected === answer.correct

  return (
    <div className="mcq-box">
      <p className="mcq-question">{question}</p>
      <div className="mcq-options">
        {options.map((o) => (
          <button
            key={o.id}
            className={`mcq-option ${selected === o.id ? (isCorrect ? 'correct' : 'incorrect') : ''} ${selected && o.id === answer.correct ? 'correct' : ''}`}
            onClick={() => {
              if (!selected) {
                setSelected(o.id)
                if (o.id === answer.correct) onCorrect?.()
              }
            }}
            disabled={!!selected}
          >
            {o.text}
          </button>
        ))}
      </div>
      {selected && (
        <div className={`mcq-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong>{' '}
          {answer.explanation[selected]}
        </div>
      )}
    </div>
  )
}

function SlideNav({
  current,
  total,
  onPrev,
  onNext,
  onCounterClick,
}: {
  current: number
  total: number
  onPrev: () => void
  onNext: () => void
  onCounterClick: () => void
}) {
  return (
    <div className="slide-nav">
      <button className="nav-btn" onClick={onPrev} disabled={current === 0}>
        &larr; Previous
      </button>
      <span className="slide-counter" onClick={onCounterClick}>
        {current + 1} / {total}
      </span>
      <button className="nav-btn" onClick={onNext} disabled={current === total - 1}>
        Next &rarr;
      </button>
    </div>
  )
}

/* ── SLIDE 1: Hook — One Small Word Changes Everything ── */

function Slide1() {
  const [activeP, setActiveP] = useState<number | null>(null)

  const particles = [
    {
      char: 'は',
      reading: 'wa',
      sentence: 'わたしは がっこうに いきます',
      meaning: 'As for me, I go to school',
      note: 'は marks the topic — "speaking of me…"',
      colour: '#ff7eb3',
    },
    {
      char: 'が',
      reading: 'ga',
      sentence: 'わたしが がっこうに いきます',
      meaning: 'I am the one who goes to school',
      note: 'が emphasises the subject — "it\'s ME who goes"',
      colour: '#818cf8',
    },
    {
      char: 'も',
      reading: 'mo',
      sentence: 'わたしも がっこうに いきます',
      meaning: 'I also go to school',
      note: 'も means "also/too" — someone else goes, and so do I',
      colour: '#fbbf24',
    },
  ]

  return (
    <div className="slide slide-hook">
      <div className="slide-badge">Opening Scenario</div>
      <h1>One Small Word Changes Everything</h1>
      <div className="hook-image-box">
        <img src="/images/hook-particles.png" alt="Japanese particles" />
      </div>
      <p className="hook-lead">
        Look at this sentence. The blank space is where a <em>particle</em> goes:
      </p>
      <div className="hook-sentence">
        <span className="jp">わたし</span>
        <span className="jp-blank">[ &nbsp;&nbsp; ]</span>
        <span className="jp">がっこうに いきます</span>
      </div>
      <p className="hook-romaji">watashi [ &nbsp;&nbsp; ] gakkou ni ikimasu</p>
      <p className="hook-sub">Click each particle to see how it changes the meaning:</p>
      <div className="hook-particles">
        {particles.map((p, i) => (
          <button
            key={i}
            className={`hook-p-btn ${activeP === i ? 'active' : ''}`}
            style={{ borderColor: p.colour }}
            onClick={() => setActiveP(activeP === i ? null : i)}
          >
            <span className="hook-p-char" style={{ color: p.colour }}>
              {p.char}
            </span>
            <span className="hook-p-reading">({p.reading})</span>
          </button>
        ))}
      </div>
      {activeP !== null && (
        <div className="hook-detail" style={{ borderLeftColor: particles[activeP].colour }}>
          <p className="hook-detail-jp">{particles[activeP].sentence}</p>
          <p className="hook-detail-meaning">&rarr; {particles[activeP].meaning}</p>
          <p className="hook-detail-note">{particles[activeP].note}</p>
        </div>
      )}
      <div className="key-point">
        These tiny words are called <strong>particles</strong>. They come after nouns and tell you
        the <em>role</em> of that word in the sentence. Master them, and you unlock Japanese.
      </div>
    </div>
  )
}

/* ── SLIDE 2: What Are Particles? ── */

function Slide2() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      english: 'I eat sushi',
      japanese: 'わたし は すし を たべます',
      highlight: ['は', 'を'],
      explanation: 'は marks "I" as the topic. を marks "sushi" as the thing being eaten.',
    },
    {
      english: 'I go to Tokyo',
      japanese: 'わたし は とうきょう に いきます',
      highlight: ['は', 'に'],
      explanation: 'は marks "I" as the topic. に marks "Tokyo" as the destination.',
    },
    {
      english: 'I study at the library',
      japanese: 'わたし は としょかん で べんきょうします',
      highlight: ['は', 'で'],
      explanation: 'は marks "I" as the topic. で marks "library" as where the action happens.',
    },
  ]

  const step = steps[activeStep]

  return (
    <div className="slide slide-overview">
      <div className="slide-badge">Foundations</div>
      <h1>What Are Particles?</h1>
      <p className="lead">
        Think of particles as <strong>signposts</strong> in a sentence. They tell you what role
        each word plays — just like prepositions in English, but they come <em>after</em> the word
        they modify.
      </p>
      <div className="analogy-box">
        <div className="analogy-row">
          <span className="analogy-label">English:</span>
          <span className="analogy-text">
            I go <strong>to</strong> school &nbsp;(preposition comes <em>before</em>)
          </span>
        </div>
        <div className="analogy-row">
          <span className="analogy-label">Japanese:</span>
          <span className="analogy-text">
            がっこう<strong>に</strong> いきます &nbsp;(particle comes <em>after</em>)
          </span>
        </div>
      </div>
      <h2>See It in Action</h2>
      <p className="sub">Click each sentence to see how particles work:</p>
      <div className="step-tabs">
        {steps.map((_, i) => (
          <button
            key={i}
            className={`step-tab ${activeStep === i ? 'active' : ''}`}
            onClick={() => setActiveStep(i)}
          >
            Sentence {i + 1}
          </button>
        ))}
      </div>
      <div className="step-display">
        <p className="step-english">{step.english}</p>
        <p className="step-japanese">{step.japanese}</p>
        <p className="step-explanation">{step.explanation}</p>
      </div>
      <MCQ
        question="In the sentence すしをたべます (sushi o tabemasu), what does を tell you?"
        options={[
          { id: 'a', text: 'Sushi is the topic of conversation' },
          { id: 'b', text: 'Sushi is the thing being eaten (direct object)' },
          { id: 'c', text: 'Sushi is the destination' },
          { id: 'd', text: 'Sushi is where the action happens' },
        ]}
        answer={{
          correct: 'b',
          explanation: {
            a: 'は marks the topic, not を. を specifically marks the direct object — the thing the verb acts on.',
            b: 'を marks the direct object — the thing that the verb (eat) directly acts upon. Sushi is what gets eaten.',
            c: 'に marks destinations and targets, not を. を marks the direct object of the verb.',
            d: 'で marks the location where an action happens. を marks the direct object — what the verb acts on.',
          },
        }}
      />
    </div>
  )
}

/* ── SLIDE 3: Particle Explorer ── */

function Slide3() {
  const [activeP, setActiveP] = useState(0)

  const particles = [
    {
      char: 'は',
      reading: 'wa',
      function: 'Topic marker',
      tip: 'Think: "As for ___"',
      examples: [
        { jp: 'わたしは がくせい です', romaji: 'watashi wa gakusei desu', en: 'I am a student (as for me…)' },
        { jp: 'きょうは あついです', romaji: 'kyou wa atsui desu', en: 'Today is hot (as for today…)' },
      ],
      colour: '#ff7eb3',
    },
    {
      char: 'を',
      reading: 'o',
      function: 'Direct object',
      tip: 'Think: "___ is what gets verbed"',
      examples: [
        { jp: 'みずを のみます', romaji: 'mizu o nomimasu', en: 'I drink water' },
        { jp: 'ほんを よみます', romaji: 'hon o yomimasu', en: 'I read a book' },
      ],
      colour: '#60a5fa',
    },
    {
      char: 'に',
      reading: 'ni',
      function: 'Target / time / destination',
      tip: 'Think: "to / at / on ___"',
      examples: [
        { jp: 'がっこうに いきます', romaji: 'gakkou ni ikimasu', en: 'I go to school' },
        { jp: 'さんじに あいます', romaji: 'san-ji ni aimasu', en: 'I meet (someone) at 3 o\'clock' },
      ],
      colour: '#4ade80',
    },
    {
      char: 'で',
      reading: 'de',
      function: 'Location of action / means',
      tip: 'Think: "at / by / with ___"',
      examples: [
        { jp: 'こうえんで あそびます', romaji: 'kouen de asobimasu', en: 'I play at the park' },
        { jp: 'バスで いきます', romaji: 'basu de ikimasu', en: 'I go by bus' },
      ],
      colour: '#fbbf24',
    },
    {
      char: 'へ',
      reading: 'e',
      function: 'Direction',
      tip: 'Think: "towards ___"',
      examples: [
        { jp: 'とうきょうへ いきます', romaji: 'toukyou e ikimasu', en: 'I go towards Tokyo' },
        { jp: 'くにへ かえります', romaji: 'kuni e kaerimasu', en: 'I return to (my) country' },
      ],
      colour: '#a78bfa',
    },
    {
      char: 'と',
      reading: 'to',
      function: 'With / and (exhaustive list)',
      tip: 'Think: "together with ___"',
      examples: [
        { jp: 'ともだちと たべます', romaji: 'tomodachi to tabemasu', en: 'I eat with a friend' },
        { jp: 'りんごと みかん', romaji: 'ringo to mikan', en: 'Apples and oranges (and nothing else)' },
      ],
      colour: '#f472b6',
    },
    {
      char: 'も',
      reading: 'mo',
      function: 'Also / too',
      tip: 'Think: "___ as well"',
      examples: [
        { jp: 'わたしも いきます', romaji: 'watashi mo ikimasu', en: 'I also go' },
        { jp: 'これも ください', romaji: 'kore mo kudasai', en: 'This one too, please' },
      ],
      colour: '#fb923c',
    },
    {
      char: 'から / まで',
      reading: 'kara / made',
      function: 'From / until',
      tip: 'Think: "___ to ___" (range)',
      examples: [
        { jp: 'くじから ごじまで', romaji: 'ku-ji kara go-ji made', en: 'From 9 o\'clock until 5 o\'clock' },
        { jp: 'マラヤから きました', romaji: 'Maraya kara kimashita', en: 'I came from Malaysia' },
      ],
      colour: '#2dd4bf',
    },
  ]

  const p = particles[activeP]

  return (
    <div className="slide slide-explorer">
      <div className="slide-badge">Interactive</div>
      <h1>Particle Explorer</h1>
      <p className="lead">
        Here are the 8 essential particles you need. Click each card to explore its function,
        examples, and a memory tip.
      </p>
      <div className="explorer-grid">
        {particles.map((pt, i) => (
          <button
            key={i}
            className={`explorer-card ${activeP === i ? 'active' : ''}`}
            style={{
              borderColor: activeP === i ? pt.colour : undefined,
              background: activeP === i ? `${pt.colour}15` : undefined,
            }}
            onClick={() => setActiveP(i)}
          >
            <span className="explorer-char" style={{ color: pt.colour }}>
              {pt.char}
            </span>
            <span className="explorer-fn">{pt.function}</span>
          </button>
        ))}
      </div>
      <div className="explorer-detail" style={{ borderLeftColor: p.colour }}>
        <div className="explorer-detail-header">
          <span className="explorer-detail-char" style={{ color: p.colour }}>
            {p.char}
          </span>
          <span className="explorer-detail-reading">({p.reading})</span>
          <span className="explorer-detail-fn">{p.function}</span>
        </div>
        <p className="explorer-tip">{p.tip}</p>
        {p.examples.map((ex, i) => (
          <div key={i} className="explorer-example">
            <p className="ex-jp">{ex.jp}</p>
            <p className="ex-romaji">{ex.romaji}</p>
            <p className="ex-en">{ex.en}</p>
          </div>
        ))}
      </div>
      <div className="cultural-note">
        <strong>Cultural note:</strong> In spoken Japanese, は is pronounced "wa" when used as a
        particle (not "ha"). Similarly, へ is pronounced "e" (not "he") and を is pronounced "o"
        (not "wo"). This is a historical spelling convention.
      </div>
    </div>
  )
}

/* ── SLIDE 4: Scenario Lab 1 — Meeting Someone New ── */

function Slide4() {
  const [qNum, setQNum] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const questions = [
    {
      context: 'You\'re introducing yourself to a new classmate.',
      sentence: 'わたし＿ たなか です',
      romaji: 'watashi ___ Tanaka desu',
      english: 'I am Tanaka',
      options: [
        { id: 'a', text: 'は (wa)' },
        { id: 'b', text: 'を (o)' },
        { id: 'c', text: 'に (ni)' },
        { id: 'd', text: 'で (de)' },
      ],
      answer: {
        correct: 'a',
        explanation: {
          a: 'は marks "I" as the topic of the sentence. When introducing yourself, you\'re saying "As for me, I am Tanaka."',
          b: 'を marks the direct object (what gets acted on by a verb). A name isn\'t an object being verbed.',
          c: 'に marks destinations or targets. You\'re not going to Tanaka — you ARE Tanaka.',
          d: 'で marks the location of an action. Introductions don\'t need a location marker here.',
        },
      },
    },
    {
      context: 'Your classmate says they\'re from Kuala Lumpur. You\'re from KL too!',
      sentence: 'わたし＿ クアラルンプールから きました',
      romaji: 'watashi ___ Kuala Lumpur kara kimashita',
      english: 'I also came from Kuala Lumpur',
      options: [
        { id: 'a', text: 'は (wa)' },
        { id: 'b', text: 'が (ga)' },
        { id: 'c', text: 'も (mo)' },
        { id: 'd', text: 'と (to)' },
      ],
      answer: {
        correct: 'c',
        explanation: {
          a: 'は would just mark "I" as the topic — "I came from KL." But since your classmate is also from KL, も (also) is more natural.',
          b: 'が emphasises the subject. It\'s not wrong grammatically, but も is better because you\'re saying "I also…"',
          c: 'も means "also/too." Since your classmate already said they\'re from KL, も perfectly expresses "me too."',
          d: 'と means "with" or "and." It doesn\'t express the "also" meaning you need here.',
        },
      },
    },
    {
      context: 'You want to say "I am a university student."',
      sentence: 'わたし＿ がくせい です',
      romaji: 'watashi ___ gakusei desu',
      english: 'I am a student',
      options: [
        { id: 'a', text: 'を (o)' },
        { id: 'b', text: 'は (wa)' },
        { id: 'c', text: 'へ (e)' },
        { id: 'd', text: 'に (ni)' },
      ],
      answer: {
        correct: 'b',
        explanation: {
          a: 'を marks the direct object. "Student" isn\'t being acted upon — it\'s what you ARE.',
          b: 'は marks the topic. "As for me, I am a student." This is the standard pattern for self-introductions.',
          c: 'へ marks direction (towards somewhere). You\'re not going towards being a student.',
          d: 'に marks targets or destinations. For "I am X," you need the topic marker は.',
        },
      },
    },
  ]

  const q = questions[qNum]

  const handleCorrect = () => {
    setScore(score + 1)
    setAnswered(true)
  }

  const nextQ = () => {
    if (qNum < questions.length - 1) {
      setQNum(qNum + 1)
      setAnswered(false)
    }
  }

  return (
    <div className="slide slide-scenario1">
      <div className="slide-badge">Scenario Lab 1</div>
      <h1>Meeting Someone New</h1>
      <p className="lead">
        It's your first day at a Japanese language school. A classmate sits next to you. Time to
        introduce yourself using particles!
      </p>
      <div className="scenario-context">{q.context}</div>
      <div className="scenario-quiz">
        <MCQ
          question={`Fill in the blank: ${q.sentence}\n(${q.romaji}) — "${q.english}"`}
          options={q.options}
          answer={q.answer}
          onCorrect={handleCorrect}
        />
      </div>
      {answered && qNum < questions.length - 1 && (
        <button className="next-q-btn" onClick={nextQ}>
          Next question &rarr;
        </button>
      )}
      {answered && qNum === questions.length - 1 && (
        <div className="scenario-result">
          Score: {score}/{questions.length} —{' '}
          {score === questions.length
            ? 'Perfect! Your introductions are natural.'
            : score >= 2
              ? 'Good work! Review the ones you missed.'
              : 'Keep practising — particles get easier with each sentence.'}
        </div>
      )}
      <div className="cultural-note">
        <strong>Cultural tip:</strong> In Japan, self-introductions (じこしょうかい) usually begin
        with はじめまして (hajimemashite — "nice to meet you") and end with よろしくおねがいします
        (yoroshiku onegaishimasu — "please treat me well"). Bowing accompanies each part.
      </div>
    </div>
  )
}

/* ── SLIDE 5: Scenario Lab 2 — Making Plans ── */

function Slide5() {
  const [qNum, setQNum] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const questions = [
    {
      context: 'You want to invite a friend to go to the cinema on Saturday.',
      sentence: 'どようび＿ えいがを みに いきます',
      romaji: 'doyoubi ___ eiga o mi ni ikimasu',
      english: 'I go to see a movie on Saturday',
      options: [
        { id: 'a', text: 'は (wa)' },
        { id: 'b', text: 'に (ni)' },
        { id: 'c', text: 'で (de)' },
        { id: 'd', text: 'を (o)' },
      ],
      answer: {
        correct: 'b',
        explanation: {
          a: 'は marks the topic of conversation. Here, Saturday is a specific time, not the topic.',
          b: 'に marks specific times. "On Saturday" = どようびに. Perfect for pinpointing when something happens.',
          c: 'で marks the location where an action happens. Saturday isn\'t a location.',
          d: 'を marks the direct object. You\'re not "Saturday-ing" anything.',
        },
      },
    },
    {
      context: 'You\'re telling a friend where you\'ll meet.',
      sentence: 'えきの まえ＿ あいましょう',
      romaji: 'eki no mae ___ aimashou',
      english: 'Let\'s meet in front of the station',
      options: [
        { id: 'a', text: 'を (o)' },
        { id: 'b', text: 'へ (e)' },
        { id: 'c', text: 'で (de)' },
        { id: 'd', text: 'は (wa)' },
      ],
      answer: {
        correct: 'c',
        explanation: {
          a: 'を marks the direct object. "In front of the station" isn\'t being acted upon.',
          b: 'へ marks direction — "towards" somewhere. But you\'re meeting AT a location, not heading towards it.',
          c: 'で marks the location where an action happens. The action (meeting) happens in front of the station.',
          d: 'は marks the topic. You\'re not saying "As for the station front…" — you\'re saying where the meeting is.',
        },
      },
    },
    {
      context: 'You ask who your friend is coming with.',
      sentence: 'だれ＿ きますか',
      romaji: 'dare ___ kimasu ka',
      english: 'Who will you come with?',
      options: [
        { id: 'a', text: 'に (ni)' },
        { id: 'b', text: 'と (to)' },
        { id: 'c', text: 'で (de)' },
        { id: 'd', text: 'から (kara)' },
      ],
      answer: {
        correct: 'b',
        explanation: {
          a: 'に can mark a target, but for companions ("with someone"), と is the standard particle.',
          b: 'と means "with" when talking about companions. だれと = "with whom?" — the natural way to ask.',
          c: 'で marks means or location of action. It doesn\'t express companionship.',
          d: 'から means "from." "From whom?" doesn\'t make sense in this context.',
        },
      },
    },
  ]

  const q = questions[qNum]

  const handleCorrect = () => {
    setScore(score + 1)
    setAnswered(true)
  }

  const nextQ = () => {
    if (qNum < questions.length - 1) {
      setQNum(qNum + 1)
      setAnswered(false)
    }
  }

  return (
    <div className="slide slide-scenario2">
      <div className="slide-badge">Scenario Lab 2</div>
      <h1>Making Plans with Friends</h1>
      <p className="lead">
        It's Wednesday and you want to make weekend plans. Let's use particles to talk about time,
        place, and company.
      </p>
      <div className="scenario-context">{q.context}</div>
      <div className="scenario-quiz">
        <MCQ
          question={`Fill in the blank: ${q.sentence}\n(${q.romaji}) — "${q.english}"`}
          options={q.options}
          answer={q.answer}
          onCorrect={handleCorrect}
        />
      </div>
      {answered && qNum < questions.length - 1 && (
        <button className="next-q-btn" onClick={nextQ}>
          Next question &rarr;
        </button>
      )}
      {answered && qNum === questions.length - 1 && (
        <div className="scenario-result">
          Score: {score}/{questions.length} —{' '}
          {score === questions.length
            ? 'Excellent! You can make plans in Japanese.'
            : score >= 2
              ? 'Nice work! Review the particles you missed.'
              : 'Practice makes perfect — try the Particle Explorer again.'}
        </div>
      )}
      <div className="cultural-note">
        <strong>Useful phrase:</strong> When confirming plans, Japanese speakers often say
        じゃあ、また (jaa, mata — "see you then") at the end. It's casual and friendly.
      </div>
    </div>
  )
}

/* ── SLIDE 6: Scenario Lab 3 — At the Restaurant ── */

function Slide6() {
  const [qNum, setQNum] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const questions = [
    {
      context: 'You\'re at an izakaya and ready to order.',
      sentence: 'ラーメン＿ ください',
      romaji: 'raamen ___ kudasai',
      english: 'Ramen, please (I\'ll have ramen)',
      options: [
        { id: 'a', text: 'は (wa)' },
        { id: 'b', text: 'を (o)' },
        { id: 'c', text: 'に (ni)' },
        { id: 'd', text: 'で (de)' },
      ],
      answer: {
        correct: 'b',
        explanation: {
          a: 'は marks the topic. You\'re not saying "As for ramen…" — you\'re requesting it.',
          b: 'を marks the direct object. With ください (please give me), the thing you want takes を.',
          c: 'に marks destinations or targets. You\'re not going to ramen.',
          d: 'で marks location or means. The ramen isn\'t a location.',
        },
      },
    },
    {
      context: 'Your friend asks how you\'ll pay.',
      sentence: 'クレジットカード＿ はらいます',
      romaji: 'kurejitto kaado ___ haraimasu',
      english: 'I\'ll pay by credit card',
      options: [
        { id: 'a', text: 'を (o)' },
        { id: 'b', text: 'に (ni)' },
        { id: 'c', text: 'で (de)' },
        { id: 'd', text: 'へ (e)' },
      ],
      answer: {
        correct: 'c',
        explanation: {
          a: 'を marks the direct object. The credit card isn\'t being "paid" — it\'s the means of paying.',
          b: 'に marks targets or time. A credit card isn\'t a destination.',
          c: 'で marks the means or method. Paying BY credit card = クレジットカードで. This is one of で\'s most useful functions.',
          d: 'へ marks direction. You\'re not going towards a credit card.',
        },
      },
    },
    {
      context: 'You want to order two items at once.',
      sentence: 'すし＿ てんぷら＿ ください',
      romaji: 'sushi ___ tenpura ___ kudasai',
      english: 'Sushi and tempura, please',
      options: [
        { id: 'a', text: 'と (to) … を (o)' },
        { id: 'b', text: 'は (wa) … は (wa)' },
        { id: 'c', text: 'を (o) … を (o)' },
        { id: 'd', text: 'に (ni) … に (ni)' },
      ],
      answer: {
        correct: 'a',
        explanation: {
          a: 'と connects items in a list ("sushi and tempura"), and を marks both as the objects of ください. Perfect!',
          b: 'は…は would make both items topics, which doesn\'t work for ordering. You need "and" + object markers.',
          c: 'を…を marks both as objects, but doesn\'t connect them as "and." You need と to say "sushi AND tempura."',
          d: 'に…に marks both as targets, which doesn\'t fit ordering food.',
        },
      },
    },
  ]

  const q = questions[qNum]

  const handleCorrect = () => {
    setScore(score + 1)
    setAnswered(true)
  }

  const nextQ = () => {
    if (qNum < questions.length - 1) {
      setQNum(qNum + 1)
      setAnswered(false)
    }
  }

  return (
    <div className="slide slide-scenario3">
      <div className="slide-badge">Scenario Lab 3</div>
      <h1>At the Restaurant</h1>
      <p className="lead">
        Time to eat! Ordering food in Japanese is a great way to practise particles. Let's try an
        izakaya (Japanese pub).
      </p>
      <div className="scenario-context">{q.context}</div>
      <div className="scenario-quiz">
        <MCQ
          question={`Fill in the blank: ${q.sentence}\n(${q.romaji}) — "${q.english}"`}
          options={q.options}
          answer={q.answer}
          onCorrect={handleCorrect}
        />
      </div>
      {answered && qNum < questions.length - 1 && (
        <button className="next-q-btn" onClick={nextQ}>
          Next question &rarr;
        </button>
      )}
      {answered && qNum === questions.length - 1 && (
        <div className="scenario-result">
          Score: {score}/{questions.length} —{' '}
          {score === questions.length
            ? 'Itadakimashiki! You can order like a local.'
            : score >= 2
              ? 'Good appetite! Review the particles you missed.'
              : 'Don\'t worry — ordering gets easier with practice.'}
        </div>
      )}
      <div className="cultural-note">
        <strong>Cultural tip:</strong> Before eating, say いただきます (itadakimasu — "I
        gratefully receive"). After eating, say ごちそうさまでした (gochisousama deshita — "thank
        you for the meal"). These phrases show appreciation for everyone involved in preparing the
        food.
      </div>
    </div>
  )
}

/* ── SLIDE 7: Tricky Pairs — は vs が ── */

function Slide7() {
  const [activeExample, setActiveExample] = useState(0)

  const examples = [
    {
      label: 'Neutral statement',
      ha: { jp: 'わたしは がくせい です', romaji: 'watashi wa gakusei desu', en: 'I am a student (general statement about myself)' },
      ga: { jp: 'わたしが がくせいです', romaji: 'watashi ga gakusei desu', en: 'I\'m the one who is a student (emphasising me, maybe answering "who?")' },
    },
    {
      label: 'With question words',
      ha: { jp: '—', romaji: '—', en: 'は cannot come after a question word' },
      ga: { jp: 'だれが きますか', romaji: 'dare ga kimasu ka', en: 'Who is coming? (が is required after question words)' },
    },
    {
      label: 'Likes and abilities',
      ha: { jp: 'わたしは すしが すきです', romaji: 'watashi wa sushi ga suki desu', en: 'As for me, sushi is liked (は for topic, が for what\'s liked)' },
      ga: { jp: 'すしが すきです', romaji: 'sushi ga suki desu', en: 'Sushi is liked (が marks what you like)' },
    },
  ]

  const ex = examples[activeExample]

  return (
    <div className="slide slide-tricky1">
      <div className="slide-badge">Tricky Pairs</div>
      <h1>
        <span className="pair-vs">
          <span className="pair-a">は</span> vs <span className="pair-b">が</span>
        </span>
      </h1>
      <p className="lead">
        This is the #1 question every Japanese learner asks. Here's the key difference:
      </p>
      <div className="tricky-overview">
        <div className="tricky-card tricky-card-a">
          <span className="tricky-char" style={{ color: '#ff7eb3' }}>は</span>
          <p><strong>Topic marker</strong></p>
          <p>"As for ___" — sets the topic of conversation. The important info comes AFTER は.</p>
        </div>
        <div className="tricky-card tricky-card-b">
          <span className="tricky-char" style={{ color: '#818cf8' }}>が</span>
          <p><strong>Subject marker</strong></p>
          <p>Emphasises what comes BEFORE が — "it's ___ that…" The subject itself is the focus.</p>
        </div>
      </div>
      <h2>Compare Them Side by Side</h2>
      <div className="example-tabs">
        {examples.map((e, i) => (
          <button
            key={i}
            className={`example-tab ${activeExample === i ? 'active' : ''}`}
            onClick={() => setActiveExample(i)}
          >
            {e.label}
          </button>
        ))}
      </div>
      <div className="example-compare">
        <div className="compare-col compare-a">
          <h3>は version</h3>
          {ex.ha.jp !== '—' ? (
            <>
              <p className="compare-jp">{ex.ha.jp}</p>
              <p className="compare-romaji">{ex.ha.romaji}</p>
              <p className="compare-en">{ex.ha.en}</p>
            </>
          ) : (
            <p className="compare-na">{ex.ha.en}</p>
          )}
        </div>
        <div className="compare-col compare-b">
          <h3>が version</h3>
          <p className="compare-jp">{ex.ga.jp}</p>
          <p className="compare-romaji">{ex.ga.romaji}</p>
          <p className="compare-en">{ex.ga.en}</p>
        </div>
      </div>
      <MCQ
        question="Someone asks だれが きますか (dare ga kimasu ka — "Who is coming?"). Why must you use が and not は?"
        options={[
          { id: 'a', text: 'は is too formal for questions' },
          { id: 'b', text: 'Question words (だれ, なに, etc.) always take が, never は' },
          { id: 'c', text: 'が is used for all questions in Japanese' },
          { id: 'd', text: 'は can only be used with nouns, not pronouns' },
        ]}
        answer={{
          correct: 'b',
          explanation: {
            a: 'Formality isn\'t the issue. The rule is about grammar: question words always take が.',
            b: 'Correct! After question words like だれ (who), なに (what), どこ (where), you always use が, never は. This is a fixed grammar rule.',
            c: 'Not all questions — just questions using question words (だれ, なに, etc.). You can use は in questions like たなかさんは きますか.',
            d: 'は works with both nouns and pronouns. The rule is specifically about question words requiring が.',
          },
        }}
      />
    </div>
  )
}

/* ── SLIDE 8: Tricky Pairs — に vs で ── */

function Slide8() {
  const [activeExample, setActiveExample] = useState(0)

  const examples = [
    {
      label: 'Location',
      ni: { jp: 'とうきょうに います', romaji: 'toukyou ni imasu', en: 'I am in Tokyo (existence at a place)' },
      de: { jp: 'とうきょうで はたらきます', romaji: 'toukyou de hatarakimasu', en: 'I work in Tokyo (action at a place)' },
    },
    {
      label: 'Transportation',
      ni: { jp: '—', romaji: '—', en: 'に doesn\'t mark means of transport' },
      de: { jp: 'バスで いきます', romaji: 'basu de ikimasu', en: 'I go by bus (で marks the means)' },
    },
    {
      label: 'Numbers / quantities',
      ni: { jp: 'さんにん います', romaji: 'san-nin imasu', en: 'There are 3 people (に marks a quantity point)' },
      de: { jp: '—', romaji: '—', en: 'で doesn\'t mark quantities' },
    },
  ]

  const ex = examples[activeExample]

  return (
    <div className="slide slide-tricky2">
      <div className="slide-badge">Tricky Pairs</div>
      <h1>
        <span className="pair-vs">
          <span className="pair-a">に</span> vs <span className="pair-b">で</span>
        </span>
      </h1>
      <p className="lead">
        Both can translate to "at" in English, but they're different. Here's the rule:
      </p>
      <div className="tricky-overview">
        <div className="tricky-card tricky-card-a">
          <span className="tricky-char" style={{ color: '#4ade80' }}>に</span>
          <p><strong>Target / existence</strong></p>
          <p>"To / at" — for destinations, specific times, and where things <em>exist</em> (います / あります).</p>
        </div>
        <div className="tricky-card tricky-card-b">
          <span className="tricky-char" style={{ color: '#fbbf24' }}>で</span>
          <p><strong>Action location / means</strong></p>
          <p>"At / by" — for where an <em>action</em> happens, and how/with what you do something.</p>
        </div>
      </div>
      <div className="key-point">
        Quick test: Is there an action happening? Use <strong>で</strong>. Is it just about
        existence or a destination? Use <strong>に</strong>.
      </div>
      <h2>Compare Them Side by Side</h2>
      <div className="example-tabs">
        {examples.map((e, i) => (
          <button
            key={i}
            className={`example-tab ${activeExample === i ? 'active' : ''}`}
            onClick={() => setActiveExample(i)}
          >
            {e.label}
          </button>
        ))}
      </div>
      <div className="example-compare">
        <div className="compare-col compare-a">
          <h3>に version</h3>
          {ex.ni.jp !== '—' ? (
            <>
              <p className="compare-jp">{ex.ni.jp}</p>
              <p className="compare-romaji">{ex.ni.romaji}</p>
              <p className="compare-en">{ex.ni.en}</p>
            </>
          ) : (
            <p className="compare-na">{ex.ni.en}</p>
          )}
        </div>
        <div className="compare-col compare-b">
          <h3>で version</h3>
          {ex.de.jp !== '—' ? (
            <>
              <p className="compare-jp">{ex.de.jp}</p>
              <p className="compare-romaji">{ex.de.romaji}</p>
              <p className="compare-en">{ex.de.en}</p>
            </>
          ) : (
            <p className="compare-na">{ex.de.en}</p>
          )}
        </div>
      </div>
      <MCQ
        question="Which sentence correctly says "I study at the library"?"
        options={[
          { id: 'a', text: 'としょかんに べんきょうします' },
          { id: 'b', text: 'としょかんで べんきょうします' },
          { id: 'c', text: 'としょかんを べんきょうします' },
          { id: 'd', text: 'としょかんへ べんきょうします' },
        ]}
        answer={{
          correct: 'b',
          explanation: {
            a: 'に marks existence (います/あります). But べんきょうします is an action, so you need で.',
            b: 'で marks where an action happens. Studying is an action, so としょかんで is correct.',
            c: 'を marks the direct object. You\'re not "studying the library" — you\'re studying AT the library.',
            d: 'へ marks direction. You\'re not heading towards the library to study — you\'re already there studying.',
          },
        }}
      />
    </div>
  )
}

/* ── SLIDE 9: Particles in Real Japanese ── */

function Slide9() {
  const [activeContext, setActiveContext] = useState(0)

  const contexts = [
    {
      label: 'Formal / Polite',
      title: 'けいご (Keigo) — Polite Speech',
      description: 'In formal situations (work, strangers, teachers), particles are always used.',
      example: {
        jp: 'わたしは こんばん としょかんで べんきょうします',
        romaji: 'watashi wa konban toshokan de benkyou shimasu',
        en: 'I will study at the library tonight',
      },
      note: 'Every particle is present and correct. This is what you learn in textbooks.',
    },
    {
      label: 'Casual / Friends',
      title: 'カジュアル — Casual Speech',
      description: 'With friends and family, Japanese speakers often drop particles — especially は, を, and が.',
      example: {
        jp: 'わたし こんばん としょかんで べんきょうする',
        romaji: 'watashi konban toshokan de benkyou suru',
        en: 'I\'m studying at the library tonight',
      },
      note: 'は and を are dropped, but で stays because it carries important meaning (where). The verb also becomes casual.',
    },
    {
      label: 'Very Casual',
      title: 'すごく カジュアル — Very Casual',
      description: 'Among close friends, sentences become very short. Context does the heavy lifting.',
      example: {
        jp: 'こんばん としょかん？',
        romaji: 'konban toshokan?',
        en: 'Library tonight?',
      },
      note: 'Almost everything is dropped. But both speakers understand from context. This only works with close friends.',
    },
  ]

  const ctx = contexts[activeContext]

  return (
    <div className="slide slide-culture">
      <div className="slide-badge">Culture & Context</div>
      <h1>Particles in Real Japanese</h1>
      <div className="culture-image-box">
        <img src="/images/japanese-culture.png" alt="Japanese daily life" />
      </div>
      <p className="lead">
        Textbooks teach you the full, polite form. But real Japanese conversations are more
        flexible. Let's see how particles work at different levels of formality.
      </p>
      <div className="context-tabs">
        {contexts.map((c, i) => (
          <button
            key={i}
            className={`context-tab ${activeContext === i ? 'active' : ''}`}
            onClick={() => setActiveContext(i)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="context-display">
        <h2>{ctx.title}</h2>
        <p>{ctx.description}</p>
        <div className="context-example">
          <p className="ctx-jp">{ctx.example.jp}</p>
          <p className="ctx-romaji">{ctx.example.romaji}</p>
          <p className="ctx-en">{ctx.example.en}</p>
        </div>
        <p className="context-note">{ctx.note}</p>
      </div>
      <div className="key-point">
        <strong>Key takeaway:</strong> As a beginner, always use the full particles. You'll sound
        polite and clear. Dropping particles comes naturally as you advance and make Japanese
        friends.
      </div>
      <MCQ
        question="A friend texts you: あした えいが？(ashita eiga?). What are they asking?"
        options={[
          { id: 'a', text: 'Is the movie tomorrow?' },
          { id: 'b', text: 'Movie tomorrow? (Want to go?)' },
          { id: 'c', text: 'Did you watch the movie?' },
          { id: 'd', text: 'Where is the movie theatre?' },
        ]}
        answer={{
          correct: 'b',
          explanation: {
            a: 'Close, but the question isn\'t about whether the movie IS tomorrow. The dropped particles make it an invitation — "(Shall we watch a) movie tomorrow?"',
            b: 'In very casual speech, particles and verbs are dropped. あした えいが？ is shorthand for "Movie tomorrow?" — an invitation to watch a movie together.',
            c: 'There\'s no past tense here (あした means tomorrow, not yesterday). It\'s about a future plan, not a past event.',
            d: 'There\'s no location word or どこ (where) in the message. It\'s about whether to go, not where.',
          },
        }}
      />
    </div>
  )
}

/* ── SLIDE 10: Particle Toolkit ── */

function Slide10() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const cards = [
    {
      particle: 'は',
      colour: '#ff7eb3',
      summary: 'Topic — "as for ___"',
      details: 'Used: Every sentence with a topic. Pattern: NOUN は …',
      watchOut: 'Pronounced "wa" not "ha" when used as a particle.',
    },
    {
      particle: 'を',
      colour: '#60a5fa',
      summary: 'Object — "___ gets verbed"',
      details: 'Used: Before a verb to show its object. Pattern: NOUN を VERB',
      watchOut: 'Pronounced "o" (not "wo") in modern Japanese.',
    },
    {
      particle: 'に',
      colour: '#4ade80',
      summary: 'Target — "to / at / on ___"',
      details: 'Used: Destinations, specific times, existence. Pattern: NOUN に VERB',
      watchOut: 'For actions at a location, use で instead. に is for existence (います/あります).',
    },
    {
      particle: 'で',
      colour: '#fbbf24',
      summary: 'Action place / means — "at / by ___"',
      details: 'Used: Where actions happen, how you do things. Pattern: NOUN で VERB',
      watchOut: 'Don\'t confuse with に. Action = で, Existence = に.',
    },
    {
      particle: 'へ',
      colour: '#a78bfa',
      summary: 'Direction — "towards ___"',
      details: 'Used: Direction of movement. Pattern: PLACE へ VERB',
      watchOut: 'Very similar to に for destinations. へ emphasises direction; に emphasises arrival.',
    },
    {
      particle: 'と',
      colour: '#f472b6',
      summary: 'With / and',
      details: 'Used: Companions, exhaustive lists. Pattern: NOUN と NOUN',
      watchOut: 'と means "and nothing else." For open-ended "and," Japanese uses や (ya).',
    },
    {
      particle: 'も',
      colour: '#fb923c',
      summary: 'Also / too',
      details: 'Used: When something applies in addition. Replaces は/が. Pattern: NOUN も …',
      watchOut: 'も replaces は or が — you don\'t say わたしはも. Just わたしも.',
    },
    {
      particle: 'から / まで',
      colour: '#2dd4bf',
      summary: 'From / until',
      details: 'Used: Start and end points (time, place). Pattern: X から Y まで',
      watchOut: 'Can be used together (くじから ごじまで) or separately.',
    },
  ]

  return (
    <div className="slide slide-toolkit">
      <div className="slide-badge">Quick Reference</div>
      <h1>Your Particle Toolkit</h1>
      <p className="lead">
        Here's every particle in one place. Click a card to see usage tips and common mistakes.
      </p>
      <div className="toolkit-grid">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`toolkit-card ${expandedCard === i ? 'expanded' : ''}`}
            onClick={() => setExpandedCard(expandedCard === i ? null : i)}
          >
            <div className="toolkit-header" style={{ borderLeftColor: card.colour }}>
              <span className="toolkit-char" style={{ color: card.colour }}>
                {card.particle}
              </span>
              <span className="toolkit-summary">{card.summary}</span>
            </div>
            {expandedCard === i && (
              <div className="toolkit-details">
                <p className="toolkit-detail">{card.details}</p>
                <p className="toolkit-warning">
                  <strong>Watch out:</strong> {card.watchOut}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="key-point">
        Save this page as your go-to reference. When you encounter a new sentence, identify the
        particles first — they'll tell you the sentence structure.
      </div>
    </div>
  )
}

/* ── SLIDE 11: Sentence Dojo (Capstone Game) ── */

function Slide11() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle')
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20)
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const rounds = [
    {
      english: 'I am a student',
      parts: ['わたし', '___', 'がくせい', 'です'],
      blanks: [1],
      options: ['は', 'を', 'に', 'で'],
      answers: ['は'],
      hint: 'Topic marker',
    },
    {
      english: 'I drink coffee',
      parts: ['コーヒー', '___', 'のみます'],
      blanks: [1],
      options: ['は', 'を', 'に', 'で'],
      answers: ['を'],
      hint: 'Direct object',
    },
    {
      english: 'I go to Osaka',
      parts: ['おおさか', '___', 'いきます'],
      blanks: [1],
      options: ['は', 'を', 'に', 'で'],
      answers: ['に'],
      hint: 'Destination',
    },
    {
      english: 'I study at the library',
      parts: ['としょかん', '___', 'べんきょうします'],
      blanks: [1],
      options: ['に', 'で', 'へ', 'を'],
      answers: ['で'],
      hint: 'Location of action',
    },
    {
      english: 'I eat sushi with Tanaka',
      parts: ['たなかさん', '___', 'すし', '___', 'たべます'],
      blanks: [1, 3],
      options: ['と', 'は', 'を', 'に'],
      answers: ['と', 'を'],
      hint: 'Companion + direct object',
    },
    {
      english: 'I also go to Tokyo by train',
      parts: ['わたし', '___', 'でんしゃ', '___', 'とうきょう', '___', 'いきます'],
      blanks: [1, 3, 5],
      options: ['も', 'で', 'へ', 'は', 'を', 'に'],
      answers: ['も', 'で', 'へ'],
      hint: 'Also + means + direction',
    },
    {
      english: 'I work from 9 to 5',
      parts: ['くじ', '___', 'ごじ', '___', 'はたらきます'],
      blanks: [1, 3],
      options: ['から', 'まで', 'に', 'で'],
      answers: ['から', 'まで'],
      hint: 'From … until …',
    },
  ]

  const currentRound = rounds[round]

  const startGame = () => {
    setGameState('playing')
    setRound(0)
    setScore(0)
    setTimeLeft(20)
    setSelected(null)
    setShowResult(false)
  }

  useEffect(() => {
    if (gameState === 'playing' && !showResult) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!)
            setShowResult(true)
            return 0
          }
          return t - 1
        })
      }, 1000)
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [gameState, round, showResult])

  const handleSelect = (option: string, blankIdx: number) => {
    if (showResult) return
    // For simplicity, handle single-blank rounds
    if (currentRound.blanks.length === 1) {
      setSelected(option)
      setShowResult(true)
      if (timerRef.current) clearInterval(timerRef.current)
      const isCorrect = option === currentRound.answers[0]
      if (isCorrect) {
        const timeBonus = Math.floor(timeLeft * 5)
        setScore(score + 100 + timeBonus)
      }
    }
  }

  const nextRound = () => {
    if (round < rounds.length - 1) {
      setRound(round + 1)
      setTimeLeft(20)
      setSelected(null)
      setShowResult(false)
    } else {
      setGameState('finished')
    }
  }

  const getRating = () => {
    const maxScore = rounds.length * 200 // 100 base + 100 max time bonus per round
    const pct = score / maxScore
    if (pct >= 0.85) return { title: 'Sensei', emoji: '🏆', desc: 'Master of particles! You can teach others.' }
    if (pct >= 0.6) return { title: 'Senpai', emoji: '🥈', desc: 'Strong understanding. A few more rounds to perfection.' }
    if (pct >= 0.35) return { title: 'Deshi', emoji: '📖', desc: 'Good start! Review the Particle Explorer and try again.' }
    return { title: 'Shoshinsha', emoji: '🌱', desc: 'Every journey starts with a single step. Try the scenarios first!' }
  }

  if (gameState === 'idle') {
    return (
      <div className="slide slide-dojo">
        <div className="slide-badge">Capstone Challenge</div>
        <h1>Sentence Dojo</h1>
        <div className="dojo-image-box">
          <img src="/images/sentence-dojo.png" alt="Sentence Dojo" />
        </div>
        <p className="lead">
          Welcome to the dojo! Build Japanese sentences by placing the right particles. You earn
          points for correct answers and bonus points for speed.
        </p>
        <div className="dojo-rules">
          <div className="dojo-rule">
            <span className="rule-icon">⏱</span>
            <span>20 seconds per round</span>
          </div>
          <div className="dojo-rule">
            <span className="rule-icon">🎯</span>
            <span>100 points per correct answer</span>
          </div>
          <div className="dojo-rule">
            <span className="rule-icon">⚡</span>
            <span>Speed bonus: +5 points per second remaining</span>
          </div>
          <div className="dojo-rule">
            <span className="rule-icon">📊</span>
            <span>{rounds.length} rounds total</span>
          </div>
        </div>
        <button className="dojo-start-btn" onClick={startGame}>
          Enter the Dojo
        </button>
      </div>
    )
  }

  if (gameState === 'finished') {
    const rating = getRating()
    return (
      <div className="slide slide-dojo">
        <div className="slide-badge">Results</div>
        <h1>Dojo Complete!</h1>
        <div className="dojo-result">
          <div className="dojo-rank">
            <span className="rank-emoji">{rating.emoji}</span>
            <span className="rank-title">{rating.title}</span>
          </div>
          <p className="dojo-score">
            Final Score: <strong>{score}</strong>
          </p>
          <p className="dojo-desc">{rating.desc}</p>
        </div>
        <button className="dojo-start-btn" onClick={startGame}>
          Try Again
        </button>
      </div>
    )
  }

  // Playing state — for simplicity, only handle single-blank rounds fully
  const isSingleBlank = currentRound.blanks.length === 1

  return (
    <div className="slide slide-dojo">
      <div className="slide-badge">
        Round {round + 1}/{rounds.length}
      </div>
      <h1>Sentence Dojo</h1>
      <div className="dojo-hud">
        <span className="dojo-timer">
          ⏱ {timeLeft}s
        </span>
        <span className="dojo-score-live">
          Score: {score}
        </span>
      </div>
      <div className="dojo-challenge">
        <p className="dojo-english">"{currentRound.english}"</p>
        <p className="dojo-hint">Hint: {currentRound.hint}</p>
        <div className="dojo-sentence">
          {currentRound.parts.map((part, i) => {
            const blankIdx = currentRound.blanks.indexOf(i)
            if (blankIdx !== -1) {
              if (isSingleBlank) {
                return (
                  <span key={i} className="dojo-blank">
                    {showResult ? currentRound.answers[blankIdx] : selected || '___'}
                  </span>
                )
              }
              return (
                <span key={i} className="dojo-blank">
                  {currentRound.answers[blankIdx]}
                </span>
              )
            }
            return (
              <span key={i} className="dojo-part">
                {part}
              </span>
            )
          })}
        </div>
      </div>
      {isSingleBlank && !showResult && (
        <div className="dojo-options">
          {currentRound.options.map((opt) => (
            <button
              key={opt}
              className="dojo-option-btn"
              onClick={() => handleSelect(opt, 0)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {isSingleBlank && showResult && (
        <div className={`dojo-feedback ${selected === currentRound.answers[0] ? 'correct' : 'incorrect'}`}>
          <p>
            {selected === currentRound.answers[0]
              ? `Correct! +${100 + Math.floor(timeLeft * 5)} points`
              : `The answer was: ${currentRound.answers[0]}`}
          </p>
          <button className="next-q-btn" onClick={nextRound}>
            {round < rounds.length - 1 ? 'Next Round →' : 'See Results'}
          </button>
        </div>
      )}
      {!isSingleBlank && (
        <div className="dojo-multi-note">
          <p>This round has multiple blanks. Here are the answers:</p>
          <p className="dojo-answers">
            {currentRound.blanks.map((b, i) => (
              <span key={i} className="dojo-answer-chip">
                Blank {i + 1}: {currentRound.answers[i]}
              </span>
            ))}
          </p>
          <button className="next-q-btn" onClick={() => {
            setScore(score + 100)
            nextRound()
          }}>
            {round < rounds.length - 1 ? 'Next Round →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  )
}

/* ── SLIDE 12: Next Steps ── */

function Slide12() {
  const [activeResource, setActiveResource] = useState<number | null>(null)

  const resources = [
    {
      title: 'Practise Daily',
      icon: '📝',
      description: 'Write 3 sentences about your day using different particles each time.',
      example: 'Example: わたしは まいばん ごはんを たべます (I eat rice every evening)',
    },
    {
      title: 'Watch & Listen',
      icon: '🎧',
      description: 'Listen to Japanese podcasts, songs, or anime and try to spot particles.',
      example: 'Start with: NHK News Web Easy (free, with furigana)',
    },
    {
      title: 'Use Flashcards',
      icon: '🃏',
      description: 'Create flashcards with English sentences — test yourself by adding the right particles.',
      example: 'Front: "I study at school" → Back: がっこうで べんきょうします',
    },
    {
      title: 'Find a Partner',
      icon: '🤝',
      description: 'Practise with a language exchange partner. Use particles in real conversations.',
      example: 'Apps: HelloTalk, Tandem (free language exchange)',
    },
  ]

  return (
    <div className="slide slide-next">
      <div className="slide-badge">Moving Forward</div>
      <h1>Your Journey Continues</h1>
      <p className="lead">
        You've learned the 8 essential particles and practised them in real scenarios. Here's how
        to keep building your skills.
      </p>
      <div className="next-grid">
        {resources.map((r, i) => (
          <div
            key={i}
            className={`next-card ${activeResource === i ? 'active' : ''}`}
            onClick={() => setActiveResource(activeResource === i ? null : i)}
          >
            <div className="next-card-header">
              <span className="next-icon">{r.icon}</span>
              <span className="next-title">{r.title}</span>
            </div>
            {activeResource === i && (
              <div className="next-card-body">
                <p>{r.description}</p>
                <p className="next-example">{r.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="next-summary">
        <h2>What You've Learned</h2>
        <div className="summary-pills">
          {['は (topic)', 'を (object)', 'に (target)', 'で (action place)', 'へ (direction)', 'と (with/and)', 'も (also)', 'から/まで (from/until)'].map(
            (p, i) => (
              <span key={i} className="summary-pill">
                {p}
              </span>
            )
          )}
        </div>
      </div>
      <div className="key-point">
        Remember: particles are the skeleton of Japanese grammar. Once you can identify them in a
        sentence, you can understand almost any Japanese text — even if you don't know every word.
        がんばって！(Ganbatte — Do your best!)
      </div>
    </div>
  )
}

/* ── Instructor Panel ── */

function InstructorPanel() {
  const [activeSlide, setActiveSlide] = useState(0)

  const notes = [
    {
      title: 'Slide 1: Hook — One Small Word Changes Everything',
      answers: ['は = topic (wa)', 'が = subject emphasis (ga)', 'も = also (mo)'],
      teachingNotes:
        'This slide hooks students by showing how one tiny character completely changes meaning. Emphasise that particles have no meaning on their own — they only work in context. Ask students: "In your language, how do you show these differences?"',
    },
    {
      title: 'Slide 2: What Are Particles?',
      answers: ['MCQ: を marks the direct object (correct answer: b)'],
      teachingNotes:
        'The English preposition analogy helps beginners connect to something familiar. Stress that particles always come AFTER the word they modify — this is the opposite of English prepositions. Use the three example sentences to show patterns.',
    },
    {
      title: 'Slide 3: Particle Explorer',
      answers: ['No quiz — interactive reference cards'],
      teachingNotes:
        'Encourage students to click every card. The cultural note about pronunciation (は→wa, へ→e, を→o) is important — many beginners get confused by romanisation. Point out that から/まで are often used together as a pair.',
    },
    {
      title: 'Slide 4: Scenario Lab 1 — Meeting Someone New',
      answers: ['Q1: は (a)', 'Q2: も (c)', 'Q3: は (b)'],
      teachingNotes:
        'Self-introductions are the most natural entry point for particles. Highlight the cultural note about じこしょうかい (self-introduction) rituals. If students score low, redirect them to the Particle Explorer.',
    },
    {
      title: 'Slide 5: Scenario Lab 2 — Making Plans',
      answers: ['Q1: に (b) — specific time', 'Q2: で (c) — location of action', 'Q3: と (b) — companion'],
      teachingNotes:
        'This slide practises the most common daily-use particles. Point out that に for time only works with specific times (さんじに), not relative times like あした (tomorrow) which takes no particle.',
    },
    {
      title: 'Slide 6: Scenario Lab 3 — At the Restaurant',
      answers: ['Q1: を (b) — with ください', 'Q2: で (c) — means/method', 'Q3: と…を (a) — list + object'],
      teachingNotes:
        'Ordering food is a great way to practise を + ください pattern. Highlight で for means of payment (credit card, cash). The と…を question introduces multi-particle sentences.',
    },
    {
      title: 'Slide 7: Tricky Pairs — は vs が',
      answers: ['MCQ: Question words always take が (answer: b)'],
      teachingNotes:
        'This is the hardest concept for beginners. Don\'t try to explain every nuance — focus on the three examples shown. The key rules: は sets a topic (new info follows); が emphasises the subject (the subject IS the new info). Question words always take が.',
    },
    {
      title: 'Slide 8: Tricky Pairs — に vs で',
      answers: ['MCQ: としょかんで べんきょうします (answer: b)'],
      teachingNotes:
        'The "action vs existence" test is the most reliable way to distinguish に and で. If there\'s an action verb (tabemasu, benkyou shimasu, etc.), use で. If there\'s an existence verb (imasu, arimasu), use に. Transportation means always take で.',
    },
    {
      title: 'Slide 9: Particles in Real Japanese',
      answers: ['MCQ: "Movie tomorrow?" — an invitation (answer: b)'],
      teachingNotes:
        'This slide prepares students for real-world Japanese where particles are often dropped. Reassure beginners: always use full particles until you\'re comfortable. The formality spectrum (formal → casual → very casual) helps students understand what they\'ll actually hear.',
    },
    {
      title: 'Slide 10: Particle Toolkit',
      answers: ['No quiz — expandable reference cards'],
      teachingNotes:
        'Encourage students to bookmark this page. The "watch out" tips address the most common beginner mistakes. Tell students: when you see a sentence you don\'t understand, find the particles first — they reveal the sentence structure.',
    },
    {
      title: 'Slide 11: Sentence Dojo',
      answers: [
        'R1: は', 'R2: を', 'R3: に', 'R4: で', 'R5: と + を', 'R6: も + で + へ', 'R7: から + まで',
      ],
      teachingNotes:
        'The capstone game tests all particles learned. Scoring: 100 base + up to 100 time bonus (5 pts/sec). Ratings: Sensei (85%+), Senpai (60%+), Deshi (35%+), Shoshinsha (<35%). Multi-blank rounds are shown as demonstrations. Encourage replaying for a higher score.',
    },
    {
      title: 'Slide 12: Next Steps',
      answers: ['No quiz — resource recommendations'],
      teachingNotes:
        'End on a positive note. Remind students that particles are the foundation of Japanese grammar — mastering them now will pay dividends. The daily practice suggestion (3 sentences/day) is the most effective follow-up activity.',
    },
  ]

  return (
    <div className="instructor-panel">
      <h1>Instructor Panel</h1>
      <p className="instructor-sub">Answer keys and teaching notes for all slides</p>
      <div className="instructor-nav">
        {notes.map((n, i) => (
          <button
            key={i}
            className={`instructor-tab ${activeSlide === i ? 'active' : ''}`}
            onClick={() => setActiveSlide(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="instructor-content">
        <h2>{notes[activeSlide].title}</h2>
        <div className="instructor-answers">
          <h3>Answer Key</h3>
          {notes[activeSlide].answers.map((a, i) => (
            <p key={i} className="answer-item">
              {a}
            </p>
          ))}
        </div>
        <div className="instructor-notes">
          <h3>Teaching Notes</h3>
          <p>{notes[activeSlide].teachingNotes}</p>
        </div>
      </div>
    </div>
  )
}

/* ── App Shell ── */

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showInstructor, setShowInstructor] = useState(false)

  const slides = [
    <Slide1 />,
    <Slide2 />,
    <Slide3 />,
    <Slide4 />,
    <Slide5 />,
    <Slide6 />,
    <Slide7 />,
    <Slide8 />,
    <Slide9 />,
    <Slide10 />,
    <Slide11 />,
    <Slide12 />,
  ]

  const totalSlides = slides.length

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showInstructor) return
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        setCurrentSlide((s) => Math.min(s + 1, totalSlides - 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentSlide((s) => Math.max(s - 1, 0))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [showInstructor, totalSlides])

  // 5-click easter egg for instructor panel
  const clickCountRef = useRef(0)
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Password prompt
  const [passwordPrompt, setPasswordPrompt] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')

  const triggerPassword = () => {
    setPasswordPrompt(true)
  }

  const checkPassword = () => {
    if (passwordInput === '1234') {
      setShowInstructor(true)
      setPasswordPrompt(false)
      setPasswordInput('')
    } else {
      setPasswordInput('')
    }
  }

  const handleCounterClickWithPassword = () => {
    clickCountRef.current++
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0
    }, 2000)
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0
      triggerPassword()
    }
  }

  return (
    <div className="app">
      <ProgressBar current={currentSlide} total={totalSlides} />
      <div className="slide-container">
        {showInstructor ? <InstructorPanel /> : slides[currentSlide]}
      </div>
      <SlideNav
        current={currentSlide}
        total={totalSlides}
        onPrev={() => setCurrentSlide((s) => Math.max(s - 1, 0))}
        onNext={() => setCurrentSlide((s) => Math.min(s + 1, totalSlides - 1))}
        onCounterClick={handleCounterClickWithPassword}
      />
      {passwordPrompt && (
        <div className="password-overlay">
          <div className="password-box">
            <p>Enter instructor password:</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
              autoFocus
            />
            <button onClick={checkPassword}>Enter</button>
            <button onClick={() => setPasswordPrompt(false)}>Cancel</button>
          </div>
        </div>
      )}
      {showInstructor && (
        <button
          className="exit-instructor-btn"
          onClick={() => setShowInstructor(false)}
        >
          Exit Instructor Mode
        </button>
      )}
    </div>
  )
}
