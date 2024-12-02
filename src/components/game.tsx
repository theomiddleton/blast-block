'use client'

import { useState, useEffect } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import type { GameState, Piece } from '@/types/game'
import { Board } from '@/components/board'
import { PieceSelection } from '@/components/piece-selection'
import { initializeGame, placePiece } from '@/actions/game-actions'


export function Game() {
  const [gameState, setGameState] = useState<GameState | null>(null)

  useEffect(() => {
    async function initGame() {
      const initialState = await initializeGame()
      setGameState(initialState)
    }
    initGame()
  }, [])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.data.current && over.id.toString().startsWith('cell-')) {
      const piece = active.data.current as Piece
      const [row, col] = over.id.toString().split('-').slice(1).map(Number)

      if (gameState) {
        const newState = await placePiece(gameState, piece, row, col)
        setGameState(newState)
      }
    }
  }

  const handlePieceSelect = (piece: Piece) => {
    // This function is no longer needed for drag and drop, but you can keep it if you want to implement click-to-select functionality
  }

  const handleRestart = async () => {
    const newState = await initializeGame()
    setGameState(newState)
  }

  if (!gameState) {
    return <div>Loading...</div>
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">Blast Block</h1>
        <div className="text-xl">Score: {gameState.score}</div>
        <Board gameState={gameState} />
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
    </DndContext>
  )
}

