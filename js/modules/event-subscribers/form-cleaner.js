import IEventSubscriber from "./event-subscriber-interface.js";

/**
 * @class
 * @implements {IEventSubscriber}
 */
export default class FormCleaner extends IEventSubscriber {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get emit() { return this.#emit; }

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {HTMLFormElement} formElement
     */
    constructor(formElement) {
        super();
        this.#formElement = formElement;
    }

    /* ---------------------------------------------------- */
    /* Private props                                        */
    /* ---------------------------------------------------- */

    /** 
     * @private
     * @type {HTMLFormElement}
     */
    #formElement;

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    #emit() {
        this.#clearInputs();
    }

    /** @private */
    #clearInputs() {
        document.location.reload();

        // Alternatively, you can clear only the form.
        // ==========
        // const inputs = this.#formElement.querySelectorAll("input");
        // for (const input of inputs) {
        //     if (input.type != "submit") input.value = "";
        // }
        //===========
    }
}