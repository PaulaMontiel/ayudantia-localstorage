// Variables
const listaTarea = document.getElementById('listaTareas');

// Ejecución eventos
eventListeners();

function eventListeners() {
     //Cuando se envia el formulario
     document.getElementById('enviarTarea').addEventListener('click', agregarTarea);
     // Borrar Tweets
     document.addEventListener('click', borrarTarea);
     // Contenido cargado
     document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Funciones

//Generar elementos del DOM
function generarDom(mensaje){
  
  // Crear elementos
  const itemTarea = document.createElement('div');
  const parrafo = document.createElement('p');
  const textTarea = document.createTextNode(mensaje);
  const botonBorrar = document.createElement('button');
  const textBoton = document.createTextNode('X')


 // añadir clases a elementos
 parrafo.setAttribute('class', 'd-inline-block')
 botonBorrar.setAttribute('class','btn btn-dark');
 botonBorrar.setAttribute('id', 'borrar-tarea');

  //Añade texto al boton
  botonBorrar.appendChild(textBoton);
  // añade la tarea al parrafo
  parrafo.appendChild(textTarea);
  // añade el tweet a la lista
  itemTarea.appendChild(parrafo);
  // añade el botón de borrar al tweet
  itemTarea.appendChild(botonBorrar);
  // añade item con tarea y boton a contenedor padre
 listaTarea.appendChild(itemTarea);
}

// Añadir tareas al documento
function agregarTarea() {
     // leer el valor del textarea
     const tareas = document.getElementById('crearTarea').value;
     //Crear elementos en el DOM
     generarDom(tareas)
     // Añadir a Local Storage
     agregarTareasLocalStorage(tareas);
}


// Elimina tarea del DOM
function borrarTarea(e) {
    //console.log(e)
    //console.log(e.target.parentElement)
    //console.log(e.target.parentElement.innerText)
    //console.log(e.target.id)
     if(e.target.id === 'borrar-tarea') {
          e.target.parentElement.remove();
          borrarTareasLocalStorage(e.target.parentElement.innerText);   
     }
}

// Mostrar datos de LocalStorage en la página
function localStorageListo() {
     let tareas;
     tareas = obtenerTareasLocalStorage();
     tareas.forEach(function(mensaje) {
          generarDom(mensaje);      
     });
}

 //Agrega tweet a local storage
function agregarTareasLocalStorage(textoTarea) {
     let tareas;
     tareas = obtenerTareasLocalStorage();
     // Añadir el nuevo tweet
     tareas.push(textoTarea);
     // Convertir de string a arreglo para local storage
     localStorage.setItem('tareas', JSON.stringify(tareas) );
}

// Comprobar que haya elementos en localstorage, retorna un arreglo
function obtenerTareasLocalStorage() {
     let tareas;
     // Revisamos los valores de local storage
     if(localStorage.getItem('tareas') === null) {
          tareas = []; 
     } else {
          tareas = JSON.parse(localStorage.getItem('tareas'));
          //console.log(tareas);
     }
     return tareas;
}

// Eliminar tweet de Local Storage
function borrarTareasLocalStorage(tarea) {
     let tareas, borrarTarea;
     // Elimina la X del tweet
     borrarTarea = tarea.substring(0, tarea.length - 1); //recibe todo el texto de la tarea, más la X y procede a cortar el texto, dejando solo el texto de la tarea, para eliminarla del localStorage
    //console.log(borrarTarea)
     tareas = obtenerTareasLocalStorage();
    //console.log(tareas);
     tareas.forEach(function(textoArr, index) {
       //console.log(tarea)
       //console.log(index)
          if(borrarTarea === textoArr) {
               tareas.splice(index, 1);
          }
     })
     localStorage.setItem('tareas', JSON.stringify(tareas));
     //console.log(tareas)
}
