'use client'

import { useDroppable } from '@dnd-kit/core'
import type { GameState, PieceType } from '@/types/game'

type BoardProps = {
  gameState: GameState
}

export function Board({ gameState }: BoardProps) {
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

          return (
            <div
              key={`${i}-${j}`}
              ref={setNodeRef}
              className={`w-12 h-12 border border-gray-300 ${cell ? colors[cell] : 'bg-white'}`}
            />
          )
        })
      )}
    </div>
  )
}

