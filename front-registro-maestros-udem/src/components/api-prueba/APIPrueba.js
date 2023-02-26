import React, { useState, useEffect } from "react";

function APIPrueba() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5096/Professor")
      .then(response => response.json())
      .then(data => {setApiData(data); console.log(data)});
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {
        apiData.map((data) => (
            <>
                <div>{ data.nomina }</div>
                <div>{ data.nombre }</div>
                <hr />
            </>
        ))
      }
    </div>
  );
}

export default APIPrueba;