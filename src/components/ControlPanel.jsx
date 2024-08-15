const ControlPanel = ({ resetGame, checkGame }) => {
  return (
    <div className="control-panel">
      <button onClick={resetGame}>Réinitialiser</button>
      <button onClick={checkGame}>Vérifier</button>
    </div>
  )
}

export default ControlPanel
