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
    getHTMLElement() { console.warn("Virtual method must be implemented."); }

    // ----------------------------

    /**
     * @returns {String[]}   Errors array.
     */
    getValidationErrors() { console.warn("Virtual method must be implemented."); }

    // ----------------------------
}