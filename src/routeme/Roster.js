import React from "react";
import { Switch, Route } from "react-router-dom";
import FullRoster from "./FullRoster";
import Player from "./Player";

const Roster = () => (
  <div>
    <h2>Roster !!</h2>
    <Switch>
      <Route exact path="/roster" component={FullRoster} />
      <Route path="/roster/:number" component={Player} />
    </Switch>
  </div>
);

export default Roster;
