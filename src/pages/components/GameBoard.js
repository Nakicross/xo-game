// components/GameBoard.js

import React from 'react';
import PropTypes from 'prop-types';

const GameBoard = ({ board, onClick }) => {
  return (
    <div className="game-board">
      {board.map((value, index) => (
        <div key={index} className="square" onClick={() => onClick(index)}>
          {value}
        </div>
      ))}
    </div>
  );
};

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired
};

export default GameBoard;
