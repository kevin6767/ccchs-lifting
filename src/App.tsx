import React from 'react'
import './App.css'
import WorkoutTimer from '../src/components/timer/WorkoutTimer'

const App: React.FC = () => {
    const workoutPlan = {
        workouts: [
            {
                name: 'Squat',
                sets: [
                    { duration: 30, cooldown: 15, participantCooldown: 15 },
                    { duration: 30, cooldown: 15, participantCooldown: 15 },
                    { duration: 30, cooldown: 15, participantCooldown: 15 },
                ],
                cooldown: 30,
                setCount: 3,
            },
            {
                name: 'Front Squat',
                sets: [
                    { duration: 30, cooldown: 15, participantCooldown: 15 },
                    { duration: 30, cooldown: 15, participantCooldown: 15 },
                    { duration: 30, cooldown: 15, participantCooldown: 15 },
                ],
                cooldown: 30,
                setCount: 8,
            },
            {
                name: 'Straight Leg Deadlifts',
                sets: [
                    { duration: 30, cooldown: 15, participantCooldown: 15 },
                    { duration: 30, cooldown: 15, participantCooldown: 15 },
                    { duration: 30, cooldown: 15, participantCooldown: 15 },
                ],
                cooldown: 30,
                setCount: 8,
            },
        ],
        participants: ['1', '2', '3', '4', '5'],
    }

    return (
        <div className="App">
            <WorkoutTimer workoutPlan={workoutPlan} />
            <h5
                style={{
                    marginTop: `5rem`,
                }}
            >
                {workoutPlan.workouts.map((workOut): any => {
                    return (
                        <div
                            style={{
                                display: `block`,
                                borderBottom: `.5px solid grey`,
                                width: ``,
                            }}
                        >
                            <div>{workOut.name}</div>
                            <div>{`${workOut.sets.length}x${workOut.setCount}`}</div>
                        </div>
                    )
                })}
            </h5>
        </div>
    )
}

export default App
