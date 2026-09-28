import {
  deriveActivePlayer,
  buildGameBoard,
  getWinningSymbol,
} from "./game-logic";

const turn = (row, col, player) => ({ square: { row, col }, player });

describe("deriveActivePlayer", () => {
  it("começa com X", () => {
    expect(deriveActivePlayer([])).toBe("X");
  });

  it("alterna para O depois de X jogar", () => {
    expect(deriveActivePlayer([turn(0, 0, "X")])).toBe("O");
  });

  it("volta para X depois de O jogar", () => {
    expect(deriveActivePlayer([turn(1, 1, "O"), turn(0, 0, "X")])).toBe("X");
  });
});

describe("buildGameBoard", () => {
  it("monta o tabuleiro a partir das jogadas", () => {
    const board = buildGameBoard([turn(1, 1, "O"), turn(0, 0, "X")]);
    expect(board).toEqual([
      ["X", null, null],
      [null, "O", null],
      [null, null, null],
    ]);
  });

  it("não altera o tabuleiro inicial entre chamadas", () => {
    buildGameBoard([turn(2, 2, "X")]);
    expect(buildGameBoard([])[2][2]).toBeNull();
  });
});

describe("getWinningSymbol", () => {
  it("retorna null sem vencedor", () => {
    expect(getWinningSymbol(buildGameBoard([]))).toBeNull();
  });

  it("detecta vitória em linha", () => {
    const board = [
      ["X", "X", "X"],
      ["O", "O", null],
      [null, null, null],
    ];
    expect(getWinningSymbol(board)).toBe("X");
  });

  it("detecta vitória em diagonal", () => {
    const board = [
      ["O", "X", "X"],
      [null, "O", null],
      ["X", null, "O"],
    ];
    expect(getWinningSymbol(board)).toBe("O");
  });
});
