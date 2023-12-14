import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const useTareas = () => {
    const [tareas, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://prueba-back-juan-montoyas-projects.vercel.app/task`);
            const result = await response.json();
            if (!response.ok || result.ok === false) {
                throw new Error('Error en la solicitud');
            }
            setTasks(result.results);
            setLoading(false);
        } catch (error) {
            setError('Error al cargar los datos');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`https://prueba-back-juan-montoyas-projects.vercel.app/task/${taskId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la tarea');
            }
            const updatedTareas = tareas.filter((task) => task.id !== taskId);

            setTasks(updatedTareas);

            showDeleteSuccessAlert();
        } catch (error) {
            console.error('Error al eliminar la tarea:', error.message);
        }
    };

    
    const update = async (id, Data) => {
        try {
            const response = await fetch(`https://prueba-back-juan-montoyas-projects.vercel.app/task/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Data),
            });

            const updatedTarea = await response.json();
            if (!response.ok || updatedTarea.ok === false) {
                throw new Error('Error al actualizar la tarea');
            }

            const updatedTareas = tareas.map((tarea) => (tarea.id === id ? updatedTarea.results : tarea));

            setTasks(updatedTareas);

            Swal.fire({
                icon: 'success',
                title: 'Actualizado exitosamente',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error al actualizar la tarea:', error.message);
        }
    };

    const create = async (title) => {
        try {
            const response = await fetch(`https://prueba-back-juan-montoyas-projects.vercel.app/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, status: "pending" }),
            });

            const result = await response.json();

            if (!response.ok || result.ok === false) {
                throw new Error('Error al agregar la tarea');
            }

            const newTask = { status: "pending", ...result.results };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            return true;
        } catch (error) {
            console.error('Error al agregar la tarea:', error.message);
            return false;
        }
    };


    const showDeleteSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Eliminado exitosamente',
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return { tareas, loading, error, deleteTask, create, update };
};

export default useTareas;