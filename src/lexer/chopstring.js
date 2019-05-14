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
        const tokens = new Map()

        // for each feature
       features.forEach(feature => {
            // create the regex from the feature match regex,
            const regex = new RegExp(feature.match, 'gms')
            // array to store match results,
            var array1

            // loop the match expression to get every match result,
            while ((array1 = regex.exec(text)) !== null) {
                if (!feature.id.match('expression')) {
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
            }
        })

        // sort index by natural order,
        var tokensSorted = new Map([...tokens.entries()].sort((a,b) => a[0] - b[0]));
        console.log(tokensSorted)

        return tokensSorted
    }

    return Object.freeze({
        applyPatterns
    })
}

export default Chopstring