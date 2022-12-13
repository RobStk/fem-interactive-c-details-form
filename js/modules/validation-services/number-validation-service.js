import IValidationService from "../validation-service-interface.js";

/**
 * @class
 * @implements {IValidationService}
 */
export default class NumberValidationService extends IValidationService {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get validate() { return this.#validate; }


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {Boolean} ignoringSpaces
     * @param {string} errorMsg       
     */
    constructor(ignoringSpaces = true, errorMsg = "Wrong format. Numbers only.") {
        super();
        this.#ignoringSpaces = ignoringSpaces;
        this.#errorMsg = errorMsg;
    }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    /** @private */
    #ignoringSpaces;

    /** @private */
    #errorMsg;


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /** @private */
    #validate(value) {
        let validationValue = value;
        if (this.#ignoringSpaces) {
            validationValue = validationValue.split(" ");
            validationValue = validationValue.join("");
        }
        const isNotNumber = isNaN(validationValue);
        if (isNotNumber) return this.#errorMsg;
        return "";
    }
}