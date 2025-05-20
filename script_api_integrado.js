let diccionarioTI = {};

async function cargarDiccionario() {
  const response = await fetch("https://script.google.com/macros/s/AKfycbwKPE5y2GKfbBzISxC6OoafejEIgEyL23BKd7D2qBhThWov9Nwxr9oYmPsuudJs7WUv/exec");
  diccionarioTI = await response.json();
}

async function buscarTermino() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultadoDiv = document.getElementById("resultado");
  if (!input) {
    resultadoDiv.innerHTML = "Por favor, ingresa un término técnico.";
    return;
  }

  const resultado = diccionarioTI[input];
  if (resultado) {
    resultadoDiv.innerHTML = `<strong>{input.toUpperCase()}</strong>: {resultado}`;
  } else {
    resultadoDiv.innerHTML = `
      <p>No se encontró una definición para "<strong>{input}</strong>".</p>
      <p>¿Quieres agregarla?</p>
      <textarea id="nuevaDefinicion" placeholder="Escribe una definición clara aquí..." rows="4" cols="50"></textarea><br>
      <button onclick="guardarNuevoTermino('{input}')">Guardar término</button>
    `;
  }
}

async function guardarNuevoTermino(termino) {
  const definicion = document.getElementById("nuevaDefinicion").value.trim();
  if (!definicion) {
    alert("Por favor, escribe una definición antes de guardar.");
    return;
  }

  const payload = {
    termino: termino,
    definicion: definicion
  };

  const response = await fetch("https://script.google.com/macros/s/AKfycbwKPE5y2GKfbBzISxC6OoafejEIgEyL23BKd7D2qBhThWov9Nwxr9oYmPsuudJs7WUv/exec", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const resultado = await response.text();
  alert(resultado);
  await cargarDiccionario();
  document.getElementById("searchInput").value = "";
  document.getElementById("resultado").innerHTML = "¡Término agregado con éxito!";
}

window.onload = cargarDiccionario;
