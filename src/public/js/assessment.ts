/*
 * Assessment
 * Get api data and display with dom manipulation
 */

// const
const baseUrl = "/api/assessment";
const topicsUrl = baseUrl+"/topics";
const quizUrl = (id: string) => baseUrl+"/quiz/"+id;
const questionAttempt = baseUrl+"/attempts";
const lastQuizAttempt = baseUrl+"/attempts/last";
const errorMessage = "Data request error";

// @ts-ignore
const loggedIn = userLoggedIn;

// global
let message = "";

// get main element
const main = document.getElementById('main');

// render assessment
const assessment = renderAssessment();
main.appendChild(assessment);

// set first screen
setTopics();

/*
 * get data from api url and log result
 */
async function getApi(url: string) {
    // use fetch for ajax request
    const response = await fetch(url);

    // send requests when switching on every sections to get the latest data
    console.log(`Log: Request data from ${url}`);

    return response.json();
}

/*
 * post data to api url and log result
 */
async function postApi(url: string, data: any) {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log(`Log: Post data to ${url}`);

    return result.json();
}

/*
 * change screen handler
 */
async function setElement(element: HTMLElement) {
    assessment.querySelector('section')?.remove();
    assessment.appendChild(element);
    message = "";
}

/*
 * set screens
 */
function setTopics() {
    setElement(renderTopics(getApi(topicsUrl)));
}
function setQuiz(id: string) {
    setElement(renderQuiz(getApi(quizUrl(id))));
}
function setQuestion(data: any, position: number = 0) {
    setElement(renderQuestion(data, position));
}

/*
 * render assessment element
 */
function renderAssessment() {
    const assessment = document.createElement('article');
    assessment.classList.add("article--nolinkstyle");

    const header = document.createElement('header');
    const title = document.createElement('h1');
    title.textContent = "Assessment";
    header.appendChild(title);
    assessment.appendChild(header);

    return assessment;
}

/*
 * render topic element
 */
function renderTopics(data: Promise<any>) {
    const section = document.createElement('section');

    if (message) {
        section.appendChild(renderError(message));
    }

    if (!loggedIn) {
        section.appendChild(renderError("Login or create an account for question access"));
    }

    const title = document.createElement('h2');
    title.textContent = "Topics";
    section.appendChild(title);

    data
        .then(result => {
            for (let topic of result) {
                // note details
                const note = document.createElement("details");
                note.classList.add('note');
                note.setAttribute('open', '');

                // topic title
                const summary = document.createElement('summary');
                const title = document.createElement('h3');
                title.textContent = topic.title;
                const topicTitleSpan = document.createElement('span');
                const totalQuizzes = topic.quizzes.length;
                topicTitleSpan.textContent = ` (${totalQuizzes} ${totalQuizzes === 1 ? 'quiz' : 'quizzes'})`;
                title.appendChild(topicTitleSpan);
                summary.appendChild(title);
                note.appendChild(summary);

                // description
                const description = document.createElement('a');
                description.href = topic.link;
                description.innerText = "Read more";
                // note.appendChild(description);

                // loop topics quizzes
                for (let quiz of topic.quizzes) {
                    // button
                    const div = document.createElement('a');
                    div.textContent = quiz.title;
                    div.classList.add('button', 'button--gray');
                    div.addEventListener('click', () => {
                        setQuiz(quiz.id);
                    })
                    note.appendChild(div);
                }

                section.appendChild(note);
            }
        })
        .catch(() => {
            section.appendChild(renderError(errorMessage));
        });

    return section;
}

/*
 * render quiz element
 */
