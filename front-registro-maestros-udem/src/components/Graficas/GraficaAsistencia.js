import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function data2(props) {
    return ([
        { name: 'Group A', value: props.asistencia },
        { name: 'Group B', value: props.retraso },
        { name: 'Group C', value: props.salidaPrevia },
        { name: 'Group D', value: props.retrasoSalida },
        { name: 'Group E', value: props.falta },
    ])
};

const COLORS = ['#adad5c', '#946724', '#c8ddbb', '#f7deb6', '#f1c57e'];
// asistencia, retrasoInicial, salidaPrevia, retrasoSalida, falta

class GraficaClases extends PureComponent {

    render() {
        return (
            <ResponsiveContainer width="20%" height="100%">
                <PieChart width={600} height={600}>
                    <Pie
                        data={data2(this.props)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        // label={renderCustomizedLabel}
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

export default GraficaClases;