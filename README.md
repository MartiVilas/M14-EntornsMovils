#  Proyecto de Autenticación con Node.js y Express

Este proyecto forma parte de una práctica de ciclo superior de Desarrollo de Aplicaciones Web.  
Su objetivo es implementar un **sistema básico de registro y autenticación de usuarios** utilizando **Node.js**, **Express** y **EJS** como motor de plantillas.

---

##  Descripción general

El proyecto permite a los usuarios **registrarse** en una aplicación web mediante un formulario.  
Los datos se envían al servidor a través de una **petición POST**, se validan y se guardan en la base de datos.

Además, se implementa el **hash de contraseñas** con `bcrypt` y la **generación de tokens JWT** para futuras funcionalidades de login seguro.

---

##  Tecnologías utilizadas

- **Node.js** → entorno de ejecución de JavaScript.  
- **Express** → framework para crear el servidor web.  
- **EJS** → motor de plantillas para renderizar vistas dinámicas.  
- **SQLite / PostgreSQL** → base de datos para almacenar usuarios.  
- **bcrypt** → cifrado de contraseñas.  
- **jsonwebtoken (JWT)** → gestión de autenticación por token.  
- **dotenv** → gestión de variables de entorno.  

---

##  Instalación y ejecución

1. Clonar el repositorio o descomprimir el proyecto:  
   ```bash
   git clone https://github.com/usuario/Autenticacio.git
   cd Autenticacio
   ```

2. Instalar las dependencias necesarias:  
   ```bash
   npm install
   ```

3. Crear un archivo `.env` en la raíz del proyecto con el contenido:
   ```bash
   PORT=3000
   SECRET_JWT_KEY=clave_secreta_segura
   ```

4. Iniciar el servidor:  
   ```bash
   npm run dev
   ```
   o  
   ```bash
   node index.js
   ```

5. Abrir el navegador y acceder a:  
   ```
   http://localhost:3000
   ```

---

##  Estructura del proyecto

```
Autenticacio/
│
├── public/                # Archivos estáticos (CSS, imágenes, JS del frontend)
├── views/                 # Vistas EJS (ej. register.ejs, login.ejs)
├── includes/              # Conexiones y configuraciones de la base de datos
├── user-repository.js     # Lógica de gestión de usuarios
├── app.js / index.js      # Servidor principal Express
├── config.js              # Variables globales y configuración
└── package.json           # Dependencias y scripts
```

---

##  Endpoints principales

| Método | Ruta         | Descripción                         |
|--------|--------------|-------------------------------------|
| GET    | `/`          | Muestra el formulario de registro.  |
| POST   | `/register`  | Crea un nuevo usuario.              |

---

##  Ejemplo de flujo de registro

1. El usuario completa el formulario en `/`.
2. El servidor recibe los datos con un `POST /register`.
3. Se valida si el nombre de usuario ya existe.
4. Se cifra la contraseña con **bcrypt**.
5. Se guarda el usuario en la base de datos.
6. Se responde con un mensaje JSON de éxito.

---

##  Ejemplo de respuesta

```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": 1,
    "username": "lokete",
    "created_at": "2025-10-07T18:00:00Z"
  }
}
```

---

##  Autor

Proyecto desarrollado por **Martí Vilàs**,  
estudiante del **Ciclo Superior de Desarrollo de Aplicaciones Web (DAW)**.  
📍 *Institut Tecnològic de Barcelona (ITB)*  
📅 Curso 2025 - 2026