function renderQuiz(data: Promise<any>) {
    const api = getApi(lastQuizAttempt);

    const section = document.createElement('section');

    if (message) {
        section.appendChild(renderError(message));
    }

    if (!loggedIn) {
        section.appendChild(renderError("Login or create an account for question access"));
    }

    const title = document.createElement('h2');
    title.textContent = "Quiz";
    section.appendChild(title);

    data
        .then(result => {
            const breadcrumb = document.createElement('div');
            breadcrumb.classList.add('note', 'breadcrumb');
            const back = document.createElement('a');
            back.classList.add("button", "button--gray", "button--horizontal");
            back.textContent = `Topics`;
            back.addEventListener('click', () => {
                setTopics();
            });
            breadcrumb.appendChild(back);
            const quiz = document.createElement('span');
            quiz.textContent = result.title;
            breadcrumb.appendChild(quiz);
            section.appendChild(breadcrumb);

            // note
            const note = document.createElement("div");
            note.classList.add('note');

            // title
            const quizTitle = document.createElement("h3");
            quizTitle.textContent = result.title;
            note.appendChild(quizTitle);

            // text
            const text = document.createElement("p");
            text.textContent = `Total questions: ${result.questions.length}`;
            note.appendChild(text);

            if (loggedIn) {
                // text position
                const textPosition = document.createElement("p");
                api
                    .then(data => {
                        const findPosition = result.questions.findIndex((item: any) => item.id == data.question.id);
                        if (findPosition !== -1) {
                            textPosition.textContent = `Current question position from last attempt: ${findPosition+1}`;
                        }
                    });
                note.appendChild(textPosition);
            }

            const controls = document.createElement("div");
            controls.classList.add("controls");

            // button
            const start = document.createElement('a');
            start.textContent = "Start quiz";
            start.classList.add('button', 'button--darkblue');
            start.addEventListener('click', () => {
                setQuestion(result);
            });
            controls.appendChild(start);

            // button
            // if (loggedIn && findPosition !== -1) {
            const resume = document.createElement('a');
            api
                .then(data => {
                    const findPosition = result.questions.findIndex((item: any) => item.id == data.question.id);
                    if (findPosition !== -1) {
                        resume.textContent = "Resume from last attempt";
                        resume.classList.add('button', 'button--blue');
                        resume.addEventListener('click', () => {
                            setQuestion(result, findPosition);
                        });
                    }
                });
            controls.appendChild(resume);

            note.appendChild(controls);

            section.appendChild(note);
        })
        .catch(() => {
            section.appendChild(renderError(errorMessage));
        });

    return section;
}

/*
 * render question element
 */
function renderQuestion(data: any, position: number) {
    const questionResult = data.questions[position];
    const questionPosition = position+1;

    const section = document.createElement('section');

    if (message) {
        section.appendChild(renderError(message));
    }

    if (!loggedIn) {
        section.appendChild(renderError("Login or create an account for question access"));
    }

    const title = document.createElement('h2');
    title.textContent = "Question";
    section.appendChild(title);

    const breadcrumb = document.createElement('div');
    breadcrumb.classList.add('note', 'breadcrumb');
    const topic = document.createElement('a');
    topic.classList.add("button", "button--gray", "button--horizontal");
    topic.textContent = `Topics`;
    topic.addEventListener('click', () => {
        setTopics();
    });
    breadcrumb.appendChild(topic);
    const quiz = document.createElement('a');
    quiz.classList.add("button", "button--gray", "button--horizontal");
    quiz.textContent = data.title;
    quiz.addEventListener('click', () => {
        setQuiz(data.id);
    });
    breadcrumb.appendChild(quiz);
    const question = document.createElement('span');
    question.textContent = `Question ${questionPosition}`;
    breadcrumb.appendChild(question);
    section.appendChild(breadcrumb);

    // note
    const note = document.createElement("div");
    note.classList.add('note');

    const progress = document.createElement('progress');
    progress.setAttribute('value', questionPosition.toString());
    progress.setAttribute('max', data.questions.length);
    progress.textContent = questionPosition.toString();
    note.appendChild(progress);

    // title
    const questionTitle = document.createElement("h3");
    questionTitle.textContent = questionResult.title;
    note.appendChild(questionTitle);

    // text
    const text = document.createElement("p");
    text.textContent = questionResult.problemStatement;
    note.appendChild(text);

    // form
    const form = document.createElement("form");

    form.appendChild(questionFactory(questionResult));

    const controls = document.createElement("div");
    controls.classList.add("controls");

    // button
    const previous = document.createElement('a');
    previous.textContent = "Previous";
    previous.classList.add('button', 'button--blue');
    if (position !== 0) {
        previous.addEventListener('click', () => {
            setQuestion(data, position - 1);
        });
    } else {
        previous.classList.add('button--disabled');
    }
    controls.appendChild(previous);

    // button
    const next = document.createElement('a');
    next.textContent = "Next";
    next.classList.add('button', 'button--blue');
    if (hasNextQuestion(data.questions, position)) {
        next.addEventListener('click', () => {
            setQuestion(data, position+1);
        });
    } else {
        next.classList.add('button--disabled');
    }
    controls.appendChild(next);

    // button
    const validate = document.createElement('input');
    validate.setAttribute('type', 'submit');
    validate.value = "Validate";
    validate.classList.add('button', 'button--gray');
    if (loggedIn) {
        validate.addEventListener('click', (event) => {
            event.preventDefault();

            const formData = new FormData(form).entries().next().value;

            if (formData && formData[1]) {
                postApi(questionAttempt, {
                    questionId: questionResult.id,
                    postAnswer: formData[1]
                })
                    .then((d: any) => {
                        if (d.result) {
                            message = "Correct!";
                        } else {
                            message = "Try again";
                        }
                        setQuestion(data, position);
                    });
            } else {
                message = "Some required fields are empty";
                setQuestion(data, position);
            }
        });
    } else {
        validate.classList.add('button--disabled');
    }
    controls.appendChild(validate);

    const reset = document.createElement('input');
    reset.setAttribute('type', 'reset');
    reset.value = "Reset";
    reset.classList.add('button', 'button--gray');
    if (!loggedIn) {
        reset.classList.add('button--disabled');
    }
    controls.appendChild(reset);

    if (!hasNextQuestion(data.questions, position)) {
        // button
        const start = document.createElement('a');
        start.textContent = "Finish";
        start.classList.add('button', 'button--darkgray');
        start.addEventListener('click', () => {
            if (loggedIn) {
                message = "Quiz completed!";
            }

            setQuiz(data.id);
        });
        controls.appendChild(start);
    }

    form.appendChild(controls);
    note.appendChild(form);

    section.appendChild(note);

    return section;
}

