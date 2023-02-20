import React, { useEffect, useState } from "react";

import { IoCashOutline } from "react-icons/io5";
import { BiUserPin } from "react-icons/bi";

import axios from "axios";
import Modal from "@mui/material/Modal";
import { Player } from "@lottiefiles/react-lottie-player";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DrawerCustom from "../../components/DrawerCustom";
import TableCustom from "../../components/TableCustom";
import "../../App.css";
import InputCustom from "../../components/InputCustom";
import { axiosInstance } from "../../axios";

function Dashboard() {
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

  const [total, setTotal] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [quantidadeCliente, setQuantidadeCliente] = useState(0);

  useEffect(() => {
    const fecthData = async () => {
      await listar_atendimentos();
      await listar_clientes();
    };

    fecthData();
  }, []);

  const getUser = async () => {
    const { data } = await axiosPrivateInstance.get("user");

    return data.id;
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
          setLoading(false);
          setQuantidade(resp.length);
          let valor = total;
          console.log(valor);
          resp.map((item, index) => {
            valor += parseFloat(item.valor_pago);
          });

          setTotal(valor.toFixed(2).replace(".", ","));
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const listar_clientes = async () => {
    const user = await getUser();

    axios
      .get(`http://127.0.0.1:8000/api/v1/clientes`)
      .then(function (response) {
        const resp = response.data;
        const rowsArray = [];

        if (resp.length < 1) {
          setLoading(false);
          return false;
        } else {
          setLoading(false);
          setQuantidadeCliente(resp.length);
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <DrawerCustom></DrawerCustom>
      <div className="dash-container">
        <div className="dash-header">
          <h2>Dashboard</h2>
        </div>
        <div className="dash-content" style={{ padding: "2rem" }}>
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
          {!loading && (
            <div className="cards-container">
              <div className="card-container">
                <div className="card-content">
                  <div className="card-header">
                    <h3>Atendimentos</h3>
                  </div>
                  <span>Total: R$ {total}</span>
                  <span>Quantidade: {quantidade}</span>
                </div>
                <div className="card-icon">
                  <IoCashOutline size={"4rem"} color={"#5fad5f"} />
                </div>
              </div>
              <div className="card-container">
                <div className="card-content">
                  <div className="card-header">
                    <h3>Clientes</h3>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <span>Quantidade: {quantidadeCliente}</span>
                  </div>
                </div>
                <div className="card-icon">
                  <BiUserPin size={"4rem"} color={"#56b9c3"} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="modal-container">
        <Modal keepMounted open={modalShow} onClose={() => setModalShow(false)}>
          <div className={loading ? "modal-content-loading" : "modal-content"}>
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

export default Dashboard;
