import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';

interface ChartComponentProps {
  pieData: ChartData<'pie'>;
  barData: ChartData<'bar'>;
  lineData: ChartData<'line'>;
  pieOptions?: ChartOptions<'pie'>;
  barOptions?: ChartOptions<'bar'>;
  lineOptions?: ChartOptions<'line'>;
}

const SomeChartComponent: React.FC<ChartComponentProps> = ({ 
  pieData, 
  barData, 
  lineData, 
  pieOptions, 
  barOptions, 
  lineOptions 
}) => {
  return (
    <div>
      <Pie data={pieData} options={pieOptions} />
      <Bar data={barData} options={barOptions} />
      <Line data={lineData} options={lineOptions} />
    </div>
  );
};

export default SomeChartComponent;