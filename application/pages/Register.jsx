import { useState } from "react";
import { Form, useNavigate } from "react-router-dom"

export function Register() {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // -1 para ir a la página anterior
    };

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reiniciar mensaje de error
        const body = JSON.stringify({ nombre, apellido, email, contrasena });
        console.log(body);
        try {
            const response = await fetch('http://localhost:3000/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, apellido, email, contrasena }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message); // Mostrar el error
                return;
            }
    
            const data = await response.json();
            console.log(data.message); // Maneja el mensaje de éxito
    
            // Acceder a los datos del usuario y el token
            const { usuario } = data.data; // Desestructuramos data.data

            console.log(usuario);
    
            // Redirigir al usuario a la página principal
            navigate('/');
        } catch (error) {
            setErrorMessage('Error al iniciar sesión. Intenta de nuevo.');
        }
    };


    return(
        <div className="flex flex-col h-[100vh] justify-center items-center">

            <button onClick={handleGoBack} className="absolute top-5 left-5 bg-[#0a0a0a] p-3 h-10 w-10 flex justify-center items-center rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 24"><path fill="#fff" fillRule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"/></svg>
            </button>

            <Form className="flex flex-col gap-2 p-6 bg-[#121212] rounded-lg transition-transform transform hover:scale-105 hover:border hover:border-black w-[90%]" onSubmit={handleSubmit}>
                <p id="heading" className="text-center my-8 text-white text-lg">Register</p>

                <div className="flex items-center gap-2 p-2 bg-[#0a0a0a] rounded-lg shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#fff" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
                    <input required autoComplete="off" placeholder="Nombre" className="bg-transparent border-none outline-none w-full text-gray-300" type="text" onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="flex items-center gap-2 p-2 bg-[#0a0a0a] rounded-lg shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#fff" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                    <input required autoComplete="off" placeholder="Apellido" className="bg-transparent border-none outline-none w-full text-gray-300" type="text" onChange={(e) => setApellido(e.target.value)} />
                </div>

                <div className="flex items-center gap-2 p-2 bg-[#0a0a0a] rounded-lg shadow-inner">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 16 16"><path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path></svg>
                    <input required autoComplete="off" placeholder="E-mail" className="bg-transparent border-none outline-none w-full text-gray-300" type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="flex items-center gap-2 p-2 bg-[#0a0a0a] rounded-lg shadow-inner">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path></svg>
                    <input required placeholder="Contraseña" className="bg-transparent border-none outline-none w-full text-gray-300" type="password" onChange={(e) => setContrasena(e.target.value)} />
                </div>

                <div type="submit" className="flex justify-center mt-6">
                    <button className="ml-2 px-4 py-2 bg-[#1c1c1c] rounded-md hover:bg-black text-white transition duration-200">Register</button>
                </div>
            </Form>
            {errorMessage && <p className="error text-white pt-3">{errorMessage}</p>}
        </div>
    )
}