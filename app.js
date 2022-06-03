const form=document.getElementById('form');
const textInput=document.getElementById('textInput');
const dateInput=document.getElementById('dateInput');
const textarea=document.getElementById('textarea');
const msg=document.getElementById('msg');
const tasks=document.getElementById('tasks');
const add=document.getElementById('add');
 
//form validation
form.addEventListener('submit',e=>{
    e.preventDefault();
    formValiation()
   // form.reset()
})
const formValiation=()=>{
    if(textInput.value===''){
        console.log('failure');
        msg.innerHTML='task cannot be blank';
    }else{
        console.log('success')
        msg.innerHTML=''
        acceptData();
        add.setAttribute('data-bs-dismiss','modal');
        add.click();
        (()=>{
            add.setAttribute('data-bs-dismiss','');

        })();
    }
}
//collect data using local storage
let data=[];
 const acceptData=()=>{
     data.push({
         text:textInput.value,
         date:dateInput.value,
         description:textarea.value,

     });
     localStorage.setItem('data',JSON.stringify(data));
     console.log(data)
     createTasks();
 }

 //create new taks
  const createTasks=()=>{
      tasks.innerHTML='';
      data.map((x,y)=>{
          return (tasks.innerHTML+=`
          <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
          <span class="options">
          <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
          <i onClick="deleteTask(this);createTask()" class="fas fa-trash-alt"></i>
          </span>
          </div> 
          `);
      });
      resetForm();
  };
  const resetForm=()=>{
      textInput.value='';
      dateInput.value='';
      textarea.value='';
  }
  //function to delete task
  const deleteTask=e=>{
      e.parentElement.parentElement.remove();
      data.splice(e.parentElement.parentElement.id,1);
      localStorage.setItem('data',JSON.stringify(data));
      console.log(data)
  }
  //function to edit tasks
  const editTask=e=>{
      const selectedTask=e.parentElement.parentElement;
      textInput.value=selectedTask.children[0].innerHTML;
      dateInput.value=selectedTask.children[1].innerHTML;
      textarea.value=selectedTask.children[2].innerHTML;
      deleteTask(e);
  }
  //getting data from local storage
  (()=>{
      data=JSON.parse(localStorage.getItem('data'))||[];
      console.log(data);
      createTasks();
  })();