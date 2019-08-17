// @flow

/**
 * A selection is the start and end index of the text edited in the {@link TextEditor}
 * when the user makes a selection.
 * @property {} start Selection start object of this {@link Selection}.
 * @property {} end Selection end object of this {@link Selection}.
 */
export default function Selection(start: {}, end: {}) {
    this.start = start
    this.end = end
}

/**
 * Checks if a selection is one span.
 * @returns whether the selection spans the same index.
 */
Selection.prototype.isSelCollapsed = function () {
    return this.start === this.end
}

