import { createButton } from "../FormView/untils.js";
import { names, statusValue } from "../../consts.js";

export function createTable(tableName, tableHeadNames){
    const table = document.createElement('table')
    table.classList.add(tableName);
    const tableHead = document.createElement('thead')
    const tr = document.createElement('tr')
    for (let key of tableHeadNames){
      const th = document.createElement('th');
      th.textContent = key;
      tr.append(th)
    }
    const tableBody = document.createElement('tbody')

    tableHead.append(tr);
    table.append(tableHead, tableBody)
    return table
  }

export function createListTasksItem({id, status, text}) {
    const isCompleted = status === statusValue.complete;
    const tr = document.createElement('tr');
    tr.classList.add('task_row');
    tr.id = id
    if(status === 'Complete'){
    tr.classList.add('complete')
    } 
    const deleteButton = createButton('Delete', {
        type : 'button',
        'data-row-id': id,
        class : 'delete',
        id : 'delete'
    });
    const completeButton = createButton(isCompleted ? 'Undo' : 'Complete', {
        id : isCompleted ? 'task_complete' : 'toCurrent',
        'data-row-id': id,
        class : isCompleted ? 'undoBtn' : 'completeBtn'
    });
    for (const head of names.tableHeadName){
        const tableCell = document.createElement('td');
        if(head === 'Task name'){
            tableCell.textContent = text;
            tableCell.classList.add('task_name')
        }
        if (head === 'Status'){
            tableCell.textContent = status;
        }
        if (head === 'Action'){
            tableCell.append(deleteButton, completeButton)
            tableCell.classList.add('actionTd')
        }
        tr.append(tableCell)
    }  
  return tr
  };
