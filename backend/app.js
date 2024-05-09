const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Read tasks from JSON file
let tasks = JSON.parse(fs.readFileSync('tasks.json'));

// Routes

// GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST a new task
app.post('/tasks', (req, res) => {
    const { column, content, color, assignedName } = req.body;
    const newTask = { id: tasks.length + 1, column, content, color, assignedName };
    tasks.push(newTask);
    updateTasksFile();
    res.status(201).json(newTask);
});

// PATCH (Update) a task
app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { column, assignedName, content } = req.body;
    
    // Check if either assignedName or content is provided
    if (!column) {
        return res.status(400).json({ message: 'Either column is required' });
    }
    
    // Assuming tasks is an array containing your tasks
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

    console.log(id + " has been updated ");

    if (taskIndex !== -1) {
        // Assuming column is a valid property of the task
        if (column) {
            tasks[taskIndex].column = column;
        }

        // Update assignedName if provided
        if (assignedName) {
            tasks[taskIndex].assignedName = assignedName;
        }

        // Update content if provided
        if (content) {
            tasks[taskIndex].content = content;
        }

        // Assuming updateTasksFile() saves the updated tasks to a file/database
        updateTasksFile();
        
        // Assuming you want to return the updated task
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});



// DELETE a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    updateTasksFile();
    console.log(id+" has been deleted " )
    res.status(204).end();
});

// Function to update tasks JSON file
function updateTasksFile() {
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
