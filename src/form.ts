interface Evento {
  nombre: string;
  fecha: string;
  ubicacion: string;
  descripcion: string;
  cartel: string;
}

const form = document.getElementById("evento-form") as HTMLFormElement;
const salida = document.getElementById("salida-json");
const listaEventos: Evento[] = [];

const scriptURL =
  "https://script.google.com/macros/s/AKfycbzRjFr50TFM2aV8JhSP-Zz9MmzHo0d-L6R9103-FWk0QSQOz7MR-3mboRWuyRnFX8X2/exec"; // 👈 tu URL aquí

// Cargar datos existentes desde events.json
async function cargarEventosExistentes() {
  try {
    const res = await fetch(scriptURL, {
      method: "GET",
    });
    const eventos: Evento[] = await res.json();

    listaEventos.push(...eventos);
    if (salida) {
      salida.textContent = JSON.stringify(listaEventos, null, 2);
    }
  } catch (error) {
    console.error("Error al cargar events.json:", error);
    if (salida)
      salida.textContent = "⚠️ No se pudo cargar el archivo events.json";
  }
}
cargarEventosExistentes();

// Agregar nuevo evento
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoEvento: Evento = {
    nombre: (document.getElementById("nombre") as HTMLInputElement).value,
    fecha: (document.getElementById("fecha") as HTMLInputElement).value,
    ubicacion: (document.getElementById("ubicacion") as HTMLInputElement).value,
    descripcion: (document.getElementById("descripcion") as HTMLTextAreaElement)
      .value,
    cartel: (document.getElementById("cartel") as HTMLInputElement).value,
  };

  listaEventos.push(nuevoEvento);
  if (salida) salida.textContent = JSON.stringify(listaEventos, null, 2);

  // Enviar a Google Sheets
  fetch(scriptURL, {
    redirect: "follow",
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(nuevoEvento),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Guardado en Google Sheets:", data);
      alert("✅ Evento guardado en Google Sheets");
    })
    .catch((err) => {
      console.error("Error al guardar en Google Sheets:", err);
      alert("⚠️ Error al guardar en Google Sheets");
    });

  form.reset();
});

// Botón para descargar todos los eventos como JSON
const botonDescargar = document.createElement("button");
botonDescargar.textContent = "Descargar events.json";
botonDescargar.className =
  "mt-6 bg-green-900 text-yellow-50 px-4 py-2 rounded hover:bg-green-800 transition";
botonDescargar.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(listaEventos, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "events.json";
  a.click();
  URL.revokeObjectURL(url);
});

salida?.parentElement?.appendChild(botonDescargar);
