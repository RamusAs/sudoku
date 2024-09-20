const ControlPanel = ({ grid, resetGame, checkGame, attempts }) => {
  const allCellsFilled = grid.every((row) => row.every((cell) => !!cell))

  return (
    <div className="control-panel">
      <button onClick={resetGame}>Réinitialiser</button>
      {!allCellsFilled && (
        <button onClick={checkGame} disabled={attempts >= 3}>
          Vérifier ({attempts}/3)
        </button>
      )}
      {allCellsFilled && <button onClick={checkGame}>Valider</button>}
    </div>
  )
}

export default ControlPanel
