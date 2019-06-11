// @flow

/**
 * A Caret represents a vertical line in a 2 dimensional position to show the user
 * its current selection index within the text visually.
 * @property {Number} x The X position of the caret.
 * @property {Number} y The Y position of the caret.
 */
export default function Caret(x: Number, y: Number) {
    this.x = x
    this.y = y
}
