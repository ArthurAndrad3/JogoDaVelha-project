export default function GameBoard({ selected, board }) {
  //const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //function HandleSelected(rowIndex, colIndex) {
  //((prevGameBoard) => {
  // const updatedGameBoard = [
  //  ...prevGameBoard.map((innerArray) => [...innerArray]),
  // ];
  // updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  // return updatedGameBoard;
  // });
  // selected();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => selected(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
