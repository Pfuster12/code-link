import { any } from "prop-types"

/**
 * Tokenises the given text into a {@link Token} array.using a given {@link Plugin}.
 * @param text Text to tokenise.
 * @param plugin Plugin language to apply grammars from.
 * 
 * @returns Token array.
 */
export function tokenise(text: string, plugin: Lexer.Plugin): Lexer.Token[] {
     // create an array from the grammars object,
     // ATT use <any> hack for ES6 ts to discover the values method,
     // @see stackoverflow.com/questions/42166914/there-is-an-object-values-on-typescript
     const grammars = (<any>Object).values(plugin.grammars)

     // create a new array to store the tokens,
     const tokens: Lexer.Token[] = []

     // for each lang grammar,
    grammars.forEach((grammar: Lexer.Grammar) => {
         // create the regex from the feature match regex,
         const regex = new RegExp(grammar.rule, 'gms')
   
         // nullable array to store match results,
         var matchResults: RegExpExecArray

         // loop until null the match expression to get every regex match result,
         while ((matchResults = regex.exec(text)) !== null) {
             tokens.push({
                name: grammar.name,
                value: matchResults[0],
                index: regex.lastIndex - matchResults[0].length
            })
         }
     })

     // sort tokens by their natural index order,
     tokens.sort((a, b) => a.index - b.index)

     console.log('Tokenised result: ', tokens);

       // init a previous token to hold the last indexed token,
       var previousToken: Lexer.Token = {
        index: 0,
        name: "",
        value: "",
    }

     // reduce repeated tokens by index,
     const reducer = tokens.reduce(
        (acc: Lexer.Token[],
        token: Lexer.Token) => {
            // end index,
            const prevEndIndex = previousToken.index + previousToken.value.length
            const endIndex = token.index + token.value.length

            // if the start index is the same,
            if (token.index === previousToken.index) {
                // the new token might consume the old one, so pop the previous token for now...
                acc.pop()

                // chain the token names,
                token.name = token.name + ' ' + previousToken.name
            }

            // if this new token's index consumes the previous one,
            if (endIndex >= prevEndIndex) {
                // push this new token instead,
                acc.push(token)

                // assign the previous token to this one,
                previousToken = token
            }

            // return the accumulator,
            return acc
     }, 
     [])

     console.log('Reduced Tokens result: ', reducer);
     
     return reducer
}

/**
 * Split a given text by new line character into an array of strings.
 * @param text to separate by new line.
 * 
 * @returns Line array.
 */
export function split(text: string): string[] {
    // A new-line separator RegEx for any platform (respecting an optional Windows and
    // Mac CRLF) with positive lookbehind to split a line by newline while keeping
    // the delimiters.
    const lineRegex = /(?<=\r?\n)/gm

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

/**
 * Typescripst namespace for the Lexer interfaces.
 */
export declare namespace Lexer {

    /**
     * A Plugin in the lexer is a Language grammar with an id and a list of Grammar rules
     */
    export interface Plugin {
        id: string,
        grammars: Grammar[]
    }
    
    /**
     * A Grammar defines a RegEx rule and its name identifier.
     */
    export interface Grammar {
        name: string,
        rule: string
    }

    /**
     * A token is an identified set of characters matched by a grammar in the {@link Lexer}
     */
    export interface Token {
        name: string,
        value: string,
        index: number
    }
}