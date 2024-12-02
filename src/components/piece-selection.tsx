'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { Piece } from '@/types/game'

type PieceSelectionProps = {
  pieces: Piece[]
}

export function PieceSelection({ pieces }: PieceSelectionProps) {
  return (
    <div className="flex space-x-4">
      {pieces.map((piece, index) => (
        <DraggablePiece key={`piece-${piece.type}-${index}`} piece={piece} />
      ))}
    </div>
  )
}

function DraggablePiece({ piece }: { piece: Piece }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `piece-${piece.type}`,
    data: piece,
  })

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined

  const colors: { [key: string]: string } = {
    I: 'bg-cyan-500',
    O: 'bg-yellow-500',
    T: 'bg-purple-500',
    S: 'bg-green-500',
    Z: 'bg-bg-red-500',
    J: 'bg-blue-500',
    L: 'bg-orange-500'
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className="cursor-move"
    >
      <div className="flex flex-col">
        {piece.shape.map((row, i) => (
          <div key={i} className="flex">
            {row.map((cell, j) => (
              cell ? (
                <div
                  key={j}
                  className={`w-8 h-8 border border-gray-300 ${colors[piece.type]}`}
                />
              ) : null
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

