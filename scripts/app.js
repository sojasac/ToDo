import {TodoView} from './view/indexView.js'
import {TaskModel} from './storage/model.js'


export class TodoController {
  constructor(){
    this.storage = new TaskModel();
    this.view = new TodoView({
      tasks : this.storage.getTasks(),
      onTaskAdd : this.createTaskRow,
      onRemoveTask : this.removeTaskRow,
      onToggleTaskStatus : this.completeTaskRow,
      onShowCompleteTasks : this.showCompleteTasks,
      onShowCurrentTasks : this.showCurrentTasks,
      onDelAllTasks : this.deleteAllTasks,
    })
    this.startPage = this.showCurrentTasks();
  }
  createTaskRow = (taskText) => {
    this.storage.addTask(taskText);
    this.view.renderTasks(this.storage.getTasks());
  }

  removeTaskRow = (taskId) => {
    this.view.removeTask(taskId);
    this.storage.removeTask(taskId);
  }
  completeTaskRow = (taskId) => {
    this.view.toggleTaskStatus(taskId);
    this.storage.toggleTask(taskId);
  }
  showCompleteTasks = () => {
    this.view.renderTasks(this.storage.getCompletedTasks());
  }
  showCurrentTasks = () => {
    this.view.renderTasks(this.storage.getCurrentTasks());
  }
  deleteAllTasks = () => {
    this.view.list.tBodies[0].innerHTML= '';
    this.storage.deleteAllTasks();
  }
}
