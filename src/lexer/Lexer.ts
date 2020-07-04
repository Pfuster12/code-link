
/**
 * The Lexer class performs lexical analysis, tokenisation and contains helper methods for parsing text.
 * @constructor Language id this lexer is parsing.
 */
export class Lexer {

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