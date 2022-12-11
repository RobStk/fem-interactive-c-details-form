/**
 * @class
 * @interface
 */
export default class IInputModule {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    /**
     * @returns {Boolean}       FALSE on error or TRUE otherwise
     */
    validate() { throw new Error("Virtual method must be implemented."); }

    // ----------------------------
}