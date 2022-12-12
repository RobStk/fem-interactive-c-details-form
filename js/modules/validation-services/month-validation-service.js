import IValidationService from "../validation-service-interface.js";

/**
 * @class
 * @implements {IValidationService}
 */
export default class MonthValidationService extends IValidationService {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get validate() { return this.#validate; }


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {string} errorMsg 
     */
    constructor(errorMsg = "Invalid month format.") {
        super();
        this.#errorMsg = errorMsg;
    }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    /** @private */
    #errorMsg;


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    #validate(value) {
        const isNotNumber = isNaN(value);
        if (isNotNumber) return this.#errorMsg;
        if (value > 12) return this.#errorMsg;
        if (value < 1) return this.#errorMsg;
        const rest = value % 1;
        if (rest) return this.#errorMsg;
        return "";
    }
}