window.addEventListener("load", async (evt) => {
    const data = await getData()
    // console.log(data);
    const { quizzes } = data;
    const shuffledQuizzes = [...quizzes];
    // console.log(quizzes);
    shuffledQuizzes.sort(() => Math.random() - 0.5);
    // console.log(shuffledQuizzes);

    const questnInput = document.getElementById("questn");
    const labelOne = document.getElementById("label-one");
    const labelTwo = document.getElementById("label-two");
    const labelThree = document.getElementById("label-three");
    const labelFour = document.getElementById("label-four");
    const submitBtn = document.getElementById("submit-btn");
    const questionInput = document.getElementById("question");
    const answersDiv = document.querySelector(".answer-div");
    const mainQuizDiv = document.querySelector(".quiz");

    let currentQuestionIndex = 0;
    let score = 0;
    let referenceArray = [];
    let referenceRandomArray = [];

    startQuiz();

    async function getData() {
        const response = await fetch("/get-quiz");
        const data = await response.json();
        console.log(data);
        return data;
    }

    function startQuiz() {
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuizzes[currentQuestionIndex]);
    }

    function showQuestion(question) {
        // console.log(question);
        questionInput.innerText = question.question;
        const { options } = question;
        referenceArray = [...options];
        referenceRandomArray = options;
        options.sort(() => Math.random() - 0.5);
        // console.log(options)
        options.forEach((answer, index) => {
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.value = index;
            radio.name = "answer";
            radio.id = answer-${index};

            const label = document.createElement("label");
            label.htmlFor = answer-${index};
            label.innerText = answer;

            const answerDiv = document.createElement("div");

            answersDiv.append(answerDiv);
            answerDiv.append(radio, label);
            submitBtn.style.display = "block"
        });

    };

    function resetState() {
        while (answersDiv.firstChild) {
            answersDiv.removeChild(answersDiv.firstChild);
        }
    };

    submitBtn.addEventListener("click", (evt) => {
        // console.log(Array.from(document.querySelectorAll("input[type=radio")));
        // console.log((Array.from(document.querySelectorAll("input[type=radio")).findIndex(radio => radio.checked)));
        const answerIndex = (Array.from(document.querySelectorAll("input[type=radio")).findIndex(radio => radio.checked));
        // console.log(referenceArray)
        // console.log(referenceRandomArray);
        if (referenceRandomArray[answerIndex] === referenceArray[0]) {
            console.log("correct answer");
            score++;
            currentQuestionIndex++;
            if (currentQuestionIndex === quizzes.length) {
                console.log("no more questions");

                while (mainQuizDiv.firstChild) {
                    mainQuizDiv.removeChild(mainQuizDiv.firstChild);
                }
                const result = document.createElement("h2");
                result.innerText = Your final score is ${score}/${quizzes.length};
                mainQuizDiv.append(result);

            } else {
                setNextQuestion();
            }
        } else {
            console.log("incorrect answer");
            currentQuestionIndex++;
            if (currentQuestionIndex === quizzes.length) {
                console.log("no more questions");
                while (mainQuizDiv.firstChild) {
                    mainQuizDiv.removeChild(mainQuizDiv.firstChild);
                }
                const result = document.createElement("h2");
                result.innerText = Your final score is ${score}/${quizzes.length};
                mainQuizDiv.append(result);

            } else {

            }
        }

    })
})