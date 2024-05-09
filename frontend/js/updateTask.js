import { backendURL } from './main.js';
import { addInProgressCard, addDoneCard, addTodoCard  } from './addCard.js';


function editTask(event) {
    const card = event.target.parentElement;
    const contentParagraph = card.querySelector('p');
    const content = contentParagraph.textContent;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = content;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', function () {
        const newContent = inputField.value;
        updateTaskContent(card.id.split('_')[1], newContent);
    });

    card.removeChild(contentParagraph);
    card.appendChild(inputField);
    card.appendChild(saveButton);
}
function updateTaskContent(id, newContent) {
    fetch(`${backendURL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newContent })
    })
        .then(response => response.json())
        .then(task => {
            const card = document.getElementById(`card_${task.id}`);
            if (card) {
                const inputField = card.querySelector('input[type="text"]');
                const saveButton = card.querySelector('button');
                const contentParagraph = document.createElement('p');
                contentParagraph.textContent = task.content;
                card.removeChild(inputField);
                card.removeChild(saveButton);
                card.appendChild(contentParagraph);
            }
        })
        .catch(error => console.error('Error updating task content:', error));
}
function updateTaskStatus(id, column) {
    fetch(`${backendURL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ column })
    })
        .then(response => response.json())
        .then(task => {
            const card = document.getElementById(`card_${task.id}`);
            if (card) {
                card.parentElement.removeChild(card);
                if (task.column === 'todo') {
                    addTodoCard(task);
                } else if (task.column === 'inProgress') {
                    addInProgressCard(task); 
                } else if (task.column === 'done') {
                    addDoneCard(task);
                }
            }
        })
        .catch(error => console.error('Error updating task status:', error));
}
