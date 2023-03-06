import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

const ConfirmQR = () => {
    let { nomina, type } = useParams();

    const registerAttendance = async () => {

      try {
        var jsonData = {
          "nomina": nomina
        }

        let typeStr = type == 1 ? "RegisterEntrance" : "RegisterDeparture";

        const response = await fetch('http://172.32.185.24:5096/QR/' + typeStr, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData)
        });
  
        // Login information was incorrect
        if (!response.ok) {
          throw new Error('Algo salió mal.');
        }
        // Login information was correct
        else {
          const data = await response.json();
          data.code == -1 || data.code == -2 ? document.getElementById("icon-ok").style.display = "none" : document.getElementById("icon-no").style.display = "none";
          document.getElementById("title").innerHTML = (data.code == -1 ? "Asistencia ya registrada" : data.code == -2 ? "Asistencia no registrada" : "Asistencia Registrada");
          document.getElementById("content").innerHTML = "Estado: " + (data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      registerAttendance();
    }, []);

    // Component (HTML)
    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
              <div className="text-center">
                  <FontAwesomeIcon id="icon-ok" icon={faCheckCircle} color="green" size="8x" />
                  <FontAwesomeIcon id="icon-no" icon={faSquareXmark} color="red" size="8x" />
                  <h1 id="title" className="mt-4"></h1>
                  <h5 id="content"></h5>
              </div>
            </div>
        </>
    );
};

export default ConfirmQR;