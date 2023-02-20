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
import SelectCustom from "../../components/SelectCustom";
import CalendarCustom from "../../components/CalendarCustom";

function Atendimentos() {
  const [headers, setHeaders] = useState([
    { value: "ID", tamanho: "5%" },
    { value: "Cliente", tamanho: "20%" },
    { value: "Atendente", tamanho: "15%" },
    { value: "Helper", tamanho: "15%" },
    { value: "Servico", tamanho: "10%" },
    { value: "Valor Pago", tamanho: "5%" },
    { value: "Forma de Pagamento", tamanho: "10%" },
    { value: "Situação", tamanho: "5%" },
    { value: "Data Agendada", tamanho: "15%" },
  ]);
  const [rows, setRows] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [senhaValidada, setSenhaValidada] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [addCliente, setAddCliente] = useState(false);
  const [message, setMessage] = useState("");

  const axiosPrivateInstance = useAxiosPrivate();

  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [helpers, setHelpers] = useState([]);
  const [servicosArray, setServicosArray] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [formaDePagamentos, setformaDePagamentos] = useState([]);

  const [id, setId] = useState("");
  const [cliente, setCliente] = useState("");
  const [helper, setHelper] = useState("");
  const [servico, setServico] = useState("");
  const [valorPago, setValorPago] = useState("");
  const [valorPagoFormatado, setValorPagoFormatado] = useState("");
  const [formaDePagamento, setformaDePagamento] = useState("");
  const [situacao, setSituacao] = useState("");
  const [dataAgendada, setDataAgendada] = useState("");
  const [desconto, setDesconto] = useState(0);

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
      await getData();
      await listar_atendimentos();
    };

    fecthData();
  }, []);

  const getUser = async () => {
    const { data } = await axiosPrivateInstance.get("user");

    return data.id;
  };

  const getData = async () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/clientes")
      .then(function (response) {
        const resp = response.data;
        const array = [];

        resp.map((item, index) => {
          let obj = {};

          obj.value = `${item.id}`;
          obj.label = `${item.cpf} | ${item.nome}`;

          array.push(obj);
        });

        setClientes(array);
      });

    axios
      .get("http://127.0.0.1:8000/api/v1/atendentes")
      .then(function (response) {
        const resp = response.data;
        const array = [];

        resp.map((item, index) => {
          let obj = {};

          obj.value = `${item.id}`;
          obj.label = `${item.id} | ${item.first_name} ${item.last_name}`;

          array.push(obj);
        });

        setFuncionarios(array);
      });

    axios.get("http://127.0.0.1:8000/api/v1/helpers").then(function (response) {
      const resp = response.data;
      const array = [];

      resp.map((item, index) => {
        let obj = {};

        obj.value = `${item.id}`;
        obj.label = `${item.id} | ${item.first_name} ${item.last_name}`;

        array.push(obj);
      });

      setHelpers(array);
    });

    axios
      .get("http://127.0.0.1:8000/api/v1/servicos")
      .then(function (response) {
        const resp = response.data;
        setServicosArray(resp);
        const array = [];

        resp.map((item, index) => {
          let obj = {};

          obj.value = `${item.id}`;
          obj.label = `${item.servico} | R$ ${item.valor.replace(".", ",")} `;

          array.push(obj);
        });

        setServicos(array);
      });

    axios
      .get("http://127.0.0.1:8000/api/v1/formas-de-pagamento")
      .then(function (response) {
        const resp = response.data;
        const array = [];

        resp.map((item, index) => {
          let obj = {};

          obj.value = `${item.id}`;
          obj.label = `${item.pagamento}`;

          array.push(obj);
        });

        setformaDePagamentos(array);
      });
  };

  const refreshClientes = async () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/clientes")
      .then(function (response) {
        const resp = response.data;
        const array = [];

        resp.map((item, index) => {
          let obj = {};

          obj.value = `${item.id}`;
          obj.label = `${item.cpf} | ${item.nome}`;

          array.push(obj);
        });

        setClientes(array);
      });
  };

  const listar_atendimentos = async () => {
    const user = await getUser();

    axios
      .get(`http://127.0.0.1:8000/api/v1/atendimentos/${user}`)
      .then(function (response) {
        const resp = response.data;
        const rowsArray = [];

        if (resp.length < 1) {
          setLoading(false);
          return false;
        } else {
          response.data.map((item, index) => {
            let array = [];

            array.push(item.id);
            axios
              .get(`http://127.0.0.1:8000/api/v1/cliente/${item.cliente}`)
              .then(function (response) {
                array.push(response.data.nome);

                axios
                  .get(
                    `http://127.0.0.1:8000/api/v1/funcionario/${item.funcionario}`
                  )
                  .then(function (response) {
                    array.push(response.data.first_name);

                    axios
                      .get(
                        `http://127.0.0.1:8000/api/v1/funcionario/${item.helper}`
                      )
                      .then(function (response) {
                        array.push(response.data.first_name);

                        axios
                          .get(
                            `http://127.0.0.1:8000/api/v1/servico/${item.servico}`
                          )
                          .then(function (response) {
                            array.push(response.data.servico);

                            axios
                              .get(
                                `http://127.0.0.1:8000/api/v1/forma-de-pagamento/${item.forma_de_pagamento}`
                              )
                              .then(function (response) {
                                array.push(
                                  `R$ ${item.valor_pago.replace(".", ",")}`
                                );
                                array.push(response.data.pagamento);

                                array.push(item.situacao);

                                let CurrentDate = item.data_do_servico;
                                let date_new = new Date(CurrentDate);
                                let data = new Intl.DateTimeFormat(
                                  "pt-BR"
                                ).format(date_new);

                                array.push(data);
                                rowsArray.push(array);
                                setRows(rowsArray);
                                setLoading(false);
                              });
                          });
                      });
                  });
              });
          });
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const cadastrar_atendimento = async () => {
    const user = await getUser();

    const body = {
      cliente: cliente,
      funcionario: user,
      helper: helper,
      servico: servico,
      valor_pago: valorPago,
      forma_de_pagamento: formaDePagamento,
      situacao: "Em andamento",
      data_do_servico: dataAgendada,
      desconto: desconto,
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
      .post(
        `http://127.0.0.1:8000/api/v1/atendimentos/${user}`,
        JSON.stringify(body)
      )
      .then(function (response) {
        window.location.reload();
        window.alert("Atendimento adicionado com sucesso!");
      })
      .catch(function (error) {
        setLoadingModal(false);
        console.log(error);
      });

    setCliente("");
    setHelper("");
    setServico("");
    setValorPago("");
    setValorPagoFormatado("");
    setformaDePagamento("");
    setDataAgendada("");
    setDesconto("");
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
        refreshClientes();
        setAddCliente(false);
        setTimeout(() => {
          setLoadingModal(false);
          window.alert("Cliente adicionado com sucesso!");
        }, 500);
      })
      .catch(function (error) {
        setLoadingModal(false);
        console.log(error);
      });

    setNome("");
    setCpf("");
    setTelefone("");
    setLogradouro("");
    setNumero("");
    setBairro("");
    setCidade("");
    setEstado("");
  };

  const handleDesconto = (servicoId, desconto) => {
    if (desconto > 10) {
      setSenhaValidada(true);
      setMessage("Valor de desconto excedido (max: 10%)");
    } else {
      setSenhaValidada(false);
      setMessage("");
    }

    let valor;
    servicosArray.map((item, index) => {
      if (item.id == servicoId) {
        valor = item.valor;
      }
    });

    const total = valor - valor * (desconto / 100);
    setValorPagoFormatado("R$ " + total.toFixed(2).replace(",", "."));
    setValorPago(total);
  };

  const ver_atendimento = async (id) => {
    setExcluindo(false);
    setDisabled(true);
    setModalShow(true);
    setLoadingModal(true);

    setMessage("");

    axios
      .get(`http://127.0.0.1:8000/api/v1/atendimento/${id}`)
      .then(function (response) {
        const resp = response.data;

        handleDesconto(resp.servico, resp.desconto);

        setId(resp.id);
        clientes.map((cliente, index) => {
          if (cliente.value == resp.cliente) {
            setCliente({ value: resp.cliente, label: cliente.label });
          }
        });

        helpers.map((helper, index) => {
          if (helper.value == resp.helper) {
            setHelper({ value: resp.helper, label: helper.label });
          }
        });

        servicos.map((servico, index) => {
          if (servico.value == resp.servico) {
            setServico({ value: resp.servico, label: servico.label });
          }
        });

        setValorPago({ value: resp.valor_pago, label: resp.valor_pago });

        formaDePagamentos.map((pagamento, index) => {
          if (pagamento.value == resp.forma_de_pagamento) {
            setformaDePagamento({
              value: resp.forma_de_pagamento,
              label: pagamento.label,
            });
          }
        });

        const dateTime =
          resp.data_do_servico.split(":")[0] +
          ":" +
          resp.data_do_servico.split(":")[1];

        setDataAgendada(dateTime);
        setDesconto(resp.desconto);

        setTimeout(() => {
          setLoadingModal(false);
        }, 500);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editar_atendimento = async () => {
    setLoadingModal(true);

    const user = await getUser();

    const body = {
      cliente: cliente,
      funcionario: user,
      helper: helper.value,
      servico: servico.value,
      valor_pago: valorPago.value,
      forma_de_pagamento: formaDePagamento.value,
      situacao: "Em andamento",
      data_do_servico: dataAgendada,
      desconto: desconto,
    };

    axios
      .put(`http://127.0.0.1:8000/api/v1/atendimento/${id}`, body)
      .then(function (response) {
        window.location.reload();
        window.alert("Atendimento editado com sucesso!");
      })
      .catch(function (error) {
        setLoadingModal(false);
        console.log(error);
      });
  };

  const excluir_atendimento = async () => {
    setLoadingModal(true);

    axios
      .delete(`http://127.0.0.1:8000/api/v1/atendimento/${id}`)
      .then(function (response) {
        window.location.reload();
        window.alert("Atendimento excluido com sucesso!");
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
          <h2>Atendimentos Cadastrados</h2>
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
              showRow={ver_atendimento}
            ></TableCustom>
          )}
          {!loading && rows.length < 1 && (
            <h3>Nenhum atendimento cadastrado</h3>
          )}
        </div>
      </div>
      <div className="modal-container">
        <Modal keepMounted open={modalShow} onClose={() => setModalShow(false)}>
          <div
            className={loadingModal ? "modal-content-loading" : "modal-content"}
          >
            {!loadingModal && !excluindo && !addCliente && (
              <>
                <h1>
                  {id ? "Dados do Atendimento" : "Cadastro de Atendimento"}
                </h1>
                <div className="modal-inside-content">
                  <SelectCustom
                    title={"Serviço*"}
                    data={servicos}
                    change={({ value }) => {
                      setServico(value);
                      handleDesconto(value, desconto);
                    }}
                    value={servico}
                    disabled={disabled}
                  />
                  <div className="row-horizontal">
                    <SelectCustom
                      title={"Cliente*"}
                      data={clientes}
                      change={({ value }) => setCliente(value)}
                      value={cliente}
                      disabled={disabled}
                    />
                    <div className="input-container-custom" style={{ flex: 0 }}>
                      <label
                        style={{ opacity: 0 }}
                        className="input-label"
                        htmlFor=""
                      >
                        A
                      </label>
                      <button
                        className="btn"
                        style={{
                          margin: 0,
                          width: "100%",
                          height: "2.5rem",
                          backgroundColor: "green",
                        }}
                        disabled={disabled}
                        onClick={() => {
                          setLoadingModal(true);
                          setAddCliente(true);
                          setTimeout(() => {
                            setLoadingModal(false);
                          }, 500);
                        }}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                  <SelectCustom
                    title={"Helper*"}
                    data={helpers}
                    change={({ value }) => setHelper(value)}
                    value={helper}
                    disabled={disabled}
                  />
                  <div className="row-horizontal">
                    <SelectCustom
                      title={"Pagamento*"}
                      data={formaDePagamentos}
                      change={({ value }) => setformaDePagamento(value)}
                      value={formaDePagamento}
                      disabled={disabled}
                    />
                    <InputCustom
                      change={(text) => {
                        setDesconto(text);
                        handleDesconto(servico, text);
                      }}
                      title={"Desconto (%)"}
                      type={"number"}
                      value={desconto}
                      disabled={disabled || servico == "" ? true : false}
                    />
                    <InputCustom
                      change={setValorPago}
                      title={"Valor Final"}
                      type={"text"}
                      value={valorPagoFormatado}
                      disabled={true}
                    />
                  </div>
                  <InputCustom
                    change={setDataAgendada}
                    title={"Data do Serviço*"}
                    type={"datetime-local"}
                    value={dataAgendada}
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
                        onClick={cadastrar_atendimento}
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
                            onClick={editar_atendimento}
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

            {!loadingModal && excluindo && !addCliente && (
              <>
                <h1>Excluir Atendimento</h1>
                <div className="modal-inside-content">
                  <h3 style={{ textAlign: "center", color: "white" }}>
                    Deseja excluir o Atendimento numero "#{id}"?
                  </h3>
                  <div style={{ marginTop: "1rem" }} className="row-horizontal">
                    <button
                      className="btn"
                      style={{
                        margin: 0,
                        marginBottom: "1rem",
                        width: "100%",
                      }}
                      onClick={excluir_atendimento}
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

            {!loadingModal && addCliente && !excluindo && (
              <>
                <h1>Cadastro de Cliente</h1>
                <div className="modal-inside-content">
                  <InputCustom
                    change={setNome}
                    title={"Nome*"}
                    type={"text"}
                    value={nome}
                  />
                  <div className="row-horizontal">
                    <InputCustom
                      change={setCpf}
                      title={"CPF*"}
                      type={"text"}
                      value={cpf}
                    />
                    <InputCustom
                      change={setTelefone}
                      title={"Telefone*"}
                      type={"text"}
                      value={telefone}
                    />
                  </div>
                  <InputCustom
                    change={setLogradouro}
                    title={"Logradouro*"}
                    type={"text"}
                    value={logradouro}
                  />
                  <div className="row-horizontal">
                    <InputCustom
                      change={setNumero}
                      title={"Numero*"}
                      type={"text"}
                      value={numero}
                    />
                    <InputCustom
                      change={setBairro}
                      title={"Bairro*"}
                      type={"text"}
                      value={bairro}
                    />
                    <InputCustom
                      change={setCidade}
                      title={"Cidade*"}
                      type={"text"}
                      value={cidade}
                    />
                    <InputCustom
                      change={setEstado}
                      title={"Estado*"}
                      type={"text"}
                      value={estado}
                    />
                  </div>

                  {senhaValidada && (
                    <div className="error-message">
                      <span>{message}</span>
                    </div>
                  )}

                  <div style={{ marginTop: "1rem" }} className="row-horizontal">
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
                        setLoadingModal(true)
                        setAddCliente(false)
                        setTimeout(() => {
                          setLoadingModal(false)
                        }, 500);
                      }}
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

export default Atendimentos;
