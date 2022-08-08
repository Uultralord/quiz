    // all answers
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4'),
    // all our options
    optionElements = document.querySelectorAll('.option'),
    // question
    question = document.getElementById('question'),
    // number-of-
    numberOfQuestion = document.getElementById('number-of-question'),
    numberOfAllQuestions = document.getElementById('number-of-all-questions'),
    // answers tracker (отслеживание ответов)
    answersTracker = document.getElementById('answers-tracker'),
    // btn
    btnNext = document.getElementById('btn-next'),
    btnTryAgain = document.getElementById('btn-try-again'),
    // number of correct answers
    correctAnswer = document.getElementById('correct-answer'),
    // number-of-all-questions-2 (in modal window)
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');
    // indexеs of Question and Page
let indexOfQuestion,
    indexOfPage = 0,
    // result of quiz
    score = 0;

const questions = [
    {
        question:'How are you?',
        options: [
            'Excellent',
            'Good',
            'Not well',
            'Bad',
        ],
        rightAnswer: 0
    },
    {
        question:'How old are you?',
        options: [
            '10',
            '15',
            '20',
            '25',
        ],
        rightAnswer: 2
    },
    {
        question:'Where are you from?',
        options: [
            'America',
            'Russia',
            'Italy',
            'Brazil',
        ],
        rightAnswer: 1
    }
];
//output the number of questions
numberOfAllQuestions.innerHTML = questions.length;
const load = () =>{
    question.innerHTML = questions[indexOfQuestion].question;
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];
    numberOfQuestion.innerHTML = indexOfPage+1;
    indexOfPage++;
}

let completedAnswers = [] // array for completed questions

const randomQuestion =()=>{
    let randomNumber = Math.floor(Math.random()*questions.length);
    let hitduplicate = false; // anchor for checking the same questions
    if (indexOfPage == questions.length){
        quizOver();
    } else {
        if(completedAnswers.length>0){
            completedAnswers.forEach(item=>{
                if(item==randomNumber){
                    hitduplicate = true;
                }
            });
            if(hitduplicate==true){
                randomQuestion();
            }else{
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length==0){
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};
// adds a class depending on the answer
const checkAnswer = el =>{
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        uppdateAnswerTracker('correct');
        score++;
    }else{
        el.target.classList.add('wrong');
        uppdateAnswerTracker('wrong');
    }
    disabledOption();
}

for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}
// adding classes to answers
const disabledOption =()=>{
    optionElements.forEach(item=>{
        item.classList.add('disabled');
        if(item.dataset.id==questions[indexOfQuestion].rightAnswer){
            //shows the correct answer if our answer is incorrect
            item.classList.add('correct'); 
        }
    })
}
// removing all classes from all answers
const enableOption =()=>{
    optionElements.forEach(item=>{
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker =()=>{
    questions.forEach(()=>{
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const uppdateAnswerTracker =status=>{
    answersTracker.children[indexOfPage-1].classList.add(`${status}`);
}

const validate =()=>{
    if(!optionElements[0].classList.contains('disabled')){
        alert('you have to choose the answer option');
    } else{
        randomQuestion();
        enableOption();
    }
}

btnNext.addEventListener('click', ()=>{
    validate();
})

const quizOver=()=>{
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML=score;
    numberOfAllQuestions2.innerHTML=questions.length;
}

btnTryAgain.addEventListener('click',()=>{
    tryAgain();
})

const tryAgain=()=>{
    window.location.reload();
}

window.addEventListener('load', ()=>{
    randomQuestion();
    answerTracker();
})