export const backendURL = 'http://127.0.0.1:3000';

import { fetchTasks, addTask } from './apiCalls.js';

document.addEventListener('DOMContentLoaded', function () {
    fetchTasks();
});
document.getElementById('text-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const text = document.getElementById('text-input').value;
    const color = document.getElementById('color-input').value;
    addTask('todo', text, color);
});