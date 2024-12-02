import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Piece } from '@/types/game'

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

