import React from 'react';

/**
 * Displays a selection container highlighting text in the editor selected by the user.
 * @function
 */
export default function Selection(props) {

    /**
     * This Selection's lines to overlay over the text editor.
     */
    const selection = props.selection

    // return views,
    return (
        <>
            {
                new Array(selection.lines).fill(selection.lines).map(line => {
                    return <div style={{width: selection.selPos.width, top: selection.selPos.y, left: selection.selPos.x}}
                        className="selection selection-theme lineheight-theme"/>
                })
            }
        </>
    )
}