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
    get getValidationErrors() { return this._getValidationErrors; }


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
    /* Protected properties                                 */
    /* ---------------------------------------------------- */

    /** @protected */
    _mainElement;


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @protected
     * @returns {string[]}  Errors Array
     */
    _getValidationErrors() {
        const errors = [];
        const isEmpty = this.#checkEmptiness();
        if (isEmpty) errors.push(isEmpty);
        return errors;
    }

    // ----------------------------

    /**
     * @private
     * @returns {HTMLInputElement}  HTMLInputElement
     */
    #getHTMLElement() {
        return this._mainElement;
    }

    // ----------------------------

    /**
     * @private
     * @returns {string}    Returns error message string. 
     *                      If no errors were found, the string is empty.
     */
    #checkEmptiness() {
        const errorMsg = "Can't be blank.";
        const inputValue = this._mainElement.value;
        if (!inputValue) return errorMsg;
        if (inputValue == "") return errorMsg;
        return "";
    }

    // ----------------------------
}