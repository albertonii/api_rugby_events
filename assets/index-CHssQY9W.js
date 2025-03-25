(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();async function n(){try{const t=await fetch("https://script.google.com/macros/s/AKfycbwCjbuwiaUmCP5T9nEg1jvlFMZaPCGdy_SVyHBKWsWqXP7OSgPNGaR7Zi8V4ZKV4d3g/exec");console.log("RESPONSE",t);const s=await t.json();console.log("EVENTOS",s);const o=document.getElementById("eventos");if(!o)return;o.innerHTML="",s.forEach(e=>{const r=document.createElement("li");r.className=`
        bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl
        rounded-xl p-6 space-y-3 transition hover:scale-[1.01] hover:border-white/20
        duration-300 ease-in-out
      `,r.innerHTML=`
        <h2 class="text-2xl font-semibold text-white tracking-tight">${e.nombre}</h2>
        <p class="text-sm text-gray-300">📅 ${e.fecha} — 📍 ${e.ubicacion}</p>
        <p class="text-gray-200 leading-relaxed">${e.descripcion}</p>
        ${e.cartel?`<img src="${e.cartel}" alt="Cartel de ${e.nombre}" class="mt-3 rounded-lg shadow-lg max-h-64 w-full object-cover border border-white/10" />`:""}
      `,o.appendChild(r)})}catch(c){const t=document.getElementById("eventos");t&&(t.innerHTML='<p class="text-red-500 font-semibold text-center">Error al cargar eventos 😢</p>'),console.error("Error al cargar el archivo JSON:",c)}}n();
