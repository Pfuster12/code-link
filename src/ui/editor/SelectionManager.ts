interface SelectionOffset {
    start: number,
    end: number
}

/**
 * This is a class to manage DOM selection in the {@link Editor} component.
 * The DOM editor consists of a series of CSS styled spans which can be selected
 * by the user and manipulated with special key controls.
 */
export class SelectionManager {

    /**
     * Get the selection indices of the current document selection in using the document selection API.
     * @param editor The editor HTML element.
     * @returns A Selection indices object.
     */
    getSelection(editor: HTMLElement): SelectionOffset {
        // grab the document selection object, we know it will only be contained
        const sel = document.getSelection()

        // wrap the range selection in a DOMException if there is no ranges,
        try {
              // get the range object of the selection,
            const range = sel.getRangeAt(0)

            // get the text selection indices,
            const offset = this.getSelectionTextOffset(editor, range)

             // get the selection range line numbers,
             const lineNumbers = this.getSelectionLineNumber(range)

             return offset
        } catch (e) {
            console.log('Error getting selection: ', e);
            
        }
    }

    /**
     * Get the offset from the beginning of the given node, plus any 
     * extra offset given by the parameter 'offset'.
     * @param editor Document node to get the offset from the beginning of the container.
     * @param range Range selection.
     */
    private getSelectionTextOffset(editor: HTMLElement, range: Range): SelectionOffset {
        // init a start range
        const startrange = new Range()

        // set the start to the beginning,
        startrange.setStart(editor, 0)

        // set the end to the start container to find the start index from the text,
        startrange.setEnd(range.startContainer, range.startOffset)

        // get the index by finding the length of the string,
        const startIndex = startrange.toString().length

        // init an end range,
        const endrange = new Range()

        // set the start to the beginning,
        endrange.setStart(editor, 0)

        // set the end to the end container to find the end index fom the text,
        endrange.setEnd(range.endContainer, range.endOffset)

        // get the index by finding the length of the string,
        const endIndex = endrange.toString().length

        return { 
            start: startIndex,
            end: endIndex 
        }
    }

    /**
     * Gets the line numbers of the current text selection range. A range can span
     * multiple lines, and can start in both directions, i.e. start high to low.
     * @param range The range object of the current selection.
     * 
     * @returns Selecction offset for start and end selection range.
     */
    private getSelectionLineNumber(range: Range): SelectionOffset {
        // find a token text editor element,
        const editor = document.getElementsByClassName('editor')[0]

        // get the computed style,
        const style = window.getComputedStyle(editor)

        // get the height number by replacing the px suffix from the string,
        const height = parseInt(style.lineHeight.replace('px', ''))
        
        // find the line number of the current start selection by dividing by the
        // lineheight and round the division to find the whole number, the line
        // is added 1 to find the 1 based line,
        const startLine = Math.round((range.getBoundingClientRect().top / height))

        // find the line number of the current start selection,
        const endLine = Math.round((range.getBoundingClientRect().bottom / height)) - 1

        return { 
            start: startLine,
            end: endLine 
        }
    }

    /**
     * Gets the offsets from the start of the line.
     * @param text Text content to get the line offset.
     * @param startIndex Start index of the text.
     * @param endIndex End index of the text.
     */
    private getLineOffsets(text: string, startIndex: number, endIndex: number): SelectionOffset {
        // extract the first chunk of the text,
        const firstChunk = text.slice(0, startIndex)

        // extract the second chunk of the text,
        const secondChunk = text.slice(endIndex, text.length)

        // find the offset of the first line selection by getting the index
        // of the new line character starting from the end of the offset,
        const startOffset = startIndex - firstChunk.lastIndexOf('\n')

        // repeat for the end offset of the line,
        const endOffset = secondChunk.indexOf('\n')

        return {
            start: startOffset - 1,
            end: endOffset
        }
    }
}