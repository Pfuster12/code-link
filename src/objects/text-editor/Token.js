// @flow

/**
 * A token represents a string of 1 or more characters tokenised or matched 
 * as defined by a {@link LanguagePlugin}.
 * @param {String} id The id of this token. Can be a '.' joined string of id's.
 * @param {String} match The string representation of this token's RegEx to match it in text.
 */
function Token(id: String, match: String) {
    this.id = id
    this.match = match
}