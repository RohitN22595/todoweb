import {renderTodocom } from './index.js';
const history = JSON.parse(localStorage.getItem('historyTodos')) || [];
function saveHistory() {
    localStorage.setItem('historyTodos', JSON.stringify(history));
}

window.onload = () => {
    renderhistory();
};

export function addtohistory(name){
    history.push(name);
    saveHistory();
    renderTodocom();
};

function renderhistory(){
    const historycontainer = document.querySelector('.deletedH');
    if (!historycontainer) {
        console.warn("Element .deletedH not found in DOM");
        return;
    }
    let html = '';
    history.forEach((name)=>{
        html = html + `<p class="todoHistory">${name}</p>`
    });
    historycontainer.innerHTML = html;
}