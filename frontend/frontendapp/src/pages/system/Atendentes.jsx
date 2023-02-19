import React, { useEffect, useState } from "react";

import axios from "axios";
import Modal from "@mui/material/Modal";
import { Player } from "@lottiefiles/react-lottie-player";

import DrawerCustom from "../../components/DrawerCustom";
import TableCustom from "../../components/TableCustom";
import "../../App.css";
import InputCustom from "../../components/InputCustom";
import { axiosInstance } from "../../axios";

function Atendentes() {
  const [headers, setHeaders] = useState([
    { value: "ID", tamanho: "5%" },
    { value: "Nome", tamanho: "30%" },
    { value: "Sobrenome", tamanho: "30%" },
    { value: "Email", tamanho: "20%" },
    { value: "Criado em", tamanho: "15%" },
  ]);
  const [rows, setRows] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [senhaValidada, setSenhaValidada] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    const fecthData = async () => {
      await listar_atendentes();
    };

    fecthData();
  }, []);

  const listar_atendentes = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/v1/atendentes",
    }).then(function (response) {
      const rowsArray = [];

      response.data.map((item, index) => {
        let array = [];

        array.push(item.id);
        array.push(item.first_name);
        array.push(item.last_name);
        array.push(item.email);

        let CurrentDate = item.created_at;
        let date_new = new Date(CurrentDate);
        let data = new Intl.DateTimeFormat("pt-BR").format(date_new);

        array.push(data);

        rowsArray.push(array);
      });

      setRows(rowsArray);
      setLoading(false);
    });
  };

  const cadastrar_atendente = async () => {
    const body = {
      username: userName,
      email: email,
      first_name: firstName,
      last_name: lastName,
      cargo: "Atendente",
      password: password,
      password2: password2,
    };

    for (let attr in body) {
      if (body[attr] === "") {
        setSenhaValidada(true);
        setMessage("Campo(s) obrigatório(s) não preenchido(s)");
        return false;
      }
    }

    if (password !== password2) {
      setSenhaValidada(true);
      setMessage("As senhas não conferem");
      return false;
    }

    setMessage("");

    setLoading(true);
    axiosInstance
      .post("http://127.0.0.1:8000/api-auth/v1/register", JSON.stringify(body))
      .then(function (response) {
        window.location.reload();
        window.alert("Atendente adicionado com sucesso!");
      })
      .catch(function (error) {
        setLoading(false);
        if (error.response.data.email[0]) {
          setSenhaValidada(true);
          setMessage("Email ja cadastrado");
          return false;
        }
      });

    setFirstName("");
    setLastName("");
    setEmail("");
    setUserName("");
    setPassword("");
    setPassword2("");
  };

  return (
    <>
      <DrawerCustom></DrawerCustom>
      <div className="dash-container">
        <div className="dash-header">
          <h2>Atendentes Cadastrados</h2>
          <button onClick={() => setModalShow(true)}>Adicionar</button>
        </div>
        <div className="dash-content">
          {loading && (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Player
                src={require("../../assets/loading.json")}
                className="player"
                loop
                autoplay
              />
            </div>
          )}
          {!loading && rows.length >= 1 && (
            <TableCustom headerData={headers} rowsData={rows}></TableCustom>
          )}
        </div>
      </div>
      <div className="modal-container">
        <Modal keepMounted open={modalShow} onClose={() => setModalShow(false)}>
          <div className={loading ? "modal-content-loading" : "modal-content"}>
            {!loading && (
              <>
                <h1>Cadastro de Atendente</h1>
                <div className="modal-inside-content">
                  <div className="row-horizontal">
                    <InputCustom
                      change={setFirstName}
                      title={"Primeiro Nome*"}
                      type={"text"}
                    />
                    <InputCustom
                      change={setLastName}
                      title={"Ultimo Nome*"}
                      type={"text"}
                    />
                  </div>
                  <InputCustom
                    change={setEmail}
                    title={"Email*"}
                    type={"email"}
                  />
                  <div className="row-horizontal">
                    <InputCustom
                      change={setPassword}
                      title={"Senha*"}
                      type={"password"}
                    />
                    <InputCustom
                      change={setPassword2}
                      title={"Confirme a senha*"}
                      type={"password"}
                    />
                  </div>
                  <InputCustom
                    change={setUserName}
                    title={"Username*"}
                    type={"text"}
                  />
                  {senhaValidada && (
                    <div className="error-message">
                      <span>{message}</span>
                    </div>
                  )}
                  <div style={{ marginTop: "1rem" }} className="row-horizontal">
                    <button
                      className="btn"
                      style={{ margin: 0, marginBottom: "1rem", width: "100%" }}
                      onClick={cadastrar_atendente}
                    >
                      Cadastrar
                    </button>
                    <button
                      className="btn"
                      style={{
                        margin: 0,
                        marginBottom: "1rem",
                        width: "100%",
                        backgroundColor: "#db4c4c",
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </>
            )}
            {loading && (
              <Player
                src={require("../../assets/loading.json")}
                className="player"
                loop
                autoplay
              />
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Atendentes;
