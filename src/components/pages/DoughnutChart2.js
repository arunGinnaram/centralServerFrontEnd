import { Doughnut,Pie } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Tooltip } from "chart.js";
Chart.register(ArcElement, Legend, Tooltip);

function DoughnutChart2({ chartData }, props) {
  const options = {
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
    },
    width: 10,
    rotation: 86.1 * Math.PI,
    circumference: 57 * Math.PI,
    cutout: 75,
    elements: {
      arc: {
        borderWidth: 3,
        borderColor: "transparent",
      },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "left"}}>
      <div style={{ position: "relative" }}>
                  <Pie data={chartData}  />	
		
      </div>  
	  
	   
    </div>
  );
}

export default DoughnutChart2;
