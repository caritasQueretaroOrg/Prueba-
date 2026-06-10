const plans = {
  hour: {
    title: 'Plan por 1 hora',
    resultTitle: 'Acceso concedido',
    resultMessage: 'La identidad y el chip fueron vinculados correctamente. Tu acceso de una hora al Sistema Utopias ya está disponible.',
    actionText: 'Entrar al sistema'
  },
  body: {
    title: 'Plan de por vida conservando tu cuerpo',
    resultTitle: 'Proceso corporal programado',
    resultMessage: 'Nuestro equipo se pondrá en contacto contigo dentro de 1 a 2 días para continuar con el proceso de preservación corporal.',
    actionText: 'Volver al inicio'
  },
  brain: {
    title: 'Plan de vida conservando tu cerebro',
    resultTitle: 'Proceso neural programado',
    resultMessage: 'Nuestro equipo se pondrá en contacto contigo dentro de 1 a 2 días para continuar con el proceso de conversión neural.',
    actionText: 'Volver al inicio'
  }
};

const modal = document.getElementById('planModal');
const closeButton = document.getElementById('closePlanModal');
const formView = document.getElementById('planFormView');
const resultView = document.getElementById('planResultView');
const form = document.getElementById('planForm');
const selectedPlanTitle = document.getElementById('selectedPlanTitle');
const resultTitle = document.getElementById('planResultTitle');
const resultMessage = document.getElementById('planResultMessage');
const resultAction = document.getElementById('planResultAction');

let selectedPlan = null;

function openPlanModal(planId) {
  selectedPlan = plans[planId];
  selectedPlanTitle.textContent = selectedPlan.title;
  form.reset();
  formView.classList.remove('hidden');
  resultView.classList.add('hidden');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
  form.elements.fullName.focus();
}

function closePlanModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
  selectedPlan = null;
}

document.querySelectorAll('.plan-button').forEach((button) => {
  button.addEventListener('click', () => openPlanModal(button.dataset.plan));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.reportValidity() || !selectedPlan) {
    return;
  }

  resultTitle.textContent = selectedPlan.resultTitle;
  resultMessage.textContent = selectedPlan.resultMessage;
  resultAction.textContent = selectedPlan.actionText;
  formView.classList.add('hidden');
  resultView.classList.remove('hidden');
});

closeButton.addEventListener('click', closePlanModal);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closePlanModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closePlanModal();
  }
});
