// @flow

/**
 * Holds a selection object. 
 * A selection is the offset and end index of the text edited in the {@link TextEditor}
 * when the user makes a selection.
 * @property {SelOffset} start Selection start object of this {@link Selection}.
 * @property {SelOffset} end Selection end object of this {@link Selection}.
 */
export default function Selection(start: SelOffset, end: SelOffset) {
    this.start = start
    this.end = end
}

/**
 * Checks if the selection object is one span.
 * @returns whether the selection spans the same index.
 */
Selection.prototype.isSelCollapsed = function () {
    return this.start === this.end
}

/**
 * Holds a selection object of the line number and the offset index.
 * @param {number} offset from the start of the line.
 * @param {number} line The line number of the selection index.
 * @param {number} lineOffset The offset of the selection from the line in this selection.
 */
function SelOffset(offset: number, line: number, lineOffset: number) {
    this.offset = offset
    this.line = line
    this.lineOffset = lineOffset
}