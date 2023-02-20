import React, { useEffect, useState } from "react";

import axios from "axios";
import Modal from "@mui/material/Modal";
import { Player } from "@lottiefiles/react-lottie-player";

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
  const [total, setTotal] = useState("");

  useEffect(() => {
    const fecthData = async () => {
      setLoading(false)
    };

    fecthData();
  }, []);

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
          {!loading && (
            <div>
              <div className="card-container">
                <div className="card-header">
                  <h3>Atendimentos</h3>
                </div>
                <div className="card-content">
                  <span>R$ {total}</span>
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
