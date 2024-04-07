import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Complete = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/getapi/tasks?status=complete');
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            } else {
                setError('Failed to fetch tasks');
            }
        } catch (error) {
            setError('Error fetching tasks');
        }
    };

    const handleDelete = async (taskName) => {
        try {
            const response = await fetch(`http://localhost:5000/delete/tasks/${taskName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (response.ok) {
                fetchTasks();
            } else {
                const errorMessage = await response.text();
                console.error('Failed to delete task:', errorMessage);
                setError(`Failed to delete task: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error deleting task:', error.message);
            setError(`Error deleting task: ${error.message}`);
        }
    };
    
    
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col items-center px-10 py-30'>
                <span className=''>Complete</span>
                <hr className='w-32 border-t-2 border-yellow-500 font-bold' />
            </div>
            <div className='flex flex-col py-2'>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {tasks.map(task => (
                    <div key={task.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <h2 className="text-xl font-semibold">{task.taskName}</h2>
                        <p className="text-gray-600">{task.description}</p>
                        <p className="text-gray-600">Deadline: {task.deadline}</p>
                        <div className="flex justify-between mt-4">
                            <Link to={`/edit/${task.taskName}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Edit
                            </Link>
                            <button onClick={() => handleDelete(task.taskName)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Complete;
