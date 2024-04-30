//GET THE DATA
import data from './starter-code/data.json' with {type : 'json'};



//SELECTING ELEMENTS
const categories = document.querySelectorAll('.categories');
const container1 = document.querySelector('.container1');
const container2 = document.querySelector('.container2');
const categoryValue = document.querySelector('#category-value');
const categorySvg = document.querySelector('#category-svg');
const totalNumberQuestions = document.querySelector('#total-number-questions');
const quizOptionsSection2 = document.querySelector('.quiz-options-section2');
const questionText = document.querySelector('#question-text');
const questionNumber = document.querySelector('#question-number');
let nQuestions;
let currentQuestion = 0;
let currentCategory;
let currentAnswer;
let score = 0;
let options ;
let questionIndexes;
let numberOfAnswersSelected = 0;
const submitBtn = document.createElement('button');
const rangeSlider = document.querySelector('input[type="range"]');
let value = (rangeSlider.value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min) * 100;
const nextBtn = document.createElement('button');
const scoreValue = document.querySelector('#score');
const categoryValueScore = document.querySelector('#category-value-score');
const categorySvgScore = document.querySelector('#category-svg-score');
const container3 = document.querySelector('.container3');
const playAgainBtn = document.querySelector('#playAgainBtn');
const errorMsg = document.createElement('span');
const toggleBtn = document.querySelector('#toggle-btn');

//to display questions with their answers as options
function displayQuestions(object){
    //the number total of questions
    nQuestions = object.questions.length;
    totalNumberQuestions.textContent = nQuestions;
    //the number of each question
    questionNumber.textContent = currentQuestion + 1;
    //to retrieve questions content
    questionText.textContent = object.questions[currentQuestion].question;
    let indexes = ['A', 'B', 'C', 'D'];
    for (let i = 0; i <object.questions[currentQuestion].options.length; i++) {
        const question = document.createElement('button');
        question.classList.add('answers')
        let questionText = document.createTextNode(`${object.questions[currentQuestion].options[i]}`);
        question.innerHTML = `<h3 class="question-index">${indexes[i]}</h3>
                              <p id="question${i}" class="option1 option" data-answer="${object.questions[currentQuestion].options[i]}">
                              </p>`;
        quizOptionsSection2.appendChild(question);      
        quizOptionsSection2.lastElementChild.appendChild(questionText);
        // for selecting an answer
        question.addEventListener(('click'), ()=>{
            currentAnswer = question;
            numberOfAnswersSelected = 1;
            options.forEach(btn => {
                btn.style.border = 'none';
            });
            questionIndexes.forEach((index)=>{
                index.style.backgroundColor = 'rgb(244, 246, 250)';
                index.style.color = 'rgb(98, 108, 127)';
            })
            question.style.border = '2px solid rgb(167, 41, 245)';         
            question.firstElementChild.style.backgroundColor = 'rgb(167, 41, 245)';
            question.firstElementChild.style.color = 'rgb(255, 255, 255)';

        })

    }
    submitBtn.textContent = 'Submit answer';
    submitBtn.id = 'submitBtn';
    quizOptionsSection2.appendChild(submitBtn) ;


    const answers = document.querySelectorAll('.answers')
    options = answers;
    const questionIndex = document.querySelectorAll('.question-index');
    questionIndexes = questionIndex;
    questionIndex.forEach((item)=>{
        item.classList.add('question-index-bg');
    }) 
}


//for choosing a particular test 
categories.forEach((category)=>{
    category.addEventListener(('click'),()=>{
        data.quizzes.forEach((item)=>{
            if(category.id == item.title){
                container1.style.display = 'none';
                //to display the category with its logo
                categorySvg.src = item.icon;
                currentCategory = item.title;
                categoryValue.textContent = item.title;
                sliderProgress();
                displayQuestions(item);
                container2.style.display = 'flex';
            }
        })
    })
})
//to sumbit the answer
submitBtn.addEventListener(('click'), ()=>{
    errorMsg.textContent = '';
    if(numberOfAnswersSelected != 0){
        numberOfAnswersSelected = 0;
        submitBtn.remove();
        nextBtn.textContent = "Next Question";
        nextBtn.id = 'nextBtn'
        quizOptionsSection2.appendChild(nextBtn);
        data.quizzes.forEach((item)=>{
            if(currentCategory == item.title){
                if(currentAnswer.lastElementChild.dataset.answer == item.questions[currentQuestion].answer){
                    currentAnswer.style.border = "2px solid rgb(38, 215, 130)";
                    currentAnswer.firstElementChild.style.backgroundColor = 'rgb(38, 215, 130)';
                    currentAnswer.firstElementChild.style.color = 'rgb(255, 255, 255)';
                    const iconCorrect = document.createElement('span');
                    iconCorrect.style.marginLeft= 'auto';
                    iconCorrect.innerHTML="<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='none' viewBox='0 0 40 40'><path fill='#26D782' d='M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z'/></svg>";
                    currentAnswer.appendChild(iconCorrect);
                    score ++;

                }else{
                    currentAnswer.style.border = "2px solid rgb(238, 84, 84)";
                    currentAnswer.firstElementChild.style.backgroundColor = 'rgb(238, 84, 84)';
                    currentAnswer.firstElementChild.style.color = 'rgb(255, 255, 255)';
                    const iconIncorrect = document.createElement('span');
                    iconIncorrect.style.marginLeft= 'auto';
                    iconIncorrect.innerHTML="<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='none' viewBox='0 0 40 40'><path fill='#EE5454' d='M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z'/></svg>";
                    currentAnswer.appendChild(iconIncorrect);
                }
            }
    })
    }
    else{
        errorMsg.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='none' viewBox='0 0 40 40'><path fill='#EE5454' d='M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z'/></svg>
                              <span>Please Select an answer</span>`;
        errorMsg.classList.add('errorMsg');
        quizOptionsSection2.appendChild(errorMsg);
        

    }
})
//to move to the next question
nextBtn.addEventListener(('click'), ()=>{
    currentQuestion++;
    data.quizzes.forEach((item)=>{
        if(currentCategory == item.title){
            quizOptionsSection2.textContent = '';
            if(currentQuestion < nQuestions){
                sliderProgress();
                displayQuestions(item);
            }
            if(currentQuestion == nQuestions){
                container2.style.display = 'none';
                scoreValue.textContent = score;
                categoryValueScore.textContent = currentCategory;
                categorySvgScore.src = item.icon;
                container3.style.display = 'flex';
            }
        }
    })
})
//for the range slider progress
function sliderProgress(){
    rangeSlider.style.background = 'linear-gradient(to right, rgb(167, 41, 245) 0%, rgb(167, 41, 245) ' + value +'%'+ ', white ' + value +'% , white)'
    value += 10;
}

//for playing again
playAgainBtn.addEventListener(('click'), ()=>{
    container1.style.display = 'flex';
    container3.style.display = 'none';
    currentQuestion = 0;
    score = 0;
    value = 0;
})

//for changing the theme
toggleBtn.addEventListener(('click'), ()=>{
    const htmlElement = document.querySelector('html');
    let newTheme = (htmlElement.dataset.theme == 'light') ? 'dark' : 'light';
    htmlElement.dataset.theme = newTheme;
})