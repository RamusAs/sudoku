const SudokuCell = ({ value, row, col, updateCell, className }) => {
  const handleChange = (e) => {
    const newValue = e.target.value
    if (newValue === "" || (newValue >= 1 && newValue <= 9)) {
      updateCell(row, col, newValue)
    }
  }

  return (
    <input
      type="tel"
      inputMode="numeric"
      pattern="[0-9]*"
      className={`sudoku-cell ${className}`} // Ajouter une classe pour ajuster les bordures
      value={value}
      onChange={handleChange}
      maxLength="1"
      readOnly={value !== "" && typeof value === "number"} // Rendre les cellules préremplies non modifiables
    />
  )
}

export default SudokuCell
