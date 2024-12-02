import type { PieceType } from '@/types/game'

export const PIECES: { [key in PieceType]: boolean[][] } = {
  I: [[true, true, true, true]],
  O: [[true, true], [true, true]],
  T: [[true, true, true], [false, true, false]],
  S: [[false, true, true], [true, true, false]],
  Z: [[true, true, false], [false, true, true]],
  J: [[true, false, false], [true, true, true]],
  L: [[false, false, true], [true, true, true]],
  // New pieces
  I_VERT: [[true], [true], [true], [true]],
  T_INV: [[false, true, false], [true, true, true]],
  S_VERT: [[true, false], [true, true], [false, true]],
  Z_VERT: [[false, true], [true, true], [true, false]],
  J_INV: [[true, true, true], [false, false, true]],
  L_INV: [[true, true, true], [true, false, false]],
  // Block Blast style pieces
  SMALL: [[true]],
  MEDIUM: [[true, true]],
  LARGE: [[true, true, true]],
  SQUARE: [[true, true], [true, true]],
  L_SMALL: [[true, false], [true, true]],
  T_SMALL: [[true, true, true], [false, true, false]],
}

export const BOARD_SIZE = 8
export const PIECES_PER_TURN = 3

export const colours: { [key: string]: string } = {
  I: 'bg-cyan-500',
  O: 'bg-yellow-500',
  T: 'bg-purple-500',
  S: 'bg-green-500',
  Z: 'bg-red-500',
  J: 'bg-blue-500',
  L: 'bg-orange-500',
  I_VERT: 'bg-teal-400',
  T_INV: 'bg-indigo-600',
  S_VERT: 'bg-lime-500',
  Z_VERT: 'bg-pink-500',
  J_INV: 'bg-violet-500',
  L_INV: 'bg-amber-400',
  SMALL: 'bg-gray-500',
  MEDIUM: 'bg-emerald-500',
  LARGE: 'bg-sky-500',
  SQUARE: 'bg-rose-400',
  L_SMALL: 'bg-fuchsia-500',
  T_SMALL: 'bg-indigo-400',
}