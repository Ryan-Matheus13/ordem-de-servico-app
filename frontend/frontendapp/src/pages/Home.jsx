import React, { useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";

function Home() {

  return (
    <div>
      <NavBar></NavBar>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
