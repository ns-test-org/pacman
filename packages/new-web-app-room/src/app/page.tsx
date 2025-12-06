'use client';

import { useEffect, useState, useCallback } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_PACMAN = { x: 10, y: 10 };
const INITIAL_GHOSTS = [
  { x: 5, y: 5, color: 'red' },
  { x: 15, y: 5, color: 'pink' },
  { x: 5, y: 15, color: 'cyan' },
  { x: 15, y: 15, color: 'orange' }
];

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function PacmanGame() {
  const [pacman, setPacman] = useState(INITIAL_PACMAN);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [ghosts, setGhosts] = useState(INITIAL_GHOSTS);
  const [dots, setDots] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Initialize dots
  useEffect(() => {
    const initialDots = new Set<string>();
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        initialDots.add(`${x},${y}`);
      }
    }
    setDots(initialDots);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver || gameWon) return;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
          setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, gameWon]);

  // Move Pacman
  useEffect(() => {
    if (gameOver || gameWon) return;

    const interval = setInterval(() => {
      setPacman(prev => {
        let newX = prev.x;
        let newY = prev.y;

        switch (direction) {
          case 'UP':
            newY = (prev.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'DOWN':
            newY = (prev.y + 1) % GRID_SIZE;
            break;
          case 'LEFT':
            newX = (prev.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'RIGHT':
            newX = (prev.x + 1) % GRID_SIZE;
            break;
        }

        return { x: newX, y: newY };
      });
    }, 150);

    return () => clearInterval(interval);
  }, [direction, gameOver, gameWon]);

  // Move Ghosts
  useEffect(() => {
    if (gameOver || gameWon) return;

    const interval = setInterval(() => {
      setGhosts(prev => prev.map(ghost => {
        const directions: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
        const randomDir = directions[Math.floor(Math.random() * directions.length)];
        
        let newX = ghost.x;
        let newY = ghost.y;

        switch (randomDir) {
          case 'UP':
            newY = (ghost.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'DOWN':
            newY = (ghost.y + 1) % GRID_SIZE;
            break;
          case 'LEFT':
            newX = (ghost.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'RIGHT':
            newX = (ghost.x + 1) % GRID_SIZE;
            break;
        }

        return { ...ghost, x: newX, y: newY };
      }));
    }, 300);

    return () => clearInterval(interval);
  }, [gameOver, gameWon]);

  // Check collisions and eat dots
  useEffect(() => {
    const pacmanKey = `${pacman.x},${pacman.y}`;
    
    // Eat dot
    if (dots.has(pacmanKey)) {
      setDots(prev => {
        const newDots = new Set(prev);
        newDots.delete(pacmanKey);
        return newDots;
      });
      setScore(prev => prev + 10);
    }

    // Check win condition
    if (dots.size === 1 && dots.has(pacmanKey)) {
      setGameWon(true);
    }

    // Check ghost collision
    const collision = ghosts.some(ghost => ghost.x === pacman.x && ghost.y === pacman.y);
    if (collision) {
      setGameOver(true);
    }
  }, [pacman, ghosts, dots]);

  const resetGame = () => {
    setPacman(INITIAL_PACMAN);
    setDirection('RIGHT');
    setGhosts(INITIAL_GHOSTS);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    
    const initialDots = new Set<string>();
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        initialDots.add(`${x},${y}`);
      }
    }
    setDots(initialDots);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="mb-4 text-white text-2xl font-bold">
        Score: {score}
      </div>

      <div 
        className="relative bg-blue-900 border-4 border-blue-600"
        style={{ 
          width: GRID_SIZE * CELL_SIZE, 
          height: GRID_SIZE * CELL_SIZE 
        }}
      >
        {/* Dots */}
        {Array.from(dots).map(key => {
          const [x, y] = key.split(',').map(Number);
          return (
            <div
              key={key}
              className="absolute bg-yellow-300 rounded-full"
              style={{
                left: x * CELL_SIZE + CELL_SIZE / 2 - 2,
                top: y * CELL_SIZE + CELL_SIZE / 2 - 2,
                width: 4,
                height: 4
              }}
            />
          );
        })}

        {/* Pacman */}
        <div
          className="absolute bg-yellow-400 rounded-full transition-all duration-150"
          style={{
            left: pacman.x * CELL_SIZE,
            top: pacman.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2
          }}
        />

        {/* Ghosts */}
        {ghosts.map((ghost, i) => (
          <div
            key={i}
            className="absolute rounded-t-full transition-all duration-300"
            style={{
              left: ghost.x * CELL_SIZE,
              top: ghost.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              backgroundColor: ghost.color
            }}
          />
        ))}

        {/* Game Over Overlay */}
        {(gameOver || gameWon) && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center">
            <div className="text-white text-3xl font-bold mb-4">
              {gameWon ? '🎉 You Won!' : '💀 Game Over!'}
            </div>
            <div className="text-white text-xl mb-4">
              Final Score: {score}
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-white text-center">
        <div className="text-sm">Use Arrow Keys or WASD to move</div>
        <div className="text-xs text-gray-400 mt-2">Eat all dots and avoid the ghosts!</div>
      </div>
    </div>
  );
}

