import './App.css';

import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Teste de navegacao</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/cadastrar-servico">Cadastro</Link>
        <Link to="/login">login</Link>
        <Link to="/register">registro</Link>
        <Link to="/user">usuario</Link>
      </div>
      <Outlet/>
    </div>
  );
}

export default App;
