import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTaskPage = () => {
    const { name } = useParams();
    const navigate = useNavigate(); // Corrected usage of useNavigate hook
    const [task, setTask] = useState({});
    const [editedTask, setEditedTask] = useState({});
    const [updateError, setUpdateError] = useState('');

    useEffect(() => {
        fetchTask();
    }, [name]);

    const fetchTask = async () => {
        try {
            const response = await fetch(`http://localhost:5000/getapi/tasks/${name}`);
            if (response.ok) {
                const data = await response.json();
                setTask(data);
                setEditedTask(data);
            } else {
                console.error('Failed to fetch task:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching task:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleEdit = async (e) => {
        
            e.preventDefault(); 
        try {
            const response = await fetch(`http://localhost:5000/updapi/tasks/${name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedTask)
            });
            if (response.ok) {
                navigate('/'); // Corrected navigation using navigate function
            } else {
                const errorMessage = await response.text();
                console.error('Failed to update task:', errorMessage);
                setUpdateError(errorMessage);
            }
        } catch (error) {
            console.error('Error updating task:', error.message);
            setUpdateError('Error updating task. Please try again.');
        }
    };

    return (
        <div className="add-task-form w-full max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Edit the task</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700">Task Name:</label>
                    <input type="text" className="form-input mt-1 block w-full" name="taskName" value={editedTask.taskName || ''} onChange={handleInputChange} disabled />

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea className="form-textarea mt-1 block w-full" name="description" value={editedTask.description || ''} onChange={handleInputChange}></textarea>

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Deadline:</label>
                    <input type="date" className="form-input mt-1 block w-full" name="deadline" value={editedTask.deadline || ''} onChange={handleInputChange} />

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Set Priority:</label>
                    <div className="flex items-center">
                        <label className="mr-4">
                            <input type="radio" className="form-radio" value="Low" checked={editedTask.priority === 'Low'} onChange={handleInputChange} />
                            <span className="ml-2">Low</span>
                        </label>
                        <label className="mr-4">
                            <input type="radio" className="form-radio" value="Medium" checked={editedTask.priority === 'Medium'} onChange={handleInputChange} />
                            <span className="ml-2">Medium</span>
                        </label>
                        <label>
                            <input type="radio" className="form-radio" value="High" checked={editedTask.priority === 'High'} onChange={handleInputChange} />
                            <span className="ml-2">High</span>
                        </label>
                    </div>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleEdit}>Save</button>
                {updateError && <p>{updateError}</p>}

            </form>
        </div>
    );
};

export default EditTaskPage;
