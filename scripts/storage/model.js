import { statusValue } from "../consts.js";
const LocalStorageKey = {
  Tasks: 'tasks'
};



export class TaskModel {
  constructor () {
    const savedTasks = localStorage.getItem(LocalStorageKey.Tasks);
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
    this.addTask = (taskText) => {
      const newTask = {
        status: statusValue.inProgress,
        text: taskText,
        id: window.crypto.randomUUID()
      }
      this.tasks.push(newTask);
      localStorage.setItem(LocalStorageKey.Tasks, JSON.stringify(this.tasks));
      return newTask;
    }
    this.getTasks = () => { 
      return this.tasks.slice();
    }
    this.getCurrentTasks = () =>{
      return this.tasks.slice().filter(({status}) =>  status === statusValue.inProgress);
    }
    this.getCompletedTasks = () =>{
      return this.tasks.slice().filter(({status}) =>  status === statusValue.complete);
    }
    this.removeTask = (taskId) => {
      const indexToRemove = this.tasks.findIndex(({ id }) => id === taskId);
      if (indexToRemove > -1) {
        this.tasks.splice(indexToRemove, 1)
      }
      if (this.tasks.length === 0) { 
          localStorage.removeItem(LocalStorageKey.Tasks);
      } else {
        localStorage.setItem(LocalStorageKey.Tasks, JSON.stringify(this.tasks));
      }
      return this.tasks.slice();
    }
    this.toggleTask = (taskId) => {
      const indexToComplete = this.tasks.findIndex(({ id }) => id === taskId);
      this.tasks.forEach((el, index) => {
      if(index === indexToComplete){
        if(el.status === 'Complete'){
          el.status = 'In progress'
        } else {
          el.status = 'Complete'
        }
      }
    });
    localStorage.setItem(LocalStorageKey.Tasks, JSON.stringify(this.tasks));
      return this.tasks.slice();
    }
    this.deleteAllTasks = () =>{
      this.tasks.splice(0, this.tasks.length)
      localStorage.removeItem(LocalStorageKey.Tasks);
    }
  }
}
