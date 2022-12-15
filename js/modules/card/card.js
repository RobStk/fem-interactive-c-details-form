export default class Card {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get HTMLMainElement() { return this.#mainElement; }
    get cardNumberElement() { return this.#cardNumberElement; }
    get cardHolderElement() { return this.#cardHolderElement; }
    get expMonthElement() { return this.#expMonthElement; }
    get expYearElement() { return this.#expYearElement; }
    get cvcElement() { return this.#cvcElement; }


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * 
     * @param {HTMLElement} HTMLMainElement 
     */
    constructor(HTMLMainElement) {
        this.#mainElement = HTMLMainElement;
        this.#cardNumberElement = this.#mainElement.querySelector(".card-number");
        this.#cardHolderElement = this.#mainElement.querySelector(".holder");
        this.#expMonthElement = this.#mainElement.querySelector(".month");
        this.#expYearElement = this.#mainElement.querySelector(".year");
        this.#cvcElement = this.#mainElement.querySelector(".cvc");
    }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    /** @type {HTMLElement} */
    #mainElement;

    /** @type {HTMLElement} */
    #cardNumberElement;

    /** @type {HTMLElement} */
    #cardHolderElement;

    /** @type {HTMLElement} */
    #expMonthElement;

    /** @type {HTMLElement} */
    #expYearElement;

    /** @type {HTMLElement} */
    #cvcElement;


    // ----------------------------
}