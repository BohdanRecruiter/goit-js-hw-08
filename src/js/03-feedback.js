import throttle from 'lodash.throttle';
const STORAGE_KEY_INPUT = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
const dataForm = new FormData(formRef);
function setItemStor(key, string) {
  localStorage.setItem(key, string);
}
console.log(JSON.parse(null));
function onInputChange(event) {
  let dataDict = {};
  const currentData = event.target.value.trim();
  const dataName = event.target.name;
  const currentStorageData = localStorage.getItem(STORAGE_KEY_INPUT);
  const parsedData = JSON.parse(currentStorageData);
  const keys = parsedData ? Object.keys(parsedData) : undefined;
  if (currentStorageData) {
    keys.forEach(element => {
      dataDict[element] = parsedData[element];
    });
    dataDict[dataName] = currentData;

    setItemStor(STORAGE_KEY_INPUT, JSON.stringify(dataDict));
  } else {
    dataDict[dataName] = currentData;
    setItemStor(STORAGE_KEY_INPUT, JSON.stringify(dataDict));
  }
}

function checkStorage() {
  const storageData = localStorage.getItem(STORAGE_KEY_INPUT);
  const storageDict = JSON.parse(storageData);
  const storageKeys = storageDict ? Object.keys(storageDict) : undefined;
  if (storageData) {
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
