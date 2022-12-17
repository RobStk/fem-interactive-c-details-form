import IEventSubscriber from "./event-subscriber-interface.js";

/**
 * @class
 * @implements {IEventSubscriber}
 */
export default class ElementReplacer extends IEventSubscriber {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get emit() { return this.#emit; }

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {HTMLElement} baseElement 
     * @param {HTMLElement} newElement 
     */
    constructor(baseElement, newElement) {
        super();
        this.#baseElement = baseElement;
        this.#newElement = newElement;
    }

    /* ---------------------------------------------------- */
    /* Private props                                        */
    /* ---------------------------------------------------- */

    /** @private */
    #baseElement;

    /** @private */
    #newElement;

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @param {Event} event 
     */
    #emit() {
        this.#baseElement.classList.add("hidden");
        this.#newElement.classList.remove("hidden");
    }
}