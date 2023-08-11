/**
 * @namespace Town
 * @desc Represents a town.
 */
const Town = {
	/**
	 * @type {int}
	 * @desc The ID of the town.
	 */
	id: 0,
};

/**
 * @namespace ITowns
 * @desc Represents a collection of functions for managing towns.
 */
const ITowns = {
	/**
	 * @type {Object.<number, Town>}
	 * @desc The population of the town.
	 */
	towns: {},

	/**
	 * @desc Get a town by its ID.
	 * @param {string} townId - The ID of the town to retrieve.
	 * @returns {Town} The town object with the specified ID.
	 */
	getTown: function (townId) {},

	/**
	 * @desc Get the current town.
	 * @returns {Town} The current town object.
	 */
	getCurrentTown: function () {},
};

export default ITowns;
