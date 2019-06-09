// @flow

/**
 * A token represents a string of 1 or more characters tokenised or matched 
 * as defined by a {@link LanguagePlugin} from an input string. It includes its position
 * within this input string with the start and end indices.
 * 
 * @param {String} id The id of this token. Can be a '.' joined string of id's.
 * @param {Number} startIndex The start index in the input string.
 * @param {Number} endIndex The end index in the input string.
 */
function Token(id: String, startIndex: Number, endIndex: Number) {
    this.id = id
    this.startIndex = startIndex
    this.endIndex = endIndex
}

/**
 * Creates a class name from the '.' joined string of the id property.
 * @function
 */
Token.prototype.createClass = function () {
    return this.id.replace(".", " ").trim()
}

module.exports = Token

