import { ConvexClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { SESSION_CODE, TRAMPAS } from "./questions.js";

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
const client = new ConvexClient(CONVEX_URL);

const TRAMPA_LABELS = {
  medir: "Pides tácticas. Necesitas instrumentos.",
  founder: "Tu sistema se llama tu nombre.",
  ia: "Pides a la IA que venda. Debería pensar.",
  normativo: "Buscas un lead magnet. La norma te lo da gratis.",
  traduccion: "Tu diferencial es técnico. El cliente no es técnico.",
  precio: "Estás vendiendo premium a precio de bait.",
  revenuehole: "Tienes 5 problemas. Tienes UNO.",
  decisiones: "Cambias de foco constantemente.",
};

// Set app URL display
const appUrl = window.location.origin;
document.getElementById("app-url").textContent = appUrl;

// Simple QR via API (no extra library)
const qrImg = document.createElement("img");
qrImg.style.cssText = "width:100px;height:100px;border-radius:4px;";
qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}`;
qrImg.onerror = () => { document.getElementById("qr-box").textContent = appUrl; };
document.getElementById("qr-box").innerHTML = "";
document.getElementById("qr-box").appendChild(qrImg);

// Subscribe to real-time results
client.onUpdate(
  api.founders.listResultsBySession,
  { sessionCode: SESSION_CODE },
  (results) => {
    renderDashboard(results);
  },
  (err) => console.error("Convex error:", err)
);

function renderDashboard(results) {
  const total = results.length;

  // Counters
  document.getElementById("cnt-total").textContent = total;
  document.getElementById("cnt-done").textContent = total;

  if (total === 0) return;

  // Cluster distribution
  const clusters = { A: 0, B: 0, C: 0 };
  results.forEach((r) => {
    if (r.cluster.includes("Cluster A")) clusters.A++;
    else if (r.cluster.includes("Cluster B")) clusters.B++;
    else if (r.cluster.includes("Cluster C")) clusters.C++;
  });
  const maxCluster = Math.max(...Object.values(clusters), 1);
  document.getElementById("cluster-a-count").textContent = clusters.A;
  document.getElementById("cluster-b-count").textContent = clusters.B;
  document.getElementById("cluster-c-count").textContent = clusters.C;
  document.getElementById("bar-a").style.width = `${(clusters.A / maxCluster) * 100}%`;
  document.getElementById("bar-b").style.width = `${(clusters.B / maxCluster) * 100}%`;
  document.getElementById("bar-c").style.width = `${(clusters.C / maxCluster) * 100}%`;

  // Trampa frequency
  const trampaCounts = {};
  results.forEach((r) => {
    trampaCounts[r.trampaKey] = (trampaCounts[r.trampaKey] || 0) + 1;
  });
  const sorted = Object.entries(trampaCounts).sort((a, b) => b[1] - a[1]);

  // Top trampa counter
  if (sorted.length > 0) {
    document.getElementById("cnt-top").textContent = TRAMPA_LABELS[sorted[0][0]].split(".")[0];
  }

  // Trampa list
  document.getElementById("trampa-list").innerHTML = sorted.slice(0, 5)
    .map(([key, count]) =>
      `<div class="trampa-item">
         <span class="trampa-label">${TRAMPA_LABELS[key]}</span>
         <span class="trampa-badge">${count}</span>
       </div>`
    )
    .join("");

  // Feed — most recent first (limit 8)
  const recent = [...results].reverse().slice(0, 8);
  document.getElementById("feed-list").innerHTML = recent
    .map((r) => {
      const name = r.founder?.name || "Founder";
      const company = r.founder?.company || "";
      const initial = name.charAt(0).toUpperCase();
      return `<div class="feed-item">
        <div class="feed-avatar">${initial}</div>
        <div class="feed-body">
          <div class="feed-name">${name}</div>
          <div class="feed-company">${company}</div>
          <div class="feed-trampa">${r.trampaName}</div>
        </div>
        <div class="feed-cluster">${r.cluster.split(" · ")[0]}</div>
      </div>`;
    })
    .join("");
}
