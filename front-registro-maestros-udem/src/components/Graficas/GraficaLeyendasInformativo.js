const GraficaLeyendasInformativo = (props) => {
    const {aviso, unidadExterna, reposicion, adelanto, autorizacion, claseRepuesta, totalInformativo} = props;
    return (
        <div className='col-md-3 leyenda'>
			<div>
				<h5 className="mb-3">Códigos informativos</h5>
				<p className="leyenda"><span className="aviso"></span> Aviso: {aviso}/{totalInformativo}</p>
				<p className="leyenda"><span className="unidad-externa"></span> Unidad Externa: {unidadExterna}/{totalInformativo}</p>
				<p className="leyenda"><span className="reposicion"></span> Reposición Programada: {reposicion}/{totalInformativo}</p>
				<p className="leyenda"><span className="adelanto"></span> Adelanto: {adelanto}/{totalInformativo}</p>
                <p className="leyenda"><span className="autorizacion"></span> Autorización: {autorizacion}/{totalInformativo}</p>
				<p className="leyenda"><span className="clase-repuesta"></span> Clase Repuesta: {claseRepuesta}/{totalInformativo}</p>
			</div>
		</div>
    );
};

export default GraficaLeyendasInformativo;