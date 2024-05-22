import React from 'react'
import './App.css'
import WorkoutTimer from '../src/components/timer/WorkoutTimer'

const App: React.FC = () => {
    const workoutPlan = {
        workouts: [
            {
                name: 'Warm Up',
                sets: [{ duration: 30, cooldown: 10, participantCooldown: 20 }],
                cooldown: 20,
                setCount: 12,
            },
            {
                name: 'Workout 1',
                sets: [
                    { duration: 45, cooldown: 15, participantCooldown: 20 },
                    { duration: 45, cooldown: 15, participantCooldown: 20 },
                    { duration: 45, cooldown: 15, participantCooldown: 20 },
                    { duration: 45, cooldown: 15, participantCooldown: 20 },
                ],
                cooldown: 30,
                setCount: 12,
            },
            {
                name: 'Workout 2',
                sets: [
                    { duration: 60, cooldown: 20, participantCooldown: 20 },
                    { duration: 60, cooldown: 20, participantCooldown: 20 },
                    { duration: 60, cooldown: 20, participantCooldown: 20 },
                    { duration: 60, cooldown: 20, participantCooldown: 20 },
                ],
                cooldown: 40,
                setCount: 12,
            },
            {
                name: 'Cool Down',
                sets: [{ duration: 30, cooldown: 10, participantCooldown: 20 }],
                cooldown: 0,
                setCount: 12,
            },
        ],
        participants: ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'],
    }

    return (
        <div className="App">
            <WorkoutTimer workoutPlan={workoutPlan} />
        </div>
    )
}

export default App
