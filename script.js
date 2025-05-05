async function fetchAIInsight(inputText) {
  const response = await fetch("https://humanstocklive-1.onrender.com/api/gpt", {
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

document.getElementById("userForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const birthDate = document.getElementById("birthDate").value;
  const ethnicity = document.getElementById("ethnicity").value;
  const country = document.getElementById("country").value;

  const prompt = `Adı: ${name}, Doğum Tarihi: ${birthDate}, Etnik köken: ${ethnicity}, Ülke: ${country}. Bu kişiye ait genetik uyum, risk, potansiyel ve güçlü yönler hakkında yorum yap.`;

  await fetchAIInsight(prompt);
});
