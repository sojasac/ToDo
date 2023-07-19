// Файл отрисовки
import {TaskForm} from './FormView/formView.js';
import {TaskList} from './TableView/listView.js';


// Собираем нашу отрисовку с ивентами
export class TodoView {
  constructor({
    onTaskAdd, 
    onRemoveTask, 
    onToggleTaskStatus, 
    tasks, 
    onShowCompleteTasks, 
    onShowCurrentTasks,
    onDelAllTasks}){
    this.newTaskForm = new TaskForm(onTaskAdd, onShowCompleteTasks, onShowCurrentTasks, onDelAllTasks)
    this.newTaskList = new TaskList(onRemoveTask, onToggleTaskStatus, tasks);
    this.list = this.newTaskList.list

    const form = document.getElementById('todo_app');
    form.append(this.newTaskForm.form, this.list)
  }

  renderTasks (tasks){
    this.newTaskList.createTasks(tasks)
  }

  removeTask(taskId){
    this.newTaskList.removeTaskRow(taskId);
  }
  toggleTaskStatus(taskId){
    this.newTaskList.toggleTaskRow(taskId);
  }
}
