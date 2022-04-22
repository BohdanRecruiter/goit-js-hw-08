import throttle from 'lodash.throttle';
const STORAGE_KEY_INPUT = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
const dataForm = new FormData(formRef);

function onInputChange(event) {
  let dataDict = {};
  const currentData = event.target.value.trim();
  const dataName = event.target.name;
  const currentStorageData = localStorage.getItem(STORAGE_KEY_INPUT);
  if (currentStorageData) {
    const parsedData = JSON.parse(currentStorageData);
    const keys = Object.keys(parsedData);

    keys.forEach(element => {
      dataDict[element] = parsedData[element];
    });
    dataDict[dataName] = currentData;

    localStorage.setItem(STORAGE_KEY_INPUT, JSON.stringify(dataDict));
  } else {
    dataDict[dataName] = currentData;
    localStorage.setItem(STORAGE_KEY_INPUT, JSON.stringify(dataDict));
  }
}
function checkStorage() {
  const storageData = localStorage.getItem(STORAGE_KEY_INPUT);
  if (storageData) {
    const storageDict = JSON.parse(storageData);
    const storageKeys = Object.keys(storageDict);
    storageKeys.forEach(element => {
      formRef[element].value = storageDict[element];
    });
  }
}
function onSubmitClick(event) {
  event.preventDefault();
  const dataForm = new FormData(event.currentTarget);
  dataForm.forEach((value, key) => {
    console.log(`${key} : ${value}`);
    formRef[key].value = '';
  });
  localStorage.clear();
}
checkStorage();
formRef.addEventListener('input', throttle(onInputChange, 500));
formRef.addEventListener('submit', onSubmitClick);
