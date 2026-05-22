import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function buildGameBoard(gameTurns) {
  const gameBoard = initialGameBoard.map((array) => [...array]);
  for (const turn of gameTurns) {
    const { square, player } = turn;
    gameBoard[square.row][square.col] = player;
  }
  return gameBoard;
}

function getWinningSymbol(gameBoard) {
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      return firstSquareSymbol;
    }
  }
  return null;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  //const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurn, setGameTurn] = useState([]);

  const gameBoard = buildGameBoard(gameTurn);
  const winningSymbol = getWinningSymbol(gameBoard);
  const winner = winningSymbol ? players[winningSymbol] : undefined;
  const hasDraw = gameTurn.length === 9 && !winningSymbol;

  function HandleSelectSquare(rowIndex, colIndex) {
    if (winner || hasDraw) {
      return;
    }

    setGameTurn((prevTurns) => {
      const prevBoard = buildGameBoard(prevTurns);
      const prevWinningSymbol = getWinningSymbol(prevBoard);

      if (prevWinningSymbol || prevTurns.length >= 9) {
        return prevTurns;
      }

      const squareAlreadySelected = prevTurns.some(
        (turn) =>
          turn.square.row === rowIndex && turn.square.col === colIndex,
      );

      if (squareAlreadySelected) {
        return prevTurns;
      }

      const currentPlayer = deriveActivePlayer(prevTurns);
      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
    });
  }
  function HandleRestart() {
    setGameTurn([]);
  }
  function HandlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="player 1"
            symbol="X"
            isActive={deriveActivePlayer(gameTurn) === "X"}
            onChangeName={HandlePlayerNameChange}
          />
          <Player
            name="player 2"
            symbol="O"
            isActive={deriveActivePlayer(gameTurn) === "O"}
            onChangeName={HandlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={HandleRestart}></GameOver>
        )}
        <GameBoard selected={HandleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
