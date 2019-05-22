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
    id: String,
    lastIndex: Number
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
            var array1

            // loop the match expression to get every match result,
            while ((array1 = regex.exec(text)) !== null) {
                tokens.push({
                    id: feature.id,
                    lastIndex: regex.lastIndex
                })
            }
        })

        // make the object values into an array,
        const result = Object.values(tokens.reduce((accumulator, {id, lastIndex}) => {
            // assign the index to an existing value if it exists, or if the accumulator is undefined
            // create a new object with the id empty.
            accumulator[lastIndex] = accumulator[lastIndex] || { lastIndex, id: "" }
            // assign the accumulator id the previous id if it exists and the current id,
            accumulator[lastIndex].id = id + (accumulator[lastIndex].id ? ("." + accumulator[lastIndex].id) : "")
            return accumulator
        }, {}))

        console.log(result)

        return result
    }
    
    /**
     * Apply the language plugin multi token patterns to the input text.
     * @param text The String text to tokenise.
     * @param plugin The plugin to parse the text with.
     */
    function applyMultiTokenPatterns(text: string, plugin: LanguagePlugin): Token[] {
        // create an array from the features object,
        const features = Object.values(plugin.features_multi)

        // create a new map to store the parsed tokens,
        const tokens = new Array()

        // for each feature
        features.forEach(feature => {
            // create the regex from the feature match regex,
            const startRegex = new RegExp(feature.match.start + '.+?' + feature.match.end, 'gms')
            console.log(startRegex)
            // array to store match results,
            var array1

            // loop the match expression to get every match result,
            while ((array1 = startRegex.exec(text)) !== null) {
                tokens.push({
                    id: feature.id,
                    startIndex: startRegex.lastIndex - array1[0].length,
                    lastIndex: startRegex.lastIndex
                })
            }
        })

        // sort by start index,
        tokens.sort((a, b) => a.startIndex - b.startIndex)

        console.log('Multi tokens are...', tokens)

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

        // return the line array
        return lines
    }

    return Object.freeze({
        applyTokenPatterns,
        applyMultiTokenPatterns,
        splitLines
    })
}

export default Chopstring