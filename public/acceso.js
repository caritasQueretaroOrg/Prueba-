const modal = document.getElementById('accessModal');
const message = document.getElementById('accessMessage');
const progress = document.getElementById('accessProgress');
const accessButton = document.getElementById('accessButton');
const startAnalysis = document.getElementById('startAnalysis');

const stages = [
  'Analizando computadora',
  'Reconocimiento facial',
  'Acceso concedido'
];

let currentStage = 0;

function showStage() {
  message.textContent = stages[currentStage];
  progress.classList.remove('access-progress');
  void progress.offsetWidth;
  progress.classList.add('access-progress');

  if (currentStage === stages.length - 1) {
    accessButton.classList.remove('hidden');
    accessButton.classList.add('inline-block');
    return;
  }

  window.setTimeout(() => {
    currentStage += 1;
    showStage();
  }, 5000);
}

startAnalysis.addEventListener('click', () => {
  startAnalysis.disabled = true;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  showStage();
});
