/**
 * @typedef {import('../utils/event-subscriber-interface').default} IEventSubscriber
 */
/**
 * @class
 * @interface
 */
export default class IInput {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    /**
     * @returns {HTMLInputElement} HTMLInputElement
     */
    getHTMLElement() { console.warn("Virtual method must be implemented."); }

    // ----------------------------

    /**
     * @returns {String[]}   Errors array.
     */
    getValidationErrors() { console.warn("Virtual method must be implemented."); }

    // ----------------------------

    /**
     * @param {IEventSubscriber|IEventSubscriber[]} inputSubscribers 
     */
    addInputSubscribers() { console.warn("Virtual method must be implemented."); }

    // ----------------------------

    /**
     * @param {IEventSubscriber|IEventSubscriber[]} beforeInputSubscribers 
     */
    addBeforeInputSubscribers() { console.warn("Virtual method must be implemented."); }

    // ----------------------------
}