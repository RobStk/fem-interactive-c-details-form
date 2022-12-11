/**
 * @typedef {import('./input-module-interface').default} IInputModule
 */

export default class CardDetailsModule {

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {HTMLFormElement} htmlFormElement
     * @param {IInputModule[]} inputModules
     */
    constructor(htmlFormElement, inputModules = []) {
        this.#mainElement = htmlFormElement;
        this.#inputModules = inputModules;
        this.#mainElement.addEventListener("submit", this.#handleSubmit.bind(this));
    }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */
    #mainElement;
    #inputModules;


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
        this.#inputModules.forEach(inputModule => {
            const isValid = inputModule.validate();
            if (!isValid) validationSuccessful = false;
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
}