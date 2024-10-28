import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function Note() {

    const { id } = useParams();
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Edicion

    const [isEditing, setIsEditing] = useState(false); // Estado para manejar el modo edición
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");

    //

    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // -1 para ir a la página anterior
    };

    const handleEdit = () => {
        setIsEditing(true);
        setTitulo(note.titulo);
        setDescripcion(note.descripcion);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titulo, descripcion }), // Envia los datos actualizados
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la nota');
            }

            const data = await response.json();
            setNote(data.data);
            setIsEditing(false); // Salir del modo edición

        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error en la red');
                }

                const data = await response.json();
                setNote(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id, token]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return(
        <main>
            <div className="flex justify-between p-5">
    
                <button onClick={handleGoBack} className="bg-[#3B3B3B] p-4 h-[50px] w-[50px] flex justify-center items-center rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 24"><path fill="#fff" fillRule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"/></svg>
                </button>

                <div className="flex gap-3">

                    {isEditing ? (
                        <button onClick={handleSave} className="bg-[#3B3B3B] p-3 h-[50px] w-[50px] flex justify-center items-center rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7"/></g></svg>
                        </button>
                    ) : (
                        <button onClick={handleEdit} className="bg-[#3B3B3B] p-3 h-[50px] w-[50px] flex justify-center items-center rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/></svg> 
                        </button>
                    )}

                </div>
            </div>

            <div className="p-5">
            {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Title"
                            className="text-3xl text-white bg-transparent border-b border-white mb-2"
                        />
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Type something..."
                            className="text-xl text-white bg-transparent border-b border-white w-full mb-2"
                        />
                    </>
                ) : (
                    <>
                        <h1 className="titulo text-3xl text-white break-words">{note.titulo || "Title"}</h1>
                        <p className="text-xl text-white pt-5 break-words">{note.descripcion || "Type something..."}</p>
                    </>
                )}
            </div>

        </main>
    )
}