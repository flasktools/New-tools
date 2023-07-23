const storage = {
	/**
	 * Saves a key-value pair to localStorage.
	 * The value can be of any type that is serializable to JSON.
	 *
	 * @param {string} key - The key under which the value should be stored.
	 * @param {*} value - The value to store.
	 */
	save: function (key, value) {
		var jsonString = JSON.stringify(value);
		localStorage.setItem(key, jsonString);
	},

	/**
	 * Retrieves a value from localStorage.
	 * If the value is a JSON string, it will be parsed before it is returned.
	 * If the value does not exist, the provided default value will be returned.
	 *
	 * @param {string} key - The key of the value to retrieve.
	 * @param {*} missing - The default value to return if the key does not exist in localStorage.
	 * @returns {*} The value associated with the key, or the default value if the key does not exist.
	 */
	load: function (key, missing) {
		var jsonString = localStorage.getItem(key);
		if (jsonString === null) {
			return missing;
		}
		return JSON.parse(jsonString);
	},

	/**
	 * Removes a specific key from localStorage.
	 * If the key does not exist in localStorage, this function does nothing.
	 *
	 * @param {string} key - The key to remove.
	 */
	remove: function (key) {
		localStorage.removeItem(key);
	},
};

export default storage;
