import KeyCode from "./utils/KeyCodes";
import { SelectionOffset, Selection } from "./SelectionManager";
import { EditorState } from "./Editor";

/**
 * Handles React Key events in the Editor to set the line state.
 * @param event 
 * @param setLines
 * @param selection
 */
export default function KeyHandler(event: React.KeyboardEvent,
    setEditorState: (value: React.SetStateAction<EditorState>) => void) {
    console.log('Keycode is: ', event.keyCode);
    const key = event.key
    switch (event.keyCode) {
        case KeyCode.KEY_BACKSPACE:
            setEditorState(prevState => {
                // ATT slice will only do a shallow copy of a multidimensional 
                // array, In order to deep copy map the array 
                // see https://stackoverflow.com/a/25492372/8050896
                // e.g. array.map(a => a.slice())
                const l = prevState.lines.slice()

                if (prevState.selection.start.offset > 0) {
                    l[prevState.selection.start.line][1] = 
                    l[prevState.selection.start.line][1].slice(0,
                        prevState.selection.start.offset > 0 
                            && prevState.selection.start.offset - 1)
                        + l[prevState.selection.start.line][1]
                            .slice(prevState.selection.start.offset) 

                    return {
                        lines: l,
                        selection: Selection.collapseSelection(prevState.selection.start.line,
                            prevState.selection.start.offset - 1)
                    }
                // if offset is at 0,
                } else {
                    // TEMP store the prev offset before changing lines as clone
                    // is a shallow copy in 2nd dimension.
                    const prevOffset = 
                        prevState.lines[prevState.selection.start.line - 1][1].length
                    // set prev line to concat current line
                    l[prevState.selection.start.line - 1][1] =
                        prevState.lines[prevState.selection.start.line - 1][1] 
                        + prevState.lines[prevState.selection.start.line][1]

                      // remove current line,
                      l.splice(prevState.selection.start.line, 1)
                      
                    return {
                        lines: l,
                        selection: Selection.collapseSelection(
                            prevState.selection.start.line - 1,
                            prevOffset)
                    }
                }
            })
            break;
        case KeyCode.KEY_ENTER:
            setEditorState(prevState => {
                const l = prevState.lines.slice()
                // split the line into chunks,
                const startChunk = prevState.lines[prevState.selection.start.line][1]
                        .slice(0, prevState.selection.start.offset)
                const endChunk = prevState.lines[prevState.selection.start.line][1]
                    .slice(prevState.selection.start.offset)
                
                // splice line array with end chunk in newline,
                l.splice(prevState.selection.start.line + 1,
                    0,
                    [Math.random().toString(), endChunk])

                // set selection line to start chunk,
                l[prevState.selection.start.line][1] = startChunk

                // return selection in new line at 0 offset,
                return {
                    lines: l,
                    selection: Selection.collapseSelection(
                        prevState.selection.start.line + 1,
                        0)
                }
            })
            break;
        case KeyCode.KEY_ARROW_UP:
            setEditorState(prevState => {
                const prevLineLength = 
                    prevState.lines[prevState.selection.start.line - 1][1].length
                return {
                    lines: prevState.lines,
                    selection: Selection.collapseSelection(
                        prevState.selection.start.line > 0 
                        ? prevState.selection.start.line - 1
                        : 
                        prevState.selection.start.line,
                        prevState.selection.start.offset < prevLineLength
                        ? prevState.selection.start.offset
                        :
                        prevLineLength)
                }
            })
            break;
        case KeyCode.KEY_ARROW_DOWN:
            setEditorState(prevState => {
                const nextLineLength = 
                    prevState.lines[prevState.selection.start.line + 1][1].length
                return {
                    lines: prevState.lines,
                    selection: Selection.collapseSelection(
                        prevState.selection.start.line < prevState.lines.length 
                        ? prevState.selection.start.line + 1
                        : 
                        prevState.selection.start.line,
                        prevState.selection.start.offset < nextLineLength
                        ? prevState.selection.start.offset
                        :
                        nextLineLength)
                }
            })
            break;
        case KeyCode.KEY_ARROW_LEFT:
            setEditorState(prevState => {
                return {
                    lines: prevState.lines,
                    selection: Selection.collapseSelection(prevState.selection.start.line,
                        prevState.selection.start.offset > 0 
                            ?
                            prevState.selection.start.offset - 1
                            :
                            prevState.selection.start.offset)
                }
            })
            break;
        case KeyCode.KEY_ARROW_RIGHT:
            setEditorState(prevState => {
                return {
                    lines: prevState.lines,
                    selection: Selection.collapseSelection(prevState.selection.start.line,
                        prevState.selection.start.offset 
                            < prevState.lines[prevState.selection.start.line][1].length
                            ?
                            prevState.selection.start.offset + 1
                            :
                            prevState.selection.start.offset)
                }
            })
            break;
        case KeyCode.KEY_TAB:
            // prevent the focus change,
            event.preventDefault()
            setEditorState(prevState => {
                const l = prevState.lines.slice()

                const tabSpace = "    "

                l[prevState.selection.start.line][1] = 
                    l[prevState.selection.start.line][1].slice(0, 
                        prevState.selection.start.offset) 
                        + tabSpace
                        + l[prevState.selection.start.line][1]
                            .slice(prevState.selection.start.offset) 
                return {
                    lines: prevState.lines,
                    selection: Selection.collapseSelection(prevState.selection.start.line,
                        prevState.selection.start.offset + tabSpace.length)
                }
            })
            break;
        case KeyCode.KEY_HOME:
            setEditorState(prevState => {
                return {
                    lines: prevState.lines,
                    selection: Selection.collapseSelection(
                        prevState.selection.start.line,
                        0)
                }
            })
            break;
        case KeyCode.KEY_END:
            setEditorState(prevState => {
                return {
                    lines: prevState.lines,
                    selection: Selection.collapseSelection(
                        prevState.selection.start.line,
                        prevState.lines[prevState.selection.start.line][1].length)
                }
            })
            break;
        case KeyCode.KEY_SHIFT:
        case KeyCode.KEY_CAPS_LOCK:
        case KeyCode.KEY_SHIFT:
        case KeyCode.KEY_CAPS_LOCK:
        case KeyCode.KEY_CONTROL:
        case KeyCode.KEY_ESCAPE:
            break;
        case KeyCode.KEY_BRACKET_OPEN:
        case KeyCode.KEY_PAREN_OPEN:
        default: 
            setEditorState(prevState => {
                const l = prevState.lines.slice()
                l[prevState.selection.start.line][1] = 
                    l[prevState.selection.start.line][1].slice(0, 
                        prevState.selection.start.offset) 
                        + key
                        + l[prevState.selection.start.line][1]
                            .slice(prevState.selection.start.offset) 
                return {
                    lines: l,
                    selection: Selection.collapseSelection(prevState.selection.start.line,
                        prevState.selection.start.offset + key.length)
                }
            })
            break;
    }
}