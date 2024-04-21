const time = document.querySelector(".time");
const day = document.querySelector(".day");
const WEEKDAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wensday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getTime() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const week = WEEKDAY[date.getDay()];
  const days = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  time.innerText = `${hours} : ${minutes}`;
  day.innerText = `${days}/${month}/${year}, ${week}`;
}

getTime();
setInterval(getTime, 1000);
