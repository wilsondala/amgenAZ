/**
 * Add item to array conditionally.
 * @param {boolean} condition
 * @param {*} value new item or array of new items
 * @returns {array} array to spread
 * @example [1, 2, ...arrayAddConditionally(false, 3), ...arrayAddConditionally(true, 4)] // [1,2,4]
 */


const addArrayConditionally = (condition, value) => (
    condition
        ? [value]
        : []
);

export default addArrayConditionally;
