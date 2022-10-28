const coursesDiv=document.getElementById("coursesDiv");      //contenitore dei corsi
const btnNew=document.getElementById("btnnewTask");
const txtTaskDescription=document.getElementById("txtTaskDescription");
const divErr=document.getElementById("divErr");

btnNew.addEventListener("click",addTask);

const coursesUrl="http://localhost:8080/api/todo";

getAllList();        

function getAllList() {
    axios.get(coursesUrl)
        .then((response) => {
            
            coursesDiv.innerHTML="";        
            const listaToDo=response.data;       
            for (let i=0;i<listaToDo.length;i++) {
                const cDiv=document.createElement("div");
                cDiv.innerHTML=listaToDo[i].description;     
                const img=document.createElement("img");    
                img.src="img/trash.png";
                img.title="Elimina";
                img.width=20;
                img.alt="Elimina corso";
                img.setAttribute("taskId",listaToDo[i].id);      
                img.addEventListener("click",deleteList);
                cDiv.appendChild(img);
                coursesDiv.appendChild(cDiv);  
                
                
            }      
        })
        .catch((error) => {
            console.log(error);
        });
}

function addTask() {
    if(txtTaskDescription.value!="") {
        const newTask= {
            name: txtTaskDescription.value           
        }

        axios.post(coursesUrl + "/add/",newTask)
            .then((response) => {
                getAllList();        
                txtTaskDescription.value="";
            })
            .catch((error) => {
               
                console.log(error);
                divErr.innerHTML="Impossibile inserire task: "+error.message;
            });
    } else
        alert("Il nome della task è obbligatorio!");
}

function deleteList(event) {
   
    let taskId=event.target.getAttribute("taskId");

    axios.delete(coursesUrl+"/delete/"+taskId)
    .then((response) => {        
        getAllList();                     
        })
    .catch((error) => {
     
        console.log(error);
        divErr.innerHTML="Impossibile inserire la task: "+error.message;
    });

}