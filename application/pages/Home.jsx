import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
export function Home() {

    const navigate = useNavigate();
    
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleLogout = () => {
        // Eliminar el token del localStorage
        localStorage.removeItem('token');
        
        navigate('/'); 
        console.log("Usuario Cierra sesión")
    };


    const [showInfo, setShowInfo] = useState(false);
    const infoRef = useRef(null);
  
    const handleInfo = () => {
      setShowInfo(!showInfo);
    };
  
    const handleClickOutside = (event) => {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setShowInfo(false);
      }
    };

    // Search

    const [query, setQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);

    const handleSearch = async () => {
        try {
            if (!query) {
                // Si el input está vacío, mostramos todas las notas
                setFilteredNotes(notes);
                return;
            }
    
            const response = await fetch(`http://localhost:3000/api/notes/search/${query}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                console.log("Error al buscar nota");
                return; // Termina la ejecución si hay un error
            }
    
            const data = await response.json();
            console.log(data); // Aquí para verificar la respuesta
    
            setFilteredNotes(data); // Establece las notas filtradas
            setError(null); // Limpiar errores previos
        } catch (err) {
            setError(err.message);
            setFilteredNotes([]); // Limpiar resultados
        }
    };

    // Creacion de la nota

    const [titulo, setTitle] = useState("");
    const [descripcion, setDescription] = useState("");

    const createNote = async (e) => {
        e.preventDefault(); // Evita que el formulario se recargue

        try {
            const response = await fetch('http://localhost:3000/api/notes', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titulo: titulo, descripcion: descripcion }), // Envía los campos vacíos
            });

            if (!response.ok) {
                throw new Error('Error al crear la nota');
            }

            const data = await response.json();
            console.log(data)
            navigate(`/notes/${data.data._id}`);

        } catch (error) {
            console.error(error);
        }
    };

    // Colores

    const colors = ['#FF9E9E', '#91F48F', '#FFF599', '#9EFFFF', '#B69CFF'];

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };
    

    // Eliminacion de la nota

    const [selectedNoteId, setSelectedNoteId] = useState(null); // Para rastrear qué nota se está seleccionando

    const handleLongPress = (noteId) => {
        setSelectedNoteId(noteId);
    };

    const handleDeleteNote = async (noteId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.ok) {
                await fetchNotes(); // Refresca las notas después de la eliminación
                setSelectedNoteId(null); // Resetear selección
            } else {
                console.log("Error al eliminar nota");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // ------------------------------------------------------------------------------------


    const token = localStorage.getItem('token');

    const fetchNotes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/notes/', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error('Error en la red');
            }
    
            const data = await response.json();
            setNotes(data.data); // Asume que data es un array de notas
            setFilteredNotes(data.data); // Asegúrate de que filteredNotes se actualice también
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Si tienes un estado de loading
        }
    };

    useEffect(() => {

        fetchNotes();

        // Añade el evento de clic
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Limpia el evento cuando el componente se desmonte
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return(
        <main className="w-[100vw] h-[100vh] overflow-hidden">

            { showInfo && (
                <div className="absolute h-[100%] w-[100%] bg-white bg-opacity-20 flex items-center justify-center">

                        <div ref={infoRef} className="bg-[#252525] w-[80%] h-[25%] rounded-lg p-5 flex flex-col justify-between">
                            <p className="text-white"> Designed by - SamuelRiveros</p>
                            <p className="text-white"> Redesigned by - SamuelRiveros</p>
                            <p className="text-white"> Illustrations - Hermenegildo Gutierrez</p>
                            <p className="text-white"> Icons - William Meza</p>
                            <p className="text-white"> font - Juan Gabriel Cala</p>

                            <div className="flex w-[100%] justify-center">
                                <p className="text-white pt-3">Made by Samuel David Riveros Angarita</p>
                            </div>

                        </div>
                </div>

            )}

            <div className="w-100 h-[20%] p-5 flex justify-between items-center">
                <h1 className="text-5xl text-white">Notes</h1>

                <div className="flex gap-3">

                    <button onClick={handleSearch} className="bg-[#3B3B3B] p-3 w-[50px] w-[50px] rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg></button>
                    <button onClick={handleInfo} className="bg-[#3B3B3B] p-3 w-[50px] w-[50px] rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg></button>
                    <button onClick={handleLogout} className="bg-[#3B3B3B] p-3 w-[50px] w-[50px] rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/></svg></button>

                </div>

                { error && <p className="text-red-500">{error}</p>}
                
            </div>



            <div className="mainpic flex flex-col items-center pt-[150px] gap-3 hidden">
                <img src="./mainpic.png"/>
                <p className="text-white">Create your first Note !</p>

            </div>

            <div className="flex justify-center items-center">

                <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Buscar notas..."
                            className="text-xl text-white bg-transparent border-b border-white mb-2"
                        />
            </div>


            <div className="flex justify-center text-white hidden">
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map(note => (
                            <div key={note.id}>
                                <h3>{note.titulo}</h3>
                                <p>{note.descripcion}</p>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron notas</p>
                    )}
            </div>

            <section className="w-[100%] flex items-center justify-center flex-col">
                <div className="w-[90%] h-[85vh] overflow-y-scroll rounded-lg p-3 custom-scroll">

                {(filteredNotes.length > 0 ? filteredNotes : notes).map(note => (
                    <div 
                        key={note._id} 
                        onClick={() => {
                            if (!selectedNoteId) { // Solo navegar si no hay nota seleccionada
                                navigate(`/notes/${note._id}`);
                            }
                        }} 

                        onContextMenu={(e) => {
                            e.preventDefault(); // Prevenir el menú contextual del navegador
                            handleLongPress(note._id);
                        }}

                        className="note w-full rounded-lg p-3 mb-2" 
                        style={{ backgroundColor: selectedNoteId === note._id ? 'red' : getRandomColor() }} // Color rojo si está seleccionado
                    >
                        <h1 className="text-2xl">{note.titulo}</h1>

                        {selectedNoteId === note._id && (
                            <div onClick={() => handleDeleteNote(note._id)} className="flex items-center justify-center">
                                <div className="w-[60px]">
                                    <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
                                        <path fill="#fff" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/>
                                    </svg>

                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {filteredNotes.length === 0 && query && <p className="text-white">Buscando Nota. . .</p>}
                </div>
            </section>



            <div className="absolute bottom-0 right-0 p-5">

                <button onClick={createNote} className="bg-[#3B3B3B] flex items-center justify-center h-20 w-20 rounded-full shadow-xl"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg></button>
                
            </div>
        </main>
    )
}