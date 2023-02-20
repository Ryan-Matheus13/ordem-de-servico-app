import React, { useEffect, useState } from "react";

import axios from "axios";
import Modal from "@mui/material/Modal";
import { Player } from "@lottiefiles/react-lottie-player";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DrawerCustom from "../../components/DrawerCustom";
import TableCustom from "../../components/TableCustom";
import "../../App.css";
import InputCustom from "../../components/InputCustom";
import { axiosInstance } from "../../axios";

function Pagamentos() {
  const [headers, setHeaders] = useState([
    { value: "ID", tamanho: "5%" },
    { value: "Tipo", tamanho: "80%" },
    { value: "Criado em", tamanho: "15%" },
  ]);
  const [rows, setRows] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [senhaValidada, setSenhaValidada] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [message, setMessage] = useState("");

  const [id, setId] = useState("");
  const [pagamento, setPagamento] = useState("");

  useEffect(() => {
    const fecthData = async () => {
      await listar_pagamentos();
    };

    fecthData();
  }, []);

  const listar_pagamentos = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/v1/formas-de-pagamento",
    }).then(function (response) {
      const rowsArray = [];

      response.data.map((item, index) => {
        let array = [];

        array.push(item.id);
        array.push(item.pagamento);

        let CurrentDate = item.data_do_registro;
        let date_new = new Date(CurrentDate);
        let data = new Intl.DateTimeFormat("pt-BR").format(date_new);

        array.push(data);

        rowsArray.push(array);
        setLoading(false);
        setRows(rowsArray);
      });

    });
  };

  const cadastrar_pagamento = async () => {
    const body = {
      pagamento: pagamento,
      resgitrado_por: 
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

    setLoadingModal(true);
    axiosInstance
      .post("http://127.0.0.1:8000/api-auth/v1/register", JSON.stringify(body))
      .then(function (response) {
        window.location.reload();
        window.alert("Atendente adicionado com sucesso!");
      })
      .catch(function (error) {
        setLoadingModal(false);
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

  const ver_pagamento = async (id) => {
    setExcluindo(false);
    setDisabled(true);
    setModalShow(true);
    setLoadingModal(true);

    setMessage("");

    axios
      .get(`http://127.0.0.1:8000/api/v1/funcionario/${id}`)
      .then(function (response) {
        const resp = response.data;

        setId(resp.id);
        setFirstName(resp.first_name);
        setLastName(resp.last_name);
        setEmail(resp.email);
        setUserName(resp.username);

        setTimeout(() => {
          setLoadingModal(false);
        }, 500);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editar_pagamento = async () => {
    setLoadingModal(true);
    const body = {
      username: userName,
      email: email,
      first_name: firstName,
      last_name: lastName,
    };

    axios
      .put(`http://127.0.0.1:8000/api/v1/funcionario/${id}`, body)
      .then(function (response) {
        window.location.reload();
        window.alert("Atendente editado com sucesso!");
      })
      .catch(function (error) {
        setLoadingModal(false);
        if (error.response.data.email[0]) {
          setSenhaValidada(true);
          setMessage("Email ja cadastrado");
          return false;
        }
      });
  };

  const excluir_pagamento = async () => {
    setLoadingModal(true);

    axios
      .delete(`http://127.0.0.1:8000/api/v1/funcionario/${id}`)
      .then(function (response) {
        window.location.reload();
        window.alert("Atendente excluido com sucesso!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <DrawerCustom></DrawerCustom>
      <div className="dash-container">
        <div className="dash-header">
          <h2>Atendentes Cadastrados</h2>
          <button
            onClick={() => {
              setModalShow(true);
              setLoadingModal(false);
            }}
          >
            Adicionar
          </button>
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
            <TableCustom
              headerData={headers}
              rowsData={rows}
              showRow={ver_pagamento}
            ></TableCustom>
          )}
        </div>
      </div>
      <div className="modal-container">
        <Modal keepMounted open={modalShow} onClose={() => setModalShow(false)}>
          <div className={loading ? "modal-content-loading" : "modal-content"}>
            {!loadingModal && !excluindo && (
              <>
                <h1>{id ? "Dados do Atendente" : "Cadastro de Atendente"}</h1>
                <div className="modal-inside-content">
                  <div className="row-horizontal">
                    <InputCustom
                      change={setFirstName}
                      title={"Primeiro Nome*"}
                      type={"text"}
                      value={firstName}
                      disabled={disabled}
                    />
                    <InputCustom
                      change={setLastName}
                      title={"Ultimo Nome*"}
                      type={"text"}
                      value={lastName}
                      disabled={disabled}
                    />
                  </div>
                  <InputCustom
                    change={setEmail}
                    title={"Email*"}
                    type={"email"}
                    value={email}
                    disabled={disabled}
                  />
                  {!id && (
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
                  )}
                  <InputCustom
                    change={setUserName}
                    title={"Username*"}
                    type={"text"}
                    value={userName}
                    disabled={disabled}
                  />
                  {senhaValidada && (
                    <div className="error-message">
                      <span>{message}</span>
                    </div>
                  )}
                  {!id && (
                    <div
                      style={{ marginTop: "1rem" }}
                      className="row-horizontal"
                    >
                      <button
                        className="btn"
                        style={{
                          margin: 0,
                          marginBottom: "1rem",
                          width: "100%",
                        }}
                        onClick={cadastrar_pagamento}
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
                  )}
                  {id && (
                    <div
                      style={{ marginTop: "1rem" }}
                      className="row-horizontal"
                    >
                      {disabled && (
                        <>
                          <button
                            className="btn"
                            style={{
                              margin: 0,
                              marginBottom: "1rem",
                              width: "100%",
                            }}
                            onClick={() => {
                              setDisabled(false);
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="btn"
                            style={{
                              margin: 0,
                              marginBottom: "1rem",
                              width: "100%",
                              backgroundColor: "transparent",
                              borderWidth: 1,
                              borderColor: "#525252",
                              borderStyle: "solid"
                            }}
                            onClick={() => {
                              setLoadingModal(true)
                              setExcluindo(true)
                              setTimeout(() => {
                                setLoadingModal(false)
                              }, 500);
                            }}
                          >
                            Excluir
                          </button>
                          <button
                            className="btn"
                            style={{
                              margin: 0,
                              marginBottom: "1rem",
                              width: "100%",
                              backgroundColor: "#db4c4c",
                            }}
                            onClick={() => setModalShow(false)}
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                      {!disabled && (
                        <>
                          <button
                            className="btn"
                            style={{
                              margin: 0,
                              marginBottom: "1rem",
                              width: "100%",
                            }}
                            onClick={editar_pagamento}
                          >
                            Salvar
                          </button>
                          <button
                            className="btn"
                            style={{
                              margin: 0,
                              marginBottom: "1rem",
                              width: "100%",
                              backgroundColor: "#db4c4c",
                            }}
                            onClick={() => {
                              setDisabled(true);
                            }}
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            {!loadingModal && excluindo && (
              <>
                <h1>Excluir Atendente</h1>
                <div className="modal-inside-content">
                  <h3 style={{textAlign: "center", color: "white"}}>Deseja excluir o funcionario "{firstName}"?</h3>
                  <div
                      style={{ marginTop: "1rem" }}
                      className="row-horizontal"
                    >
                      <button
                        className="btn"
                        style={{
                          margin: 0,
                          marginBottom: "1rem",
                          width: "100%",
                        }}
                        onClick={excluir_pagamento}
                      >
                        Confirmar
                      </button>
                      <button
                        className="btn"
                        style={{
                          margin: 0,
                          marginBottom: "1rem",
                          width: "100%",
                          backgroundColor: "#db4c4c",
                        }}
                        onClick={() => setExcluindo(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                </div>
              </>
            )}

            {loadingModal && (
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

export default Pagamentos;
