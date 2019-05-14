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
    token: string,
    id: String,
    index: Number
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

    /**
     * Apply the language plugin patterns to the input text.
     */
    function applyPatterns(): Token[] {
        const features = Object.values(language.lang_features)

        const tokens = new Map()

       features.forEach(feature => {
            const pattern = feature.match
            const regex = new RegExp(pattern, 'gms')
            var array1

            while ((array1 = regex.exec(text)) !== null) {
                if (!tokens.has(regex.lastIndex)) {
                    tokens.set(regex.lastIndex, {
                        value: array1[0],
                        id: feature.id
                    })
                }
                else {
                    const previousId = tokens.get(regex.lastIndex).id
                    tokens.set(regex.lastIndex, {
                        value: array1[0],
                        id: previousId + " " + feature.id
                    })
                }
            }
        })

        var tokensSorted = new Map([...tokens.entries()].sort((a,b) => a[0] - b[0]));
        console.log(tokensSorted)

        return tokensSorted
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