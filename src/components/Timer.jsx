import React, { useEffect } from "react"

const Timer = ({ isGameOver, timeElapsed, setTimeElapsed }) => {
  useEffect(() => {
    let timer

    // Fonction pour démarrer ou reprendre le chronomètre
    const startTimer = () => {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1)
      }, 1000)
    }

    // Démarrer le chronomètre si le jeu n'est pas terminé
    if (!isGameOver) {
      startTimer()
    }

    // Gestion du changement de visibilité
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(timer)
      } else if (!isGameOver) {
        startTimer()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Nettoyage
    return () => {
      clearInterval(timer)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isGameOver]) //eslint-disable-line react-hooks/exhaustive-deps

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