/*
 * enum question type
 */
enum QuestionType {
    MCQ = "mcq",
    OQ = "oc"
}

/*
 * create question based on type
 */
function questionFactory(question: any) {
    switch (question.type) {
        case QuestionType.MCQ:
            return renderMCQ(question);
        case QuestionType.OQ:
            return renderOQ();
        default:
            return undefined;
    }
}

/*
 * render multiple choice question element
 */
function renderMCQ(question: any): HTMLElement {
    const fieldset = document.createElement("fieldset");

    const legend = document.createElement("legend");
    legend.textContent = "Please select your answer below.";
    fieldset.appendChild(legend);

    // loop answers
    for (let answer of question.answers) {
        // input wrapper for layout
        const input = document.createElement("div");
        input.setAttribute('class', 'option');

        // input radio
        let radio = document.createElement("input");
        radio.setAttribute('id', answer);
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', "question");
        radio.setAttribute('value', answer);
        if (!loggedIn) {
            radio.disabled = true;
        }
        input.appendChild(radio);

        // label
        let label = document.createElement("label");
        label.setAttribute('for', answer);
        label.innerText = answer;
        input.appendChild(label);

        fieldset.appendChild(input);
    }

    return fieldset;
}

/*
 * render open question element
 */
function renderOQ(): HTMLElement {
    const fieldset = document.createElement("fieldset");

    const legend = document.createElement("legend");
    legend.textContent = "Please type your answer below.";
    fieldset.appendChild(legend);

    // input
    const input = document.createElement("input");
    input.setAttribute('name', "question");
    if (!loggedIn) {
        input.disabled = true;
    }
    fieldset.appendChild(input);

    return fieldset;
}

/*
 * check if quiz has next question
 */
function hasNextQuestion(data: any, position: number) {
    return data.length > position + 1;

}

/*
 * render error element
 */
function renderError(message: string) {
    const note = document.createElement("div");
    note.classList.add('note', 'note--blue');

    // text
    const text = document.createElement("span");
    text.textContent = message;
    note.appendChild(text);

    return note;
}
