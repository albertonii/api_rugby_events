"use strict";
const form = document.getElementById("evento-form");
const salida = document.getElementById("salida-json");
const listaEventos = [];
const scriptURL = "https://script.google.com/macros/s/AKfycbwCjbuwiaUmCP5T9nEg1jvlFMZaPCGdy_SVyHBKWsWqXP7OSgPNGaR7Zi8V4ZKV4d3g/exec"; // 👈 tu URL aquí
// Cargar datos existentes desde events.json
async function cargarEventosExistentes() {
    try {
        const res = await fetch(scriptURL, {
            method: "GET",
        });
        const eventos = await res.json();
        listaEventos.push(...eventos);
        if (salida) {
            salida.textContent = JSON.stringify(listaEventos, null, 2);
        }
    }
    catch (error) {
        console.error("Error al cargar events.json:", error);
        if (salida)
            salida.textContent = "⚠️ No se pudo cargar el archivo events.json";
    }
}
cargarEventosExistentes();
// Agregar nuevo evento
form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevoEvento = {
        nombre: document.getElementById("nombre").value,
        fecha: document.getElementById("fecha").value,
        ubicacion: document.getElementById("ubicacion").value,
        descripcion: document.getElementById("descripcion")
            .value,
        cartel: document.getElementById("cartel").value,
    };
    listaEventos.push(nuevoEvento);
    if (salida)
        salida.textContent = JSON.stringify(listaEventos, null, 2);
    // Enviar a Google Sheets
    fetch(scriptURL, {
        redirect: "follow",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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
