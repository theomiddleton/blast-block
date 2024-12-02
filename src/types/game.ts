export type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'

export type Piece = {
  id: string
  type: PieceType
  shape: boolean[][]
}

export type GameState = {
  board: (PieceType | null)[][]
  score: number
  availablePieces: Piece[]
  gameOver: boolean
  highScore: number
}

