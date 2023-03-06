import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ScanQRCode = () => {
  const session = JSON.parse(window.sessionStorage.getItem('session'));
  const user = session.nombre;
  const nomina = session.nomina;
  const navigate = useNavigate();

  // Component (HTML)
  return (
    <>
      <div className="container-fluid px-0 header">
        <div className="row m-0 justify-content-between align-items-center">
            <div className="col-auto px-0">
                <img src="/imgs/udem-logo.png" height="60" />
            </div>
            <div className="col-auto px-0">
                { user }&nbsp;&nbsp;<a href="#" onClick={ () => {window.sessionStorage.clear(); navigate("/")} } className="anchor"><FontAwesomeIcon icon={faArrowRightFromBracket} /></a>&nbsp;&nbsp;
            </div>
        </div>
      </div>
      <div className="container px-0">
        <div className="row m-0 justify-content-center mt-5">
            <div className="col-12 text-center">
                <h2 className="mb-4">Escanee el código QR desde su celular para registrar su asistencia.</h2>
                <QRCodeSVG value={"http://192.168.3.6:3000/profesor/qr/" + nomina} size="250" />
            </div>
        </div>
      </div>
    </>
  );
};

export default ScanQRCode;