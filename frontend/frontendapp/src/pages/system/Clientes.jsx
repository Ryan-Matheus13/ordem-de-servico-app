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

function Clientes() {
  const [headers, setHeaders] = useState([
    { value: "ID", tamanho: "5%" },
    { value: "CPF", tamanho: "15%" },
    { value: "Nome", tamanho: "30%" },
    { value: "Telefone", tamanho: "15%" },
    { value: "Logradouro", tamanho: "20%" },
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
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    const fecthData = async () => {
      await listar_clientes();
    };

    fecthData();
  }, []);

  const getUser = async () => {
    const { data } = await axiosPrivateInstance.get("user");

    return data.id;
  };

  const listar_clientes = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/api/v1/clientes",
    }).then(function (response) {
      const rowsArray = [];

      response.data.map((item, index) => {
        let array = [];

        array.push(item.id);
        array.push(item.cpf);
        array.push(item.nome);
        array.push(item.telefone);
        array.push(item.logradouro);

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

  const cadastrar_cliente = async () => {
    const user = await getUser();

    const body = {
      nome: nome,
      cpf: cpf,
      telefone: telefone,
      logradouro: logradouro,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
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
      .post(`http://127.0.0.1:8000/api/v1/clientes`, JSON.stringify(body))
      .then(function (response) {
        window.location.reload();
        window.alert("Cliente adicionado com sucesso!");
      })
      .catch(function (error) {
        setLoadingModal(false);
        console.log(error);
      });

    cleardata();
  };

  const ver_cliente = async (id) => {
    setExcluindo(false);
    setDisabled(true);
    setModalShow(true);
    setLoadingModal(true);

    setMessage("");

    axios
      .get(`http://127.0.0.1:8000/api/v1/cliente/${id}`)
      .then(function (response) {
        const resp = response.data;

        setId(resp.id);
        setNome(resp.nome);
        setCpf(resp.cpf);
        setTelefone(resp.telefone);
        setLogradouro(resp.logradouro);
        setNumero(resp.numero);
        setBairro(resp.bairro);
        setCidade(resp.cidade);
        setEstado(resp.estado);

        setTimeout(() => {
          setLoadingModal(false);
        }, 500);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editar_cliente = async () => {
    setLoadingModal(true);
    const user = await getUser();

    const body = {
      nome: nome,
      cpf: cpf,
      telefone: telefone,
      logradouro: logradouro,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      registrado_por: user,
    };

    axios
      .put(`http://127.0.0.1:8000/api/v1/cliente/${id}`, body)
      .then(function (response) {
        window.location.reload();
        window.alert("Cliente editado com sucesso!");
      })
      .catch(function (error) {
        setLoadingModal(false);
        console.log(error);
      });

    cleardata();
  };

  const excluir_cliente = async () => {
    setLoadingModal(true);

    axios
      .delete(`http://127.0.0.1:8000/api/v1/cliente/${id}`)
      .then(function (response) {
        window.location.reload();
        window.alert("Cliente excluido com sucesso!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const cleardata = () => {
    setDisabled(false);
    setId("");
    setNome("");
    setCpf("");
    setTelefone("");
    setLogradouro("");
    setNumero("");
    setBairro("");
    setCidade("");
    setEstado("");
  };

  return (
    <>
      <DrawerCustom></DrawerCustom>
      <div className="dash-container">
        <div className="dash-header">
          <h2>Clientes Cadastrados</h2>
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
              showRow={ver_cliente}
            ></TableCustom>
          )}
          {!loading && rows.length < 1 && (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3 style={{ color: "white" }}>Nenhum cliente cadastrado</h3>
            </div>
          )}
        </div>
      </div>
      <div className="modal-container">
        <Modal
          keepMounted
          open={modalShow}
          onClose={() => {
            cleardata();
            setModalShow(false);
          }}
        >
          <div className={loading ? "modal-content-loading" : "modal-content"}>
            {!loadingModal && !excluindo && (
              <>
                <h1>{id ? "Dados do Cliente" : "Cadastro de Cliente"}</h1>
                <div className="modal-inside-content">
                  <InputCustom
                    change={setNome}
                    title={"Nome*"}
                    type={"text"}
                    value={nome}
                    disabled={disabled}
                  />
                  <div className="row-horizontal">
                    <InputCustom
                      change={setCpf}
                      title={"CPF*"}
                      type={"text"}
                      value={cpf}
                      disabled={disabled}
                    />
                    <InputCustom
                      change={setTelefone}
                      title={"Telefone*"}
                      type={"text"}
                      value={telefone}
                      disabled={disabled}
                    />
                  </div>
                  <InputCustom
                    change={setLogradouro}
                    title={"Logradouro*"}
                    type={"text"}
                    value={logradouro}
                    disabled={disabled}
                  />
                  <div className="row-horizontal">
                    <InputCustom
                      change={setNumero}
                      title={"Numero*"}
                      type={"text"}
                      value={numero}
                      disabled={disabled}
                    />
                    <InputCustom
                      change={setBairro}
                      title={"Bairro*"}
                      type={"text"}
                      value={bairro}
                      disabled={disabled}
                    />
                    <InputCustom
                      change={setCidade}
                      title={"Cidade*"}
                      type={"text"}
                      value={cidade}
                      disabled={disabled}
                    />
                    <InputCustom
                      change={setEstado}
                      title={"Estado*"}
                      type={"text"}
                      value={estado}
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
                        onClick={cadastrar_cliente}
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
                        onClick={() => {
                          cleardata();
                          setModalShow(false);
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
                            onClick={() => {
                              cleardata();
                              setModalShow(false);
                            }}
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
                            onClick={editar_cliente}
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
                <h1>Excluir Cliente</h1>
                <div className="modal-inside-content">
                  <h3 style={{ textAlign: "center", color: "white" }}>
                    Deseja excluir o cliente "{nome}"?
                  </h3>
                  <div style={{ marginTop: "1rem" }} className="row-horizontal">
                    <button
                      className="btn"
                      style={{
                        margin: 0,
                        marginBottom: "1rem",
                        width: "100%",
                      }}
                      onClick={excluir_cliente}
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

export default Clientes;
