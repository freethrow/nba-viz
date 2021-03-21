
import { Container } from 'react-bootstrap'
import { ReactQueryDevtools } from 'react-query/devtools'
import Home from './pages/Home';
import Selector from './pages/Selector';
import Scatter from './pages/Scatter';
import Horizontal from './pages/Horizontal'



import {BrowserRouter as Router, Route} from 'react-router-dom'

import useLocalStorage from './utils/useLocalStorage'
import {QueryClient, QueryClientProvider} from 'react-query';



import './App.css';


import {useState} from 'react'

// components
import Header from './components/Header'
import Footer from './components/Footer'

// players context

import {PlayersContext} from './PlayersContext'
import {DatasetContext} from './DatasetContext'





function App() {

  const queryClient = new QueryClient()

  const [players, setPlayers] = useLocalStorage('players',[]);
  const [available, setAvailable] = useLocalStorage('available',[])
  const [dataset, setDataset] = useLocalStorage('dataset',[])

  

  return (
    
      <QueryClientProvider client={queryClient}>
        <DatasetContext.Provider value={{dataset, setDataset}}>
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
        </DatasetContext.Provider>
       
      </QueryClientProvider>
    
  );
}

export default App;
