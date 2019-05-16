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
 * This is a library to tokenise text by the rules implemented in a given language plugin.
 * 
 * When a string is passed to this library through the parameter text, 
 * we can output each token according to its LanguagePlugin rules.
 * 
 * A frozen factory function.
 * @function
 */
const Chopstring = () => {

    /**
     * Apply the language plugin patterns to the input text.
     * @param text The String text to tokenise.
     * @param plugin The plugin to parse the text with.
     */
    function applyPatterns(text: string, plugin: LanguagePlugin): Token[] {
        // create an array from the features object,
        const features = Object.values(plugin.lang_features)

        // create a new map to store the parsed tokens,
        const tokens = new Array()

        // for each feature
       features.forEach(feature => {
            // create the regex from the feature match regex,
            const regex = new RegExp(feature.match, 'gms')
            // array to store match results,
            var array1

            // loop the match expression to get every match result,
            while ((array1 = regex.exec(text)) !== null) {
                tokens.push({
                    id: feature.id,
                    startIndex: regex.lastIndex - array1[0].length
                })
            }
        })

        tokens.reduce((previousValue, currentValue) => {
            
        })

        console.log(tokens)

        return tokens
    }

    /**
     * Helper function to split a given text by new line.
     * @param {string} text 
     */
    function splitLines(text: string): Array<string> {
        /*
          A new-line separator RegEx for any platform (respecting an optional Windows and
          Mac CRLF) with positive lookbehind to split a line by newline while keeping
          the delimiters.
         */
        const lineRegex = /(?<=\r?\n)/gm

        // split the text,
        const lines = text.split(lineRegex)

        console.log(lines)
        // return the line array
        return lines
    }

    return Object.freeze({
        applyPatterns,
        splitLines
    })
}

export default Chopstring