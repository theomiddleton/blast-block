'use server'

import type { GameState, Piece, PieceType } from '@/types/game'
import { PIECES, BOARD_SIZE, PIECES_PER_TURN } from '@/constants/shapes'

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
    const type = pieceTypes[Math.floor(Math.random() * pieceTypes.length)] as PieceType
    return { id: Math.random().toString(36).substr(2, 9), type, shape: PIECES[type] }
  })
}

export async function placePiece(
  state: GameState,
  piece: Piece,
  row: number,
  col: number
): Promise<GameState> {
  const newState = JSON.parse(JSON.stringify(state)) as GameState

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

  newState.availablePieces = newState.availablePieces.filter(p => p.id !== piece.id)
  if (newState.availablePieces.length === 0) {
    newState.availablePieces = generatePieces()
  }

  const clearedLines = clearLines(newState.board)
  newState.score += calculateScore(clearedLines)
  newState.gameOver = isGameOver(newState.board, newState.availablePieces)

  return newState
}

export async function canPlacePiece(board: (PieceType | null)[][], piece: Piece, row: number, col: number): Promise<boolean> {
  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (piece.shape[i][j]) {
        if (row + i < 0 || row + i >= BOARD_SIZE || col + j < 0 || col + j >= BOARD_SIZE) {
          return false // Off the board
        }
        if (board[row + i][col + j] !== null) {
          return false // Overlapping with an existing piece
        }
      }
    }
  }
  return true;
}

function clearLines(board: (PieceType | null)[][]): number {
  let linesCleared = 0
  const rowsToRemove: number[] = []
  const colsToRemove: number[] = []

  // Check rows
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board[i].every(cell => cell !== null)) {
      rowsToRemove.push(i)
      linesCleared++
    }
  }

  // Check columns
  for (let j = 0; j < BOARD_SIZE; j++) {
    if (board.every(row => row[j] !== null)) {
      colsToRemove.push(j)
      linesCleared++
    }
  }

  // Remove rows
  rowsToRemove.forEach(row => {
    board[row] = Array(BOARD_SIZE).fill(null)
  })

  // Remove columns
  colsToRemove.forEach(col => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      board[i][col] = null
    }
  })

  return linesCleared
}

function calculateScore(linesCleared: number): number {
  let score = linesCleared * BOARD_SIZE * 10 // Base score for cleared lines
  if (linesCleared === BOARD_SIZE * 2) { // Full board clear (all rows and columns)
    score *= 2 // Double the score for a full board clear
  }
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

