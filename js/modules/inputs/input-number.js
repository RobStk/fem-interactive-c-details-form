/**
 * @typedef {import('./input-interface').default} IInput
 */

import Input from "./input.js";

/**
 * @class
 * @implements {IInput}
 */
export default class InputNumber extends Input {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */


    /* ---------------------------------------------------- */
    /* Protected properties                                 */
    /* ---------------------------------------------------- */


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    _getValidationErrors() {
        const validationErrors = super._getValidationErrors();
        const isNotNumber = this.#checkNumberFormat();
        if (isNotNumber) validationErrors.push(isNotNumber);
        return validationErrors;
    }

    // ----------------------------

    /**
     * @returns {string}    Returns error message string. 
     *                      If no errors were found, the string is empty.
     */
    #checkNumberFormat() {
        const errorMsg = "Wrong format. Numbers only";
        const inputValue = this._mainElement.value;
        const isNotNumber = isNaN(inputValue);
        if (isNotNumber) return errorMsg;
        return "";
    }

    // ----------------------------
}