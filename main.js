// Variable Declaration
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();  //invoke formValidation
});


// formValidation function
let formValidation =  () => {
    if (textInput.value === "") {
        console.log('failure');
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log('success');
        msg.innerHTML = " ";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal"); //closing the model
        add.click();

    //IIFE
        (() => {
            add.setAttribute("data-bs-dismiss", ""); //used for not closing blank input
        })();
    }
};

//array for storing the data
let data = [];

let acceptData = () => {
    data.push({    //pushing data into data array
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    
    localStorage.setItem("data", JSON.stringify(data)); //storing data into local storage

    console.log(data);
    createTasks();  //invoking the createTask function
};

//key
let createTasks = () => {
    tasks.innerHTML = ""; //doubling the data
    data.map((x,y) => {  //map used for array
        return (tasks.innerHTML += `
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
                <i onClick ="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
        </div>`);
    });
    

            resetForm(); //invoke after completing the field it resets the model
};

//delete function for delete button
let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);//for used for y index
    localStorage.setItem("data", JSON.stringify(data)); //removing from local storage
    console.log(data);
};
//edit function for edit button
let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e); //invoking the delete function
};
//reset function for reset model
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

//IIFE retrieve the data from local storage
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];//
    createTasks();//collected data stored recieved from lc storage
    console.log(data);
})();
