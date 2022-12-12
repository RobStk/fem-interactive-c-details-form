/* eslint-disable no-unused-vars */
/**
 * @class
 * @interface
 */
export default class IValidationService {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    /**
     * @param {string} value    Validation value.
     * @returns {string}        Returns error message string. 
     *                          If no errors were found, the string is empty.
     */
    validate(value) { console.warn("Virtual method must be implemented."); }

    // ----------------------------
}