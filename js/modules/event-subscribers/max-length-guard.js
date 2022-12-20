import IEventSubscriber from "./event-subscriber-interface.js";

/**
 * @class
 * @implements {IEventSubscriber}
 */
export default class MaxLengthGuard extends IEventSubscriber {

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
    constructor(maxLength) {
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
        let newValue = inputEvent.target.value;
        if (inputEvent.data) newValue += inputEvent.data;
        const partialValue = newValue.split(" ");
        let valueWithoutSpaces = partialValue.join("");
        console.log(valueWithoutSpaces);
        if (valueWithoutSpaces.length > this.#maxLength) inputEvent.preventDefault();
    }
}