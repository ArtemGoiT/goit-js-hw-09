const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
const formObject = {};

function loadFormData() {
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    if (parsedData) {
      form.elements.email.value = parsedData.email;
      form.elements.message.value = parsedData.message;
      Object.assign(formObject, parsedData);
    }
  }
}

function saveFormData() {
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    formObject[key] = value.trim();
  });
  localStorage.setItem(localStorageKey, JSON.stringify(formObject));
}

function resetForm() {
  form.reset();
  localStorage.removeItem(localStorageKey);
}

form.addEventListener('input', () => {
  const formData = new FormData(form);

  formData.forEach((value, key) => {
    formObject[key] = value.trim();
  });

  localStorage.setItem(localStorageKey, JSON.stringify(formObject));
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;

  if (email === '' || message === '') {
    alert('All form fields must be filled in');
  } else {
    console.log(formObject);
    resetForm();
  }
});

loadFormData(); // Здесь вызываем функцию loadFormData() для загрузки данных при загрузке страницы
