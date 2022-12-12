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
     * @param {string} errorMsg 
     */
    constructor(errorMsg = "Wrong format. Numbers only.") {
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
        return "";
    }
}