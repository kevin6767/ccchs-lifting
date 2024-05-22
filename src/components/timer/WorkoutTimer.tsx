import React, { useState, useEffect } from 'react'

interface Set {
    duration: number // duration in seconds
    cooldown: number // cooldown duration in seconds between sets
    participantCooldown: number // cooldown duration in seconds between participants
}

interface Workout {
    name: string
    sets: Set[]
    cooldown: number // cooldown between workouts
    setCount: number
}

interface WorkoutPlan {
    workouts: Workout[]
    participants: string[]
}

interface WorkoutTimerProps {
    workoutPlan: WorkoutPlan
}

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ workoutPlan }) => {
    const { workouts, participants } = workoutPlan
    const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0)
    const [currentSetIndex, setCurrentSetIndex] = useState(0)
    const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0)
    const [timeLeft, setTimeLeft] = useState(workouts[0].sets[0].duration)
    const [isCooldown, setIsCooldown] = useState(false)
    const [cooldownType, setCooldownType] = useState<
        'set' | 'participant' | 'workout'
    >('set')

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
        }, 1000)

        if (timeLeft <= 0) {
            clearInterval(timer)
            if (isCooldown) {
                handleEndCooldown()
            } else {
                handleEndSet()
            }
        }

        return () => clearInterval(timer)
    }, [timeLeft, isCooldown])

    const handleEndSet = () => {
        if (currentParticipantIndex < participants.length - 1) {
            setIsCooldown(true)
            setCooldownType('participant')
            setTimeLeft(
                workouts[currentWorkoutIndex].sets[currentSetIndex]
                    .participantCooldown
            )
        } else if (
            currentSetIndex <
            workouts[currentWorkoutIndex].sets.length - 1
        ) {
            setIsCooldown(true)
            setCooldownType('set')
            setTimeLeft(
                workouts[currentWorkoutIndex].sets[currentSetIndex].cooldown
            )
        } else if (currentWorkoutIndex < workouts.length - 1) {
            setIsCooldown(true)
            setCooldownType('workout')
            setTimeLeft(workouts[currentWorkoutIndex].cooldown)
        } else {
            // All workouts, sets, and participants are done, reset or handle the end as needed
            setCurrentWorkoutIndex(0)
            setCurrentSetIndex(0)
            setCurrentParticipantIndex(0)
            setTimeLeft(workouts[0].sets[0].duration)
        }
    }

    const handleEndCooldown = () => {
        setIsCooldown(false)
        if (cooldownType === 'participant') {
            setCurrentParticipantIndex((prevIndex) => prevIndex + 1)
            setTimeLeft(
                workouts[currentWorkoutIndex].sets[currentSetIndex].duration
            )
        } else if (cooldownType === 'set') {
            setCurrentSetIndex((prevIndex) => prevIndex + 1)
            setCurrentParticipantIndex(0)
            setTimeLeft(
                workouts[currentWorkoutIndex].sets[currentSetIndex + 1].duration
            )
        } else if (cooldownType === 'workout') {
            setCurrentWorkoutIndex((prevIndex) => prevIndex + 1)
            setCurrentSetIndex(0)
            setCurrentParticipantIndex(0)
            setTimeLeft(workouts[currentWorkoutIndex + 1].sets[0].duration)
        }
    }

    const handleNext = () => {
        if (isCooldown) return

        if (currentParticipantIndex < participants.length - 1) {
            setIsCooldown(true)
            setCooldownType('participant')
            setTimeLeft(
                workouts[currentWorkoutIndex].sets[currentSetIndex]
                    .participantCooldown
            )
        } else if (
            currentSetIndex <
            workouts[currentWorkoutIndex].sets.length - 1
        ) {
            setIsCooldown(true)
            setCooldownType('set')
            setTimeLeft(
                workouts[currentWorkoutIndex].sets[currentSetIndex].cooldown
            )
        } else if (currentWorkoutIndex < workouts.length - 1) {
            setIsCooldown(true)
            setCooldownType('workout')
            setTimeLeft(workouts[currentWorkoutIndex].cooldown)
        }
    }

    const handlePrevious = () => {
        if (isCooldown) return

        if (currentParticipantIndex > 0) {
            setCurrentParticipantIndex(currentParticipantIndex - 1)
            setTimeLeft(
                workouts[currentWorkoutIndex].sets[currentSetIndex].duration
            )
        } else if (currentSetIndex > 0) {
            setCurrentSetIndex(currentSetIndex - 1)
            setCurrentParticipantIndex(participants.length - 1)
            setTimeLeft(
                workouts[currentWorkoutIndex].sets[currentSetIndex - 1].duration
            )
        } else if (currentWorkoutIndex > 0) {
            setCurrentWorkoutIndex(currentWorkoutIndex - 1)
            setCurrentSetIndex(
                workouts[currentWorkoutIndex - 1].sets.length - 1
            )
            setCurrentParticipantIndex(participants.length - 1)
            setTimeLeft(
                workouts[currentWorkoutIndex - 1].sets[
                    workouts[currentWorkoutIndex - 1].sets.length - 1
                ].duration
            )
        }
    }

    const handleSkipCooldown = () => {
        if (isCooldown) {
            handleEndCooldown()
        }
    }

    return (
        <div>
            <h1>Workout Timer</h1>
            <h2>{workouts[currentWorkoutIndex].name}</h2>
            <h3>Reps - {workouts[currentWorkoutIndex].setCount}</h3>
            <h3>
                {isCooldown
                    ? 'Cooldown'
                    : `Set ${currentSetIndex + 1} Participant ${currentParticipantIndex + 1} (${participants[currentParticipantIndex]})`}
            </h3>
            <h1>Time left: {timeLeft}s</h1>
            <button
                onClick={handlePrevious}
                disabled={
                    isCooldown ||
                    (currentWorkoutIndex === 0 &&
                        currentSetIndex === 0 &&
                        currentParticipantIndex === 0)
                }
            >
                Previous
            </button>
            <button
                onClick={handleNext}
                disabled={
                    isCooldown ||
                    (currentWorkoutIndex === workouts.length - 1 &&
                        currentSetIndex ===
                            workouts[currentWorkoutIndex].sets.length - 1 &&
                        currentParticipantIndex === participants.length - 1)
                }
            >
                Next
            </button>
            {isCooldown && (
                <button onClick={handleSkipCooldown}>Skip Cooldown</button>
            )}
        </div>
    )
}

export default WorkoutTimer
