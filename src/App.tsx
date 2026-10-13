import { Analytics } from '@vercel/analytics/react'
import { useEffect, useState } from 'react'
import './App.css'
import { CHALLENGE_EVENTS, trackChallengeEvent } from './analytics'
import {
  computeStepChallenge,
  normalizeChallengeInput,
  parseShareParams,
  pickFunFact,
  serializeShareParams,
  type ChallengeInput,
  type ChallengeResult,
  type ComparisonId,
} from './challenge'

const DEFAULT_AVERAGE_STEPS = 0
const DEFAULT_TEAM_SIZE = 10
const SHARE_TOAST_MS = 2000

let didTrackHydrationCalculate = false

function readInitialState(): {
  averageStepsPerPerson: string
  teamSize: string
  result: ChallengeResult
  shareInputs: ChallengeInput
  funFact: string
} {
  const shared = parseShareParams(window.location.search)
  const shareInputs = normalizeChallengeInput({
    averageStepsPerPerson:
      shared?.averageStepsPerPerson ?? DEFAULT_AVERAGE_STEPS,
    teamSize: shared?.teamSize ?? DEFAULT_TEAM_SIZE,
  })
  const result = computeStepChallenge(shareInputs)

  return {
    averageStepsPerPerson: String(shareInputs.averageStepsPerPerson),
    teamSize: String(shareInputs.teamSize),
    result,
    shareInputs,
    funFact: pickFunFact(result),
  }
}

function shareUrlFor(inputs: ChallengeInput): string {
  const query = serializeShareParams(inputs)
  return `${window.location.pathname}?${query}${window.location.hash}`
}

function inputsMatchShare(
  averageStepsPerPerson: string,
  teamSize: string,
  shareInputs: ChallengeInput,
): boolean {
  const current = normalizeChallengeInput({
    averageStepsPerPerson: Number(averageStepsPerPerson),
    teamSize: Number(teamSize),
  })
  return (
    current.averageStepsPerPerson === shareInputs.averageStepsPerPerson &&
    current.teamSize === shareInputs.teamSize
  )
}

const COMPARISON_CARDS: ReadonlyArray<{
  id: ComparisonId
  emoji: string
  label: string
}> = [
  { id: 'crocodile', emoji: '🐊', label: 'Crocodiles' },
  { id: 'beanCan', emoji: '🥫', label: 'Baked Bean Cans' },
  { id: 'flatWhite', emoji: '☕', label: 'Flat Whites' },
  { id: 'tram', emoji: '🚋', label: 'Melbourne Trams' },
  { id: 'sausage', emoji: '🌭', label: 'Sausages' },
  {
    id: 'mcg',
    emoji: '🏟️',
    label: 'MCG AFL ground lengths (goal-to-goal)',
  },
  { id: 'noodlePack', emoji: '🍜', label: 'Instant Noodle Packets' },
  { id: 'textbook', emoji: '📚', label: 'Textbooks' },
  { id: 'mosquito', emoji: '🦟', label: 'Mosquitoes' },
  { id: 'blueWhale', emoji: '🐋', label: 'Blue Whales' },
]

function formatInteger(value: number): string {
  return Math.round(value).toLocaleString()
}

