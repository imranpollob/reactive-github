import React from "react";
import PlayerAPI from "./api.js";
import { Link } from "react-router-dom";

const Player = props => {
  const player = PlayerAPI.get(props.match.params.number);
  if (!player) {
    return <div>Sorry, but the player was not found</div>;
  }
  return (
    <div>
      <h3>Player Profile</h3>
      <p>Name: {player.name}</p>
      <p>Number: {player.number}</p>
      <p>Position: {player.position}</p>

      <Link to="/roster">Back</Link>
    </div>
  );
};

export default Player;
