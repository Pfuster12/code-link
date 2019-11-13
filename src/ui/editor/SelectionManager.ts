export interface SelectionOffset {
    start: number,
    end: number
}

export interface Selection {
    start: {
        line: number,
        offset: number
    },
    end: {
        line: number,
        offset: number
    }
}

export namespace Selection {

    /**
     * Returns a {@link Selection} collapsed, i.e. end==start
     * @param line 
     * @param offset 
     */
    export function collapseSelection(line: number, offset: number): Selection {
        return {
            start: {
                line: line,
                offset: offset
            },
            end: {
                line: line,
                offset: offset
            }
        }
    }
}

/**
 * This is a class to manage DOM selection in the {@link Editor} component.
 * The DOM editor consists of a series of CSS styled spans which can be selected
 * by the user and manipulated with special key controls.
 */
export class SelectionManager {

    /**
     * Get the offset of the current document selection.
     * @param range The {@link Range} of the current selection.
     * @param container
     * @returns SelectionOffset
     */
    getSelection(range: Range, container: HTMLDivElement): Selection {
        const charOffset = this.getRangeCharOffset(range)
        const lineOffset = this.getRangeLineOffset(range, container)

        return {
            start: {
                line: lineOffset.start,
                offset: charOffset.start
            },
            end: {
                line: lineOffset.end,
                offset: charOffset.end
            }
        }
    }

    /**
     * Get the offset from the beginning of the given node, plus any 
     * extra offset given by the parameter 'offset'.
     * @param editor to get the offset from the beginning of the container.
     * @param SelectionOffset
     */
    getRangeCharOffset(range: Range): SelectionOffset {
        // grab the line element,
        const startNode = range.startContainer.parentNode.parentNode
        const startRange = new Range()

        // set the start to the beginning,
        startRange.setStart(startNode, 0)
        // set the end to the start container to find the start index,
        startRange.setEnd(range.startContainer, range.startOffset)

        // get the index by finding the length of the string,
        const startIndex = startRange.toString().length

        // repeat for the end container,
        const endNode = range.endContainer.parentNode.parentNode
        const endRange = new Range()

        endRange.setStart(endNode, 0)
        endRange.setEnd(range.endContainer, range.endOffset)

        const endIndex = endRange.toString().length

        return {
            start: startIndex,
            end: endIndex
        }
    }

    /**
     * Gets the line numbers of the current text selection range. 
     * A range can span multiple lines, and bi-directional.
     * @param range The {@link Range} of the current selection.
     * @param container
     * @returns SelectionOffset
     */
    getRangeLineOffset(range: Range, container: HTMLDivElement): SelectionOffset {
        // with the computed style,
        const style = window.getComputedStyle(container)

        // get the line height,
        const lineHeight = Math.floor(Number.parseFloat(style.lineHeight))
        
        // find the line number of the current selection,
        // round to the nearest integer,
        const startLine = Math.round((
            (range.getBoundingClientRect().top+container.scrollTop)/lineHeight))

        const endLine = Math.round((
            (range.getBoundingClientRect().bottom+container.scrollTop)
            /lineHeight)) - 1

        return { 
            start: startLine,
            end: range.collapsed ? startLine : endLine 
        }
    }

    /**
     * Get the selection {@link Range} from the selection char offset.
     * @see StackOverflow answer <a href="https://stackoverflow.com/a/16100733/8050896"/>
     * @param lineElement 
     * @param start Character offset.
     * @param end Character offset.
     * @returns Range.
     */
    getRangeByCharOffset(startLineElement: Node, 
        start: number, 
        end: number,
        endLineElement?: Node): Range {
        // walk the tree of #text nodes in the line node,
        const walker = document.createTreeWalker(startLineElement,
            NodeFilter.SHOW_TEXT,
            null)

        var charIndex = 0
        const range = new Range()
        range.setStart(startLineElement, 0)
        range.collapse()

        var node, foundStart = false, stop = false;
        // walk through the tree
        while(!stop && (node=walker.nextNode())) {
            // add the node's char length,
            var nextCharIndex = charIndex + (node as Text).length;
            // if this node consumes the start offset,
            if (!foundStart && start >= charIndex && start <= nextCharIndex) {
                range.setStart(node, start - charIndex)
                foundStart = true
            }

             // if this node consumes the end offset,
            if (foundStart && end >= charIndex && end <= nextCharIndex) {
                range.setEnd(node, end - charIndex)
                stop = true
            }
            charIndex = nextCharIndex
        }

        return range
    }
}