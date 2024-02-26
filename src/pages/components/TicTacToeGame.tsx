import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';

const TicTacToeGame  = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [boarder, setnewBoard] = useState<string[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<string>('X');
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
  }, [board]);

  const makeMove = async (index: number) => {
    if (board[index] || gameOver || currentPlayer !== 'X') {
      return;
    }
  
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
  
    const response = await fetch('http://localhost:4000/api/botMove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ board: newBoard, Turn: currentPlayer }),
    });
  
    const { index: botIndex } = await response.json();
    if (botIndex !== undefined && !gameOver) {
      newBoard[botIndex] = 'O';
      setBoard(newBoard);
      setnewBoard(newBoard)
      setGameOver(checkGameOver(newBoard));
      setCurrentPlayer('X');
    }
  
    // ตรวจสอบค่าใหม่ของ board ทันทีหลังจาก setBoard เสร็จสิ้น
    console.log("s",newBoard);
  };
  

  const checkGameOver = (currentBoard: string[]): boolean => {
    return !!calculateWinner(currentBoard) || currentBoard.every(square => square);
  };

  const calculateWinner = (board: string[]): string | null => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winning player (X or O)
      }
    }

    return null; // Return null if there's no winner
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every(square => square)) {
    status = 'Draw!';
  }
  // else {
  //   status = `Next player: ${currentPlayer}`;
  // }

  return (
    <div className="container">
      <h1>Tic-Tac-Toe (XO Game)</h1>
      <div className="status">{status}</div>
      <GameBoard board={board} onClick={makeMove} />
    </div>
  );
};

export default TicTacToeGame ;
