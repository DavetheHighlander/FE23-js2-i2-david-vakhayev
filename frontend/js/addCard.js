export let originalColumnId = {};
import { deleteTask, markAsInProgress, markAsDone } from './apiCalls.js';

function addTodoCard(task) {
    const columnId = 'todo';
    const column = document.getElementById(columnId);
    const card = document.createElement('div');
    card.setAttribute('id', `card_${task.id}`);
    card.setAttribute('class', 'card');
    card.textContent = "Task content: " + task.content;
    card.style.backgroundColor = task.color;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        // Create and append form for editing task content
        const editForm = document.createElement('form');
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Edit task content';
        editForm.appendChild(inputField);
        
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => {
            // Handle save action here, e.g., update task content
            const newContent = inputField.value;
            // Example: updateTaskContent(task.id, newContent);
            card.textContent = "Task content: " + newContent;
            // Remove the form after saving
            editForm.remove();
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.placeholder = 'Enter text here';
        
            const doneButton = document.createElement('button');
            doneButton.textContent = 'Assign >>';
            doneButton.addEventListener('click', markAsInProgress);
        
            card.appendChild(inputField);
            card.appendChild(editButton);
            card.appendChild(doneButton);
        });
        editForm.appendChild(saveButton);
        
        card.appendChild(editForm);
        
    });

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter text here';

    const doneButton = document.createElement('button');
    doneButton.textContent = 'Assign >>';
    doneButton.addEventListener('click', markAsInProgress);

    card.appendChild(inputField);
    card.appendChild(editButton);
    card.appendChild(doneButton);

    column.appendChild(card);
}

function addInProgressCard(task) {
    const columnId = 'inProgress';
    const column = document.getElementById(columnId);
    const card = document.createElement('div');
    card.setAttribute('id', `card_${task.id}`);
    card.setAttribute('class', 'card');
    card.textContent = "Task content: " + task.content;
    card.style.backgroundColor = task.color;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        // Create and append form for editing task content
        const editForm = document.createElement('form');
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Edit task content';
        editForm.appendChild(inputField);
        
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => {
            // Handle save action here, e.g., update task content
            const newContent = inputField.value;
            // Example: updateTaskContent(task.id, newContent);
            card.textContent = "Task content: " + newContent;
            // Remove the form after saving
            editForm.remove();
            const doneButton = document.createElement('button');
            doneButton.textContent = 'Done >>';
            doneButton.addEventListener('click', markAsDone);
            
            const h4Element = document.createElement('h4');
            h4Element.textContent = "Assigned name: " + task.assignedName;
            
            card.appendChild(h4Element);
            card.appendChild(editButton);
            card.appendChild(doneButton);
        
        });
        editForm.appendChild(saveButton);
        
        card.appendChild(editForm);
    });

    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done >>';
    doneButton.addEventListener('click', markAsDone);
    
    const h4Element = document.createElement('h4');
    h4Element.textContent = "Assigned name: " + task.assignedName;
    
    card.appendChild(h4Element);
    card.appendChild(editButton);
    card.appendChild(doneButton);

    column.appendChild(card);
}


function addDoneCard(task) {
    const columnId = 'done';
    const column = document.getElementById(columnId);
    const card = document.createElement('div');
    card.setAttribute('id', `card_${task.id}`);
    card.setAttribute('class', 'card');
    card.textContent = "Task content: " + task.content;
    card.style.backgroundColor = task.color;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove >>';
    deleteButton.addEventListener('click', deleteTask);

    card.appendChild(deleteButton);

    column.appendChild(card);
}


export { addInProgressCard, addDoneCard, addTodoCard };
