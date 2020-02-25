//define vars

// const taskInput = document.querySelector('#task')

const taskForm = document.querySelector('#task-form')
const tasksCollection = document.querySelector('.collection')
const filterInput = document.querySelector('#filter')
const clearTasksBtn = document.querySelector('.clear-tasks')
const taskInput = document.querySelector('#task')

//event listener
document.addEventListener('DOMContentLoaded',showTask)
taskForm.addEventListener('submit',getTask)
tasksCollection.addEventListener('click',deleteTask)
filterInput.addEventListener('keyup',filterTasks)
clearTasksBtn.addEventListener('click',clearTasks)

function getTask(e){
  e.preventDefault()
  if(taskInput.value !=''){
    setLocalStorage(taskInput.value)
    const li = document.createElement('li');
    li.className='collection-item'
    const link= document.createElement('a');
    link.className='delete-item secondary-content'
    link.innerHTML='<i class="fa fa-remove"><i>'
    li.appendChild(link)
    li.appendChild(document.createTextNode(taskInput.value));
    const container= document.querySelector('.collection')
    const a = document.querySelector('.cleat-tasks')
    container.insertBefore(li,a)
    clearInput()
  }else{
    alert('check input')
  }
}

function showTask(){
  const items = JSON.parse(localStorage.getItem('tasks'));
  if(items != null){
    items.forEach(item => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    li.className='collection-item'
    const link= document.createElement('a');
    link.className='delete-item secondary-content'
    link.innerHTML='<i class="fa fa-remove"><i>'
    li.appendChild(link)
   
    const container= document.querySelector('.collection')
    const a = document.querySelector('.cleat-tasks')
    container.insertBefore(li,a)
    });
  }

}

function deleteTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove()
    deleteFromlocal(e.target.parentElement.parentElement.textContent)
  }
}

function filterTasks(e){
  console.log(e)
}

function setLocalStorage(data){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks=[];
  }else{
    tasks= JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(data)
  localStorage.setItem('tasks',JSON.stringify(tasks))
}

function deleteFromlocal(data){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks= JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task,index) =>{
      if(data === task){
        tasks.splice(index,1)
      }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
  }
}

function clearTasks(){
  while(tasksCollection.firstChild){
    tasksCollection.removeChild(tasksCollection.firstChild)
  }
  localStorage.clear()
}

function clearInput(){
  taskInput.value='';
}

function filterTasks(e){
  const text = e.target.value;
  const tasks = document.querySelectorAll('.collection-item');
  tasks.forEach(task =>{
    item = task.firstChild.textContent;
    if(item.indexOf(text) != -1){
      task.style.display='block'
    }else{
      task.style.display='none';
    }
  })
}
