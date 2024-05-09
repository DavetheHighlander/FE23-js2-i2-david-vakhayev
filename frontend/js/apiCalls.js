import { backendURL } from './main.js';
import { addInProgressCard, addDoneCard, addTodoCard  } from './addCard.js';
import { updateButtons } from './eventListeners.js';


function fetchTasks() {
    fetch(`${backendURL}/tasks`)
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                console.log(task);
                if (task.column === 'todo') {
                    addTodoCard(task);
                } else if (task.column === 'inProgress') {
                    addInProgressCard(task);
                } else if (task.column === 'done') {
                    addDoneCard(task);
                }
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function markAsDone(event) {
    const card = event.target.parentElement;
    const taskId = card.id.split('_')[1]; // Assuming the card ID format is "card_taskId"

    // Send a PATCH request to the backend to update the task's status
    fetch(`${backendURL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            column: 'done'
        })
    })
    .then(response => response.json())
    .then(updatedTask => {
        // Move the card to the "done" column
        const doneColumn = document.getElementById('done');
        doneColumn.appendChild(card);

        // Update buttons if needed
        updateButtons(card);
    })
    .catch(error => {
        console.error('Error marking task as done:', error);
    });
}

function markAsInProgress(event) {
    const card = event.target.parentElement;
    const taskId = card.id.split('_')[1]; // Assuming the card ID format is "card_taskId"
    const inputField = card.querySelector('input[type="text"]');
    const assignedName = inputField.value;

    // Send a PATCH request to the backend to update the task's status and column
    fetch(`${backendURL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            assignedName: 1458,
            column: 'inProgress' // Update the column to "inProgress"
        })
    })
    .then(response => response.json())
    .then(updatedTask => {
        // Remove the input field and replace it with a paragraph showing the assigned name
        card.removeChild(inputField);
        const assignedParagraph = document.createElement('p');
        assignedParagraph.textContent = updatedTask.assignedName;
        card.appendChild(assignedParagraph);

        // Move the card to the "inProgress" column
        const inProgressColumn = document.getElementById('inProgress');
        inProgressColumn.appendChild(card);

        // Update buttons if needed
        updateButtons(card);
    })
    .catch(error => {
        console.error('Error marking task as in progress:', error);
    });
}

function addTask(column, content, color, assignedName = '') {
    
    fetch(`${backendURL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ column, content, color, assignedName })
    })
        .then(response => response.json())
        .then(task => {
            if (task.column === 'todo') {
                addTodoCard(task);
            } else if (task.column === 'inProgress') {
                addInProgressCard(task);
            } else if (task.column === 'done') {
                addDoneCard(task);
            }
        })
        .catch(error => console.error('Error adding task:', error));
}
function deleteTask(event) {
    const card = event.target.parentElement;
    const taskId = card.id.split('_')[1]; // Assuming the card ID format is "card_taskId"
    console.log(taskId)
    // Send a DELETE request to the backend to delete the task
    fetch(`${backendURL}/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            // If the request was successful, remove the card from the UI
            card.remove();
        } else {
            // If there was an error, log the error message
            console.error('Error deleting task:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error deleting task:', error);
    });
}
export { fetchTasks, addTask, deleteTask, markAsInProgress, markAsDone };
