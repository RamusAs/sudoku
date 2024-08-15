import React, { useState } from "react"

import { generateSudokuGrid, isValidSudoku } from "./sudokuUtils" // Import des fonctions utilitaires
import SudokuGrid from "./components/SudokuGrid"
import ControlPanel from "./components/ControlPanel"
import "./App.css"

function App() {
  const [game] = useState(() => generateSudokuGrid())
  const [grid, setGrid] = useState(game.grid)
  const [solutionGrid, setSolution] = useState(game.solution)
  console.log("🚀 ~ App ~ solutionGrid:", solutionGrid)
  // État pour stocker les classes de style par cellule
  const [gridStatus, setGridStatus] = useState(
    Array(9).fill(Array(9).fill("")) // Initialisation sans aucune classe
  )

  // Réinitialiser la grille avec une nouvelle grille générée
  const resetGame = () => {
    const { grid, solution } = generateSudokuGrid()
    setGrid(grid)
    setSolution(solution)
    setGridStatus(Array(9).fill(Array(9).fill("")))
  }

  // Fonction pour vérifier si la grille est complète et correcte
  const checkWin = () => {
    const isComplete = grid.every((row) => row.every((cell) => cell !== ""))
    if (!isComplete) {
      checkSolution()
      return
    }

    if (isValidSudoku(grid)) {
      alert("Félicitations, vous avez gagné !")
    } else {
      checkSolution()
      alert("Désolé, il y a des erreurs dans la grille.")
    }
  }

  const checkSolution = () => {
    const cp = [...grid].map((el) => [...el])
    const newGridStatus = cp.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        // eslint-disable-next-line
        if (cell && cell == solutionGrid[rowIndex][colIndex]) {
          return "correct"
          // eslint-disable-next-line
        } else if (cell && cell != solutionGrid[rowIndex][colIndex]) {
          return "incorrect"
        }
        return ""
      })
    )
    setGridStatus(newGridStatus)
  }

  return (
    <div className="App">
      <h1>Sudoku</h1>
      <SudokuGrid
        grid={grid}
        gridStatus={gridStatus}
        updateCell={(row, col, value) => {
          const newGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) =>
              rowIndex === row && colIndex === col ? value : cell
            )
          )
          setGrid(newGrid)
        }}
      />
      <ControlPanel resetGame={resetGame} checkGame={checkWin} />
    </div>
  )
}

export default App
