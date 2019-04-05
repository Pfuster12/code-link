// @flow

/**
 * The Language Plugin type. A plugin defines a language's grammar,
 * keywords, symbols ...etc in an object we can parse.
 */
type LanguagePlugin = {
    lang_features: object,
    patterns: Array<string>
}

type Token = {
    scope: string[],
    token: string
}

/**
 * This is a library to tokenise an input string,
 * separated by the rules implemented in a given language plugin.
 * 
 * When a string is passed to this library through the parameter text, 
 * we can output each token according to its LanguagePlugin rules.
 * @param text The String text to tokenise.
 * @param language The plugin to parse the text with.
 * 
 * A frozen factory function.
 * @function
 */
const Chopstring = (text: string, language: LanguagePlugin) => {

    function applyPatterns(): Token[] {
        
    }

    /**
     * Tokenizes the input string by a whitespace character into an array.
     * @returns {Array} of tokens separated by whitespace.
     */
    function tokeniseWhitespace(): Array {
        // create a white space RegEx to split the text into tokens,
        // keeping the white space delimiter as well.
        const whitespaceRegex = /(?<=\s)/gm

        // split the text by whitespace,
        return text.split(whitespaceRegex)
    }

    return Object.freeze({
        tokeniseWhitespace,
        applyPatterns
    })
}

export default Chopstring