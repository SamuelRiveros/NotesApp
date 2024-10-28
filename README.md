# Backend de Productividad

Bienvenido al proyecto de Productividad Back-End de Samuel Riveros Angarita

## Instalación
Para instalar las dependencias, ejecuta "**npm i**" en la consola para descargar todas las dependencias del proyecto, se recomienda ejecutar "**npm i**" por segunda vez para descartar que todas las dependencias se hayan descargado.

## .Env
Antes de ejecutar el proyecto y encender el servidor, cree un archivo .env en la raiz del proyecto, y ingrese los datos respectivos los cuales son necesarios para este, los campos están ubicados en el .env.template , se enviarán los datos por privado en la descripción del repo enviado por el servidor de discord.

## Ejecución - Encendiendo el Back-end
Después de haber descargado las dependencias, ejecute el comando "**npm run dev**" en la consola para encender el backend, si el backend se enciende correctamente, notará el mensaje " El server está corriendo en http://localhost:" y el puerto el cual haya ingresado en las variables de entorno.

Después de esto, si se conecta correctamente a la base de datos, se mostrará un mensaje el cual mostrará El día y la hora de conexión, y el mensaje " info: MongoDB Conectado: " y la dirección de la db.

El siguiente paso es levantar el front-end, ejecute el comando "**npm run front**" en otra terminal diferente de la del backend para levantar el frontend, si todo sale bien, Vite le mostrará la url para conectarse, puede entrar al link presionando Ctrl + El link que le da Vite, o copiar y pegarlo en su navegador de preferencia.

Tenga en cuenta que debe conectarse a la base de datos para que el consumo de apis funcione correctamente.


## APIs

A continuación, se presenta la documentación de los endpoints de la API para la gestión de usuarios.

### 1. Usuarios

#### Crear Usuario

- **Método:** `POST`
- **Endpoint:** `/api/usuarios`
- **Descripción:** Crea un nuevo usuario.
  
#### Campos para el Body:

| Campo             | Tipo     | Descripción                  |
|-------------------|----------|------------------------------|
| `nombre`          | `string` | Nombre del usuario           |
| `apellido`        | `string` | Apellido del usuario         |
| `email`           | `email`  | Correo electrónico           |
| `contrasena` | `string` | Contraseña encriptada       |

---

#### Iniciar Sesión

- **Método:** `POST`
- **Endpoint:** `/api/usuarios/iniciarSesion`
- **Descripción:** Obtiene la información del usuario excluyendo `contrasena_hash` y el campo `fecha_de_creacion`. Retorna la fecha y hora actual del inicio de sesión.

#### Campos para el Body:

| Campo             | Tipo     | Descripción                  |
|-------------------|----------|------------------------------|
| `email`           | `email`  | Correo electrónico           |
| `contrasena`      | `string` | Contraseña                   |

#### Respuesta:

- Devuelve la información del usuario y un token de sesión.

---

#### Validar Sesión

- **Método:** `POST`
- **Endpoint:** `/api/usuarios/validarSesion`
- **Descripción:** Descifra la sesión proporcionada en el header `Authorization: Bearer <token>` y retorna la información que incluye.

#### Requerimientos:

- **Header:** 
  - `Authorization: Bearer <token>`

---

#### Obtener Todos los Usuarios

- **Método:** `GET`
- **Endpoint:** `/api/usuarios`
- **Descripción:** Obtiene todos los usuarios.

#### Respuesta:

- Retorna una lista de usuarios excluyendo `contrasena_hash`.

---

#### Obtener Usuario por ID

- **Método:** `GET`
- **Endpoint:** `/api/usuarios/{id}`
- **Descripción:** Obtiene un usuario específico por su ID.

#### Parámetros:

- `id`: ID del usuario a obtener.

---

#### Actualizar Usuario

- **Método:** `PUT`
- **Endpoint:** `/api/usuarios/{id}`
- **Descripción:** Actualiza un usuario específico por su ID.

#### Campos para el Body:

| Campo             | Tipo     | Descripción                  |
|-------------------|----------|------------------------------|
| `nombre`          | `string` | Nombre del usuario (opcional)|
| `apellido`        | `string` | Apellido del usuario (opcional)|
| `email`           | `email`  | Correo electrónico (opcional)|

#### Parámetros:

- `id`: ID del usuario a actualizar.

---

#### Eliminar Usuario

- **Método:** `DELETE`
- **Endpoint:** `/api/usuarios/{id}`
- **Descripción:** Elimina un usuario específico por su ID.

#### Parámetros:

- `id`: ID del usuario a eliminar.

---

### 2. Notas

#### Crear Nota

- **Método:** `POST`
- **Endpoint:** `/api/notes`
- **Descripción:** Crea una nueva nota.

#### Campos para el Body:

| Campo               | Tipo       | Descripción                              |
|---------------------|------------|------------------------------------------|
| `titulo`            | `string`   | Título de la nota (opcional)     |
| `descripcion`       | `string`   | Descripción de la nota (opcional)  |

---

#### Obtener Todas las Notas

- **Método:** `GET`
- **Endpoint:** `/api/notes`
- **Descripción:** Obtiene todas las notas del usuario autenticado.

#### Respuesta:

- Retorna una lista de notas del usuario.

---

#### Obtener Nota por ID

- **Método:** `GET`
- **Endpoint:** `/api/notes/{id}`
- **Descripción:** Obtiene una nota específica por su ID.

#### Parámetros:

- `id`: ID de la nota a obtener.

---

#### Actualizar Nota

- **Método:** `PUT`
- **Endpoint:** `/api/notes/{id}`
- **Descripción:** Actualiza una nota específica por su ID.

#### Campos para el Body:

| Campo               | Tipo       | Descripción                              |
|---------------------|------------|------------------------------------------|
| `titulo`            | `string`   | Título de la nota (opcional)       |
| `descripcion`       | `string`   | Descripción de la nota (opcional)  |

#### Parámetros:

- `id`: ID de la nota a actualizar.

---

#### Eliminar Nota

- **Método:** `DELETE`
- **Endpoint:** `/api/notes/{id}`
- **Descripción:** Elimina una nota específica por su ID.

#### Parámetros:

- `id`: ID de la nota a eliminar.

---