let tasks=JSON.parse(localStorage.getItem("tasks")) ||[];
let form = document.querySelector(".tasktaker");
let input=document.querySelector(".typing_task");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(input.value.trim()){
      tasks.push({text:input.value.trim(),checked:false});
      localStorage.setItem("tasks", JSON.stringify(tasks));
      updatelist();
      input.value="";
    }
});


document.querySelector(".reset").addEventListener("click", ()=>{
    tasks=[];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updatelist();
});
document.querySelector(".checkall").addEventListener("click", ()=>{
    tasks.forEach((task)=>{
        task.checked=true;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updatelist();
});
document.querySelector(".deletecheck").addEventListener("click", ()=>{
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (tasks[i].checked === true) {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updatelist();
});

let frac=()=>{
    let c=0;
    let t=tasks.length;
    for(let i=0;i<t;i++){
        if(tasks[i].checked){
            c++;
        }
    }
    document.querySelector(".fraction").textContent=`${c}/${t}`;
}




let updatelist = () => {
    document.querySelector(".tasks_list").innerHTML = ``;
  
    tasks.forEach((task, i) => {
      let newtask = document.createElement("div");
      newtask.setAttribute("class", "task_stored");
  
      let check_class = task.checked ? "checked" : "";
      let check_mark = task.checked ? "✓" : "";
  
      newtask.innerHTML = `
        
        
        <div class="delete" style="grid-area: boxdust"><i class="fa-solid fa-trash"></i></div>
        <div class="task_line" style="grid-area: boxline">${task.text.trim()}</div>
        <div class="tick ${check_class}" style="grid-area: boxcheck" data-index="${i}">
           <div class="small_bro">✓</div>
        </div>
      `;
  
      document.querySelector(".tasks_list").append(newtask);
  
      let tickDiv = newtask.querySelector(".tick"); //check the task activity starts here
  
      // Set custom properties on first render (optional)
      if (task.checked) {
        tickDiv.style.setProperty("--fill1", "33.34%");
        tickDiv.style.setProperty("--fill2", "66.67%");
        tickDiv.style.setProperty("--fill3", "100.1%");
        tickDiv.style.setProperty("--fill", "20vw");
      } else {
        tickDiv.style.setProperty("--fill1", "0%");
        tickDiv.style.setProperty("--fill2", "33.34%");
        tickDiv.style.setProperty("--fill3", "66.67%");
        tickDiv.style.setProperty("--fill", "0vw");
      }
  
      tickDiv.addEventListener("click", () => {
        tasks[i].checked = !tasks[i].checked;
  
        if (tasks[i].checked) {
          tickDiv.classList.add("checked");
          tickDiv.style.setProperty("--fill1", "33.34%");
          tickDiv.style.setProperty("--fill2", "66.67%");
          tickDiv.style.setProperty("--fill3", "100.1%");
          tickDiv.style.setProperty("--fill", "20vw");
          
        } else {
          tickDiv.classList.remove("checked");
          tickDiv.style.setProperty("--fill1", "0%");
          tickDiv.style.setProperty("--fill2", "33.34%");
          tickDiv.style.setProperty("--fill3", "66.67%");
          tickDiv.style.setProperty("--fill", "0vw");
          
        }
  
        localStorage.setItem("tasks", JSON.stringify(tasks));
        frac(); // just update the count
        
      });                                                 //check the task activity ends here

      let deleteDiv = newtask.querySelector(".delete");     //delete the task activity starts here
      deleteDiv.addEventListener("click", () => {
          tasks.splice(i,1);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          frac();
          updatelist();
      });                                                  //delete the task activity ends here

      let editdiv=newtask.querySelector(".task_line");   //edit activity starts here
      editdiv.addEventListener("click", ()=>{
       
        let original=newtask.querySelector(".task_line");
        let originaltext=newtask.querySelector(".task_line").textContent;

        let newinputdiv=document.createElement("input");
        newinputdiv.type = "text";
        newinputdiv.value = originaltext;
        newinputdiv.className = "input_line";
        newinputdiv.style.gridArea = "boxinput";
        

        let newsubmit=document.createElement("button");
        newsubmit.type="submit";
        newsubmit.className="submittext"
        newsubmit.textContent="Edit";
        newsubmit.style.gridArea = "boxsubmit";; 
         
        
        let form=document.createElement("form");
        form.style.gridArea = "boxline";
        form.className="task_line_edit";
        form.appendChild(newinputdiv);
        form.appendChild(newsubmit);

        original.replaceWith(form);
        newinputdiv.focus();
        
        

        
        form.addEventListener("submit",(e)=>{
          e.preventDefault();
            if(newinputdiv.value.trim()){
              tasks[i].text=newinputdiv.value.trim();
              localStorage.setItem("tasks", JSON.stringify(tasks));
              updatelist();
              form.replaceWith(original);
            }
          });
        
          setTimeout(()=>{document.addEventListener("click", function (e) {
            // Check if the click is outside the #hello element
            if (!form.contains(e.target)) {
              
              form.replaceWith(original);
            }
          });},0);
      }); //edit activity ends here
    });      //newtask for loop end here                                                 


    
                                                                          
    frac(); // update checked count                       
  };

  

  
updatelist();