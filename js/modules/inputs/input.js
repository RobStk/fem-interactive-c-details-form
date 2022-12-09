import IInput from "../input-interface.js";

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
    /* Protected properties                                 */
    /* ---------------------------------------------------- */

    /** @protected */
    _mainElement;


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {HTMLInputElement} htmlInputElement 
     */
    constructor(htmlInputElement) {
        super();
        this._mainElement = htmlInputElement;
    }


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @returns {HTMLInputElement}  HTMLInputElement
     */
    #getHTMLElement() {
        return this._mainElement;
    }

    // ----------------------------

    /**
     * @returns {string[]}  Errors Array
     */
    #getValidationErrors() {
        const emptyErrorMsg = "Can't be blank.";
        const errors = [];

        const isEmpty = this.#checkEmptiness();
        if (isEmpty) errors.push(emptyErrorMsg);

        return errors;
    }

    // ----------------------------

    /**
     * @returns {Boolean}   TRUE if input's value is empty or FALSE otherwise.
     */
    #checkEmptiness() {
        const inputValue = this._mainElement.value;
        if (!inputValue) return true;
        if (inputValue == "") return true;
        return false;
    }

    // ----------------------------
}