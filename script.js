const exerciseTimers = {
  sentadilla: { defaultTime: 90, timeLeft: 90, interval: null },
  bulgara: { defaultTime: 90, timeLeft: 90, interval: null },
  puente: { defaultTime: 60, timeLeft: 60, interval: null },
  aductor: { defaultTime: 60, timeLeft: 60, interval: null },
  rumano: { defaultTime: 120, timeLeft: 120, interval: null },

  d2supino: { defaultTime: 90, timeLeft: 90, interval: null },
  d2press: { defaultTime: 90, timeLeft: 90, interval: null },
  d2aperturas: { defaultTime: 60, timeLeft: 60, interval: null },
  d2laterales: { defaultTime: 60, timeLeft: 60, interval: null },
  d2frontales: { defaultTime: 60, timeLeft: 60, interval: null },
  d2triceps: { defaultTime: 60, timeLeft: 60, interval: null },

  d3mancuerna: { defaultTime: 90, timeLeft: 90, interval: null },
  d3banda: { defaultTime: 60, timeLeft: 60, interval: null },
  d3pajaritos: { defaultTime: 60, timeLeft: 60, interval: null },
  d3biceps: { defaultTime: 60, timeLeft: 60, interval: null },
  d3martillo: { defaultTime: 60, timeLeft: 60, interval: null }
};

function updateExerciseDisplay(timerId) {
  const timer = exerciseTimers[timerId];
  const display = document.getElementById(`display-${timerId}`);

  if (!timer || !display) return;

  const minutes = String(Math.floor(timer.timeLeft / 60)).padStart(2, "0");
  const seconds = String(timer.timeLeft % 60).padStart(2, "0");
  display.textContent = `${minutes}:${seconds}`;
}

function setExerciseTimer(timerId, seconds) {
  const timer = exerciseTimers[timerId];
  if (!timer) return;

  clearInterval(timer.interval);
  timer.interval = null;
  timer.defaultTime = seconds;
  timer.timeLeft = seconds;
  updateExerciseDisplay(timerId);
}

function startExerciseTimer(timerId) {
  const timer = exerciseTimers[timerId];
  if (!timer || timer.interval) return;

  timer.interval = setInterval(() => {
    if (timer.timeLeft > 0) {
      timer.timeLeft--;
      updateExerciseDisplay(timerId);
    } else {
      clearInterval(timer.interval);
      timer.interval = null;
      alert("Descanso terminado");
    }
  }, 1000);
}

function pauseExerciseTimer(timerId) {
  const timer = exerciseTimers[timerId];
  if (!timer) return;

  clearInterval(timer.interval);
  timer.interval = null;
}

function resetExerciseTimer(timerId) {
  const timer = exerciseTimers[timerId];
  if (!timer) return;

  clearInterval(timer.interval);
  timer.interval = null;
  timer.timeLeft = timer.defaultTime;
  updateExerciseDisplay(timerId);
}

function saveExerciseLog(exerciseKey) {
  const pesoInput = document.getElementById(`${exerciseKey}-peso`);
  const repsInput = document.getElementById(`${exerciseKey}-reps`);
  const notaInput = document.getElementById(`${exerciseKey}-nota`);
  const output = document.getElementById(`${exerciseKey}-output`);

  if (!pesoInput || !repsInput || !notaInput || !output) return;

  const data = {
    peso: pesoInput.value.trim(),
    reps: repsInput.value.trim(),
    nota: notaInput.value.trim(),
    fecha: new Date().toLocaleDateString("es-ES")
  };

  localStorage.setItem(`gym-${exerciseKey}`, JSON.stringify(data));
  renderExerciseLog(exerciseKey);
}

function renderExerciseLog(exerciseKey) {
  const output = document.getElementById(`${exerciseKey}-output`);
  if (!output) return;

  const saved = localStorage.getItem(`gym-${exerciseKey}`);

  if (!saved) {
    output.textContent = "Sin registro guardado todavía.";
    return;
  }

  const data = JSON.parse(saved);

  output.innerHTML = `
    <strong>Último registro:</strong><br>
    Peso: ${data.peso || "-"} kg<br>
    Reps: ${data.reps || "-"}<br>
    Nota: ${data.nota || "-"}<br>
    Fecha: ${data.fecha || "-"}
  `;

  const pesoInput = document.getElementById(`${exerciseKey}-peso`);
  const repsInput = document.getElementById(`${exerciseKey}-reps`);
  const notaInput = document.getElementById(`${exerciseKey}-nota`);

  if (pesoInput) pesoInput.value = data.peso || "";
  if (repsInput) repsInput.value = data.reps || "";
  if (notaInput) notaInput.value = data.nota || "";
}

function clearExerciseLog(exerciseKey) {
  localStorage.removeItem(`gym-${exerciseKey}`);

  const pesoInput = document.getElementById(`${exerciseKey}-peso`);
  const repsInput = document.getElementById(`${exerciseKey}-reps`);
  const notaInput = document.getElementById(`${exerciseKey}-nota`);
  const output = document.getElementById(`${exerciseKey}-output`);

  if (pesoInput) pesoInput.value = "";
  if (repsInput) repsInput.value = "";
  if (notaInput) notaInput.value = "";

  if (output) {
    output.textContent = "Sin registro guardado todavía.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Object.keys(exerciseTimers).forEach(updateExerciseDisplay);

  const exercises = [
    "d1-sentadilla",
    "d1-bulgara",
    "d1-puente",
    "d1-aductor",
    "d1-rumano",

    "d2-supino",
    "d2-press",
    "d2-aperturas",
    "d2-laterales",
    "d2-frontales",
    "d2-triceps",

    "d3-mancuerna",
    "d3-banda",
    "d3-pajaritos",
    "d3-biceps",
    "d3-martillo"
  ];

  exercises.forEach(renderExerciseLog);
});