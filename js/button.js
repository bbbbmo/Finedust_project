const btn = document.getElementById("btn");
btn.addEventListener("click", onClickBtn);

function onClickBtn() {
  {
    btn.innerText === "ON" ? (btn.innerText = "OFF") : (btn.innerText = "ON");
  }
}
