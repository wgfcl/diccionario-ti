function buscarTermino() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultadoDiv = document.getElementById("resultado");
  if (input === "") {
    resultadoDiv.innerHTML = "Por favor, ingresa un término técnico.";
    return;
  }
  const resultado = diccionarioTI[input];
  if (resultado) {
    resultadoDiv.innerHTML = `<strong>${input.toUpperCase()}</strong>: ${resultado}`;
  } else {
    resultadoDiv.innerHTML = "No se encontró una definición para ese término.";
  }
}
