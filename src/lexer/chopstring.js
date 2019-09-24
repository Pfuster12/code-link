/**
 * This is a library to tokenise text by the rules implemented in a given language plugin.
 * 
 * When a string is passed to the applyTokenPatterns method, we can output each token according
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
     * @param {string} text The String text to tokenise.
     * @param plugin The plugin to parse the text with.
     * 
     * @Returns an array of {@link Token} objects.
     */
    function applyTokenPatterns(text, plugin) {
        // create an array from the features object,
        const features = Object.values(plugin.features)

        // create a new map to store the parsed tokens,
        const tokens = new Array()

        // for each feature
       features.forEach(feature => {
            // create the regex from the feature match regex,
            const regex = new RegExp(feature.match, 'gms')
      
            // array to store match results,
            var matchResults 

            // loop the match expression to get every match result,
            while ((matchResults = regex.exec(text)) !== null) {
                tokens.push(new Token(feature.id, regex.lastIndex - matchResults[0].length, regex.lastIndex))
            }
        })

        // sort by start index,
        tokens.sort((a, b) => a.startIndex - b.startIndex)

        // Reduce into one token those which share the same end index and create an array
        // with the given values,
        const result = Object.values(tokens.reduce((accumulator, {id, startIndex, endIndex}) => {
            // assign the index to an existing value if it exists, or if the accumulator is undefined
            // create a new object with the id empty.
            accumulator[endIndex] = accumulator[endIndex] || { startIndex, endIndex, id: "" }
            // assign the accumulator id the previous id if it exists and the current id,
            accumulator[endIndex].id = id + (accumulator[endIndex].id ? (" " + accumulator[endIndex].id) : "")
            return accumulator
        }, {}))

        // sort by index,
        result.sort((a, b) => a.startIndex - b.startIndex)

        // init a previous token to hold the last indexed token,
        var previousToken = {
            startIndex: 0,
            endIndex: 0
        }

        // reduce the result to remove tokens that are encompassed by longer ones,
        const reducedTokens = result.reduce((acc, el) => {
             // if the last index is greater than the previous tokens last index,
             if (el.endIndex > previousToken.endIndex) {
                // push this token,
                acc.push(el)
                previousToken = el
            }
            // return the accumulator,
            return acc
        },
        [])

        // reduce the tokens that have the same start index and then create an array with the given values,
        const reducedResult = Object.values(reducedTokens.reduce((accumulator, {id, startIndex, endIndex}) => {
            // assign the index to an existing value if it exists,
            accumulator[startIndex] = accumulator[startIndex]
                // create a new token if the end index is not encompassed by the current token, else use the same,
                ? (accumulator[startIndex].endIndex < endIndex ? new Token("", startIndex, endIndex) : accumulator[startIndex]) 
                // if no token exists create a new one,
                : new Token("", startIndex, endIndex)
            // assign the accumulator id the previous id if it exists and the current id,
            accumulator[startIndex].id = id + (accumulator[startIndex].id ? (" " + accumulator[startIndex].id) : "")
            return accumulator
        }, {}))

        // return the reduced array,
        return reducedResult
    }

    /**
     * Helper function to split a given text by new line, adding an empty line at the end of
     * the array if the last character of the array is a new line.
     * @param {string} text 
     * @returns {string[]} Array of lines from the text.
     */
    function splitLines(text) {
        // A new-line separator RegEx for any platform (respecting an optional Windows and
        // Mac CRLF) with positive lookbehind to split a line by newline while keeping
        // the delimiters.
        const lineRegex = /(?<=\r?\n)/gm

        // A new line regex to match a string with.
        const newLineRegex = /\r?\n/gm

        // split the text by the new line regex,
        const lines = text.split(lineRegex)

        // grab the last line of the array,
        const lastLine = lines[lines.length - 1]

        // if the last line token is a new line push an empty line to complete the array,
        if (newLineRegex.test(lastLine.substring(lastLine.length - 1, lastLine.length))) {
            lines.push('')
        }

        // return the line array
        return lines
    }

    /**
     * Map an array of string lines to unique id's among its siblings.
     * In order to create unique id's for the keys we use the value of the string. For
     * those cases where the value is duplicated we find the duplicate string indices in the array 
     * and mark them with an incremental counter of how many times its repeated.
     * @param {string[]} lines Array of lines to map.
     * 
     * @returns {Map<number, string>} Map of key-line pairs.
     */
    function mapLineKeys(lines) {
        // map the line array to a key-value map array,
        return lines.map(line => [Math.random(), line])
    }

    /**
     * Apply the multi token pattern triggered in the given text and returns the index 
     * of the lines where it is found.
     * @param {string} text
     * @param multiToken
     */
    function applyMultiTokenPatterns(text, multiToken) {
        
    }

    return Object.freeze({
        applyTokenPatterns,
        splitLines,
        mapLineKeys
    })
}

export default Chopstring