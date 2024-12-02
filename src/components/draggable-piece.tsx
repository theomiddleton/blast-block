import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Piece } from '@/types/game'
import { colors } from '@/constants/shapes' 

interface DraggablePieceProps {
  piece: Piece
  id: string
}

export function DraggablePiece({ piece, id }: DraggablePieceProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="cursor-move">
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
  )
}
