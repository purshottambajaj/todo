import React, { useState } from 'react';

const AddSection = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskName,
          description,
          deadline,
          priority,
          status: 'yet-to-start',
        }),
      });
      if (response.ok) {
        alert('Task added successfully.');
      } else {
        alert('Failed to add task:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  return (
    <div className="add-task-form w-full max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Task Name:</label>
          <input type="text" className="form-input mt-1 block w-full" value={taskName} onChange={handleTaskNameChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea className="form-textarea mt-1 block w-full" value={description} onChange={handleDescriptionChange}></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deadline:</label>
          <input type="date" className="form-input mt-1 block w-full" value={deadline} onChange={handleDeadlineChange} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Set Priority:</label>
          <div className="flex items-center">
            <label className="mr-4">
              <input type="radio" className="form-radio" value="Low" checked={priority === 'Low'} onChange={handlePriorityChange} />
              <span className="ml-2">Low</span>
            </label>
            <label className="mr-4">
              <input type="radio" className="form-radio" value="Medium" checked={priority === 'Medium'} onChange={handlePriorityChange} />
              <span className="ml-2">Medium</span>
            </label>
            <label>
              <input type="radio" className="form-radio" value="High" checked={priority === 'High'} onChange={handlePriorityChange} />
              <span className="ml-2">High</span>
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add Task</button>
      </form>
    </div>
  );
  };

export default AddSection;
