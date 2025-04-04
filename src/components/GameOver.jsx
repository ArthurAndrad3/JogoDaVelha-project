export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Fim de jogo</h2>
      {winner && <p>{winner} ganhou!</p>}
      {!winner && <p>Deu velha!</p>}
      <p>
        <button onClick={onRestart}>Jogar Denovo!</button>
      </p>
    </div>
  );
}
