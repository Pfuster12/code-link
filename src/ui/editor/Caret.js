import React, { useState, useEffect } from 'react';

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
        const interval = setInterval(() => {
            setBlink(!blink);
        }, 500);

        return () => {
            clearInterval(interval);
          };
      }, [blink]);

    // return views,
    return (
    <div style={{top: position ? position.y : 0, left: position ? position.x : 0, visibility: blink ? 'hidden' : 'visible'}} 
        className="caret lineheight-theme token caret-theme"/>
    )
}

Caret.defaultProps = {
    position: { x: 0, y: 0}
}