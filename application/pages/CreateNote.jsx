import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateNote() {
    const [titulo, setTitle] = useState("");
    const [descripcion, setDescription] = useState("");
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/notes', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titulo: titulo, descripcion: descripcion }), // Ajusta según el formato de tu API
            });

            if (!response.ok) {
                throw new Error('Error al crear la nota');
            }

            const data = await response.json();
            navigate(`/notes/${data.data._id}`); // Navega a la nueva nota creada

        } catch (error) {
            console.error(error);
            // Manejar el error (mostrar un mensaje al usuario, etc.)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-2 w-full p-2"
                required
            />
            <textarea
                placeholder="Type something..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-2 w-full p-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2">Crear Nota</button>
        </form>
    );
}
