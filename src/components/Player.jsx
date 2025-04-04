import { useState } from "react";
export default function Player({ name, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(name);

  const [isEdinting, setIsEditing] = useState(false);

  function HandleClick() {
    setIsEditing((editing) => !editing);
    if (isEdinting) {
      onChangeName(symbol, playerName);
    }
  }
  function HandleChange(event) {
    setPlayerName(event.target.value);
  }

  let estado = "Edit";
  let editplayerName = <span className="player-name">{playerName}</span>;
  if (isEdinting) {
    editplayerName = (
      <input type="text" required value={playerName} onChange={HandleChange} />
    );
    estado = "Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <spam className="player">
        {editplayerName}
        <span className="player-symbol">{symbol}</span>
      </spam>
      <button onClick={HandleClick}>{estado}</button>
    </li>
  );
}
