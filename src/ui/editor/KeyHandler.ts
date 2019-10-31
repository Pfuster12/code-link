import KeyCode from "./utils/KeyCodes";
import { SelectionOffset } from "./SelectionManager";

/**
 * Handles React Key events in the Editor to set the line state.
 * @param event 
 * @param setLines 
 */
export default function KeyHandler(event: React.KeyboardEvent, setLines: (value: React.SetStateAction<string[][]>) => void, selection: SelectionOffset) {
    console.log('Keycode is: ', event.keyCode);
    const key = event.key

    switch (event.keyCode) {
        case KeyCode.KEY_BACKSPACE:
            setLines(prevLines => {
                const l = prevLines.slice()
                l[selection.start][1] = l[selection.start][1].substring(0, l[selection.start][1].length - 1)
                return l
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
        case KeyCode.KEY_ARROW_RIGHT:
        case KeyCode.KEY_ESCAPE:
            break;
        case KeyCode.KEY_BRACKET_OPEN:
            setLines(prevLines => {
                const l = prevLines.slice()
                l[selection.start][1] = l[selection.start][1] + key + '}'
                return l
            })
            break;
        case KeyCode.KEY_BRACKET_CLOSE:
            break;
        default: 
            setLines(prevLines => {
                const l = prevLines.slice()
                l[selection.start][1] = l[selection.start][1] + key
                return l
            })
            break;
    }
}