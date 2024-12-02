'use client'

import type { Piece } from '@/types/game'

type PieceSelectionProps = {
  pieces: Piece[]
  onPieceSelect: (index: number) => void
}

export function PieceSelection({ pieces, onPieceSelect }: PieceSelectionProps) {
  const colors: { [key: string]: string } = {
    I: 'bg-cyan-500',
    O: 'bg-yellow-500',
    T: 'bg-purple-500',
    S: 'bg-green-500',
    Z: 'bg-red-500',
    J: 'bg-blue-500',
    L: 'bg-orange-500'
  }

  return (
    <div className="flex space-x-4">
      {pieces.map((piece, index) => (
        <div key={index} className="cursor-pointer" onClick={() => onPieceSelect(index)}>
          {piece.shape.map((row, i) => (
            <div key={i} className="flex">
              {row.map((cell, j) => (
                <div
                  key={j}
                  className={`w-4 h-4 border border-gray-300 ${
                    cell ? colors[piece.type] : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

