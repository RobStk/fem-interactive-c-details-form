/**
 * @class
 * @interface
 */
export default class IInput {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    /**
     * @returns {HTMLInputElement} HTMLInputElement
     */
    getHTMLElement() { throw new Error("Virtual method must be implemented."); }

    // ----------------------------

    /**
     * @returns {String[]}   Errors array.
     */
    getValidationErrors() { throw new Error("Virtual method must be implemented."); }

    // ----------------------------
}