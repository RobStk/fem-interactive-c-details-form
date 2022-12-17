/* eslint-disable no-unused-vars */
/**
 * @class
 * @interface
 */
export default class IEventSubscriber {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    /**
     * @param {Event} event 
     */
    emit(event) { console.warn("Virtual method must be implemented."); }

    // ----------------------------
}