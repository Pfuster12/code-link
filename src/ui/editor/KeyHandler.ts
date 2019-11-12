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
        // remove selection text...
        case KeyCode.KEY_BACKSPACE:
            setEditorState(prevState => {
                const l = prevState.lines.slice()
                if (l[prevState.selection.start.line][1].length > 0) {
                    l[prevState.selection.start.line][1] = 
                    l[prevState.selection.start.line][1].slice(0,
                        prevState.selection.start.offset > 0 && prevState.selection.start.offset - 1)
                        + l[prevState.selection.start.line][1].slice(prevState.selection.start.offset) 

                    return {
                        lines: l,
                        selection: {
                            start: {
                                line: prevState.selection.start.line,
                                offset: prevState.selection.start.offset > 0 && prevState.selection.start.offset - 1
                            },
                            end: {
                                line: prevState.selection.start.line,
                                offset: prevState.selection.start.offset > 0 && prevState.selection.start.offset - 1
                            }
                        }
                    }
                } else {
                    l.splice(prevState.selection.start.line, 1)
                    return {
                        lines: l,
                        selection: {
                            start: {
                                line: prevState.selection.start.line - 1,
                                offset: l[prevState.selection.start.line - 1][1].length
                            },
                            end: {
                                line: prevState.selection.start.line - 1,
                                offset: l[prevState.selection.start.line - 1][1].length
                            }
                        }
                    }
                }
            })
            break;
        case KeyCode.KEY_ENTER:
            // add a new line,
            setEditorState(prevState => {
                const l = prevState.lines.slice()
                l.splice(prevState.selection.start.line + 1,
                    0,
                    [Math.random().toString(), ''])
                return {
                    lines: l,
                    selection: {
                        start: {
                            line: prevState.selection.start.line + 1,
                            offset: 0
                        },
                        end: {
                            line: prevState.selection.start.line + 1,
                            offset: 0
                        }
                    }
                }
            })
        case KeyCode.KEY_SHIFT:
        case KeyCode.KEY_CAPS_LOCK:
        case KeyCode.KEY_SHIFT:
        case KeyCode.KEY_CAPS_LOCK:
        case KeyCode.KEY_ARROW_DOWN:
        case KeyCode.KEY_ARROW_UP:
        case KeyCode.KEY_CONTROL:
            break;
        case KeyCode.KEY_ARROW_LEFT:
            break;
        case KeyCode.KEY_ARROW_RIGHT:
            break;
        case KeyCode.KEY_ESCAPE:
            break;
        case KeyCode.KEY_BRACKET_OPEN:
        case KeyCode.KEY_PAREN_OPEN:
        // add key value to selection...
        default: 
        setEditorState(prevState => {
                const l = prevState.lines.slice()
                l[prevState.selection.start.line][1] = 
                    l[prevState.selection.start.line][1].slice(0, 
                        prevState.selection.start.offset) 
                        + key
                        + l[prevState.selection.start.line][1].slice(prevState.selection.start.offset) 
                return {
                    lines: l,
                    selection: {
                        start: {
                            line: prevState.selection.start.line,
                            offset: prevState.selection.start.offset + 1
                        },
                        end: {
                            line: prevState.selection.start.line,
                            offset: prevState.selection.start.offset + 1
                        }
                    }
                }
            })
            break;
    }
}