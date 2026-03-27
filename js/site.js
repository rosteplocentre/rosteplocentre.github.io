const contactForm = document.getElementById('contact-form');
const formThanks = document.getElementById('form-thanks');

if (contactForm && formThanks) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Отправка...';
    }

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        contactForm.style.display = 'none';
        formThanks.style.display = 'block';
        contactForm.reset();
      } else {
        alert('Не удалось отправить заявку. Попробуйте ещё раз.');
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    } catch (error) {
      alert('Ошибка соединения. Попробуйте ещё раз.');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

