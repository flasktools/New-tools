/**
 * @typedef {Object} Town
 * @property {string} name - The name of the town.
 * @property {number} population - The population of the town.
 */
const Town = {};

/**
 * @namespace ITowns
 * @description Represents a collection of functions for managing towns.
 */
const ITowns = {
	/**
	 * @type {Object.<number, Town>}
	 * @description The population of the town.
	 */
	towns: {},

	/**
	 *  Get a town by its ID.
	 *
	 * @param {string} townId - The ID of the town to retrieve.
	 * @returns {Town} The town object with the specified ID.
	 */
	getTown: function (townId) {},

	/**
	 * Get the current town.
	 * @returns {Town} The current town object.
	 */
	getCurrentTown: function () {},
};

export default ITowns;
