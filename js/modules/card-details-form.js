/**
 * @typedef {import('./input-interface').default} Input
 */
export default class CardDetailsModule {
    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #mainElement;
    #inputs;


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {HTMLFormElement} htmlFormElement
     * @param {Input[]} inputs
     */
    constructor(htmlFormElement, inputs = []) {
        this.#mainElement = htmlFormElement;
        this.#inputs = inputs;
        this.#mainElement.addEventListener("submit", this.#handleSubmit.bind(this));
    }


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @private
     * @param {SubmitEvent} event 
     */
    #handleSubmit(event) {
        event.preventDefault();
        let validationSuccessful = true;
        this.#inputs.forEach(input => {
            const errors = input.getValidationErrors();
            if (errors.length) {
                validationSuccessful = false;
                this.#putErrorMsg(input.getHTMLElement(), errors[0]);
            }
        });
        if (validationSuccessful) this.#finishSubmit();
    }

    // ----------------------------

    /**
     * @private
     */
    #finishSubmit() {
        throw new Error("Not implemented method"); //TODO
    }

    // ----------------------------

    /**
     * @private
     */
    #putErrorMsg(element, msg) {
        console.log("Element:", element);
        console.log("Error:", msg);
        throw new Error("Not implemented method"); //TODO
    }

    // ----------------------------
}