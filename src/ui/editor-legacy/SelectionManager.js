import { Selection, SelOffset, CaretPos } from "../../objects/text-editor/Selection";
import { log } from "util";

// @flow

/**
 * This is a library to manage DOM selection in the {@link TextEditor} component.
 * The DOM editor consists of a series of CSS styled spans which can be selected
 * by the user and manipulated with special key controls.
 * 
 * A frozen factory function.
 * @function
 */
const SelectionManager = () => {
    
    /**
     * Get the selection indices of the current document selection in
     * this {@link TextEditor} using the document selection API.
     * @param {Element} editor The editor HTML element.
     * @returns A Selection indices object.
     */
    function getSelection(editor: Element): Selection {
        // grab the document selection object, we know it will only be contained
        const sel = document.getSelection()

        // wrap the range selection in a DOMException if there is no ranges,
        try {
              // get the range object of the selection,
            const range = sel.getRangeAt(0)
            
            // get the text selection indices,
            const offset = getSelectionTextOffset(editor, range)

            // get the selection range line numbers,
            const lineNumbers = getSelectionLineNumber(range)

            // get the line offset index,
            const lineOffsets = getLineOffsets(editor.textContent, offset.start, offset.end)

            // get the caret position,
            const caret = getCaretPosition(range)

            return new Selection(new SelOffset(offset.start, 
                    lineNumbers.start, 
                    lineOffsets.start),
                new SelOffset(offset.end, 
                    lineNumbers.end, 
                    lineOffsets.end),
                    caret)
        } catch (err) {
            console.error(err)
            // return an empty object,
            return {}
        }
    }

    /**
     * Gets the caret position of the current dom selection.
     * 
     * @returns {CaretPos}
     */
    function getCaretPosition(range: Range): CaretPos {
        const rect = range.getClientRects()[0]

        return new CaretPos(rect.x, rect.y)
    }

    /**
     * Gets the line numbers of the current text selection range. A range can span
     * multiple lines, and can start in both directions, i.e. start high to low.
     * @param {Range} range The range object of the current selection.
     * 
     * @returns Line numbers object for start and end selection range.
     */
    function getSelectionLineNumber(range: Range): Object {
        // find a token text editor element,
        const editor = document.getElementsByClassName('text-input')[0]

        // get the computed style,
        const style = window.getComputedStyle(editor)

        // get the height number by replacing the px suffix from the string,
        const height = style.lineHeight.replace('px', '')
        
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
     * @param {string} text Text content to get the line offset.
     * @param {number} startIndex Start index of the text.
     * @param {number} endIndex End index of the text.
     */
    function getLineOffsets(text: string, startIndex: number, endIndex: number): Object {
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

    /**
     * Get the offset from the beginning of the line-generator node of the given node, plus
     * any extra offset given by the parameter 'offset'.
     * @param {Node} node Document node to get the offset from the beginning of the node container.
     * @param {number} offset Offset of text from the given node the selection reaches.
     */
    function getSelectionTextOffset(editor: Element, range: Range) {
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
     * Returns the selection range from the document currently.
     * 
     * @returns Range object of the selection.
     */
    function saveSelection(): Range {
        if (window.getSelection) {
            const sel = window.getSelection();

            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }
        }
        return null;
    }

    return Object.freeze({
        getSelection,
        saveSelection,
        getCaretPosition
    })
}

export default SelectionManager