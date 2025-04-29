// 3D Globe Başlat
const world = Globe()
(document.getElementById('globe-container'))
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg') // Hızlı yüklenen gece görseli
  .backgroundColor('#000000')
  .pointOfView({ lat: 20, lng: 0, altitude: 2 })
  .onGlobeReady(() => {
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.5;

    world.controls().addEventListener('end', () => {
      world.controls().autoRotate = true;
    });
  });

// OUTPUT TANIMI
const output = document.getElementById('output');

// Formu dinle
document.getElementById('userForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const birthDate = document.getElementById('birthDate').value;
  const ethnicity = document.getElementById('ethnicity').value;
  const country = document.getElementById('country').value;
  const birthYear = parseInt(birthDate.split("-")[0]);

  const worldStats = [
    { year: 1990, population: "5.3 Billion", life: "65 Years" },
    { year: 1995, population: "5.7 Billion", life: "67 Years" },
    { year: 2000, population: "6.1 Billion", life: "68 Years" },
    { year: 2005, population: "6.5 Billion", life: "70 Years" },
    { year: 2010, population: "6.9 Billion", life: "71 Years" },
    { year: 2020, population: "7.8 Billion", life: "72 Years" }
  ];

  let selectedStats = worldStats[0];
  for (let stat of worldStats) {
    if (birthYear >= stat.year) {
      selectedStats = stat;
    }
  }

  const cultureProfiles = {
    "Western European": {
      background: "Medieval Europe, Viking Age migrations.",
      culture: "Renaissance Art, Classical Music."
    },
    "East Asian": {
      background: "Ancient China, Han Dynasty.",
      culture: "Calligraphy, Traditional Music."
    },
    "African": {
      background: "Ancient Egypt and Mali Empire.",
      culture: "Drumming, Oral Traditions."
    },
    "Middle Eastern": {
      background: "Mesopotamia and Islamic Golden Age.",
      culture: "Poetry, Architecture."
    }
  };

  const culture = cultureProfiles[ethnicity] || {
    background: "Unknown origins.",
    culture: "Diverse cultural expressions."
  };

  const countryCoords = {
    "Turkey": { lat: 39.9208, lng: 32.8541 },
    "France": { lat: 48.8566, lng: 2.3522 },
    "USA": { lat: 37.0902, lng: -95.7129 },
    "Japan": { lat: 36.2048, lng: 138.2529 }
  };

  const coords = countryCoords[country] || { lat: 0, lng: 0 };

  world.pointsData([
    { lat: coords.lat, lng: coords.lng, size: 1, color: 'red' }
  ]);

  const identityData = `
Name: ${name}
Birth Date: ${birthDate}
Race/Ethnicity: ${ethnicity}
Country: ${country}

--- World Stats at Birth ---
World Population: ${selectedStats.population}
Life Expectancy: ${selectedStats.life}

--- Ancestral Background ---
Historical Roots: ${culture.background}
Cultural Traits: ${culture.culture}

--- Genetic Estimate ---
European: 85%
Middle Eastern: 10%
Asian: 5%

--- Socio-Cultural Traits ---
Crime Tendency: Low
Suicide Risk: Medium
Talkativeness: High
Moral Integrity: High
Aesthetic Preference: Arts and Literature

--- Timeline ---
${birthYear}: Birth
2001: 9/11 Attacks
2020: COVID-19 Pandemic
`;

  output.textContent = '';
  typeWriter(identityData, 20);
});

// Yazı Yazma Animasyonu
function typeWriter(text, delay = 20) {
  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      output.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, delay);
}

 document.getElementById('downloadBtn').addEventListener('click', function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Dinamik Matrix Verisi
  const matrixInfo = `
[GENETIC HUMAN ID CARD]
- ID No: ${generateRandomID()}
- Entry Time: ${getCurrentTime()}
- Adaptation Score: ${generateRandomScore()}
- Threat Level: ${generateRandomScore()}
`;

  // Terminal verisi
  const outputText = document.getElementById('output').textContent;
  const content = matrixInfo + "\n\n" + outputText;

  doc.setFont('Courier', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(0, 255, 0);

  doc.text("HumanStockLive™ Gen Identity Certificate", 10, 10);
  const lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 10, 20);
  doc.save("GenIdentityCertificate.pdf");
});
// mevcut bildirim, crime reminders, weather fonksiyonları bitiyor

function generateRandomID() {
  return Math.floor(Math.random() * 90000) + 10000;
}

function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().slice(0, 8);
}

function generateRandomScore() {
  return Math.floor(Math.random() * 100) + 1;
}

// window.onload = () => { ... }
