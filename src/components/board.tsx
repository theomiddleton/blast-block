'use client'

import { useDroppable } from '@dnd-kit/core'
import type { GameState, PieceType, Piece } from '@/types/game'

type BoardProps = {
  gameState: GameState
  previewPiece: Piece | null
  previewPosition: { row: number; col: number } | null
  canPlace: boolean
}

export function Board({ gameState, previewPiece, previewPosition, canPlace }: BoardProps) {
  const colors: { [key in PieceType]: string } = {
    I: 'bg-cyan-500',
    O: 'bg-yellow-500',
    T: 'bg-purple-500',
    S: 'bg-green-500',
    Z: 'bg-red-500',
    J: 'bg-blue-500',
    L: 'bg-orange-500',
    I_VERT: 'bg-cyan-500',
    T_INV: 'bg-purple-500',
    S_VERT: 'bg-green-500',
    Z_VERT: 'bg-red-500',
    J_INV: 'bg-blue-500',
    L_INV: 'bg-orange-500',
    SMALL: 'bg-gray-500',
    MEDIUM: 'bg-gray-600',
    LARGE: 'bg-gray-700',
    SQUARE: 'bg-yellow-600',
    L_SMALL: 'bg-orange-600',
    T_SMALL: 'bg-purple-600'
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

          return (
            <div
              key={`${i}-${j}`}
              ref={setNodeRef}
              className={`w-12 h-12 border border-gray-300 ${cell ? colors[cell] : 'bg-white'}`}
            >
              {isPreview && !cell && (
                <div className={`w-full h-full ${canPlace ? colors[previewPiece.type] : 'bg-red-500'} ${canPlace ? 'opacity-50' : 'opacity-25'}`} />
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

