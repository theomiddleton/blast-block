'use client'

import { useState, useEffect } from 'react'
import { DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import type { GameState, Piece } from '@/types/game'
import { Board } from '@/components/board'
import { PieceSelection } from '@/components/piece-selection'
import { initializeGame, placePiece, canPlacePiece } from '@/actions/game-actions'

export function Game() {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [previewPiece, setPreviewPiece] = useState<Piece | null>(null)
  const [previewPosition, setPreviewPosition] = useState<{ row: number, col: number } | null>(null)
  const [canPlace, setCanPlace] = useState<boolean>(false)
  const [highScore, setHighScore] = useState<number>(0)

  useEffect(() => {
    async function initGame() {
      const initialState = await initializeGame()
      setGameState(initialState)
      setHighScore(initialState.highScore)
    }
    initGame()
  }, [])

  useEffect(() => {
    async function checkPlacement() {
      if (gameState && previewPiece && previewPosition) {
        const isValid = await canPlacePiece(gameState.board, previewPiece, previewPosition.row, previewPosition.col)
        setCanPlace(isValid)
      } else {
        setCanPlace(false)
      }
    }
    checkPlacement()
  }, [gameState, previewPiece, previewPosition])

  useEffect(() => {
    if (gameState && gameState.gameOver) {
      if (gameState.score > highScore) {
        setHighScore(gameState.score)
      }
      alert(`Game Over! Your score: ${gameState.score}`)
      handleRestart()
    }
  }, [gameState, highScore])

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (over && active.data.current && over.id.toString().startsWith('cell-')) {
      const piece = active.data.current as Piece
      const [row, col] = over.id.toString().split('-').slice(1).map(Number)

      setPreviewPiece(piece)
      setPreviewPosition({ row, col })
    } else {
      setPreviewPiece(null)
      setPreviewPosition(null)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.data.current && over.id.toString().startsWith('cell-')) {
      const piece = active.data.current as Piece
      const [row, col] = over.id.toString().split('-').slice(1).map(Number)

      if (gameState && canPlace) {
        const newState = await placePiece(gameState, piece, row, col)
        setGameState(newState)
      }
    }

    setPreviewPiece(null)
    setPreviewPosition(null)
  }

  const handleRestart = async () => {
    const newState = await initializeGame()
    newState.highScore = highScore
    setGameState(newState)
  }

  if (!gameState) {
    return <div>Loading...</div>
  }

  return (
    <DndContext onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">Blast Block</h1>
        <div className="text-xl">Score: {gameState.score}</div>
        <div className="text-xl">High Score: {highScore}</div>
        <Board 
          gameState={gameState} 
          previewPiece={previewPiece} 
          previewPosition={previewPosition}
          canPlace={canPlace}
        />
        <PieceSelection pieces={gameState.availablePieces} />
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

