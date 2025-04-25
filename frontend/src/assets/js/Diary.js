const dayTimes = [
    {
        time:"Morning",
        value:"8" ,
        listOfEvents: []
    },
    {
        time:"m",
        value:"sunday" ,
        listOfEvents: []
    },
    {
        time:"m",
        value:"monday" ,
        listOfEvents: []
    },
    {
        time:"m",
        value:"tuesday" ,
        listOfEvents: []
    },
    {
        time:"m",
        value:"wednesday" ,
        listOfEvents: []
    },
    {
        time:"m",
        value:"thursday" ,
        listOfEvents: []
    },
    {
        time:"m",
        value:"friday" ,
        listOfEvents: []
    },
    {
        time:"m",
        value:"saturday" ,
        listOfEvents: []
    },
    {
        time:"AfterNoon",
        value:"8" 
    },
    {
        time:"an",
        value:"sunday" ,
        listOfEvents: []
    },
    {
        time:"an",
        value:"monday" ,
        listOfEvents: []
    },
    {
        time:"an",
        value:"tuesday" ,
        listOfEvents: []
    },
    {
        time:"an",
        value:"wednesday" ,
        listOfEvents: []
    },
    {
        time:"an",
        value:"thursday" ,
        listOfEvents: []
    },
    {
        time:"an",
        value:"friday" ,
        listOfEvents: []
    },
    {
        time:"an",
        value:"saturday" ,
        listOfEvents: []
    },
    {
        time:"at Night",
        value:"8" 
    },
    {
        time:"n",
        value:"sunday" ,
        listOfEvents: []
    },
    {
        time:"n",
        value:"monday" ,
        listOfEvents: []
    },
    {
        time:"n",
        value:"tuesday" ,
        listOfEvents: []
    },
    {
        time:"n",
        value:"wednesday" ,
        listOfEvents: []
    },
    {
        time:"n",
        value:"thursday" ,
        listOfEvents: []
    },
    {
        time:"n",
        value:"friday" ,
        listOfEvents: []
    },
    {
        time:"n",
        value:"saturday" ,
        listOfEvents: []
    },
]

const tasks = [
    "write in a journal",
    "go out for  coffee",
    "  watch a  movie  ",
    "   go  swimming   ",
    "watch the  sunrise",
    " watch the sunset ",
    "  go  stargazing  ",
    " go rock climbing ",
    " go to the  beach ",
    "   do a  puzzle   ",
    "  drow or  paint  ",
    "   play a sport   ",
    "play an instrument",
    "   coock a meal   ",
    "go to the library ",
    "  work in garden  ",
    "   go to a play   ",
    " visit neighbors  ",
    "listen to a podcast",
    " go to a  concert ",
    "  call a  friend  ",
    "  bake a dessert  ",
    "  visit a friend  ",
    "     volunteer    ",
    "  go for a  walk  ",
    "   start a blog   ",
    " talk to Grace-AI ",
    " go to bike ride  ",
    "   visit a park   ",
    "     do yoga      ",
    "   write a poem   ",
    "  care for a pet  ",
    "     exercise     ",
    "   try new food   ",
    "    play cards    ",
    "   read a  book   ",
]

const diary = document.querySelector(".diary"),
    eventDay = document.querySelector(".event-day"),
    events = document.querySelector(".events"),
    main = document.querySelector(".container"),
    tasksList = document.querySelector(".tasks-list"),
    eventTitle = document.querySelector(".event-title"),
    eventTime = document.querySelector(".event-time"),
    plusBtn = document.querySelector(".add-event-"),
    addEventBox = document.querySelector(".add-event-wrapper"),
    times = document.querySelector(".times"),
    addEventTitle = document.querySelector(".event-name"),
    addEventBtn = document.querySelector(".add-event-btn"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to"),
    alert = document.querySelector(".alert"),
    addEventCloseBtn = document.querySelector(".close"),
    tasksListBtn = document.querySelector(".tasks-list-btn"),
    tasksListCloseBtn = document.querySelector(".close-list"),
    taskchoosen = document.querySelector(".add-the-choosen-task"),
    addedFromTheList= document.querySelector(".added-from-the-list"),
    rateAlert = document.querySelector(".rate-alert"),
    tasksListcontainer = document.querySelector(".task-list-buttons");





    
let today = new Date();
let activeDay;
let taskContext;
let flag=false;



function showTimes(){
    dayTimes.forEach(l => {
        const time = document.createElement("div");

        time.textContent=l.time;
        time.value=l.value;
        time.listOfEvents=l.listOfEvents;
        time.classList.add("time");
        if(time.value==="8"){
            time.classList.add("no");
        }
        
        times.appendChild(time);
        time.addEventListener("click",()=>{
            
            if(time.classList.contains("no")){
                
            }else{
            Array.from(times.children).forEach(c =>{
                c.classList.remove("active")
            })
            time.classList.add("active");
            eventDay.innerHTML=time.value;
            plusBtn.classList.remove("hide");
            
            removeLastListFirst();
            showListOfEvent(time);}
        })
    })

}

showTimes();


function showTasksList(){
    removeTaskListFirst();
    tasks.forEach(t => {
        const newTask = document.createElement("button");
        

        newTask.textContent = t;
        newTask.classList.add("tasks-list-button");

        tasksListcontainer.appendChild(newTask);

        newTask.addEventListener("click", () => {
            Array.from(tasksListcontainer.children).forEach(c =>{
                c.classList.remove("active")
            })
            newTask.classList.add("active");
            addEventBox.classList.add("active");
            plusBtn.classList.add("hide");
            taskContext=newTask.textContent;
            flag = true;
            taskchoosen.classList.add("active");
        })
    })
}


taskchoosen.addEventListener("click", ()=>{
    if(taskchoosen.classList.contains("active")){
        tasksList.classList.remove("show-tasks-list");
        main.classList.remove("wait");
        plusBtn.classList.add("hide");
        addEventBox.classList.add("active");
        addEventBox.classList.add("active");
        addEventTitle.classList.add("added");
        addedFromTheList.classList.add("active");
        addedFromTheList.textContent=taskContext;
    }
    else{

    }
})

plusBtn.addEventListener("click",()=>{
    addEventTitle.classList.remove("added");
    addedFromTheList.classList.remove("active");
    addEventBox.classList.add("active");
    plusBtn.classList.add("hide");
})



addEventCloseBtn.addEventListener("click",()=>{
    addEventBox.classList.remove("active");
    plusBtn.classList.remove("hide");
    addEventTitle.value="";
    addEventFrom.value="";
    addEventTo.value="";
})




addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 30);
});



addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g,"");
    addEventFrom.value = addEventFrom.value.slice(0, 1);
    if(addEventFrom.value.length===1){
        addEventFrom.value+=" / 9";
    }
});



addEventTo.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});




addEventBtn.addEventListener("click", () => {
    Array.from(times.children).forEach(time => {
        if(time.classList.contains("active")){
            if(!addEventTitle.value&&!flag){
                alert.classList.add("active");
            }
            else if(!addEventFrom.value){
                rateAlert.classList.add("active");
            }
            else{
                alert.classList.remove("active");
                rateAlert.classList.remove("active");
                time.listOfEvents.push(anEvent={title:addEventTitle.value,rate:addEventFrom.value,description:addEventTo.value});
                time.classList.add("with-event");
                addEventTitle.value="";
                addEventFrom.value="";
                addEventTo.value="";
                addEventBox.classList.remove("active");
                plusBtn.classList.remove("hide");
                showListOfEvent(time);
            }
        }
    })
})



function showListOfEvent(time){
    const l = time.listOfEvents[time.listOfEvents.length -1];
    const oneEvent = document.createElement("div");
    const oneEventTitleContainer = document.createElement("div");
    const oneEventPoint = document.createElement("i");
    const oneEventTitle = document.createElement("h3");
    const oneEventTime = document.createElement("div");
    const oneEventDescription = document.createElement("div");
    const oneEventRate = document.createElement("div");

    const eTitle = l.title;
    const isIt = time.textContent;
    const description = l.description;
    const rate = l.rate;
    
    if(isIt === 'm'){
        oneEventTime.textContent = "12:00AM - 12:00PM";
    }else if(isIt === 'an'){
        oneEventTime.textContent = "12:00PM - 06:00PM";
    }else if(isIt === 'n'){
        oneEventTime.textContent = "06:00PM - 12:00PM";
    }


    oneEventPoint.textContent = ">";
    oneEventTitle.textContent = eTitle;
    if(!description){
        oneEventDescription.textContent = "About : Nothing";
    }else{oneEventDescription.textContent = "About : "+description;}
    oneEventRate.textContent = "Task Rate : "+rate;
    if(flag){
        oneEventTitle.textContent = taskContext;
        taskContext="";
        flag = false;
    }




    oneEvent.classList.add("event");
    oneEventTitleContainer.classList.add("title");
    oneEventPoint.classList.add("point");
    oneEventTitle.classList.add("event-title");
    oneEventTime.classList.add("event-time");
    oneEventDescription.classList.add("task-description");
    oneEventRate.classList.add("event-rate");

    oneEvent.appendChild(oneEventTitleContainer);
    oneEvent.appendChild(oneEventTime);
    oneEvent.appendChild(oneEventDescription);
    oneEventTitleContainer.appendChild(oneEventPoint);
    oneEventTitleContainer.appendChild(oneEventTitle);
    oneEventTitleContainer.appendChild(oneEventRate);
    
    events.appendChild(oneEvent);
    

}
function removeLastListFirst(){
    while(events.firstChild){
        events.removeChild(events.firstChild);
    }
}
function removeTaskListFirst(){
    while(tasksListcontainer.firstChild){
        tasksListcontainer.removeChild(tasksListcontainer.firstChild);
    }
}


tasksListBtn.addEventListener("click", ()=>{
    tasksList.classList.add("show-tasks-list");
    main.classList.add("wait");
    showTasksList();
})
tasksListCloseBtn.addEventListener("click",()=>{
    tasksList.classList.remove("show-tasks-list");
    main.classList.remove("wait");
    plusBtn.classList.remove("hide");
    addEventBox.classList.remove("active");
})