function formatDistanceKm(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

function App() {
  const [initial] = useState(readInitialState)
  const [averageStepsPerPerson, setAverageStepsPerPerson] = useState(
    initial.averageStepsPerPerson,
  )
  const [teamSize, setTeamSize] = useState(initial.teamSize)
  const [result, setResult] = useState<ChallengeResult>(initial.result)
  const [shareInputs, setShareInputs] = useState<ChallengeInput>(
    initial.shareInputs,
  )
  const [funFact, setFunFact] = useState(initial.funFact)
  const [shareToastToken, setShareToastToken] = useState(0)

  const canShare = inputsMatchShare(
    averageStepsPerPerson,
    teamSize,
    shareInputs,
  )
  const showShareToast = shareToastToken > 0

  useEffect(() => {
    if (shareToastToken === 0) {
      return
    }
    const timer = window.setTimeout(() => {
      setShareToastToken(0)
    }, SHARE_TOAST_MS)
    return () => {
      window.clearTimeout(timer)
    }
  }, [shareToastToken])

  useEffect(() => {
    if (didTrackHydrationCalculate) {
      return
    }
    if (parseShareParams(window.location.search) === null) {
      return
    }
    didTrackHydrationCalculate = true
    trackChallengeEvent(CHALLENGE_EVENTS.calculate)
  }, [])

  function handleCalculate() {
    const inputs = normalizeChallengeInput({
      averageStepsPerPerson: Number(averageStepsPerPerson),
      teamSize: Number(teamSize),
    })
    const nextResult = computeStepChallenge(inputs)
    setAverageStepsPerPerson(String(inputs.averageStepsPerPerson))
    setTeamSize(String(inputs.teamSize))
    setShareInputs(inputs)
    setResult(nextResult)
    setFunFact(pickFunFact(nextResult))
    window.history.replaceState(null, '', shareUrlFor(inputs))
    trackChallengeEvent(CHALLENGE_EVENTS.calculate)
  }

  function handleAnotherFact() {
    setFunFact((current) => pickFunFact(result, current))
    trackChallengeEvent(CHALLENGE_EVENTS.generateFact)
  }

  async function handleShare() {
    const url = `${window.location.origin}${shareUrlFor(shareInputs)}`
    await navigator.clipboard.writeText(url)
    setShareToastToken((token) => token + 1)
    trackChallengeEvent(CHALLENGE_EVENTS.shareLink)
  }

  return (
    <div className="container">
      <Analytics />
      <header className="header">
        <h1>🚶 AMES Step Up</h1>
      </header>

      <div className="grid">
        <section className="card">
          <h2>Enter average steps per person and team size.</h2>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="average-steps">Average steps per person</label>
              <input
                id="average-steps"
                type="number"
                min={0}
                value={averageStepsPerPerson}
                onChange={(event) =>
                  setAverageStepsPerPerson(event.target.value)
                }
              />
            </div>

            <div className="input-group">
              <label htmlFor="team-size">Team size</label>
              <input
                id="team-size"
                type="number"
                min={1}
                value={teamSize}
                onChange={(event) => setTeamSize(event.target.value)}
              />
            </div>

            <div className="actions">
              <button type="button" onClick={handleCalculate}>
                Calculate
              </button>
              <div className="share-control">
                <button
                  type="button"
                  className="secondary"
                  disabled={!canShare}
                  onClick={() => {
                    void handleShare()
                  }}
                >
                  Share
                </button>
                {showShareToast ? (
                  <div className="share-toast" role="status">
                    Link copied
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <div className="stats">
          <div className="stat-card">
            <div className="stat-label">👣 Total Steps</div>
            <div className="stat-value">{formatInteger(result.totalSteps)}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">📏 Distance Travelled</div>
            <div className="stat-value">
              {formatDistanceKm(result.distanceKm)} km
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">🏃 Marathons</div>
            <div className="stat-value">{result.marathons.toFixed(1)}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">🌙 Moon Progress</div>
            <div className="stat-value">{result.moonPercent.toFixed(2)}%</div>
          </div>
        </div>
      </div>

      <h2 className="section-title">Other Comparisons</h2>
      <div className="comparisons">
        {COMPARISON_CARDS.map((card) => (
          <div key={card.id} className="comparison-card">
            <div className="emoji" aria-hidden="true">
              {card.emoji}
            </div>
            <div className="value">
              {formatInteger(result.comparisons[card.id])}
            </div>
            <div>{card.label}</div>
          </div>
        ))}
      </div>

      <section className="journey-card">
        <h2>How far from Melbourne has your team travelled?</h2>
        <div className="stats">
          <div className="stat-card">
            <div className="stat-label">✅ Last Reached</div>
            <div className="stat-value">{result.journey.lastReached.name}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">🎯 Next Destination</div>
            <div className="stat-value">
              {result.journey.next
                ? result.journey.next.name
                : 'Journey Complete'}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">📍 Distance Remaining</div>
            <div className="stat-value">
              {formatInteger(result.journey.remainingKm)} km
            </div>
          </div>
        </div>
      </section>

      <section className="fun-fact">
        <h2>🎲 Random Fun Fact</h2>
        <p>{funFact}</p>
        <button type="button" onClick={handleAnotherFact}>
          Another One
        </button>
      </section>
    </div>
  )
}

export default App
