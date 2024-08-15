export const generateSudokuGrid = () => {
  let solution
  // Créer une grille vide
  let grid = Array(9)
    .fill(null)
    .map(() => Array(9).fill(""))

  // Remplir la grille de manière complète et valide
  fillGrid(grid)
  solution = [...grid].map((el) => [...el])
  // Supprimer des valeurs aléatoires pour créer un puzzle
  const numberOfCellsToShow = 30 // On montre 30 cellules au début
  return { grid: removeNumbersFromGrid(grid, numberOfCellsToShow), solution }
}

// Fonction pour remplir la grille de manière valide en utilisant backtracking
const fillGrid = (grid) => {
  const findEmptyCell = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "") {
          return { row, col }
        }
      }
    }
    return null
  }

  const isValidPlacement = (grid, row, col, num) => {
    // Vérifier la ligne
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num) return false
    }

    // Vérifier la colonne
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num) return false
    }

    // Vérifier le sous-bloc 3x3
    const boxRowStart = Math.floor(row / 3) * 3
    const boxColStart = Math.floor(col / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[boxRowStart + i][boxColStart + j] === num) return false
      }
    }

    return true
  }

  const solveGrid = () => {
    const emptyCell = findEmptyCell()
    if (!emptyCell) return true // Grille complète

    const { row, col } = emptyCell

    const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])
    for (let num of numbers) {
      if (isValidPlacement(grid, row, col, num)) {
        grid[row][col] = num

        if (solveGrid()) {
          return true
        }

        grid[row][col] = "" // Backtracking
      }
    }
    return false
  }

  solveGrid()
}

// Fonction pour mélanger un tableau
const shuffleArray = (array) => {
  const cp = [...array]
  for (let i = cp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cp[i], cp[j]] = [cp[j], cp[i]]
  }
  return cp
}

// Fonction pour supprimer des chiffres aléatoires de la grille tout en conservant une grille solvable
const removeNumbersFromGrid = (grid, cellsToShow) => {
  const gridCopy = grid.map((row) => [...row]) // Créer une copie de la grille complète
  let cellsToRemove = 81 - cellsToShow // Le nombre de cellules que l'on veut supprimer

  while (cellsToRemove > 0) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)

    if (gridCopy[row][col] !== "") {
      gridCopy[row][col] = "" // Supprimer la valeur
      cellsToRemove--
    }
  }

  return gridCopy
}

// Fonction pour vérifier si une grille donnée est valide
export const isValidSudoku = (grid) => {
  const isValidRow = (row) => {
    const seen = new Set()
    for (let i = 0; i < 9; i++) {
      const value = grid[row][i]
      if (value && seen.has(value)) return false
      seen.add(value)
    }
    return true
  }

  const isValidCol = (col) => {
    const seen = new Set()
    for (let i = 0; i < 9; i++) {
      const value = grid[i][col]
      if (value && seen.has(value)) return false
      seen.add(value)
    }
    return true
  }

  const isValidSubGrid = (startRow, startCol) => {
    const seen = new Set()
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const value = grid[startRow + i][startCol + j]
        if (value && seen.has(value)) return false
        seen.add(value)
      }
    }
    return true
  }

  for (let i = 0; i < 9; i++) {
    if (!isValidRow(i) || !isValidCol(i)) return false
  }

  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      if (!isValidSubGrid(i, j)) return false
    }
  }

  return true
}
