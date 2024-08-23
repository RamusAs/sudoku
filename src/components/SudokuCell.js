const SudokuCell = ({ value, row, col, updateCell, className, onSelect }) => {
  const handleChange = (e) => {
    const newValue = e.target.value
    if (newValue === "" || (newValue >= 1 && newValue <= 9)) {
      updateCell(row, col, newValue)
    }
  }

  return (
    <div className="sudoku-cell-wrapper">
      <input
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        className={`sudoku-cell ${className}`} // Ajouter une classe pour ajuster les bordures
        value={value}
        onChange={handleChange}
        onClick={() => onSelect()}
        maxLength="1"
        readOnly={value !== "" && typeof value === "number"} // Rendre les cellules préremplies non modifiables
      />
      {className.includes("incorrect") && (
        <img src="explode.gif" alt="Erreur" className="error-gif" />
      )}
    </div>
  )
}

export default SudokuCell
