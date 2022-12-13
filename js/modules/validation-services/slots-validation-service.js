import IValidationService from "../validation-service-interface.js";

/**
 * @class
 * @implements {IValidationService}
 */
export default class SlotsValidationService extends IValidationService {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get validate() { return this.#validate; }


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {number} minSlots
     * @param {number} maxSlots
     * @param {string} errorMsg 
     */
    constructor(minSlots, maxSlots, errorMsg = "Wrong format.") {
        super();
        this.#minSlots = minSlots;
        this.#maxSlots = maxSlots;
        this.#errorMsg = errorMsg;
    }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    /** @private */
    #errorMsg;

    /** @private */
    #minSlots;

    /** @private */
    #maxSlots;


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    #validate(value) {
        const slots = [...value];
        if (slots.length > this.#maxSlots) return this.#errorMsg;
        if (slots.length < this.#minSlots) return this.#errorMsg;
        return "";
    }
}