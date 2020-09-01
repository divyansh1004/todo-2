//selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo')

//event listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deletecheck);
filterOption.addEventListener('click',filterTodo);

//functions
function addTodo(event){
    event.preventDefault();//prevent from submitting and refreshing
    //todoDiv
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo=document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value);
    //check mark button
    const completeButton=document.createElement("button");
    completeButton.innerHTML='<i class="fas fa-check"></i>'
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //delete button
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear input
    todoInput.value="";
}
function deletecheck(e){
    const item=e.target;
    //delete
    if(item.classList[0]==='trash-btn'){
        const todo=item.parentElement;
        todo.classList.add("fall");//animation
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
    }

    //check
    if(item.classList[0]==='complete-btn'){
    const todo=item.parentElement;
    todo.classList.toggle('completed');
}
}
function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo)
    {
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display="flex";
                }
                else
                {
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display="flex";
                }
                else
                {
                    todo.style.display="none";
                }
                break;


        }
    });
}
//to save todo list
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //todoDiv
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo=document.createElement("li");
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //check mark button
    const completeButton=document.createElement("button");
    completeButton.innerHTML='<i class="fas fa-check"></i>'
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //delete button
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    });
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}