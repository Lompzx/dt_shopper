import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import './TopNavbar.css';

export const TopNavbar: React.FC = () => {
  return (
    <nav className="top-navbar">
      <img src={logo} className="App-logo" alt="logo" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/solicitacao-viagem">Solicitação de Viagem</Link>
        </li>
        <li>
          <Link to="/historico-de-viagens">Histórico de Viagens</Link>
        </li>
      </ul>
    </nav>
  );
};

