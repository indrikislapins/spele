
const cities = ["Rīga", "Daugavpils", "Liepāja", "Valmiera", "Jelgava", "Ventspils", "Alūksne", "Kolka"];
let currentCity = "";
let score = 0;

function getRandomCity() {
  return cities[Math.floor(Math.random() * cities.length)];
}

function nextQuestion() {
  document.getElementById("result").textContent = "";
  currentCity = getRandomCity();
  document.getElementById("question").textContent = `Atrodi: ${currentCity}`;
}

document.querySelectorAll(".marker").forEach(marker => {
  marker.addEventListener("click", () => {
    const selected = marker.getAttribute("data-city");

    if (selected === currentCity) {
      score++;
      document.getElementById("result").textContent = "Pareizi!";
      document.getElementById("result").style.color = "green";
      marker.remove();
    } else {
      document.getElementById("result").textContent = `Nepareizi! Tā bija: ${currentCity}`;
      document.getElementById("result").style.color = "red";
    }

    // Atjauno punktu skaitu vizuāli un hidden laukā
    document.getElementById("score").textContent = score;
    const hidden = document.getElementById("rezult");
    if (hidden) hidden.value = score;

    // Jauns jautājums pēc neliela pauzes
    setTimeout(nextQuestion, 1500);
  });
});

window.onload = nextQuestion;
