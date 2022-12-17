import IEventSubscriber from "./event-subscriber-interface.js";

/**
 * @class
 * @implements {IEventSubscriber}
 */
export default class CardNumberFormatGuard extends IEventSubscriber {

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
    constructor(maxLength = 16) {
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

    #emit(inputEvent) {
        const baseValue = inputEvent.target.value;
        const value = this.#manageSpaces(baseValue);
        inputEvent.target.value = value;
    }

    /**
     * @private
     * @param {string} value 
     * @returns {string}
     */
    #manageSpaces(value) {
        const partialValue = value.split(" ");
        let valueWithoutSpaces = partialValue.join("");
        valueWithoutSpaces = valueWithoutSpaces.slice(0, this.#maxLength);
        let newValue = "";
        for (let index = 0; index < valueWithoutSpaces.length; index++) {
            const letter = valueWithoutSpaces[index];
            newValue += letter;
            if (!((index + 1) % 4) && (index < (valueWithoutSpaces.length - 1))) newValue += " ";
        }
        return newValue;
    }
}