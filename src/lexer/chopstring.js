// @flow

/**
 * The Language Plugin type. A plugin defines a language's grammar,
 * keywords, symbols ...etc in an object we can parse.
 */
type LanguagePlugin = {
    features: Object,
    features_multi: Object,
    patterns: Array<string>
}

type Token = {
    id: String,
    startIndex?: Number,
    lastIndex: Number
}

/**
 * This is a library to tokenise text by the rules implemented in a given language plugin.
 * 
 * When a string is passed to this library methods, we can output each token according
 * to its LanguagePlugin token and multi-token rules. These tokens are then passed to a
 * html <span/> generator which can apply the token id as classNames to assign each token
 * a style by CSS.
 * 
 * A frozen factory function.
 * @function
 */
const Chopstring = () => {

    /**
     * Apply the language plugin single token patterns to the input text.
     * @param text The String text to tokenise.
     * @param plugin The plugin to parse the text with.
     */
    function applyTokenPatterns(text: string, plugin: LanguagePlugin): Token[] {
        // create an array from the features object,
        const features = Object.values(plugin.features)

        // create a new map to store the parsed tokens,
        const tokens = new Array()

        // for each feature
       features.forEach(feature => {
            // create the regex from the feature match regex,
            const regex = new RegExp(feature.match, 'gms')
      
            // array to store match results,
            var matchResults: Array

            // loop the match expression to get every match result,
            while ((matchResults = regex.exec(text)) !== null) {
                tokens.push({
                    id: feature.id,
                    startIndex: regex.lastIndex - matchResults[0].length,
                    lastIndex: regex.lastIndex
                })
            }
        })

        // sort by start index,
        tokens.sort((a, b) => a.startIndex - b.startIndex)

        // make the object values into an array,
        const result = Object.values(tokens.reduce((accumulator, {id, startIndex, lastIndex}) => {
            // assign the index to an existing value if it exists, or if the accumulator is undefined
            // create a new object with the id empty.
            accumulator[lastIndex] = accumulator[lastIndex] || { startIndex, lastIndex, id: "" }
            // assign the accumulator id the previous id if it exists and the current id,
            accumulator[lastIndex].id = id + (accumulator[lastIndex].id ? (" " + accumulator[lastIndex].id) : "")
            return accumulator
        }, {}))

        // sort by index,
        result.sort((a, b) => a.startIndex - b.startIndex)

        // reduce tokens that are included within a multi span token,
        const reducedTokens = Array()
        var previousToken = {
            startIndex: 0,
            lastIndex: 0
        }
        result.forEach(token => {
            // if the last index is greater than the previous tokens last index,
            if (token.lastIndex > previousToken.lastIndex) {
                // add this token,
                reducedTokens.push(token)
                previousToken = token
            }
        })

          // make the object values into an array,
          const reducedResult = Object.values(reducedTokens.reduce((accumulator, {id, startIndex, lastIndex}) => {
            // assign the index to an existing value if it exists, or if the accumulator is undefined
            // create a new object with the id empty.
            accumulator[startIndex] = accumulator[startIndex] ? (accumulator[startIndex].lastIndex < lastIndex ? { startIndex, lastIndex, id: "" } : accumulator[startIndex]) : { startIndex, lastIndex, id: "" }
            // assign the accumulator id the previous id if it exists and the current id,
            accumulator[startIndex].id = id + (accumulator[startIndex].id ? (" " + accumulator[startIndex].id) : "")
            return accumulator
        }, {}))

        console.log('After reduction', reducedResult)

        return reducedResult
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

        // return the line array
        return lines
    }

    return Object.freeze({
        applyTokenPatterns,
        splitLines
    })
}

export default Chopstring