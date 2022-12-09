# Done Task Manager

[Test the WebApp](https://done-task-manager.vercel.app/)

## Description

This is the final project realized during the Ironhack Front End Development bootcamp that consists of a web page that allows you to manage your tasks.

It is an application created with Vue.js that allows users to create an account, add tasks to complete, edit them, mark them as completed and finally delete them. Our web page is linked to a database, where we will be storing all user data and tasks. In this case, to manage it we use Supabase, which offers us a subset of Back End functionalities that allows us to manage it as a service.

Login

![Pagina Login](https://i.postimg.cc/QCnZbQWW/01032384-a611-4e72-bde1-b9e06b8c3fcf.png)

Home

![Pagina Home](https://i.postimg.cc/gj1BjNZ4/home.png)

## Technologies used:

- **Client:** Vue.js and Vite
- **Router:** Vue Router
- **Store:** Pinia, Pinia Persist for the Log In
- **Database:** Supabase

## Development of the project:

### December 6:

- Supabase database setup
- Implementation of the Sign Up y Sing In

### December 7:

- Logic for he Sign Up, Sign In and Sing Out
- Account view and database profile query
- Logic for task elements
- Logic for the tasks fetch

### December 8:

- Creation and delete of tasks
- Update for tasks status (complete, not complete)
- Edit of the tasks titles and descriptions

### December 9:

- CSS styles for home
- CSS styles for login and setup views
- New task action in navbar from any view

Requisitos para el final Project
Para este proyecto vamos a desarrollar una aplicación ToDo (para hacer un seguimiento de tareas que tenemos pendientes) que deberá cumplir como mínimo los siguientes puntos:

- Los usuarios podrán crearse una cuenta (Sign Up, Log In y Log Out).
- Los usuarios podrán crear tareas, editarlas, marcarlas/desmarcarlas como completadas y borrarlas.
- La aplicación estará vinculada a Supabase y guardará ahí toda la data de tareas y usuarios.
- Usaremos las stores de Pinia para conectarnos con el backend y manejar el estado de la app.
- Usaremos Vue Router para poder navegar por nuestra página evitando hacer refresh.
- Crearemos el styling en UN solo archivo (lo tenéis creado en assets/style.css). Si este está correctamente insertado en main.js, no tendréis problema accediendo a las clases y los ids de vuestros componentes.
- El diseño de la página será propio.
- La página será responsive y tendrá al menos dos versiones: mobile y desktop.
- La app estará deployeada en Vercel.
- Las operaciones asíncronas estarán correctamente manejadas con promises o async/await.
- Mantendréis una ruta de trabajo en el readme del repo, que actualizaréis cada día.
- Usaréis un trello para seguir el progreso de vuestro proyecto.
