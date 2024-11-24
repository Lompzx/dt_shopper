// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { TopNavbar } from './components/TopNavbar';
import TravelRequestForm from './components/TravelRequestForm';
import TravelOptionsForm from './components/TravelOptionsForm';
import TravelHistoryForm from './components/TravelHistoryForm';

import logo from './logo.svg';

function App() {
  return (
    <Router>
      <div className="App">
        <TopNavbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solicitacao-viagem" element={<TravelRequestForm />} />
            <Route path="/opcoes-de-viagem" element={<TravelOptionsForm />} />
            <Route path="/historico-de-viagens" element={<TravelHistoryForm />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const Home: React.FC = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Desafio Técnico Dev FullStack Shopper
    </p>
    <a
      className="App-link"
      href="https://landing.shopper.com.br/"
      target="_blank"
      rel="noopener noreferrer"
    >
    Shopper
    </a>
  </header>
);

export default App;
