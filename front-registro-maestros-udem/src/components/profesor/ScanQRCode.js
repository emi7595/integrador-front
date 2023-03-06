import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';

const ScanQRCode = () => {
  const session = JSON.parse(window.sessionStorage.getItem('session'));
  const user = session.nombre;
  const nomina = session.nomina;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://172.32.185.24:5096/QR/GetCourseData/" + nomina)
    .then(response => response.json())
    .then(data => {
      if (data !== -1) {
        document.getElementById("currentClass").innerHTML = "Clase actual: " + data.subjectName;
      }
      else {
        document.getElementById("currentClass").innerHTML = "No hay clases en este momento";
      }
    });
  }, []);

  // Component (HTML)
  return (
    <>
      <div className="container-fluid px-0 header">
        <div className="row m-0 justify-content-between align-items-center">
            <div className="col-auto px-0">
                <img src="/imgs/udem-logo.png" height="60" />
            </div>
            <div className="col-auto px-0">
                { user }&nbsp;&nbsp;<a href="" onClick={ () => {window.sessionStorage.clear(); navigate("/")} } className="anchor"><FontAwesomeIcon icon={faArrowRightFromBracket} /></a>&nbsp;&nbsp;
            </div>
        </div>
      </div>
      <div className="container px-0">
        <div className="row m-0 justify-content-center mt-5">
            <div className="col-12 text-center">
                <h1 className="mb-3" id="currentClass"></h1>
                <h3 className="mb-3">Escanee el código QR desde su celular para registrar su asistencia.</h3>
                <div className="row justify-content-center my-3 px-3">
                  <div className="col-12 col-md-6">
                    <div className="row justify-content-center mb-3">
                      <div className="col-6">
                        <button className="btn-block btn-color w-100" onClick={() => getQRCode(nomina, 1)}>Registar Entrada</button>
                      </div>
                      <div className="col-6">
                        <button className="btn-block btn-color w-100" onClick={() => getQRCode(nomina, 2)}>Registar Salida</button>
                      </div>
                    </div> 
                  </div>
                </div>
                <div id="qrCode"></div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ScanQRCode;

const getQRCode = function(nomina, type) {
  fetch("http://172.32.185.24:5096/QR/GetCourseData/" + nomina)
    .then(response => response.json())
    .then(data => {
      if (data !== -1) {
        // Define the QR code component
        const QRCode = ({ nomina }) => (
          <QRCodeSVG value={`http://172.32.185.24:3000/profesor/qr/${nomina}/` + (type == 1 ? `1` : `2`)} size={250} />
        );

        // Render the QR code component to a string
        const qrCodeString = ReactDOMServer.renderToString(<QRCode nomina={nomina} />);
        
        document.getElementById("currentClass").innerHTML = "Clase actual: " + data.subjectName;
        document.getElementById("qrCode").innerHTML = qrCodeString;
      }
      else {
        document.getElementById("currentClass").innerHTML = "No hay clases en este momento";
        document.getElementById("qrCode").innerHTML = "No se puede generar un código QR porque no hay clases.";
      }
    });
}