import IEventSubscriber from "./event-subscriber-interface.js";

/**
 * @class
 * @implements {IEventSubscriber}
 */
export default class CVCFormatGuard extends IEventSubscriber {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get emit() { return this.#emit; }

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {number} maxLength
     */
    constructor(maxLength = 3) {
        super();
        this.#maxLength = maxLength;
    }

    /* ---------------------------------------------------- */
    /* Private props                                        */
    /* ---------------------------------------------------- */

    /** @private */
    #maxLength;

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @param {InputEvent} inputEvent
     */
    #emit(inputEvent) {
        const newValue = inputEvent.target.value.substr(0, this.#maxLength);
        inputEvent.target.value = newValue;
    }
}