import IValidationService from "../validation-service-interface.js";

/**
 * @class
 * @implements {IValidationService}
 */
export default class EmptyValidationService extends IValidationService {

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
    constructor(errorMsg = "Can't be blank.") {
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
        if (!value) return this.#errorMsg;
        if (value == "") return this.#errorMsg;
        return "";
    }
}