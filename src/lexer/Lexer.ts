import { Plugin } from "./Plugin"
import { Grammar } from "./Grammar";
import { Token } from "./Token";

/**
 * The Lexer class performs lexical analysis, tokenisation and contains helper methods for parsing text.
 * @constructor Language id this lexer is parsing.
 */
export class Lexer {

    tokenise(text: string, plugin: Plugin): Token[] {
        // create an array from the grammars object,
        // ATT use <any> hack for ES6 ts to discover the values method,
        // @see stackoverflow.com/questions/42166914/there-is-an-object-values-on-typescript
        const grammars = (<any>Object).values(plugin.grammars)

        // create a new array to store the tokens,
        const tokens: Token[] = []

        grammars.forEach((grammar: Grammar) => {
            // create the regex from the feature match regex,
            const regex = new RegExp(grammar.rule, 'gms')
        
            // nullable array to store match results,
            var matchResults: RegExpExecArray

            // loop until null the match expression to get every regex match result,
            while ((matchResults = regex.exec(text)) !== null) {
                tokens.push({
                    name: grammar.name,
                    value: matchResults[0],
                    startIndex: regex.lastIndex - matchResults[0].length
                })
            }
        });

        // sort tokens by their natural index order,
        tokens.sort((a, b) => a.startIndex - b.startIndex)

        // init a previous token to hold the last indexed token,
        var previousToken: Token = {
            startIndex: 0,
            name: "",
            value: "",
        }
        
        // reduce repeated tokens by index,
        const reducer = tokens.reduce(
            (acc: Token[],
            token: Token) => {
                // end index,
                const prevEndIndex = previousToken.startIndex + previousToken.value.length
                const endIndex = token.startIndex + token.value.length

                // if the start index is the same...
                if (token.startIndex === previousToken.startIndex) {
                    // the new token might consume the old one, so pop the previous token,
                    if (endIndex >= prevEndIndex) {
                        acc.pop()
                    }

                    // if this new token's end is the same as the previous one...
                    if (endIndex === prevEndIndex) {
                        // chain the token names since they start at the same index,
                        token.name = token.name + ' ' + previousToken.name

                        // push this new token instead,
                        acc.push(token)

                        // assign the previous token to this one,
                        previousToken = token
                    }
                }

                // if this new token's index consumes the previous one...
                if (endIndex > prevEndIndex) {
                    // push this new token instead,
                    acc.push(token)

                    // assign the previous token to this one,
                    previousToken = token
                }

                // return the accumulator,
                return acc
        }, 
        [])
        
        return reducer

        return tokens
    }

    /**
     * Split a given text by new line character into an array of strings.
     * @param text to separate by new line.
     * @returns Line array.
     */
    splitNewLine(text: string): string[] {
        // A new-line separator RegEx for any platform (respecting an optional Windows and Mac CRLF) to split a line by newline,
        const lineRegex = /\r?\n/gm

        // split the text by the new line regex,
        const lines = text.split(lineRegex)

        // A new line regex to match a string with.
        const newLineRegex = /\r?\n/gm

        // grab the last line of the array,
        const lastLine = lines[lines.length - 1]

        // if the last line char is a new line push an empty line to complete the array,
        if (newLineRegex.test(lastLine.substring(lastLine.length - 1, lastLine.length))) {
            lines.push('')
        }
        
        // return the line array
        return lines
    }
}