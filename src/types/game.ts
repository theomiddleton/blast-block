export type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L' | 'I_VERT' | 'T_INV' | 'S_VERT' | 'Z_VERT' | 'J_INV' | 'L_INV' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'SQUARE' | 'L_SMALL' | 'T_SMALL'

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

