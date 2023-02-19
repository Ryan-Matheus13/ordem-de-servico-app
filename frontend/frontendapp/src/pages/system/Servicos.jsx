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

function Servicos() {
  const [headers, setHeaders] = useState([
    { value: "ID", tamanho: "5%" },
    { value: "Serviço", tamanho: "35%" },
    { value: "Valor", tamanho: "10%" },
    { value: "Registrado por", tamanho: "35%" },
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

  const axiosPrivateInstance = useAxiosPrivate();

  const [id, setId] = useState("");
  const [servico, setServico] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    const fecthData = async () => {
      await listar_servicos();
    };

    fecthData();
  }, []);

  const getUser = async () => {
    const { data } = await axiosPrivateInstance.get("user");

    return data.id;
  };

  const listar_servicos = async () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/servicos")
      .then(function (response) {
        const rowsArray = [];

        response.data.map((item, index) => {
          let array = [];

          array.push(item.id);
          array.push(item.servico);
          array.push(`R$ ${item.valor.replace(".", ",")}`);

          axios
            .get(
              `http://127.0.0.1:8000/api/v1/funcionario/${item.registrado_por}`
            )
            .then(function (response) {
              array.push(response.data.first_name);

              let CurrentDate = item.data_do_registro;
              let date_new = new Date(CurrentDate);
              let data = new Intl.DateTimeFormat("pt-BR").format(date_new);

              array.push(data);
              rowsArray.push(array);
              setRows(rowsArray);
              setLoading(false);
            });

        });

      });
  };

  const cadastrar_servico = async () => {
    const user = await getUser();

    const body = {
      servico: servico,
      valor: valor,
      registrado_por: user,
    };

    for (let attr in body) {
      if (body[attr] === "") {
        setSenhaValidada(true);
        setMessage("Campo(s) obrigatório(s) não preenchido(s)");
        return false;
      }
    }

    setMessage("");

    setLoadingModal(true);
    axiosInstance
      .post("http://127.0.0.1:8000/api/v1/servicos", JSON.stringify(body))
      .then(function (response) {
        window.location.reload();
        window.alert("Servico adicionado com sucesso!");
      })
      .catch(function (error) {
        setLoadingModal(false);
        console.log(error);
      });

    setServico("");
    setValor("");
  };

  const ver_servico = async (id) => {
    setExcluindo(false);
    setDisabled(true);
    setModalShow(true);
    setLoadingModal(true);

    setMessage("");

    axios
      .get(`http://127.0.0.1:8000/api/v1/servico/${id}`)
      .then(function (response) {
        const resp = response.data;

        setId(resp.id);
        setServico(resp.servico);
        setValor(resp.valor);

        setTimeout(() => {
          setLoadingModal(false);
        }, 500);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editar_servico = async () => {
    setLoadingModal(true);

    const user = await getUser();

    const body = {
      servico: servico,
      valor: valor,
      registrado_por: user,
    };

    axios
      .put(`http://127.0.0.1:8000/api/v1/servico/${id}`, body)
      .then(function (response) {
        window.location.reload();
        window.alert("Servico editado com sucesso!");
      })
      .catch(function (error) {
        setLoadingModal(false);
        console.log(error);
      });
  };

  const excluir_servico = async () => {
    setLoadingModal(true);

    axios
      .delete(`http://127.0.0.1:8000/api/v1/servico/${id}`)
      .then(function (response) {
        window.location.reload();
        window.alert("Servico excluido com sucesso!");
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
          <h2>Serviços Cadastrados</h2>
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
              showRow={ver_servico}
            ></TableCustom>
          )}
        </div>
      </div>
      <div className="modal-container">
        <Modal keepMounted open={modalShow} onClose={() => setModalShow(false)}>
          <div className={loading ? "modal-content-loading" : "modal-content"}>
            {!loadingModal && !excluindo && (
              <>
                <h1>{id ? "Dados do Serviço" : "Cadastro de Serviço"}</h1>
                <div className="modal-inside-content">
                  <div className="row-horizontal">
                    <InputCustom
                      change={setServico}
                      title={"Serviço*"}
                      type={"text"}
                      value={servico}
                      disabled={disabled}
                    />
                    <InputCustom
                      change={setValor}
                      title={"Valor*"}
                      type={"number"}
                      value={valor}
                      disabled={disabled}
                    />
                  </div>
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
                        onClick={cadastrar_servico}
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
                              borderStyle: "solid",
                            }}
                            onClick={() => {
                              setLoadingModal(true);
                              setExcluindo(true);
                              setTimeout(() => {
                                setLoadingModal(false);
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
                            onClick={editar_servico}
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
                <h1>Excluir Serviço</h1>
                <div className="modal-inside-content">
                  <h3 style={{ textAlign: "center", color: "white" }}>
                    Deseja excluir o serviço "{servico}"?
                  </h3>
                  <div style={{ marginTop: "1rem" }} className="row-horizontal">
                    <button
                      className="btn"
                      style={{
                        margin: 0,
                        marginBottom: "1rem",
                        width: "100%",
                      }}
                      onClick={excluir_servico}
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

export default Servicos;
