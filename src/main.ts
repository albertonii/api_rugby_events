import "./style.css";

interface Evento {
  nombre: string;
  fecha: string;
  ubicacion: string;
  descripcion: string;
  cartel: string;
}

async function cargarEventos() {
  try {
    const res = await fetch("/data/events.json");
    const eventos: Evento[] = await res.json();

    const lista = document.getElementById("eventos");
    if (!lista) return;

    lista.innerHTML = "";

    eventos.forEach((evento) => {
      const item = document.createElement("li");

      item.className = `
        bg-yellow-50 border-l-4 border-green-900 shadow-md p-4 rounded-md space-y-2
        hover:bg-yellow-100 transition
      `;

      item.innerHTML = `
        <h2 class="text-xl font-bold text-green-900">${evento.nombre}</h2>
        <p class="text-sm text-gray-600">📅 ${evento.fecha} — 📍 ${
        evento.ubicacion
      }</p>
        <p class="text-gray-800">${evento.descripcion}</p>
        ${
          evento.cartel
            ? `<img src="${evento.cartel}" alt="Cartel de ${evento.nombre}" class="mt-2 rounded shadow max-h-60 w-auto border border-green-900" />`
            : ""
        }
      `;

      lista.appendChild(item);
    });
  } catch (err) {
    const lista = document.getElementById("eventos");
    if (lista) {
      lista.innerHTML =
        '<p class="text-red-600 font-semibold">Error al cargar eventos 😢</p>';
    }
    console.error("Error al cargar el archivo JSON:", err);
  }
}

cargarEventos();
