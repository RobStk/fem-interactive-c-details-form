export default class CardDetailsForm {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get mainElement() { return this.#mainElement; }

    get nameInputElement() { return this.#nameInputElement; }
    get cardNumberInputElement() { return this.#cardNumberInputElement; }
    get monthInputElement() { return this.#monthInputElement; }
    get yearInputElement() { return this.#yearInputElement; }
    get cvcInputElement() { return this.#cvcInputElement; }

    get nameInputContainer() { return this.#nameInputContainer; }
    get cardNumberInputContainer() { return this.#cardNumberInputContainer; }
    get dateInputContainer() { return this.#dateInputContainer; }
    get cvcInputContainer() { return this.#cvcInputContainer; }


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {HTMLElement} HTMLMainElement 
     */
    constructor(HTMLMainElement) {
        this.#mainElement = HTMLMainElement;

        this.#nameInputElement = this.#mainElement.querySelector(".holder input");
        this.#cardNumberInputElement = this.#mainElement.querySelector(".number input");
        this.#monthInputElement = this.#mainElement.querySelector(".date .month");
        this.#yearInputElement = this.#mainElement.querySelector(".date .year");
        this.#cvcInputElement = this.#mainElement.querySelector(".cvc input");

        this.#nameInputContainer = this.#nameInputElement.closest(".input-container");
        this.#cardNumberInputContainer = this.#cardNumberInputElement.closest(".input-container");
        this.#dateInputContainer = this.#monthInputElement.closest(".input-container");
        this.#cvcInputContainer = this.#cvcInputElement.closest(".input-container");
    }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    /** @type {HTMLElement} */
    #mainElement;

    /** @type {HTMLInputElement} */
    #nameInputElement;

    /** @type {HTMLInputElement} */
    #cardNumberInputElement;

    /** @type {HTMLInputElement} */
    #monthInputElement;

    /** @type {HTMLInputElement} */
    #yearInputElement;

    /** @type {HTMLInputElement} */
    #cvcInputElement;

    /** @type {HTMLElement} */
    #nameInputContainer;

    /** @type {HTMLElement} */
    #cardNumberInputContainer;

    /** @type {HTMLElement} */
    #dateInputContainer;

    /** @type {HTMLElement} */
    #cvcInputContainer;

    // ----------------------------
}