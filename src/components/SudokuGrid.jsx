import SudokuCell from "./SudokuCell"

const SudokuGrid = ({ grid, updateCell, gridStatus }) => {
  console.log("🚀 ~ SudokuGrid ~ grid:", grid)
  return (
    <div className="sudoku-grid">
      {grid.map((row, rowIndex) => (
        <div className="sudoku-row" key={rowIndex}>
          {row.map((value, colIndex) => (
            <SudokuCell
              key={colIndex}
              value={value}
              row={rowIndex}
              col={colIndex}
              updateCell={updateCell}
              className={gridStatus[rowIndex][colIndex]}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default SudokuGrid
