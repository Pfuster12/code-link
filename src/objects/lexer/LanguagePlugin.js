// @flow

function

/**
 * A Language Plugin is an object defining the features, patterns and metadata of a coding language
 * for the App to parse a given input text and output a set of tokens from the given rules.
 * 
 * @param {string} id The id of this token. Can be a '.' joined string of id's.
 */
function LanguagePlugin(id: string, features: Object) {
    this.id = id
    this.features = features
}

module.exports = LanguagePlugin

