import type { PieceType } from '@/types/game'

export const PIECES: { [key in PieceType]: boolean[][] } = {
  I: [[true, true, true, true]],
  O: [[true, true], [true, true]],
  T: [[true, true, true], [false, true, false]],
  S: [[false, true, true], [true, true, false]],
  Z: [[true, true, false], [false, true, true]],
  J: [[true, false, false], [true, true, true]],
  L: [[false, false, true], [true, true, true]]
}

export const BOARD_SIZE = 8
export const PIECES_PER_TURN = 3

