"use strict";

const emailInput = document.getElementById('exampleFormControlInput1');
const estiloMakeupInput = document.getElementById('exampleFormControlTextarea1');
const enviarButton = document.querySelector('#btn');

enviarButton.addEventListener('click', function() {
 

  const email = emailInput.value;
  const estiloMakeup = estiloMakeupInput.value;

  console.log('Email:', email);
  console.log('Estilo de Make up preferido:', estiloMakeup);
});



let todos = [];

function generarId(){
  if(todos.length === 0){
    return 1
   } else{
    const lastTodo = todos[todos.length -1];
    return lastTodo.id + 1;
   }
}



const agregarTarea = document.getElementById("agregarTarea");
const todoModal = document.getElementById("todoModal");
const editarFormulario = document.getElementById("editarFormulario");
const botonDelete = document.getElementById("botonDelete");
const botonUpdate = document.getElementById("botonUpdate");
const botonEstado = document.getElementById("botonEstado");
const botonCerrar = document.getElementById("botonCerrar");

agregarTarea.addEventListener("submit", agregarTareaSubmit);
botonDelete.addEventListener("click", handlebotonDeleteClick);
editarFormulario.addEventListener("submit", handlebotonUpdateClick);
botonEstado.addEventListener("click", handlebotonEstadoClick);
botonCerrar.addEventListener("click", () => todoModal.close());

function handlebotonDeleteClick(){
const todoId = Number(editarFormulario.querySelector("#todoId").value);
todos = todos.filter(todo => todo.id !== todoId);
todoModal.close();
  renderTable();

}
function handlebotonUpdateClick(e){
  e.preventDefault();
  const todoDescripcionInput = editarFormulario.querySelector("#todoDescripcionModal");
  const todoId = Number(editarFormulario.querySelector("#todoId").textContent);
  const todo = todos.find(todo => todo.id === todoId);
  todo.descripcion = todoDescripcionInput.value;
  renderTable();
  todoModal.close();
}
function handlebotonEstadoClick(){
  const todoId = Number(editarFormulario.querySelector("#todoId").value);
  
  console.log(todoId);
 const todo = todos.find(todo => todo.id === todoId);
  if(todo.isCompleted === true){
    todo.isCompleted = false;
  }else {
    todo.isCompleted = true;
  }
  todoModal.close();
  renderTable();
}

function renderTable() {
const tablebody = document.querySelector("#tablee tbody");
  tablebody.innerHTML = "" ;

  todos.forEach(todo => {
    const row = document.createElement("tr");
    row.setAttribute("data-todo-id", todo.id);
    row.addEventListener("click", handleRowClick);


    const idcelda = document.createElement("td");
    idcelda.textContent = todo.id;
    row.appendChild(idcelda);

    const descripcioncelda = document.createElement("td");
    descripcioncelda.textContent = todo.descripcion;
    row.appendChild(descripcioncelda);

    const estadocelda = document.createElement("td");
    estadocelda.textContent = todo.isCompleted ? "Completed" : "Incompleto";
    row.appendChild(estadocelda);
    tablebody.appendChild(row);
    agregarTarea.reset();
    
  });
};


function handleRowClick(e){
const todoId = e.currentTarget.getAttribute("data-todo-id");
const todo = todos.find((todo) => todo.id === Number(todoId))


const todoIdInput = editarFormulario.querySelector("#todoId");

const todoDescripcionInput = editarFormulario.querySelector("#todoDescripcionModal");
const statusText = document.getElementById("statusText");

  if(todo.isCompleted){
    statusText.textContent = "Completed";
    statusText.classList.add("completed");
  } else{
    statusText.textContent = "Incomplete";
    statusText.classList.add("Incomplete")
  }


todoIdInput.value = todo.id;
todoDescripcionInput.value = todo.descripcion;
todoModal.showModal();

}


function agregarTareaSubmit(e) {
  e.preventDefault(); 
  const descripcionInput = agregarTarea.querySelector("#descripcion");
  
  const description = descripcionInput.value.trim();
  if(description !== ""){
    const nuevaTarea = {
      id: generarId(),
      descripcion: description,
     isCompleted: false,
  };
  todos.push(nuevaTarea);
  renderTable()
  }
}

