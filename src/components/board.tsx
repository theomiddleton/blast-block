'use client'

import { useDroppable } from '@dnd-kit/core'
import type { GameState, PieceType, Piece } from '@/types/game'
import { useState, useEffect } from 'react'

type BoardProps = {
  gameState: GameState
  previewPiece: Piece | null
  previewPosition: { row: number; col: number } | null
  canPlace: boolean
}

export function Board({ gameState, previewPiece, previewPosition, canPlace }: BoardProps) {
  const [clearedCells, setClearedCells] = useState<{ row: number; col: number }[]>([])
  const [placedCells, setPlacedCells] = useState<{ row: number; col: number }[]>([])

  useEffect(() => {
    const newClearedCells: { row: number; col: number }[] = []
    
    // Check rows
    for (let i = 0; i < gameState.board.length; i++) {
      if (gameState.board[i].every(cell => cell !== null)) {
        for (let j = 0; j < gameState.board[i].length; j++) {
          newClearedCells.push({ row: i, col: j })
        }
      }
    }

    // Check columns
    for (let j = 0; j < gameState.board[0].length; j++) {
      if (gameState.board.every(row => row[j] !== null)) {
        for (let i = 0; i < gameState.board.length; i++) {
          newClearedCells.push({ row: i, col: j })
        }
      }
    }

    setClearedCells(newClearedCells)

    if (newClearedCells.length > 0) {
      const timer = setTimeout(() => {
        setClearedCells([])
      }, 500) // Duration of the clear animation

      return () => clearTimeout(timer)
    }
  }, [gameState.board])

  useEffect(() => {
    const newPlacedCells: { row: number; col: number }[] = []
    
    for (let i = 0; i < gameState.board.length; i++) {
      for (let j = 0; j < gameState.board[i].length; j++) {
        if (gameState.board[i][j] !== null && !clearedCells.some(cell => cell.row === i && cell.col === j)) {
          newPlacedCells.push({ row: i, col: j })
        }
      }
    }

    setPlacedCells(newPlacedCells)
  }, [gameState.board, clearedCells])

  const colors: { [key in PieceType]: string } = {
    I: 'bg-cyan-500',
    O: 'bg-yellow-500',
    T: 'bg-purple-500',
    S: 'bg-green-500',
    Z: 'bg-red-500',
    J: 'bg-blue-500',
    L: 'bg-orange-500'
  }

  return (
    <div className="grid grid-cols-8 gap-1 p-2 bg-gray-200 rounded">
      {gameState.board.map((row, i) =>
        row.map((cell, j) => {
          const { setNodeRef } = useDroppable({
            id: `cell-${i}-${j}`,
          })

          const isPreview = previewPiece && previewPosition && 
            i >= previewPosition.row && i < previewPosition.row + previewPiece.shape.length &&
            j >= previewPosition.col && j < previewPosition.col + previewPiece.shape[0].length &&
            previewPiece.shape[i - previewPosition.row][j - previewPosition.col]

          const isCleared = clearedCells.some(clearedCell => clearedCell.row === i && clearedCell.col === j)
          const isPlaced = placedCells.some(placedCell => placedCell.row === i && placedCell.col === j)

          return (
            <div
              key={`${i}-${j}`}
              ref={setNodeRef}
              className={`w-12 h-12 border border-gray-300 ${cell ? colors[cell] : 'bg-white'}`}
            >
              {isPreview && !cell && (
                <div className={`w-full h-full ${colors[previewPiece.type]} ${canPlace ? 'opacity-50' : 'opacity-25 bg-red-500'}`} />
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

