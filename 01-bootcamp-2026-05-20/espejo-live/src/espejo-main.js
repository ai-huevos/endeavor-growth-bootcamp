import { ConvexClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { QUESTIONS, TRAMPAS, SESSION_CODE, computeTrampa } from "./questions.js";

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
const client = new ConvexClient(CONVEX_URL);

let state = {
  founderId: null,
  idx: 0,
  answers: Array(QUESTIONS.length).fill(null),
};

// ── Registration ──────────────────────────────────────────────────────────────

window.handleRegister = async function () {
  const name = document.getElementById("reg-name").value.trim();
  const company = document.getElementById("reg-company").value.trim();
  const email = document.getElementById("reg-email").value.trim();

  if (!name || !company || !email) {
    document.getElementById("reg-status").textContent = "Completa todos los campos.";
    return;
  }

  const btn = document.getElementById("btn-start");
  btn.disabled = true;
  document.getElementById("reg-status").textContent = "guardando...";

  try {
    state.founderId = await client.mutation(api.founders.register, {
      name, company, email, sessionCode: SESSION_CODE,
    });
    showScreen("quiz");
    renderQuestion();
  } catch (e) {
    console.error(e);
    document.getElementById("reg-status").textContent = "Error de conexión. Reintentando...";
    btn.disabled = false;
  }
};

// ── Quiz ──────────────────────────────────────────────────────────────────────

function renderProgress() {
  document.getElementById("progress").innerHTML = QUESTIONS.map((_, i) => {
    if (i < state.idx) return '<div class="dot done"></div>';
    if (i === state.idx) return '<div class="dot active"></div>';
    return '<div class="dot"></div>';
  }).join("");
}

function renderQuestion() {
  const q = QUESTIONS[state.idx];
  document.getElementById("qtag").textContent = q.tag;
  document.getElementById("qtext").textContent = q.text;
  document.getElementById("qhint").textContent = q.hint;
  document.getElementById("options").innerHTML = q.options
    .map((o, i) =>
      `<div class="option ${state.answers[state.idx] === i ? "selected" : ""}"
            onclick="selectOption(${i})">${o.text}</div>`
    )
    .join("");
  document.getElementById("btn-next").disabled = state.answers[state.idx] === null;
  renderProgress();
}

window.selectOption = async function (i) {
  state.answers[state.idx] = i;
  renderQuestion();

  // Save response immediately to Convex
  const q = QUESTIONS[state.idx];
  try {
    await client.mutation(api.founders.saveResponse, {
      founderId: state.founderId,
      questionIndex: state.idx,
      questionText: q.text,
      optionIndex: i,
      optionText: q.options[i].text,
      scores: q.options[i].scores,
    });
  } catch (e) {
    console.warn("Could not save response:", e);
  }
};

window.next = function () {
  if (state.idx < QUESTIONS.length - 1) {
    state.idx++;
    renderQuestion();
  } else {
    showResult();
  }
};

window.back = function () {
  if (state.idx === 0) {
    showScreen("register");
    return;
  }
  state.idx--;
  renderQuestion();
};

// ── Result ────────────────────────────────────────────────────────────────────

async function showResult() {
  const trampaKey = computeTrampa(state.answers);
  const trampa = TRAMPAS[trampaKey];

  document.getElementById("trampa-name").textContent = trampa.name;
  document.getElementById("reframe-text").textContent = trampa.reframe;
  document.getElementById("actions-list").innerHTML = trampa.actions
    .map((a, i) =>
      `<div class="action-item">
         <div class="action-num">${i + 1}</div>
         <div class="action-text">${a}</div>
       </div>`
    )
    .join("");
  document.getElementById("cluster-tag").textContent = trampa.cluster;

  showScreen("result");
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Save final result to Convex
  try {
    await client.mutation(api.founders.saveResult, {
      founderId: state.founderId,
      trampaKey,
      trampaName: trampa.name,
      cluster: trampa.cluster,
      reframe: trampa.reframe,
      actions: trampa.actions,
      sessionCode: SESSION_CODE,
    });
  } catch (e) {
    console.warn("Could not save result:", e);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function showScreen(name) {
  ["register", "quiz", "result"].forEach((s) => {
    const el = document.getElementById(`screen-${s}`);
    if (el) el.classList.toggle("hidden", s !== name);
  });
}
