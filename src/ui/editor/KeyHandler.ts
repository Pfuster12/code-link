import KeyCode from "./utils/KeyCodes";
import { SelectionOffset, Selection } from "./SelectionManager";

/**
 * Handles React Key events in the Editor to set the line state.
 * @param event 
 * @param setLines
 * @param selection
 */
export default function KeyHandler(event: React.KeyboardEvent,
    setLines: (value: React.SetStateAction<string[][]>) => void,
    selection: Selection,
    setSelection: (value: React.SetStateAction<Selection>) => void) {
    console.log('Keycode is: ', event.keyCode);
    const key = event.key
    switch (event.keyCode) {
        // remove selection text...
        case KeyCode.KEY_BACKSPACE:
            setLines(prevLines => {
                const l = prevLines.slice()
                l[selection.start.line][1] = 
                    l[selection.start.line][1].slice(0, selection.start.offset - 1)
                        + l[selection.start.line][1].slice(selection.start.offset) 
                return l
            })
            setSelection(prevSelection => {
                return {
                    start: {
                        line: prevSelection.start.line,
                        offset: prevSelection.start.offset - 1
                    },
                    end: {
                        line: prevSelection.end.line,
                        offset: prevSelection.end.offset
                    }
                }
            })
            break;
        case KeyCode.KEY_SHIFT:
        case KeyCode.KEY_CAPS_LOCK:
        case KeyCode.KEY_SHIFT:
        case KeyCode.KEY_CAPS_LOCK:
        case KeyCode.KEY_ENTER:
        case KeyCode.KEY_ARROW_DOWN:
        case KeyCode.KEY_ARROW_UP:
        case KeyCode.KEY_ARROW_LEFT:
            setSelection(prevSelection => {
                return {
                    start: {
                        line: prevSelection.start.line,
                        offset: prevSelection.start.offset - 1
                    },
                    end: {
                        line: prevSelection.end.line,
                        offset: prevSelection.end.offset
                    }
                }
            })
            break;
        case KeyCode.KEY_ARROW_RIGHT:
            setSelection(prevSelection => {
                return {
                    start: {
                        line: prevSelection.start.line,
                        offset: prevSelection.start.offset + 1
                    },
                    end: {
                        line: prevSelection.end.line,
                        offset: prevSelection.end.offset
                    }
                }
            })
            break;
        case KeyCode.KEY_ESCAPE:
            break;
        case KeyCode.KEY_BRACKET_OPEN:
            setLines(prevLines => {
                const l = prevLines.slice()
                l[selection.start.line][1] = 
                    l[selection.start.line][1].slice(0, selection.start.offset) 
                        + key 
                        + '}'
                        + l[selection.start.line][1].slice(selection.start.offset) 
                return l
            })
            setSelection(prevSelection => {
                return {
                    start: {
                        line: prevSelection.start.line,
                        offset: prevSelection.start.offset + 1
                    },
                    end: {
                        line: prevSelection.end.line,
                        offset: prevSelection.end.offset
                    }
                }
            })
            break;
        case KeyCode.KEY_BRACKET_CLOSE:
            break;
        // add key value to selection...
        default: 
            setLines(prevLines => {
                const l = prevLines.slice()
                l[selection.start.line][1] = 
                    l[selection.start.line][1].slice(0, selection.start.offset) 
                        + key
                        + l[selection.start.line][1].slice(selection.start.offset) 
                return l
            })
            setSelection(prevSelection => {
                return {
                    start: {
                        line: prevSelection.start.line,
                        offset: prevSelection.start.offset + 1
                    },
                    end: {
                        line: prevSelection.end.line,
                        offset: prevSelection.end.offset
                    }
                }
            })
            break;
    }
}