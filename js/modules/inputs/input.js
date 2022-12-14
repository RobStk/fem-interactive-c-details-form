/**
 * @typedef {import('../validation-services/validation-service-interface').default} IValidationService
 * @typedef {import('../utils/event-subscriber-interface').default} IEventSubscriber
 */

import IInput from "./input-interface.js";

/**
 * @class
 * @implements {IInput}
 * @inheritdoc
 */
export default class Input extends IInput {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get getHTMLElement() { return this.#getHTMLElement; }
    get getValidationErrors() { return this.#getValidationErrors; }
    get addInputSubscribers() { return this.#addInputSubscribers; }


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {HTMLInputElement} htmlInputElement
     * @param {IValidationService[]|IValidationService|undefined} validators
     * @param {IEventSubscriber[]|IEventSubscriber|undefined} inputSubscribers
     */
    constructor(htmlInputElement, validators, inputSubscribers) {
        super();
        this.#mainElement = htmlInputElement;

        const validatorsIsArray = Array.isArray(validators);
        if (validatorsIsArray) this.#validators = validators;
        else this.#validators = [validators];
        if (!validators) this.#validators = [];

        const subscribersIsArray = Array.isArray(inputSubscribers);
        if (subscribersIsArray) this.#inputSubscribers = inputSubscribers;
        else this.#inputSubscribers = [inputSubscribers];
        if (!inputSubscribers) this.#inputSubscribers = [];

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

    /**
     * @param {IEventSubscriber|IEventSubscriber[]} newSubscribers 
     * @returns 
     */
    #addInputSubscribers(newSubscribers) {
        if (!newSubscribers) return;
        const newSubscribersIsArray = Array.isArray(newSubscribers);
        if (!newSubscribersIsArray) newSubscribers = [newSubscribers];
        newSubscribers.forEach(newSubscriber => {
            this.#inputSubscribers.push(newSubscriber);
        });
    }

    // ----------------------------

    /**
     * @param {InputEvent} inputEvent 
     */
    #handleInput(inputEvent) {
        this.#inputSubscribers.forEach(inputSubscriber => {
            inputSubscriber.emit(inputEvent);
        });
    }

    // ----------------------------
}