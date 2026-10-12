import { useState } from 'react'
import './App.css'
import {
  computeStepChallenge,
  type ChallengeResult,
} from './challenge'

const DEFAULT_AVERAGE_STEPS = 0
const DEFAULT_TEAM_SIZE = 10

function formatInteger(value: number): string {
  return Math.round(value).toLocaleString()
}

function formatDistanceKm(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 })
}

function App() {
  const [averageStepsPerPerson, setAverageStepsPerPerson] = useState(
    String(DEFAULT_AVERAGE_STEPS),
  )
  const [teamSize, setTeamSize] = useState(String(DEFAULT_TEAM_SIZE))
  const [result, setResult] = useState<ChallengeResult>(() =>
    computeStepChallenge({
      averageStepsPerPerson: DEFAULT_AVERAGE_STEPS,
      teamSize: DEFAULT_TEAM_SIZE,
    }),
  )

  function handleCalculate() {
    setResult(
      computeStepChallenge({
        averageStepsPerPerson: Number(averageStepsPerPerson),
        teamSize: Number(teamSize),
      }),
    )
  }

  return (
    <div className="container">
      <header className="header">
        <h1>AMES Step Up</h1>
        <p>Team step challenge calculator</p>
      </header>

      <div className="grid">
        <section className="card">
          <h2>Enter average steps per person and team size.</h2>

          <div className="input-group">
            <label htmlFor="average-steps">Average steps per person</label>
            <input
              id="average-steps"
              type="number"
              min={0}
              value={averageStepsPerPerson}
              onChange={(event) => setAverageStepsPerPerson(event.target.value)}
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

          <button type="button" onClick={handleCalculate}>
            Calculate
          </button>
        </section>

        <div className="stats">
          <div className="stat-card">
            <div className="stat-label">Total Steps</div>
            <div className="stat-value">{formatInteger(result.totalSteps)}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Distance Travelled</div>
            <div className="stat-value">
              {formatDistanceKm(result.distanceKm)} km
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Marathons</div>
            <div className="stat-value">{result.marathons.toFixed(1)}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Moon Progress</div>
            <div className="stat-value">{result.moonPercent.toFixed(2)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
