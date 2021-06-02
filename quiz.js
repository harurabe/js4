let score = 0;

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startQuiz);

const finishBtn = document.getElementById('finishBtn');
finishBtn.addEventListener('click', initialize);

function startQuiz(){
   const openingSlide = document.getElementById('openingSlide');
   openingSlide.style.display = 'none';

   const loadingSlide = document.getElementById('loadingSlide');
   loadingSlide.style.display = '';

   const url='https://opentdb.com/api.php?amount=10&type=multiple';
   fetch(url)
        .then((response) => response.json())
        .then((json) => buildQuiz(json))
        .then(() => readyQuiz())     
}

function buildQuiz(json) {
    const quizContainer = document.getElementById('quizContainer');

    json.results.forEach (
        (currentQuestion, index) => {
            
            //クイズ全体のdivを作成
            const divContainer = document.createElement('div');
            divContainer.className = 'quiz';
            divContainer.id = index;
            divContainer.style.display = 'none';

            //見出しのdivを作成
            const divHeader = document.createElement('h1');
            divHeader.innerHTML = '問題' + (index+1);

            //ジャンルのdivを作成
            const divCategory = document.createElement('div');
            divCategory.innerHTML = '<b>[ジャンル] ' + currentQuestion.category + '</b>';

            //難易度のdivを作成
            const divDifficulty = document.createElement('div');
            divDifficulty.innerHTML = '<b>[難易度] ' + currentQuestion.difficulty + '</b>';

            //質問のdivを作成
            const divQuestion= document.createElement('div');
            divQuestion.innerHTML = '<hr>' + currentQuestion.question + '<hr>';

            //回答のdivを作成
            const divAnswers = document.createElement('div');

            //回答作成順をシャッフル (c = 正解, i0 = 0番目の不正解 etc)
            const randomOrder = ['c', 'i', 'i', 'i'];
            shuffle(randomOrder);
            let indexcount = 0;

            randomOrder.forEach ((value, orderIndex) => {
                if (value === 'c') {
                    //正解buttonを作成して、回答divにappend
                    const correctAnswerBtn = document.createElement('button');
                    correctAnswerBtn.innerHTML = currentQuestion.correct_answer;
                    correctAnswerBtn.value = 1;
                    correctAnswerBtn.id = index;
                    correctAnswerBtn.addEventListener('click', proceedQuiz);
                    divAnswers.appendChild(correctAnswerBtn);
                }
                else {
                    //不正解buttonを作成して、回答divにappend
                    const incorrectAnswerBtn = document.createElement('button');
                    incorrectAnswerBtn.value = 0;
                    incorrectAnswerBtn.id = index;
                    incorrectAnswerBtn.addEventListener('click', proceedQuiz);
                    incorrectAnswerBtn.innerHTML = currentQuestion.incorrect_answers[indexcount];
                    divAnswers.appendChild(incorrectAnswerBtn);
                    indexcount += 1;
                }

                divAnswers.appendChild(document.createElement('br'));
            });

            divContainer.appendChild(divHeader);
            divContainer.appendChild(divCategory);
            divContainer.appendChild(divDifficulty);
            divContainer.appendChild(divQuestion);
            divContainer.appendChild(divAnswers);

            quizContainer.appendChild(divContainer);
        }
    );
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function readyQuiz(){
    const loadingSlide = document.getElementById('loadingSlide');
    loadingSlide.style.display = 'none';       

    const quiz = document.getElementsByClassName('quiz');
    quiz[0].style.display = '';
}

function proceedQuiz(e){
    score += parseInt(e.target.value);
    let quizNumber = parseInt(e.target.id);

    const q = document.getElementsByClassName('quiz');
    q[quizNumber].style.display = 'none';

    if (quizNumber === 9) {
        const closingSlide = document.getElementById('closingSlide');
        const result = document.getElementById('closingResult');
        result.innerHTML = 'あなたの正答数は' + score + 'です！！';
        closingSlide.style.display = '';

    } else {
        q[quizNumber+1].style.display = '';
    }

}

function initialize(){
    score = 0;
    const quizContainer = document.getElementById('quizContainer');

    while(quizContainer.firstChild){
        quizContainer.removeChild(quizContainer.firstChild);
    }

    const closingSlide = document.getElementById('closingSlide');
    closingSlide.style.display = 'none';

    const openingSlide = document.getElementById('openingSlide');
    openingSlide.style.display = '';
}