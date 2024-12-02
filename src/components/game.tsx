'use client'

import { useState, useEffect } from 'react'
import type { GameState } from '@/types/game'
import { Board } from '@/components/board'
import { PieceSelection } from '@/components/piece-selection'
import { initializeGame, placePiece } from '@/actions/game-actions'

export function Game() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null)

  useEffect(() => {
    async function initGame() {
      const initialState = await initializeGame()
      setGameState(initialState)
    }
    initGame()
  }, [])

  const handlePieceSelect = (index: number) => {
    setSelectedPieceIndex(index)
  }

  const handleCellClick = async (row: number, col: number) => {
    if (gameState && selectedPieceIndex !== null) {
      const newState = await placePiece(gameState, selectedPieceIndex, row, col)
      setGameState(newState)
      setSelectedPieceIndex(null)
    }
  }

  const handleRestart = async () => {
    const newState = await initializeGame()
    setGameState(newState)
    setSelectedPieceIndex(null)
  }

  if (!gameState) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-3xl font-bold">Blast Block</h1>
      <div className="text-xl">Score: {gameState.score}</div>
      <Board gameState={gameState} onCellClick={handleCellClick} />
      <PieceSelection pieces={gameState.availablePieces} onPieceSelect={handlePieceSelect} />
      {gameState.gameOver && (
        <div className="text-2xl font-bold text-red-500">Game Over!</div>
      )}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleRestart}
      >
        Restart Game
      </button>
    </div>
  )
}

