import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function DoughnutChart({ chartData }, props) {
  // const options = {
  //   plugins: {
  //     legend: {
  //       display: false,
  //       position: "bottom",
  //       labels: {
  //         usePointStyle: true,
  //       },
  //     },
  //   },
  //   responsive: true,
  //   elements: {
  //     bar: {
  //       borderColor: "green",
  //       backgroundColor: 'green',
  //       hoverBackgroundColor: "red", // Set bar hover color
  //     },
  //   },

  // };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default DoughnutChart;
