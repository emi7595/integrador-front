import React, { useState, useEffect } from "react";

function APIPrueba() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.3.6:5096/Empleado")
      .then(response => response.json())
      .then(data => {setApiData(data); console.log(data)});
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {
        apiData.map((data, index) => (
            <div key = {data.nomina} className="lista">
                <p>Nómina: { data.nomina }</p>
                <p>Nombre: { data.nombre }</p>
                <p>Rol: { data.idRol }</p>
                <hr />
            </div>
        ))
      }
    </div>
  );
}

export default APIPrueba;