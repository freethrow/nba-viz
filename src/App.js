
import { Container } from 'react-bootstrap'
import Home from './pages/Home';
import Selector from './pages/Selector';
import Scatter from './pages/Scatter';
import Horizontal from './pages/Horizontal'


import {BrowserRouter as Router, Route} from 'react-router-dom'

import useLocalStorage from './utils/useLocalStorage'

import './App.css';


import {useState} from 'react'

// components
import Header from './components/Header'
import Footer from './components/Footer'

// players context

import {PlayersContext} from './PlayersContext'


// to be removed!

const initialPlayers = [
  {
    index: 16,
    PLAYER_NAME: "Andrew Wiggins",
    TEAM_ABBREVIATION: "GSW",
    AGE: 26.0,
    MIN: 32.2,
    FG_PCT: 0.463,
    STL: 0.8,
    BLK: 1.1,
    PTS: 17.0,
    PLUS_MINUS: -1.7,
    REB: 4.5,
  },
  {
    index: 18,
    PLAYER_NAME: "Anthony Davis",
    TEAM_ABBREVIATION: "LAL",
    AGE: 27.0,
    MIN: 32.8,
    FG_PCT: 0.533,
    STL: 1.3,
    BLK: 1.8,
    PTS: 22.5,
    PLUS_MINUS: 5.9,
    REB: 8.4,
  },
  {
    index: 26,
    PLAYER_NAME: "Bam Adebayo",
    TEAM_ABBREVIATION: "MIA",
    AGE: 23.0,
    MIN: 33.9,
    FG_PCT: 0.563,
    STL: 0.9,
    BLK: 1.0,
    PTS: 19.2,
    PLUS_MINUS: -0.2,
    REB: 9.5,
  },
  {
    index: 28,
    PLAYER_NAME: "Ben Simmons",
    TEAM_ABBREVIATION: "PHI",
    AGE: 24.0,
    MIN: 33.9,
    FG_PCT: 0.578,
    STL: 1.6,
    BLK: 0.7,
    PTS: 16.1,
    PLUS_MINUS: 5.5,
    REB: 7.9,
  },
  {
    index: 30,
    PLAYER_NAME: "Blake Griffin",
    TEAM_ABBREVIATION: "DET",
    AGE: 31.0,
    MIN: 31.3,
    FG_PCT: 0.365,
    STL: 0.7,
    BLK: 0.1,
    PTS: 12.3,
    PLUS_MINUS: -3.6,
    REB: 5.2,
  },
  {
    index: 34,
    PLAYER_NAME: "Bojan Bogdanovic",
    TEAM_ABBREVIATION: "UTA",
    AGE: 31.0,
    MIN: 30.6,
    FG_PCT: 0.432,
    STL: 0.5,
    BLK: 0.1,
    PTS: 15.7,
    PLUS_MINUS: 5.8,
    REB: 3.9,
  },
  {
    index: 37,
    PLAYER_NAME: "Bradley Beal",
    TEAM_ABBREVIATION: "WAS",
    AGE: 27.0,
    MIN: 35.7,
    FG_PCT: 0.482,
    STL: 1.4,
    BLK: 0.4,
    PTS: 32.9,
    PLUS_MINUS: -3.1,
    REB: 5.4,
  },
];



function App() {

  const [players, setPlayers] = useLocalStorage('players',[]);

  return (
    <PlayersContext.Provider value={{players, setPlayers}}>
      <Router>
        <Header/>
          <main className="py-3">
            <Container fluid>
              <Route path="/" exact component={Home} />
              <Route path="/select" component={Selector} />
              <Route path="/scatter" component={Scatter} />
              <Route path="/horizontal" component={Horizontal} />
            </Container>
          </main>   
        <Footer />
      </Router>
    </PlayersContext.Provider>
  );
}

export default App;
