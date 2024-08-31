import React, { useState, useEffect } from "react"

const Timer = ({ isGameOver, timeElapsed, setTimeElapsed }) => {
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    let timer

    if (isRunning) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1)
      }, 1000)
    }

    // Arrête le chronomètre lorsque la partie est terminée
    if (isGameOver) {
      setIsRunning(false)
      clearInterval(timer)
    }

    return () => clearInterval(timer) // Nettoyage de l'intervalle
  }, [isRunning, isGameOver]) //eslint-disable-line react-hooks/exhaustive-deps

  // Formater le temps écoulé en minutes et secondes
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="timer">
      <p>Temps écoulé : {formatTime(timeElapsed)}</p>
      {isGameOver && <p>Partie terminée en {formatTime(timeElapsed)}</p>}
    </div>
  )
}

export default Timer
