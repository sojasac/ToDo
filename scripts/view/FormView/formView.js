// Собираем нашу форму
import {createInput, createButton} from './untils.js';
import {names} from '../../consts.js';
// Создаём конкретную форму с использованием и кастомизацией функций создания общих элеметов
function createTasksForm(){
  const formContainer = document.createElement('form');
  formContainer.classList.add('form_container');

  const inputText = createInput({name : names.addInputName, type : 'text', placeholder : 'Enter your task...'});
  inputText.classList.add('enter_task')

  const addBtn = createButton ('Add', {name : names.addBtnName, type : 'submit'});
  addBtn.classList.add(names.addBtnName);

  const delAllBtn = createButton ('Delete all', {name : names.delAllBtnName, type : 'button'});
  delAllBtn.classList.add(names.delAllBtnName);

  const showCompletedBtn = createButton ('Show completed', {name : names.showComplBtnName, type : 'button'});
  showCompletedBtn.classList.add(names.showComplBtnName);

  const showCurrentBtn = createButton ('Show current', {name : names.showCurBtnName, type : 'button'});
  showCurrentBtn.classList.add(names.showCurBtnName);

  formContainer.append(inputText, addBtn, delAllBtn, showCompletedBtn, showCurrentBtn);
  return formContainer;
}

// Собираем форму
export class TaskForm {
  constructor(onTaskAdd, onShowCompleteTasks, onShowCurrentTasks, onDelAllTasks){
    this.form = createTasksForm();
    this.add = onTaskAdd;
    this.form.addEventListener('submit', this.formSubmit);
    this.form.addEventListener('click', ({target}) => {
      if(target.name ===  names.showComplBtnName){
        onShowCompleteTasks();
        this.form.elements[names.addInputName].disabled = true;
      }
      if (target.name ===  names.showCurBtnName){
        onShowCurrentTasks();    
        this.form.elements[names.addInputName].disabled = false;
      }
      if (target.name ===  names.delAllBtnName){
        onDelAllTasks();    
      }
    })
  }
  // получаем значение инпута и передаём его аргументом в функцию
  formSubmit = (event) => {
    event.preventDefault();
    const { value } = this.form.elements[names.addInputName]
    const correctValue = value.trim();
    // Создаём объект задания
    if(correctValue){
      this.add(correctValue);
      this.form.reset();
    }
  }
}
