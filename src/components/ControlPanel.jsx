const ControlPanel = ({ resetGame, checkGame, attempts }) => {
  return (
    <div className="control-panel">
      <button onClick={resetGame}>Réinitialiser</button>
      <button onClick={checkGame} disabled={attempts >= 3}>
        Vérifier ({attempts}/3)
      </button>
    </div>
  )
}

export default ControlPanel
