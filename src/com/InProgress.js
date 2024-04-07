import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const InProgress = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/getapi/tasks?status=in-progress');
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            } else {
                console.error('Failed to fetch tasks:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    };

    const handleNext = async (taskName) => {
        console.log(taskName);

        try {
            const response = await fetch(`http://localhost:5000/update/tasks/${taskName}/complete`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'in-progress' })
            });
    
            if (response.ok) {
                fetchTasks();
                window.location.reload();
            } else {
                console.error('Failed to update task status:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating task status:', error.message);
        }
    };

   

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col items-center px-10 py-30'>
                <span className=''>In progress</span>
                <hr className='w-32 border-t-2 border-yellow-500 font-bold' />
            </div>
            <div className='flex flex-col py-2'>
                {tasks.map(task => (
                    <div key={task.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <h2 className="text-xl font-semibold">{task.taskName}</h2>
                        <p className="text-gray-600">{task.description}</p>
                        <p className="text-gray-600">Deadline: {task.deadline}</p>
                        <div className="flex justify-between mt-4">
                            <Link to={`/edit/${task.taskName}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Edit
                            </Link>
                            <button onClick={() => handleNext(task.taskName)}>Next</button>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InProgress