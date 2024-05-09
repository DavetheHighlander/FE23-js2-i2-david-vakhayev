import { deleteTask, markAsInProgress, markAsDone } from './apiCalls.js';

function addButtonBasedOnContent(columnId, content, card) {
    if (columnId === 'todo') {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Enter text here';

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Assign >>';
        doneButton.addEventListener('click', markAsInProgress);

        card.appendChild(inputField);
        card.appendChild(doneButton);

    } else if (columnId === 'inProgress') {
        // const h4Element = document.createElement('h4');
        // h4Element.textContent = 'david';
        // card.appendChild(h4Element);

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done >>';
        doneButton.addEventListener('click', markAsDone);

        card.appendChild(doneButton);

    } else if (columnId === 'done') {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove >>';
        deleteButton.addEventListener('click', deleteTask); // Renamed to avoid confusion
        card.appendChild(deleteButton);
    }
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', editTask);
    card.appendChild(editButton);
}





function updateButtons(card) {
    removeAllButtons(card);
    const columnId = card.parentElement.id;

    if (columnId === 'todo') {
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Assign >>';
        doneButton.addEventListener('click', markAsInProgress);
        card.appendChild(doneButton);

    } else if (columnId === 'inProgress') {
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done >>';
        doneButton.addEventListener('click', markAsDone);
        card.appendChild(doneButton);

    } else if (columnId === 'done') {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove >>';
        deleteButton.addEventListener('click', deleteTask);
        card.appendChild(deleteButton);
    }
}

function removeAllButtons(card) {
    const buttons = card.querySelectorAll('button');
    buttons.forEach(button => {
        button.remove();
    });
}

export { removeAllButtons, updateButtons , addButtonBasedOnContent };
