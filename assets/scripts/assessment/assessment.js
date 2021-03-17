export default class Assessment {
    constructor() {
        this.questions = [];
        this.score = 0;
    }

    /*
     * add questions to assessment class
     */
    addQuestion(question) {
        this.questions.push(question);
    }

    /*
     * returns form element with questions
     */
    template() {
        // form
        const form = document.createElement("form");

        // message
        const message = document.createElement("div");
        message.setAttribute('class', 'info info--blue message');
        // form.appendChild(message);

        // loop questions
        for (let question of this.questions) {
            form.appendChild(question.template());
        }

        // form buttons
        const section = document.createElement("div");
        section.setAttribute('class', 'question');

        // form button submit
        const send = document.createElement("input");
        send.setAttribute('type', 'submit');
        send.setAttribute('class', 'button button--background-blue');
        section.appendChild(send);

        // form button reset
        const reset = document.createElement("input");
        reset.setAttribute('type', 'reset');
        reset.setAttribute('class', 'button button--background-light-blue');
        section.appendChild(reset);

        form.appendChild(section);

        // reset event listener
        form.addEventListener('reset', (event) => {
            // reset message
            message.remove();

            // scroll to top
            window.scroll({
                top: 0
            });
        });

        // submit event listener
        form.addEventListener('submit', (event) => {
            // prevent default for reloading page on submit
            event.preventDefault();

            // reset score on submit
            this.score = 0;

            // check if answer is correct and loop form data entries
            for (let x of new FormData(form).entries()) {
                // filter and loop questions on title
                this.questions.filter((e) => e.title == x[0]).forEach((e) => {
                    // make answers lowercase and check if equal
                    if (e.correctAnswer.toLowerCase() === x[1].toLowerCase()) {
                        // add to score
                        this.score++;
                    }
                });
            }

            // set message with score and insert before form element
            message.innerText = `${this.score === this.questions.length ? "Congratulations! " : ""}You scored ${this.score} out of ${this.questions.length} points.`;
            form.parentElement.insertBefore(message, form);

            // scroll to top
            window.scroll({
                top: 0
            });
        });

        return form;
    }
}
