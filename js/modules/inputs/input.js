/**
 * @typedef {import('../validation-services/validation-service-interface').default} IValidationService
 */

import IInput from "./input-interface.js";

/**
 * @class
 * @implements {IInput}
 */
export default class Input extends IInput {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get getHTMLElement() { return this.#getHTMLElement; }
    get getValidationErrors() { return this.#getValidationErrors; }


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {HTMLInputElement} htmlInputElement
     * @param {IValidationService[]|IValidationService|null} validators
     */
    constructor(htmlInputElement, validators) {
        super();
        this.#mainElement = htmlInputElement;
        const validatorsIsArray = Array.isArray(validators);
        if (validatorsIsArray) this.#validators = validators;
        else this.#validators = [validators];

        if (!validators) this.#validators = [];
    }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    /** @private */
    #mainElement;

    /**
     * @private
     * @type {IValidationService[]}
     */
    #validators;


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @private
     * @returns {string[]}  Errors Array
     */
    #getValidationErrors() {
        const value = this.#mainElement.value;
        const errors = [];
        this.#validators.forEach(validator => {
            const error = validator.validate(value);
            if (error) errors.push(error);
        });
        return errors;
    }

    // ----------------------------

    /**
     * @private
     * @returns {HTMLInputElement}  HTMLInputElement
     */
    #getHTMLElement() {
        return this.#mainElement;
    }

    // ----------------------------
}