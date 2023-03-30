import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function data2 (props) {
  return ([
  { name: 'Group A', value: props.asistencia },
  { name: 'Group B', value: props.retraso },
  { name: 'Group C', value: props.salidaPrevia },
  { name: 'Group D', value: props.retrasoSalida },
  { name: 'Group E', value: props.falta },
])};

// const data = [
//   { name: 'Group A', value: 5 },
//   { name: 'Group B', value: 1 },
//   { name: 'Group C', value: 1 },
//   { name: 'Group D', value: 0 },
//   { name: 'Group E', value: 13 },
// ];

//const COLORS = ['#FF0000', '#FF00E5', '#0CFFF0', '#6891FA','#DBFF00'];
const COLORS = ['#FFE700', '#333333', '#355070', '#DB5461','#F18805'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

class GraficaClases extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="50%" height="100%">
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