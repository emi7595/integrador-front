const GraficaLeyendas = (props) => {
    const {asistencia, retraso, salidaPrevia, retrasoSalida, falta, total} = props;
    return (
        <div className='col-md-3 leyenda'>
			<div>
				<h5 className="mb-3">Códigos de asistencia</h5>
				<p className="leyenda"><span className="asistencia"></span> Asistencia: {asistencia}/{total}</p>
				<p className="leyenda"><span className="retraso"></span> Retraso Inicial: {retraso}/{total}</p>
				<p className="leyenda"><span className="salida"></span> Salida Previa: {salidaPrevia}/{total}</p>
				<p className="leyenda"><span className="retraso-salida"></span> Retraso y Salida: {retrasoSalida}/{total}</p>
				<p className="leyenda"><span className="falta"></span> Falta: {falta}/{total}</p>
			</div>
		</div>
    );
};

export default GraficaLeyendas;