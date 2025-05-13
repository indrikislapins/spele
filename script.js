
const cities = ["Riga", "Daugavpils", "Liepaja", "Valmiera", "Jelgava"];
let currentCity = "";

function getRandomCity() {
  return cities[Math.floor(Math.random() * cities.length)];
}

function nextQuestion() {
  document.getElementById("result").textContent = "";
  currentCity = getRandomCity();
  document.getElementById("question").textContent = `Click on: ${currentCity}`;
}

document.querySelectorAll(".marker").forEach(marker => {
  marker.addEventListener("click", () => {
    const selected = marker.getAttribute("data-city");
    if (selected === currentCity) {
      document.getElementById("result").textContent = "Correct!";
    } else {
      document.getElementById("result").textContent = `Wrong! That was ${selected}.`;
    }
  });
});

window.onload = nextQuestion;
