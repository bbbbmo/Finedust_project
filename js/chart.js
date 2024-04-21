const getPmData = async () => {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${LAT}&lon=${LON}&appid=${API_KEY}`
    );
    const data = await res.json();
    let newPm2_5 = await data.list[0].components.pm2_5;
    return newPm2_5;
  } catch (error) {
    alert(`error : ${error}`);
  }
};

async function updateChart(chart) {
  try {
    const newData = await getPmData();
    console.log(newData);
    chart.data.labels.push(new Date().toLocaleTimeString("ko-KR"));
    chart.data.datasets[0].data.push(newData);

    if (chart.data.labels.length > 12) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }
    chart.update();
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Fine Dust(PM 2.5)",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
updateChart(myChart);
setInterval(() => {
  getPmData();
  updateChart(myChart);
}, 10 * 1000);
