import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title,
  Filler,
  RadialLinearScale,
  PieController,
  DoughnutController,
  PolarAreaController,
  ScatterController,
  BubbleController
} from 'chart.js';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title,
  Filler,
  RadialLinearScale,
  PieController,
  DoughnutController,
  PolarAreaController,
  ScatterController,
  BubbleController
);

export const chartConfig = {
  // Global chart configuration
};