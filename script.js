const API_KEY = "TU_API_KEY";

function analizar() {
  const ticker = document.getElementById("empresa").value;

  fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const precio = data["Global Quote"]["05. price"];

      let decision = precio > 150 ? "🟢 COMPRAR" : "🔴 RIESGO";

      document.getElementById("resultado").innerHTML = `
        <h2>${ticker}</h2>
        <p>Precio actual: $${precio}</p>
        <p>Decisión IA: ${decision}</p>
      `;
    });
}
