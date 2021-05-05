import Navigation from './components/Navigation';
import Inventory from './containers/Inventory';
import RegisterTransaction from './containers/RegisterTransaction';

import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation/>
        <Route path="/" exact component={Inventory} />
        <Route path="/registrarTransaccion" component={RegisterTransaction} />
      </BrowserRouter>
    </div>
  );
}

export default App;
