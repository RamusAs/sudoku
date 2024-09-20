import React, { useState } from "react"

import { generateSudokuGrid, isValidSudoku } from "./sudokuUtils" // Import des fonctions utilitaires
import SudokuGrid from "./components/SudokuGrid"
import ControlPanel from "./components/ControlPanel"
import "./App.css"
import Timer from "./components/Timer"
import { Confetti } from "./components/Confetti"

function App() {
  const [game] = useState(() => generateSudokuGrid())
  const [attempts, setAttempts] = useState(0)
  const [grid, setGrid] = useState(game.grid)
  const [solutionGrid, setSolution] = useState(game.solution)
  const [initialGrid, setInitialGrid] = useState(grid.map((row) => [...row]))
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  // État pour stocker les classes de style par cellule
  const [gridStatus, setGridStatus] = useState(
    Array(9).fill(Array(9).fill("")) // Initialisation sans aucune classe
  )

  // Réinitialiser la grille avec une nouvelle grille générée
  const resetGame = () => {
    const { grid, solution } = generateSudokuGrid()
    setGrid(grid)
    setInitialGrid([...grid])
    setSolution(solution)
    setGridStatus(Array(9).fill(Array(9).fill("")))
    setAttempts(0)
    setTimeElapsed(0)
    localStorage.removeItem("gridState")
    localStorage.removeItem("solutionState")
  }

  // Fonction pour vérifier si la grille est complète et correcte
  const checkWin = () => {
    const isComplete = grid.every((row) => row.every((cell) => cell !== ""))
    if (!isComplete) {
      checkSolution()
      return
    }

    if (isValidSudoku(grid)) {
      setIsGameOver(true)
      alert("Félicitations, vous avez gagné !")
      setTimeElapsed(0)
      setIsVisible(true)
    } else {
      checkSolution()
      //alert("Désolé, il y a des erreurs dans la grille.")
    }
  }

  const checkSolution = () => {
    if (attempts > 2) {
      alert("Vous avez perdu. Reéssayez!")
      resetGame()
      setTimeElapsed(0)
      return
    }

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
    setAttempts(attempts + 1)
  }

  const updateCell = (row, col, value) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? value : cell
      )
    )
    setGrid(newGrid)
    localStorage.setItem("gridState", JSON.stringify(newGrid))
  }

  return (
    <div className="App">
      <h1>Sudoku</h1>
      {isVisible && <Confetti />}

      <Timer
        isGameOver={isGameOver}
        timeElapsed={timeElapsed}
        setTimeElapsed={setTimeElapsed}
      />
      <SudokuGrid
        grid={grid}
        gridStatus={gridStatus}
        updateCell={updateCell}
        initialGrid={initialGrid}
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
      />
      <ControlPanel
        resetGame={resetGame}
        checkGame={checkWin}
        attempts={attempts}
      />
    </div>
  )
}

export default App
