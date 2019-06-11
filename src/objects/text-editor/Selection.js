// @flow

import Caret from './Caret'

/**
 * A selection is the start and end index of the text edited in the {@link TextEditor}
 * when the user makes a selection.
 * @property {Number} selStart Selection start of this {@link Selection}.
 * @property {Number} selEnd Selection end of this {@link Selection}.
 * @property {Caret} caret This {@link Selection}'s caret.
 */
export default function Selection(selStart: Number, selEnd: Number, caret: Caret) {
    this.selStart = selStart
    this.selEnd = selEnd
    this.caret = caret
}

/**
 * Checks if a selection is one span.
 * @returns whether the selection spans the same index.
 */
Selection.prototype.isSelCollapsed = function () {
    return this.selStart === this.selEnd
}

