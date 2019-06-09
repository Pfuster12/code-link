// @flow

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
        <div className="selection-parent">
            {
                selection.map((rect: ClientRect, index) => {
                    return <div key={`${rect.left}-${index}`} style={{width: rect.width, top: rect.top, left: rect.left}}
                                className="selection selection-theme lineheight-theme"/>
                })
            }
        </div>
    )
}