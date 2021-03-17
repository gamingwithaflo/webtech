import Question from './question.js';

export default class MultipleChoice extends Question{
    constructor(title, problemStatement, correctAnswer, answers) {
        super(title, problemStatement, correctAnswer);
        this.answers = answers;
    }

    /*
     * returns fieldset element with multiple choice question type
     */
    template() {
        // fieldset
        const fieldset = document.createElement("fieldset");

        // legend
        const legend = document.createElement("legend");
        legend.setAttribute('class', 'legend');
        legend.innerText = "Please select your answer below.";
        fieldset.appendChild(legend);

        // loop answers
        for (let answer of this.answers) {
            // input wrapper for layout
            const input = document.createElement("div");
            input.setAttribute('class', 'option');

            // input radio
            let radio = document.createElement("input");
            radio.setAttribute('id', answer);
            radio.setAttribute('type', 'radio');
            radio.setAttribute('name', this.title);
            radio.setAttribute('value', answer);
            input.appendChild(radio);

            // label
            let label = document.createElement("label");
            label.setAttribute('for', answer);
            label.innerText = answer;
            input.appendChild(label);

            fieldset.appendChild(input);
        }

        // get template from super class
        const template = super.templateQuestion();
        template.appendChild(fieldset);

        return template;
    }
}
