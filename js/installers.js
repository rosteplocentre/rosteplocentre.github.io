const form = document.getElementById('installer-form');
const thanks = document.getElementById('thanks');
const submitBtn = document.getElementById('submit-btn');
const subjectField = document.getElementById('subject-field');
const nameField = document.getElementById('name-field');
const objectField = document.getElementById('object-field');
const messageField = document.getElementById('message-field');
const chips = document.querySelectorAll('.chip');
const insertSampleBtn = document.getElementById('insert-sample-btn');
const clearMessageBtn = document.getElementById('clear-message-btn');

function appendLineToMessage(text) {
  const current = messageField.value.trim();
  messageField.value = current ? `${current}\n${text}` : text;
  messageField.focus();
  messageField.setSelectionRange(messageField.value.length, messageField.value.length);
}

function insertSampleTemplate() {
  messageField.value =
`1. Труба PPR 20 — 52 м
2. Радиатор 10 секций — 3 шт
3. Срок: до 15.03
4. Комментарий: ___`;
  messageField.focus();
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const template = chip.dataset.template;
    appendLineToMessage(template);
  });
});

if (insertSampleBtn) {
  insertSampleBtn.addEventListener('click', insertSampleTemplate);
}

if (clearMessageBtn) {
  clearMessageBtn.addEventListener('click', () => {
    messageField.value = '';
    messageField.focus();
  });
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = nameField.value.trim() || 'Без имени';
  const object = objectField.value.trim() || 'Без объекта';
  subjectField.value = `Заявка от монтажника | ${name} | ${object}`;

  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Отправка...';
  submitBtn.disabled = true;

  try {
    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.style.display = 'none';
      thanks.style.display = 'block';
      form.reset();
      messageField.value = '';
    } else {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alert('Не удалось отправить заявку. Попробуйте ещё раз.');
    }
  } catch (error) {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    alert('Ошибка соединения. Попробуйте ещё раз.');
  }
});
