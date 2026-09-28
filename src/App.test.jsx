import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

function squares() {
  return within(document.getElementById("game-board")).getAllByRole("button");
}

async function play(user, positions) {
  for (const index of positions) {
    await user.click(squares()[index]);
  }
}

describe("App", () => {
  it("marca a casa e registra a jogada no log", async () => {
    const user = userEvent.setup();
    render(<App />);

    await play(user, [0]);

    expect(squares()[0]).toHaveTextContent("X");
    expect(squares()[0]).toBeDisabled();
    expect(screen.getByText("X selected 0,0")).toBeInTheDocument();
  });

  it("anuncia o vencedor e reinicia a partida", async () => {
    const user = userEvent.setup();
    render(<App />);

    await play(user, [0, 3, 1, 4, 2]);

    expect(screen.getByText("Player 1 ganhou!")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Jogar Denovo!" }));
    expect(screen.queryByText("Fim de jogo")).not.toBeInTheDocument();
    expect(squares().every((square) => square.textContent === "")).toBe(true);
  });

  it("anuncia empate", async () => {
    const user = userEvent.setup();
    render(<App />);

    await play(user, [0, 1, 2, 4, 3, 5, 7, 6, 8]);

    expect(screen.getByText("Deu velha!")).toBeInTheDocument();
  });

  it("usa o nome editado do jogador no anúncio do vencedor", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole("button", { name: "Edit" })[0]);
    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "Arthur");
    await user.click(screen.getByRole("button", { name: "Save" }));

    await play(user, [0, 3, 1, 4, 2]);

    expect(screen.getByText("Arthur ganhou!")).toBeInTheDocument();
  });
});
