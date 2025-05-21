// Masīvs ar visām pilsētām, ko var uzminēt
const cities = ["Rīga", "Daugavpils", "Liepāja", "Valmiera", "Jelgava", "Ventspils", "Alūksne", "Kolka"];

let currentCity = "";           // Pašreiz uzminamā pilsēta
let score = 0;                  // Spēlētāja rezultāts (punkti)
let guesses = 0;                // Cik reizes jau spēlētājs ir mēģinājis
let maxGuesses = 8;             // Maksimālais atļautais gājienu skaits
let originalMarkersHTML = "";  // Saglabāta sākotnējā marķieru HTML struktūra (restartam)

// Funkcija, kas izvēlas nejaušu pilsētu no vēl esošajiem marķieriem
function getRandomCity() {
  const remainingMarkers = document.querySelectorAll(".marker");
  const remainingCities = Array.from(remainingMarkers).map(m => m.getAttribute("data-city"));
  return remainingCities[Math.floor(Math.random() * remainingCities.length)];
}

// Funkcija, kas iestata nākamo jautājumu vai pārtrauc spēli
function nextQuestion() {
  if (guesses >= maxGuesses) {
    endGame(); // Ja spēlētājs ir mēģinājis 8 reizes, spēle beidzas
    return;
  }

  const remainingMarkers = document.querySelectorAll(".marker");
  if (remainingMarkers.length === 0) {
    endGame(); // Ja vairs nav marķieru – spēle arī beidzas
    return;
  }

  document.getElementById("result").textContent = ""; // Notīra iepriekšējo rezultātu
  currentCity = getRandomCity();                      // Izvēlas nākamo pilsētu
  document.getElementById("question").textContent = `Atrodi: ${currentCity}`; // Parāda uzdevumu
}

// Spēles beigu funkcija – parāda rezultātu un "Try Again" pogu
function endGame() {
  document.getElementById("question").textContent = "";  // Paslēpj jautājumu
  document.getElementById("result").textContent = "";    // Notīra rezultātu laukumu
  document.getElementById("final-score").textContent = `Rezultāts: ${score}/${maxGuesses}`; // Rāda gala rezultātu
  document.getElementById("try-again-btn").style.display = "inline-block"; // Parāda pogu restartam
}

// Spēles restartēšana – atjauno marķierus un datus
function resetGame() {
  score = 0;
  guesses = 0;

  // Atjauno punktu skaitu gan vizuāli, gan hidden inputā
  document.getElementById("score").textContent = score;
  document.getElementById("rezult").value = score;

  // Paslēpj gala rezultātu un pogu
  document.getElementById("final-score").textContent = "";
  document.getElementById("try-again-btn").style.display = "none";

  // Atjauno sākotnējo kartes HTML ar marķieriem
  const container = document.getElementById("map-container");
  container.innerHTML = `
    <img src="/static/images/latvia-map.jpg" id="latvia-map" alt="Latvia Map">
    ${originalMarkersHTML}
  `;

  bindMarkerEvents(); // No jauna pievieno event listenerus
  nextQuestion();     // Sāk spēli
}

// Pievieno notikumu apstrādi visiem marķieriem (pēc restartēšanas vai sākumā)
function bindMarkerEvents() {
  document.querySelectorAll(".marker").forEach(marker => {
    marker.addEventListener("click", function () {
      const selected = marker.getAttribute("data-city");

      if (selected === currentCity) {
        // Ja atbilde ir pareiza
        score++;
        document.getElementById("result").textContent = "Pareizi!";
        document.getElementById("result").style.color = "green";
        marker.remove(); // Noņem marķieri no kartes
      } else {
        // Ja atbilde ir nepareiza
        document.getElementById("result").textContent = `Nepareizi! Tā bija: ${currentCity}`;
        document.getElementById("result").style.color = "red";
      }

      guesses++; // Palielina mēģinājumu skaitu

      // Atjauno rezultātu laukos
      document.getElementById("score").textContent = score;
      document.getElementById("rezult").value = score;

      // Pēc 1 sekundes – nākamais jautājums
      setTimeout(nextQuestion, 1000);
    });
  });
}

// Kad lapa ir ielādēta – saglabā sākotnējo marķieru HTML un sāk spēli
document.addEventListener("DOMContentLoaded", function () {
  const markers = document.querySelectorAll(".marker");
  originalMarkersHTML = Array.from(markers).map(m => m.outerHTML).join("");

  bindMarkerEvents(); // Sākumā pievieno klikšķu apstrādi marķieriem
  nextQuestion();     // Parāda pirmo jautājumu
});
