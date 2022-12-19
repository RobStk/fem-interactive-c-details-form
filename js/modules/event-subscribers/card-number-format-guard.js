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

    /**
     * @param {InputEvent} inputEvent 
     */
    #emit(inputEvent) {
        const caretPosition = inputEvent.target.selectionStart;
        const baseValue = inputEvent.target.value;
        const value = this.#addSpaces(baseValue);
        inputEvent.target.value = value;

        const newCaretPosition = this.#calculateCaretPosition(caretPosition, baseValue, value);
        inputEvent.target.setSelectionRange(newCaretPosition, newCaretPosition);
    }

    /**
     * @private
     * @param {string} value 
     * @returns {string}
     */
    #addSpaces(value) {
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

    /**
     * @param {number} baseCaretPosition 
     * @param {string} baseString 
     * @param {string} newString 
     * @returns {number}
     */
    #calculateCaretPosition(baseCaretPosition, baseString, newString) {
        const oldStringBeforeCaret = baseString.substring(0, baseCaretPosition - 1);
        const spacesCntBeforeCaret = oldStringBeforeCaret.split(" ").length - 1;
        const caretPositionWithoutSpaces = baseCaretPosition - spacesCntBeforeCaret;
        let positionToAdd = Math.floor(caretPositionWithoutSpaces / 4);
        if (positionToAdd && !(newString % 4) && positionToAdd == newString.length) positionToAdd--;
        const newCaretPosition = caretPositionWithoutSpaces + positionToAdd;
        return newCaretPosition;
    }
}