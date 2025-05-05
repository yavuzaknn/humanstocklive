// 🔐 GPT tabanlı gerçek yapay zekâ sistemi
async function fetchAIInsight(inputText) {
  const response = await fetch("https://humanstocklive.onrender.com/api/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: inputText })
  });

  const data = await response.json();
  const output = data.output;
  document.getElementById("insight-text").innerText = output;
}

// 🧭 Ülke koordinatını bul ve işaretle
async function locateCountry(countryName) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();
    const latlng = data[0].latlng;
    addCountryMarker(latlng[0], latlng[1], countryName);
  } catch (error) {
    console.error("Ülke koordinatları alınamadı:", error);
  }
}

// Form gönderildiğinde yapay zekâ yorumunu getir
document.getElementById("userForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const birthDate = document.getElementById("birthDate").value;
  const ethnicity = document.getElementById("ethnicity").value;
  const country = document.getElementById("country").value;

  const prompt = `Adı: ${name}, Doğum Tarihi: ${birthDate}, Etnik köken: ${ethnicity}, Ülke: ${country}. Bu kişiye ait genetik uyum, risk, potansiyel ve güçlü yönler hakkında yorum yap.`;

  await fetchAIInsight(prompt);
  await locateCountry(country);
});
