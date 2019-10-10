import KeyCode from "./utils/KeyCodes";

/**
 * Handles React Key events in the Editor to set the line state.
 * @param event 
 * @param setLines 
 */
export default function KeyHandler(event: React.KeyboardEvent, setLines: (value: React.SetStateAction<string[][]>) => void) {
    console.log('Keycode is: ', event.keyCode);
        
        switch (event.keyCode) {
            case KeyCode.KEY_BACKSPACE:
                setLines(prevLines => {
                    const l = prevLines.slice()
                    l[0][1] = l[0][1].substring(0, l[0][1].length - 1)
                    return l
                })
                break;
            case KeyCode.KEY_SHIFT:
                break;
            case KeyCode.KEY_CAPS_LOCK:
                    break;
            case KeyCode.KEY_SHIFT:
                    break;
            case KeyCode.KEY_CAPS_LOCK:
                    break;
            case KeyCode.KEY_ENTER:
                    break;
            case KeyCode.KEY_ARROW_DOWN:
            case KeyCode.KEY_ARROW_UP:
            case KeyCode.KEY_ARROW_LEFT:
            case KeyCode.KEY_ARROW_RIGHT:
                break;
            default: 
                const key = event.key
                setLines(prevLines => {
                    const l = prevLines.slice()
                    l[0][1] = l[0][1] + key
                    return l
                })
                break;
        }
}