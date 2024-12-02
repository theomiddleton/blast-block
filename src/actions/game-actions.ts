'use server'

import type { GameState, Piece, PieceType } from '@/types/game'

const BOARD_SIZE = 8
const PIECES_PER_TURN = 3

const PIECES: { [key in PieceType]: boolean[][] } = {
  I: [[true, true, true, true]],
  O: [[true, true], [true, true]],
  T: [[true, true, true], [false, true, false]],
  S: [[false, true, true], [true, true, false]],
  Z: [[true, true, false], [false, true, true]],
  J: [[true, false, false], [true, true, true]],
  L: [[false, false, true], [true, true, true]]
}

export async function initializeGame(): Promise<GameState> {
  return {
    board: Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)),
    score: 0,
    availablePieces: generatePieces(),
    gameOver: false
  }
}

function generatePieces(): Piece[] {
  const pieceTypes = Object.keys(PIECES) as PieceType[]
  return Array(PIECES_PER_TURN).fill(null).map(() => {
    const type = pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
    return { type, shape: PIECES[type] } as Piece
  })
}

export async function placePiece(
  state: GameState,
  pieceIndex: number,
  row: number,
  col: number
): Promise<GameState> {
  const newState = JSON.parse(JSON.stringify(state)) as GameState
  const piece = newState.availablePieces[pieceIndex]

  if (!canPlacePiece(newState.board, piece, row, col)) {
    return newState
  }

  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (piece.shape[i][j]) {
        newState.board[row + i][col + j] = piece.type
      }
    }
  }

  newState.availablePieces.splice(pieceIndex, 1)
  if (newState.availablePieces.length === 0) {
    newState.availablePieces = generatePieces()
  }

  newState.score += clearLines(newState.board)
  newState.gameOver = isGameOver(newState.board, newState.availablePieces)

  return newState
}

function canPlacePiece(board: (PieceType | null)[][], piece: Piece, row: number, col: number): boolean {
  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (piece.shape[i][j]) {
        if (row + i >= BOARD_SIZE || col + j >= BOARD_SIZE || board[row + i][col + j] !== null) {
          return false
        }
      }
    }
  }
  return true
}

function clearLines(board: (PieceType | null)[][]): number {
  let score = 0
  const rowsToRemove: number[] = []
  const colsToRemove: number[] = []

  // Check rows
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board[i].every(cell => cell !== null)) {
      rowsToRemove.push(i)
    }
  }

  // Check columns
  for (let j = 0; j < BOARD_SIZE; j++) {
    if (board.every(row => row[j] !== null)) {
      colsToRemove.push(j)
    }
  }

  // Remove rows
  rowsToRemove.forEach(row => {
    board[row] = Array(BOARD_SIZE).fill(null)
    score += BOARD_SIZE
  })

  // Remove columns
  colsToRemove.forEach(col => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      board[i][col] = null
    }
    score += BOARD_SIZE
  })

  return score
}

function isGameOver(board: (PieceType | null)[][], availablePieces: Piece[]): boolean {
  for (let piece of availablePieces) {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (canPlacePiece(board, piece, i, j)) {
          return false
        }
      }
    }
  }
  return true
}

