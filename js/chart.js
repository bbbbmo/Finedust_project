const getPmDataFromDB = async () => {
  try {
    const res = await fetch("http://192.168.35.158/data.php");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

async function updateChart(chart) {
  try {
    const data = await getPmDataFromDB();
    if (!data || data.message) {
      console.error("No data found or data error");
      return;
    }
    console.log(data);

    const timeLabel = new Date().toLocaleTimeString("ko-KR");
    const avgData = [data.PM1_0_avg, data.PM2_5_avg, data.PM10_avg];

    chart.data.labels.push(timeLabel);
    chart.data.datasets[0].data.push(avgData[0]);
    chart.data.datasets[1].data.push(avgData[1]);
    chart.data.datasets[2].data.push(avgData[2]);

    if (chart.data.labels.length > 10) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
      chart.data.datasets[1].data.shift();
      chart.data.datasets[2].data.shift();
    }

    chart.update();
  } catch (error) {
    console.error("Error updating chart:", error);
  }
}

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "PM1.0",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "PM2.5",
        data: [],
        backgroundColor: "rgba(192, 75, 192, 0.2)",
        borderColor: "rgba(192, 75, 192, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "PM10",
        data: [],
        backgroundColor: "rgba(192, 192, 75, 0.2)",
        borderColor: "rgba(192, 192, 75, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      x: {
        display: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});

updateChart(myChart);
setInterval(() => {
  updateChart(myChart);
}, 10 * 1000);
