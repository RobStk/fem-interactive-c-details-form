import IEventSubscriber from "./event-subscriber-interface.js";

/**
 * @class
 * @implements {IEventSubscriber}
 */
export default class AutoFiller extends IEventSubscriber {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get emit() { return this.#emit; }

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {HTMLElement} HTMLElementToFill
     */
    constructor(HTMLElementToFill) {
        super();
        this.#elementToFill = HTMLElementToFill;
    }

    /* ---------------------------------------------------- */
    /* Private props                                        */
    /* ---------------------------------------------------- */

    /** @private */
    #elementToFill;

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    #emit(inputEvent) {
        this.#fillElement(inputEvent.target.value);
    }

    /**
     * @private
     * @param {string} value
     */
    #fillElement(value) {
        this.#elementToFill.innerText = value;
    }
}