'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { Piece } from '@/types/game'
import { colours } from '@/constants/shapes'

type PieceSelectionProps = {
  pieces: Piece[]
}

export function PieceSelection({ pieces }: PieceSelectionProps) {
  return (
    <div className='flex space-x-4'>
      {pieces.map((piece, index) => (
        <DraggablePiece
          key={`piece-${piece.type}-${index}`}
          piece={piece}
          id={`piece-${piece.type}-${index}`}
        />
      ))}
    </div>
  )
}

function DraggablePiece({ piece, id }: { piece: Piece, id: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: piece,
  })

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className='cursor-move'
    >
      <div className='flex flex-col'>
        {piece.shape.map((row, i) => (
          <div key={i} className='flex'>
            {row.map((cell, j) => (
              <div
                key={j}
                className={`h-8 w-8 border border-gray-300 ${cell ? colours[piece.type] : 'bg-transparent'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
