import React, { useEffect } from "react";

import axios from 'axios';

function Home() {
  useEffect(() => {
    listar_funcionarios()

  }, []);

  const listar_funcionarios = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/v1/funcionarios",
    }).then(function (response) {
      console.log(response.data)
    });

    
  };

  return <div>Teste 1</div>;
}

export default Home;
