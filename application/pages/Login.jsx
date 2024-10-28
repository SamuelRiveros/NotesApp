import { useState } from "react";
import { Form, useNavigate } from "react-router-dom"
export function Login() {

    const navigate = useNavigate();

    const handleGoRegister = () => {
      navigate("/Register")
    };

    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reiniciar mensaje de error
        const body = JSON.stringify({ email, contrasena });
        console.log(body);
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, contrasena }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message); // Mostrar el error
                return;
            }
    
            const data = await response.json();
            console.log(data.message); // Maneja el mensaje de éxito
    
            // Acceder a los datos del usuario y el token
            const { usuario, token } = data.data; // Desestructuramos data.data


            console.log(usuario);
            console.log(token);

            localStorage.setItem("token", token)
    
            // Redirigir al usuario a la página principal
            navigate('/Home');
        } catch (error) {
            setErrorMessage('Error al iniciar sesión. Intenta de nuevo.');
        }
    };
    

    return(
        <div className="flex flex-col h-[100vh] justify-center items-center">

            <Form className="flex flex-col gap-2 p-6 bg-[#121212] rounded-lg transition-transform transform hover:scale-105 hover:border hover:border-black w-[90%]" onSubmit={handleSubmit}>
                <p id="heading" className="text-center my-8 text-white text-lg">Login</p>
                <div className="flex items-center gap-2 p-2 bg-[#0a0a0a] rounded-lg shadow-inner">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                    </svg>
                    <input required autoComplete="off" placeholder="Email" className="bg-transparent border-none outline-none w-full text-gray-300" type="text" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex items-center gap-2 p-2 bg-[#0a0a0a] rounded-lg shadow-inner">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    </svg>
                    <input required placeholder="Contraseña" className="bg-transparent border-none outline-none w-full text-gray-300" type="password" name="password" onChange={(e) => setContrasena(e.target.value)} />
                </div>
                <div className="flex justify-center mt-6">
                    <button type="submit" className="px-4 py-2 bg-[#1c1c1c] rounded-md hover:bg-black text-white transition duration-200">Login</button>
                    <button onClick={handleGoRegister} className="ml-2 px-4 py-2 bg-[#1c1c1c] rounded-md hover:bg-black text-white transition duration-200">Sign Up</button>
                </div>
                <button className="mt-4 mb-6 px-4 py-2 bg-gray-700 rounded-md hover:bg-red-600 text-white transition duration-200">Forgot Password</button>
            </Form>
            {errorMessage && <p className="error text-white pt-3">{errorMessage}</p>}
        </div>
    )
}