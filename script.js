const API_KEY = "TU_API_KEY";

async function analizar() {
  const ticker = document.getElementById("empresa").value;

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  const series = data["Time Series (Daily)"];

  const fechas = [];
  const precios = [];

  for (let fecha in series) {
    fechas.push(fecha);
    precios.push(parseFloat(series[fecha]["4. close"]));
  }

  fechas.reverse();
  precios.reverse();

  const media = precios.slice(-20).reduce((a,b)=>a+b,0)/20;
  const precioActual = precios[precios.length - 1];

  const decision = precioActual > media ? "🟢 COMPRAR" : "🔴 RIESGO";

  document.getElementById("resultado").innerHTML = `
    <p>Precio actual: $${precioActual.toFixed(2)}</p>
    <p>Media móvil (20 días): $${media.toFixed(2)}</p>
    <p>Decisión IA: ${decision}</p>
  `;

  graficar(fechas.slice(-30), precios.slice(-30));
}

function graficar(labels, data) {
  const ctx = document.getElementById("grafica").getContext("2d");
  if (window.chart) window.chart.destroy();

  window.chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Precio",
        data: data,
        borderWidth: 2
      }]
    }
  });
}
