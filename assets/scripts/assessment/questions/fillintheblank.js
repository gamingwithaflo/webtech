import Question from './question.js';

export default class FillInTheBlank extends Question {
    constructor(title, problemStatement, correctAnswer) {
        super(title, problemStatement, correctAnswer);
    }

    /*
     * returns fieldset element with fill in the blank question type
     */
    template() {
        // fieldset
        const fieldset = document.createElement("fieldset");

        // legend
        const legend = document.createElement("legend");
        legend.setAttribute('class', 'legend');
        legend.innerText = "Please type your answer below.";
        fieldset.appendChild(legend);

        // input
        const input = document.createElement("input");
        input.setAttribute('name', this.title);
        fieldset.appendChild(input);

        // get template from super class
        const template = super.templateQuestion();
        template.appendChild(fieldset);

        return template;
    }
}
