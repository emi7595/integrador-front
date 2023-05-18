import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function data2(props) {
    return ([
        { name: 'Group A', value: props.aviso },
        { name: 'Group B', value: props.unidadExterna },
        { name: 'Group C', value: props.reposicion },
        { name: 'Group D', value: props.adelanto },
        { name: 'Group E', value: props.autorizacion },
        { name: 'Group F', value: props.claseRepuesta },
    ]);
};

const COLORS = ['#250025', '#2e3350', '#5974bc', '#8c93c7', '#c6c1e1', '#b5cef7'];
// aviso, uniExt, reposicion, adelanto, autorizacion, claseRepuesta

class GraficaAsistenciaInformativo extends PureComponent {

    render() {
        return (
            <ResponsiveContainer width="20%" height="100%">
                <PieChart width={600} height={600}>
                    <Pie
                        data={data2(this.props)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data2(this.props).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        );
    }
}

export default GraficaAsistenciaInformativo;