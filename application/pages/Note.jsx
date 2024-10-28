import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function Note() {

    const { id } = useParams();
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // -1 para ir a la página anterior
    };

    const handleEdit = () => {

    }

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

                console.log(data)

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id, token]); // Dependencias para re-fetch si el ID o el token cambian

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
    
                <button onClick={handleEdit} className="bg-[#3B3B3B] p-3 h-[50px] w-[50px] flex justify-center items-center rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/></svg>
    
                </button>
    
            </div>

            <div className="p-5">
                <h1 className="titulo text-3xl text-white break-words">{note.titulo}</h1>
                <p className="text-xl text-white pt-5 break-words">test</p>
            </div>

        </main>
    )
}