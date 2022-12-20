/**
 * @typedef {import('../validation-services/validation-service-interface').default} IValidationService
 * @typedef {import('../event-subscribers/event-subscriber-interface').default} IEventSubscriber
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
    get addInputSubscribers() { return this.#addInputSubscribers; }
    get addBeforeInputSubscribers() { return this.#addBeforeInputSubscribers; }


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {HTMLInputElement} htmlInputElement
     * @param {IValidationService[]|IValidationService|undefined} validators
     */
    constructor(htmlInputElement, validators) {
        super();
        this.#mainElement = htmlInputElement;

        const validatorsIsArray = Array.isArray(validators);
        if (validatorsIsArray) this.#validators = validators;
        else this.#validators = [validators];
        if (!validators) this.#validators = [];

        this.#inputSubscribers = [];
        this.#beforeInputSubscribers = [];

        this.#mainElement.addEventListener("beforeinput", this.#handleBeforeInput.bind(this));
        this.#mainElement.addEventListener("input", this.#handleInput.bind(this));
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

    /**
     * @private 
     * @type {IEventSubscriber[]}
     * */
    #inputSubscribers;

    /**
     * @private 
     * @type {IEventSubscriber[]}
     * */
    #beforeInputSubscribers;


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
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
     * @returns {HTMLInputElement}  HTMLInputElement
     */
    #getHTMLElement() {
        return this.#mainElement;
    }

    // ----------------------------

    /**
     * @param {IEventSubscriber|IEventSubscriber[]} newSubscribers 
     */
    #addInputSubscribers(newSubscribers) {
        if (!newSubscribers) return;
        const subsArr = this.#prepareArray(newSubscribers);
        subsArr.forEach(newSubscriber => {
            this.#inputSubscribers.push(newSubscriber);
        });
    }

    // ----------------------------

    /**
     * @param {IEventSubscriber|IEventSubscriber[]} newSubscribers
     */
    #addBeforeInputSubscribers(newSubscribers) {
        if (!newSubscribers) return;
        const subsArr = this.#prepareArray(newSubscribers);
        subsArr.forEach(newSubscriber => {
            this.#beforeInputSubscribers.push(newSubscriber);
        });
    }

    // ----------------------------

    /**
     * @private
     * @param {InputEvent} inputEvent 
     */
    #handleInput(inputEvent) {
        this.#inputSubscribers.forEach(inputSubscriber => {
            inputSubscriber.emit(inputEvent);
        });
    }

    // ----------------------------

    /**
     * @private
     * @param {InputEvent} inputEvent 
     */
    #handleBeforeInput(inputEvent) {
        this.#beforeInputSubscribers.forEach(inputSubscriber => {
            inputSubscriber.emit(inputEvent);
        });
    }

    // ----------------------------

    /**
     * Returns the received data enclosed in an array or a copy of the received array.
     * @private
     * @param {any} dataToMakeArray 
     * @returns {any[]}
     */
    #prepareArray(dataToMakeArray) {
        const dataToMakeArrayIsArray = Array.isArray(dataToMakeArray);
        if (!dataToMakeArrayIsArray) return [dataToMakeArray];
        return [...dataToMakeArray];
    }

    // ----------------------------
}