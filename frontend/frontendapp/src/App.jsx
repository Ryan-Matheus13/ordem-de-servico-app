import React, { useEffect, useState } from "react";
import "./App.css";

import { Outlet, Link } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [logged, setLogged] = useState();

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
