import {createTable, createListTasksItem} from '../TableView/untils.js';
import {names} from '../../consts.js';

function createListTasks(){
  const table = createTable('content_tasks', names.tableHeadName)
  return table
}

export class TaskList {
  constructor(onRemoveTask, onToggleTaskStatus, tasks){
    this.list = createListTasks();
    this.createTasks(tasks);

    this.list.addEventListener('click', 
    ({target}) => {
      if (target.id === 'delete'){
        onRemoveTask(target.dataset.rowId);
      }
      else if (target.id === 'task_complete'){
        target.classList.toggle('complete_check')
        onToggleTaskStatus(target.dataset.rowId);
      } 
      else if (target.id === 'toCurrent'){
        onToggleTaskStatus(target.dataset.rowId);
      }
    })
    
  }

  createTasks(tasks){
    this.list.tBodies[0].innerHTML = '';
    if (tasks.length > 0){
      for (const task of tasks){
        this.list.tBodies[0].append(createListTasksItem(task));
      }
    }
  }

  removeTaskRow(taskId){
    const row = document.getElementById(taskId);
    if (row){
      row.remove()
    }
  }
  toggleTaskRow(taskId){
    const row = document.getElementById(taskId);
    if (row){
      row.classList.toggle('complete')
      row.remove()
    }
  } 
}
