
document.addEventListener("DOMContentLoaded", () => {
  let toDoForm = document.querySelector('#create-task-form');
  toDoForm.addEventListener('submit', e => {
    e.preventDefault();
    const taskText = e.target.querySelector('input#new-task-description').value;
    const taskPriority = e.target.querySelector('input#priority_select').value;
    const taskDueDate = e.target.querySelector('input#date_select').value;
    postTask(createTask(taskText, taskPriority, taskDueDate));
    toDoForm.reset();
  })
});

function createTask(taskDescription, taskPriority, taskDueDate) {
  let removeBtn = buildRemoveBtn();
  let task = buildTaskFramework(taskPriority);
  let properDescription = `${taskDescription.charAt(0).toUpperCase()}${taskDescription.slice(1)}`;
  task.firstChild.appendChild(removeBtn);
  task.firstChild.nextSibling.textContent = ` ${properDescription} (${taskPriority})`;
  task.lastChild.textContent = `Due: ${taskDueDate}`;
  return task;
}

function buildTaskFramework (priority) {
  let taskCont = document.createElement('tr');
  taskCont.className = `${priority.toLowerCase()}_priority_task`;
  let btnCont = document.createElement('td');
  btnCont.className = 'remove_btn_container';
  let descCont = document.createElement('td');
  descCont.className = 'task_text_container';
  let dateCont = document.createElement('td');
  dateCont.className = 'task_due_date_container';
  taskCont.appendChild(btnCont);
  taskCont.appendChild(descCont);
  taskCont.appendChild(dateCont);
  return taskCont;
}

function postTask(newTask) {
  let taskList = document.querySelector('table#tasks');
  taskList.appendChild(newTask);
}

function buildRemoveBtn() {
  let btn = document.createElement('button');
  btn.textContent = 'X';
  btn.addEventListener('click', handleTaskRemove);
  return btn;
}

function handleTaskRemove (e) {
  e.target.parentNode.parentNode.remove();
}