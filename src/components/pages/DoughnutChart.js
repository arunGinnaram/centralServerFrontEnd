import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function DoughnutChart({ chartData}, props) {
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
	  
     
                  <Bar data={chartData}  />	
		
      </div>  
	  
	   
    </div>
  );
}

export default DoughnutChart;
