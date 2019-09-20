// @flow

/**
 * Holds a selection object. 
 * A selection is the offset and end index of the text edited in the {@link TextEditor}
 * when the user makes a selection.
 * @property {SelOffset} start Selection start object of this {@link Selection}.
 * @property {SelOffset} end Selection end object of this {@link Selection}.
 */
export function Selection(start: SelOffset, end: SelOffset, caret: CaretPos) {
    this.start = start
    this.end = end
    this.caret = caret
}

/**
 * Checks if the selection object is one span.
 * @returns whether the selection spans the same index.
 */
Selection.prototype.isCollapsed = function () {
    return this.start.offset === this.end.offset
}

/**
 * Holds a selection object of the line number and the offset index.
 * @param {number} offset from the start of the line.
 * @param {number} line The line number of the selection index.
 * @param {number} lineOffset The offset of the selection from the line in this selection.
 */
export function SelOffset(offset: ?number, line: ?number, lineOffset: ?number) {
    this.offset = offset
    this.line = line
    this.lineOffset = lineOffset
}

/**
 * A Caret represents a vertical line in a 2 dimensional position to show the user
 * its current selection index within the text visually.
 * @property {number} x The X position of the caret.
 * @property {number} y The Y position of the caret.
 */
export function CaretPos(x: number, y: number) {
    this.x = x
    this.y = y
}
