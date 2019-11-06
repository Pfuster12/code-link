export interface SelectionOffset {
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
        return null
    }

    /**
     * Get the offset from the beginning of the given node, plus any 
     * extra offset given by the parameter 'offset'.
     * @param editor Document node to get the offset from the beginning of the container.
     * @param range Range selection.
     */
    getRangeCharOffset(range: Range): SelectionOffset {
        const node = range.startContainer.parentNode.parentNode

        // init a start range
        const startrange = new Range()

        // set the start to the beginning,
        startrange.setStart(node, 0)

         // set the end to the start container to find the start index from the text,
         startrange.setEnd(range.startContainer, range.startOffset)

        // get the index by finding the length of the string,
        const startIndex = startrange.toString().length
        
        console.log(startIndex);
          
        return null
    }

    /**
     * Gets the line numbers of the current text selection range. A range can span
     * multiple lines, and bi-directional.
     * @param range The range object of the current selection.
     * 
     * @returns SelectionOffset for start and end selection range.
     */
    getRangeLineOffset(range: Range, container: HTMLDivElement): SelectionOffset {
        // with the computed style,
        const style = window.getComputedStyle(container)

        // get the line height,
        const lineHeight = Math.floor(Number.parseFloat(style.lineHeight))
        
        // find the line number of the current selection,
        // round to the nearest integer,
        const startLine = Math.round(((range.getBoundingClientRect().top + container.scrollTop) / lineHeight))

        const endLine = Math.round(((range.getBoundingClientRect().bottom + container.scrollTop) / lineHeight)) - 1

        return { 
            start: startLine,
            end: range.collapsed ? startLine : endLine 
        }
    }
}