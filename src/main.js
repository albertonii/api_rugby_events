import "./index.css";
async function cargarEventos() {
    try {
        const scriptURL = "https://script.google.com/macros/s/AKfycbwCjbuwiaUmCP5T9nEg1jvlFMZaPCGdy_SVyHBKWsWqXP7OSgPNGaR7Zi8V4ZKV4d3g/exec";
        const res = await fetch(scriptURL, {
            redirect: "follow",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
        console.log("RESPONSE", res);
        const eventos = await res.json();
        console.log("EVENTOS", eventos);
        const lista = document.getElementById("eventos");
        if (!lista)
            return;
        lista.innerHTML = "";
        eventos.forEach((evento) => {
            const item = document.createElement("li");
            item.className = `
        bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl
        rounded-xl p-6 space-y-3 transition hover:scale-[1.01] hover:border-white/20
        duration-300 ease-in-out
      `;
            item.innerHTML = `
        <h2 class="text-2xl font-semibold text-white tracking-tight">${evento.nombre}</h2>
        <p class="text-sm text-gray-300">📅 ${evento.fecha} — 📍 ${evento.ubicacion}</p>
        <p class="text-gray-200 leading-relaxed">${evento.descripcion}</p>
        ${evento.cartel
                ? `<img src="${evento.cartel}" alt="Cartel de ${evento.nombre}" class="mt-3 rounded-lg shadow-lg max-h-64 w-full object-cover border border-white/10" />`
                : ""}
      `;
            lista.appendChild(item);
        });
    }
    catch (err) {
        const lista = document.getElementById("eventos");
        if (lista) {
            lista.innerHTML =
                '<p class="text-red-500 font-semibold text-center">Error al cargar eventos 😢</p>';
        }
        console.error("Error al cargar el archivo JSON:", err);
    }
}
cargarEventos();
