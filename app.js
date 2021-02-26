// define UI variables 

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task');

//  load all Event Listener

loadEventListeners()


function loadEventListeners() {
  // DOM load event 
  document.addEventListener('DOMContentLoaded', getTasks);

  form.addEventListener('submit', addTask);
  // removeTask

  taskList.addEventListener('click', removeTask);
  // clearTask Button

  clearBtn.addEventListener('click', clearTask);
  // filter task
  filter.addEventListener('keyup', filterTasks)
}

// GET Tasks from ls
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //  add icon
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // append link to li 
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  })
}

// creating listItem
function addTask(e) {
  if (taskInput.value === '') {
    alert('add task first');
  } else {

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //  add icon
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // append link to li 
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);


    // store in loaca ls
    storeTaskInLocalStorage(taskInput.value);

    //  clear input
    taskInput.value = '';


    e.preventDefault();
  }
  
}
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {

    if (confirm('Are You Sure')) {
      e.target.parentElement.parentElement.remove();

      //  remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

  }
  function removeTaskFromLocalStorage(taskInput) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));


    }
    task.forEach(function (task, index) {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))

  }
}

// CLEAR TASK

function clearTask() {
  // taskList.innerHTML= '';  

  // fasterOne
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
    clearTaskFromLocalStorage()
  }

  function clearTaskFromLocalStorage() {
    localStorage.clear();
  }

  function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
      (function (task) {
        const item = task.firstChild.textContent;
        console.log(task)
        // debugger
        if (item.toLowerCase().indexOf(text) != -1) {
          task.style.display = 'block';
        } else {
          task.style.display = 'none';
        }
      })
  }
}
