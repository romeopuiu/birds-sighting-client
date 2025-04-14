import React from "react";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import { AddNewSighting } from "./components/sighting/AddNewSighting";
import { AddNewBird } from "./components/bird/AddNewBird";
import { BirdList } from "./components/bird/BirdList";
import { SightingList } from "./components/sighting/SightingList";
import { BirdSearch } from "./components/bird/BirdSearch";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Switch>
        <Route exact path="/">
            <Redirect to="/birds" />
          </Route>
          <Route path="/birds/:birdId/sightings/save">
            <AddNewSighting />
          </Route>
          <Route path="/birds/save">
            <AddNewBird />
          </Route>
          <Route path="/birds" exact>
            <BirdList />
          </Route>
          <Route path="/sightings">
            <SightingList />
          </Route>
          <Route path="/search-by-name/sightings">
            <BirdSearch />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
