import React, { useState, useEffect } from './react';
import { CaretPos } from '../../objects/text-editor/Selection';

/**
 * Displays a blinking caret in the text editor.
 * @function
 */
export default function Caret(props) {

    /**
     * State toggle for the caret visibility.
     */
    const [blink, setBlink] = useState(false)

    /**
     * The position of this caret.
     */
    const position = props.position

    /**
     * Effect to set blink interval
     */
    useEffect(() => {
        // const interval = setInterval(() => {
        //     setBlink(!blink);
        // }, 600);

        // return () => {
        //     clearInterval(interval);
        //   };
      },
      []);

    // return views,
    return (
    <div style={
        {
            top: position.y,
            left: position.x,
            visibility: blink ? 'hidden' : 'visible'
        }
    } 
        className="caret lineheight-theme token caret-theme"/>
    )
}

Caret.defaultProps = {
    position: new CaretPos(0, 0)
}