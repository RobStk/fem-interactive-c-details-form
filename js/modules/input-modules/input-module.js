/**
 * @typedef {import('../inputs/input-interface').default} IInput
 */

import IInputModule from "./input-module-interface.js";

/**
 * @class
 * @implements {IInputModule}
 */
export default class InputModule extends IInputModule {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get validate() { return this.#validate; }


    /* ---------------------------------------------------- */
    /* Protected properties                                 */
    /* ---------------------------------------------------- */
    #HTMLContainer;
    #inputs;
    #error;


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {HTMLElement} containerElement
     * @param {IInput|IInput[]} inputs
     */
    constructor(containerElement, inputs) {
        super();
        this.#HTMLContainer = containerElement;
        const inputsIsArray = Array.isArray(inputs);
        if (inputsIsArray) this.#inputs = inputs;
        else this.#inputs = [inputs];

        this.#setEventListeners();
    }


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @private
     * @returns {Boolean}   FALSE on error or TRUE otherwise
     */
    #validate() {
        this.#resetErrorState();
        let validationSuccessful = true;

        let i = 0;
        let errorFound = false;
        while (!errorFound && i < this.#inputs.length) {
            const input = this.#inputs[i];
            const errorsArr = input.getValidationErrors();
            if (errorsArr.length) {
                errorFound = true;
                this.#error = errorsArr[0];
                this.#setErrorState(input);
                validationSuccessful = false;
            }
            i++;
        }
        if (validationSuccessful) { return true; }
        return false;
    }

    // ----------------------------

    /**
     * @private
     * @param {IInput} input
     */
    #setErrorState(input) {
        this.#HTMLContainer.classList.add("error");
        this.#HTMLContainer.dataset.errorMsg = this.#error;
        const inputElement = input.getHTMLElement();
        const inputBorderElement = this.#getBorderContainer(inputElement);
        inputBorderElement.classList.add("error");
    }

    // ----------------------------

    /**
     * @private
     */
    #resetErrorState() {
        this.#HTMLContainer.classList.remove("error");
        this.#HTMLContainer.removeAttribute("data-error-msg");
        const inputBorderElements = this.#HTMLContainer.querySelectorAll(".border-container");
        for (const element of inputBorderElements) {
            element.classList.remove("error");
        }
    }

    // ----------------------------

    /**
     * @private
     */
    #setEventListeners() {
        this.#inputs.forEach(input => {
            const inputElement = input.getHTMLElement();
            inputElement.addEventListener("focus", this.#handleInputFocus.bind(this));
            inputElement.addEventListener("blur", this.#handleInputBlur.bind(this));
        });
    }

    // ----------------------------

    /**
     * @private
     * @param {Event} event
     */
    #handleInputFocus(event) {
        const inputElement = event.target;
        const inputBorderContainer = this.#getBorderContainer(inputElement);
        inputBorderContainer.classList.add("active");
    }

    // ----------------------------

    /**
     * @private
     * @param {Event} event
     */
    #handleInputBlur(event) {
        const inputElement = event.target;
        const inputBorderContainer = this.#getBorderContainer(inputElement);
        inputBorderContainer.classList.remove("active");
    }

    // ----------------------------

    /**
     * @private
     * @param {HTMLElement} inputElement
     * @returns {HTMLElement}
     */
    #getBorderContainer(inputElement) {
        const inputBorderElement = inputElement.closest(".border-container");
        return inputBorderElement;
    }

    // ----------------------------
}