import { addtohistory } from './history.js';

const todoList = JSON.parse(localStorage.getItem('todos')) || [];
const completed = JSON.parse(localStorage.getItem('completedTodos')) || [];

window.onload = () => {
    rendertodo();
    renderTodocom();
};

document.querySelector('.addButton').addEventListener('click', () =>{
    const name = document.querySelector('.newTodo').value;
    const date = document.querySelector('.newDate').value;
    if (name === '' || date === '') {
        alert('Please enter a todo and a date');
        return; // 🔁 This stops the function
    }
    addTodo(name, date);
    document.querySelector('.newTodo').value = '';
    document.querySelector('.newDate').value = '';
});

document.querySelector('.newTodo').addEventListener('keydown', (event)=>{
    if (event.key === 'Enter') {addTodo();
        document.querySelector('.newTodo').value = '';
    }
})

function addTodo(name, date){
    todoList.push({name, date});
    saveTodos();
    rendertodo();
};

function rendertodo(){
    const todoContainer = document.querySelector('.todoList');
    let html = '';
    todoList.forEach(({name, date})=>{
        html = html + `<div class='todoBox'><p class="todoText">${name}</p> <p class="todoDate">${date}</p> <button class="deleteTodo">Completed</button></div>`;
    });
    todoContainer.innerHTML = html;
    completedtodo(); 
};

function completedtodo(){
    document.querySelectorAll('.deleteTodo').forEach((button, i)=>{
    button.addEventListener('click', ()=>{
        const removed = todoList.splice(i, 1);
        saveTodos();
        rendertodo();
        addtodocom({name: removed[0].name, date: removed[0].date});
    });
    });
};

function addtodocom({name, date}){
    completed.push({name, date});
    saveCompleted();
    renderTodocom();
}

export function renderTodocom(){
    const deleteContainer = document.querySelector('.deleted');
    let html = '';
    completed.forEach(({name, date})=>{
        html = html + `<div class="todoBoxD"><p class="todoTextD">${name}</p> <p class="todoDateD">${date}</p>
            <button class="deleteTodoD">Delete</button></div>`
    });
    deleteContainer.innerHTML = html;
    tohistory();
    undoTodo();
}

function undoTodo(){
    document.querySelectorAll('.undo').forEach((button, i)=>{
        button.addEventListener('click', ()=>{
            const undo = completed.splice(i, 1);
            renderTodocom();
            saveCompleted();
            addTodo(undo[0].name, undo[0].date);

        });
    });
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todoList));
}

function saveCompleted() {
    localStorage.setItem('completedTodos', JSON.stringify(completed));
}

function tohistory(){
    document.querySelectorAll('.deleteTodoD').forEach((button, i)=>{
    button.addEventListener('click', ()=>{
        const historyname = completed.splice(i, 1);
        saveCompleted();
        addtohistory(historyname[0]);
    });
});
};




