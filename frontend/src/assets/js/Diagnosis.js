export function myDiag(){
    const questions= [
        {
            question: "Little interest or pleasure in doing things",
            answers: [
                {text:"Nearly every day" ,value:0, flag:true},
                {text:"Several days" ,value:1, flag:true},
                {text:"More than half the dayes" ,value:2, flag:true},
                {text:"Not at all" ,value:3, flag:true}          
            ]
        }
        ,
        {
            question: "Feeling down, depressed, or hopeless",
            answers: [
                {text:"Not at all" ,value:0, flag:true},
                {text:"Several days" ,value:1, flag:true},
                {text:"More than half the dayes" ,value:2, flag:true},
                {text:"Nearly every day" ,value:3, flag:true}           
            ]
        },
        {
            question: "Trouble failling staying asleep, or sleeping too much",
            answers: [
                {text:"Not at all" ,value:0, flag:true},
                {text:"Several days" ,value:1, flag:true},
                {text:"More than half the dayes" ,value:2, flag:true},
                {text:"Nearly every day" ,value:3, flag:true}        
            ]
        },
        {
            question: "Feeling tired or having little energy",
            answers: [
                {text:"Not at all" ,value:0, flag:true},
                {text:"Several days" ,value:1, flag:true},
                {text:"More than half the dayes" ,value:2, flag:true},
                {text:"Nearly every day" ,value:3, flag:true}          
            ]
        },
        {
            question: "Poor appetite or overeating",
            answers: [
                {text:"Not at all" ,value:0, flag:true},
                {text:"Several days" ,value:1, flag:true},
                {text:"More than half the dayes" ,value:2, flag:true},
                {text:"Nearly every day" ,value:3, flag:true}        
            ]
        },
        {
            question: "Feeling bad yourself-or that you are a failure or have let yourself or your family down",
            answers: [
                {text:"Not at all" ,value:0, flag:true},
                {text:"Several days" ,value:1, flag:true},
                {text:"More than half the dayes" ,value:2, flag:true},
                {text:"Nearly every day" ,value:3, flag:true}           
            ]
        },
        {
            question: "Trouble concentrating on things",
            answers: [
                {text:"Not at all" ,value:0, flag:true},
                {text:"Several days" ,value:1, flag:true},
                {text:"More than half the dayes" ,value:2, flag:true},
                {text:"Nearly every day" ,value:3, flag:true}           
            ]
        },
        {
            question: "Moving or speaking noticeanle slower than usual or the opposit-faster then usual",
            answers: [
                {text:"Not at all" ,value:0, flag:true},
                {text:"Several days" ,value:1, flag:true},
                {text:"More than half the dayes" ,value:2, flag:true},
                {text:"Nearly every day" ,value:3, flag:true}            
            ]
        },
        {
            question: "Thouts you would be better off dead or of hurting yourself in someway",
            answers: [
                {text:"Not at all" ,value:0, flag:true},
                {text:"Several days" ,value:1, flag:true},
                {text:"More than half the dayes" ,value:2, flag:true},
                {text:"Nearly every day" ,value:3, flag:true}           
            ]
        }
    
        // },
        // {
        //     question: "soon",
        //     answers: [
        //         {text:"Not at all" ,value:0, flag:true},
        //         {text:"Several days" ,value:1, flag:true},
        //         {text:"More than half the dayes" ,value:2, flag:true},
        //         {text:"Nearly every day" ,value:3, flag:true}           
        //     ]
        // }
    ]
    
    const resultNextStep = [
        {
            text : "while your symptoms are likely not having a major impact on your life, it may still be helpful to monitor them, it is recommended that you retake this test once every two weeks.",
            type : 1
        },
        {
            text : "while your symptoms are likely not having a major impact on your life, it may still be helpful to monitor them, it is recommended that you retake this test once every two weeks.",
            type : 2
        },
        {
            text : "while this is not a diagonistic test, it may be worthwhile to start a conversation with your doctor or mental health professional, finding the right treatment plan can help you on the path toward feeling better, is is also recommended that you monitor your symptoms by retaking this test once every two weeks.",
            type : 3
        },
        {
            text : "while this is not a diagonistic test, people who scored similar to you typically recive a diagonisis of major depression and have sought professional treatment for this disorder, it may be beneficial for you to consult your doctor or mental health professional immediately.",
            type : 4
        },
        {
            text : "while this is not a diagonistic test, people who scored similar to you typically recive a diagonisis of major depression and have sought professional treatment for this disorder, it may be beneficial for you to consult your doctor or mental health professional immediately.",
            type : 5
        }
    ]
    
    // const howToHelp = [
    //     {
    //         number : 1,
    //         test : "find the best therapist for you!"
    //     },
    //     {
    //         number : 2,
    //         test : "began your therapeutic trip with your therapist"
    //     },
    //     {
    //         number : 3,
    //         test : "emotional discharge by chating with AI to improve your mental health!" 
    //     },
    //     {
    //         number : 4,
    //         test : "daily exercises using mental health tools to improve your mental health"
    //     },
    //     {
    //         number : 5,
    //         test : "tips, improve your mental health, SOS, and more!"
    //     },
    // ]
    
    const questionElement = document.getElementById("question");
    const answerButton = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const preButton = document.getElementById("pre-btn");
    const main = document.querySelector(".main")
    const resultBox = document.querySelector(".result-box");
    const resultTypeSpan = document.querySelector(".type-interpretation");
    const info = document.querySelector(".info");
    const nextStep = document.querySelector(".next-steps");
    const infoDetails = document.querySelector(".info-details");
    const nextStepDetails = document.querySelector(".next-step-details");
    const help = document.querySelector(".help");
    const helpDetails = document.querySelector(".help-details");
    const exit = document.querySelector(".exit");
    const regester = document.querySelector(".regester");
    
    let currentQuestionIndex = 0;
    let score = 0;
    let scoreArray=[];
    
    function startTest(){
        score = 0;
        currentQuestionIndex = 0;
        showquestion();
    }
    
    function showquestion(){
        resetState();
    
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1 ; 
        questionElement.innerHTML = questionNo + '. ' + currentQuestion.question; 
    
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn-diag");
            answerButton.appendChild(button);
            if(answer.flag){
                button.dataset.value = answer.value;
            }
            if(currentQuestionIndex<1){
                preButton.classList.add("desactive")
                preButton.classList.remove("active") ;
            }       
            if(currentQuestionIndex>=1){
                preButton.classList.remove ("desactive");
                preButton.classList.add("active") ;
            }
            answerButton.addEventListener("click", removefirst)
            questionCounter(currentQuestionIndex);
        });
    }
    function removefirst(e){
        Array.from(answerButton.children).forEach(button => {
            if(button.classList.contains("selected")&&button.dataset.value!==undefined){
                if(button.dataset.value==1){
                    scoreArray.pop(score);
                    score=score-1;
                }
                else if(button.dataset.value==2){
                    scoreArray.pop(score);
                    score=score-2;
                }
                else if(button.dataset.value==3){
                    scoreArray.pop(score);
                    score=score-3;
                }
            }
            button.classList.remove("selected");
        })
        selectAnswer(e);
    }
    function resetState(){
        nextButton.classList.add ("desactive");
        nextButton.classList.remove("active") ;
    
        while(answerButton.firstChild){
            answerButton.removeChild(answerButton.firstChild);
        }
    }
    function selectAnswer(e){
        const selectedBtn = e.target;
        console.log(selectedBtn.dataset.value)
        if(selectedBtn.dataset.value){
            if(selectedBtn.dataset.value==1){
                score=score+1;
                scoreArray.push(score);
            }
            else if(selectedBtn.dataset.value==2){score=score+2;
                scoreArray.push(score);
            }
            else if(selectedBtn.dataset.value==3){score=score+3;
                scoreArray.push(score);
            }
            
        }
        console.log(score);
        if(selectedBtn.value=undefined){
            selectedBtn.classList.remove("selected");
        }
        if(selectedBtn.dataset.value&&selectedBtn.dataset.value!==undefined){
            selectedBtn.classList.add("selected");
        }
        nextButton.classList.remove ("desactive");
        nextButton.classList.add("active") ;
        if(currentQuestionIndex>=1){
            preButton.classList.add("active") ;
            preButton.classList.remove ("desactive");
        }
        if(currentQuestionIndex<1){
            preButton.classList.add("desactive")
            preButton.classList.remove("active") ;
        } 
    }
    
    
    function handlePreButton(){
        currentQuestionIndex--;
        if(currentQuestionIndex> 0){
            showquestion();
        }
    
    }
    
    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex< questions.length){
            showquestion();
        }else{
            resultShow();
        }
    }
    
    nextButton.addEventListener("click", () => {
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            resultShow();
        }
    })
    
    preButton.addEventListener("click",()=> {
        scoreArray.pop(score);
        console.log(scoreArray);
    
    
        handlePreButton()
    })
    
    function questionCounter(index){
        const questionTotal = document.querySelector('.question-total');
        questionTotal.textContent = index+1 + " of " + questions.length + " Questions";
    }
    
    startTest();
    
    function resultShow(){
    
        resultBox.classList.add("show-result")
        main.classList.add("done")
    
    
    
    
        scoreInterpretation();
    }
    
    function scoreInterpretation(){
        // howToHelp.forEach( way => {
        //     helpDetails.innerHTML = helpDetails + "\n" + way.number + ". " + way.test
        // })
        if(score>=0&&score<=4){
            resultTypeSpan.innerHTML = "Minimal Depression";
            nextStepDetails.innerHTML = resultNextStep[0].text;
        }
        else if(score>=5&&score<=9){
            resultTypeSpan.innerHTML= "Mild Depression" ;
            nextStepDetails.innerHTML = resultNextStep[1].text
        }
        else if(score>=10&&score<=14){
            resultTypeSpan.innerHTML = "Moderate Depression";
            nextStepDetails.innerHTML = resultNextStep[2].text
        }
        else if(score>=15&&score<=19){
            resultTypeSpan.innerHTML = "Moderately severe Depression";
            nextStepDetails.innerHTML = resultNextStep[3].text
        }
        else if(score>=20&&score<=27){
            resultTypeSpan.innerHTML = "Severe Depression";
            nextStepDetails.innerHTML = resultNextStep[4].text
        }
    }
    
    
    info.addEventListener("click", () => {
        infoDetails.style.display = infoDetails.style.display === "none" || infoDetails.style.display === "" ? "block" : "none";
        nextStepDetails.style.display = nextStepDetails.style.display === "none" || nextStepDetails.style.display === "" ? "none" : "none";
        helpDetails.style.display = helpDetails.style.display === "none" || helpDetails.style.display === "" ? "none" : "none";
    })
    
    nextStep.addEventListener("click", () => {
        nextStepDetails.style.display = nextStepDetails.style.display === "none" || nextStepDetails.style.display === "" ? "block" : "none";
        infoDetails.style.display = infoDetails.style.display === "none" || infoDetails.style.display === "" ? "none" : "none";
        helpDetails.style.display = helpDetails.style.display === "none" || helpDetails.style.display === "" ? "none" : "none";
    })
    
    help.addEventListener("click", () => {
        helpDetails.style.display = helpDetails.style.display === "none" || helpDetails.style.display === "" ? "block" : "none";
        infoDetails.style.display = infoDetails.style.display === "none" || infoDetails.style.display === "" ? "none" : "none";
        nextStepDetails.style.display = nextStepDetails.style.display === "none" || nextStepDetails.style.display === "" ? "none" : "none";
    })
    
    
    exit.addEventListener("click",() =>{
        resultBox.classList.remove("show-result")
        main.classList.remove("done")
         // tarik add the go home thing
    })
    
    regester.addEventListener("click",() =>{
        // tarik add the go to regester thing
    })
}