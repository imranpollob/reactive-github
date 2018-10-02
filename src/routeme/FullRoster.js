import React from "react";
import PlayerAPI from "./api.js";
import { Link } from "react-router-dom";

const FulRoster = () => {
  return (
    <div>
      <ul>
        {PlayerAPI.all().map(player => (
          <li key={player.number}>
            <Link to={`/roster/${player.number}`}>{player.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FulRoster;
