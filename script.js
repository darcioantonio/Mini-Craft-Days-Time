let timerInterval;
let timeLeft = 2400; // 40 minutos em segundos
let minecraftDays = 2; // Valor padrão de dias no Minecraft
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const alertSound = document.getElementById('alertSound');
const daysInput = document.getElementById('days');

function startTimer() {
  minecraftDays = parseInt(daysInput.value) || 2; // Usar valor da entrada de dias, se não válido, usar o padrão (2)
  timeLeft = minecraftDays * 20 * 60; // Converter dias em segundos
  timerInterval = setInterval(updateTimer, 1000);
  startBtn.disabled = true;
}

function updateTimer() {
  const days = Math.floor(timeLeft / (20 * 60 * 60)); // Converter segundos em dias
  const hours = Math.floor((timeLeft % (20 * 60 * 60)) / (60 * 60)); // Converter segundos restantes em horas
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60); // Converter segundos restantes em minutos
  const seconds = timeLeft % 60; // Obter segundos restantes

  let display = '';
  
  if (days > 0) {
    display += days + ' dias ';
  }
  
  if (hours > 0) {
    display += hours + ' horas ';
  }

  display += String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

  timerDisplay.textContent = display;
  
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    alertSound.play();
    startBtn.disabled = false;
  } else {
    timeLeft--;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = minecraftDays * 20 * 60; // Resetar o tempo para o valor dos dias no Minecraft
  timerDisplay.textContent = '40:00';
  startBtn.disabled = false;
  alertSound.pause(); // Pausar o som quando reiniciar
}

function updateDays() {
  minecraftDays = parseInt(daysInput.value) || 2; // Usar valor da entrada de dias, se não válido, usar o padrão (2)
  timeLeft = minecraftDays * 20 * 60; // Converter dias em segundos
  updateTimer(); // Atualizar instantaneamente o timer com o novo valor de dias
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
daysInput.addEventListener('input', updateDays); // Adicionar evento de escuta para mudanças no campo de entrada
