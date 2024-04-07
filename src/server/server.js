const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors =require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Routes
app.post('/api/tasks', (req, res) => {
    const { taskName, description, deadline, priority, status } = req.body;
    const taskData = { taskName, description, deadline, priority, status };

    fs.readFile(path.join(__dirname, 'todo.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading todo.json file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let tasks = [];
        if (data) {
            try {
                tasks = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
                res.status(500).send('Internal Server Error');
                return;
            }
        }

        tasks.push(taskData);

        fs.writeFile(path.join(__dirname, 'todo.json'), JSON.stringify(tasks, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to todo.json file:', writeErr);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('Task added successfully.');
            res.status(200).send('Task added successfully.');
        });
    });
});

app.get('/getapi/tasks', (req, res) => {
    const { status } = req.query;

    fs.readFile(path.join(__dirname, 'todo.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading todo.json file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let tasks = [];
        if (data) {
            try {
                tasks = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
                res.status(500).send('Internal Server Error');
                return;
            }
        }

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        res.json(tasks);
    });
});



app.put('/updapi/tasks/:name', (req, res) => {
    const taskName = req.params.name;
    const updatedTaskData = req.body;

    fs.readFile(path.join(__dirname, 'todo.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading todo.json file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let tasks = [];
        if (data) {
            try {
                tasks = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
                res.status(500).send('Internal Server Error');
                return;
            }
        }

        // Find the task with the given name
        const taskToUpdateIndex = tasks.findIndex(task => task.taskName === taskName);
        if (taskToUpdateIndex !== -1) {
            // Update the task properties with the new data
            tasks[taskToUpdateIndex] = { ...tasks[taskToUpdateIndex], ...updatedTaskData };
            console.log('Updated task:', tasks[taskToUpdateIndex]);
            // Write the updated tasks array back to the JSON file
            fs.writeFile(path.join(__dirname, 'todo.json'), JSON.stringify(tasks, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to todo.json file:', writeErr);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                console.log('Task updated successfully.');
                res.status(200).send('Task updated successfully.');
            });
        } else {
            // If the task with the specified name is not found, send a 404 response
            console.log('Task not found:', taskName);
            res.status(404).send('Task not found');
        }
    });
});




app.get('/getapi/tasks/:name', (req, res) => {
    const { name } = req.params;

    fs.readFile(path.join(__dirname, 'todo.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading todo.json file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let tasks = [];
        if (data) {
            try {
                tasks = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
                res.status(500).send('Internal Server Error');
                return;
            }
        }

        const task = tasks.find(task => task.taskName === name);
        if (task) {
            res.json(task);
        } else {
            res.status(404).send('Task not found');
        }
    });
});

app.put('/update/tasks/:name/:status', (req, res) => {
    const taskName = req.params.name;
    const updatedStatus = req.params.status; // Updated status

    fs.readFile(path.join(__dirname, 'todo.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading todo.json file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let tasks = [];
        if (data) {
            try {
                tasks = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
                res.status(500).send('Internal Server Error');
                return;
            }
        }

        // Find the task with the given name and update its status
        const taskToUpdate = tasks.find(task => task.taskName === taskName);
        if (taskToUpdate) {
            taskToUpdate.status = updatedStatus;
        } else {
            res.status(404).send('Task not found');
            return;
        }

        fs.writeFile(path.join(__dirname, 'todo.json'), JSON.stringify(tasks, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to todo.json file:', writeErr);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('Task status updated successfully.');
            res.status(200).send('Task status updated successfully.');
        });
    });
});


app.delete('/delete/tasks/:taskName', (req, res) => {
    const taskName = req.params.taskName;
    
    fs.readFile(path.join(__dirname, 'todo.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading todo.json file:', err);
            return res.status(500).send('Internal Server Error');
        }

        let tasks = [];
        try {
            tasks = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            return res.status(500).send('Internal Server Error');
        }

        // Find the index of the task with the given name
        const taskIndex = tasks.findIndex(task => task.taskName === taskName);
        if (taskIndex === -1) {
            return res.status(404).send('Task not found');
        }

        // Remove the task from the array
        tasks.splice(taskIndex, 1);

        // Write the updated tasks array back to the file
        fs.writeFile(path.join(__dirname, 'todo.json'), JSON.stringify(tasks, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to todo.json file:', writeErr);
                return res.status(500).send('Internal Server Error');
            }
            console.log('Task deleted successfully.');
            res.status(200).send('Task deleted successfully.');
        });
    });
});



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
