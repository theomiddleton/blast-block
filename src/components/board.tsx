'use client'

import type { GameState, PieceType } from '@/types/game'

type BoardProps = {
  gameState: GameState
  onCellClick: (row: number, col: number) => void
}

export function Board({ gameState, onCellClick }: BoardProps) {
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
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className={`w-8 h-8 border border-gray-300 ${cell ? colors[cell] : 'bg-white'}`}
            onClick={() => onCellClick(i, j)}
          />
        ))
      )}
    </div>
  )
}

