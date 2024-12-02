export type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'

export type Piece = {
  type: PieceType
  shape: boolean[][]
}

export type GameState = {
  board: (PieceType | null)[][]
  score: number
  availablePieces: Piece[]
  gameOver: boolean
}

