import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../theme/theme-context'

/**
 * Component representing the line number in the gutter.
 */
export default function LineNumber(props) {

    /**
     * The App-wide context reference.
     * @see React
     */
    const [theme, setTheme] = useContext(ThemeContext)

    /**
     * Reference to the hover state of this LineNumber. Defaults to false.
     */
    const [isHovering, setIsHovering] = useState(false)

    /**
     * The line number passed in this component props.
     */
    const lineNumber = props.lineNumber

    /**
     * Handle when the mouse hovers over the element.
     * @param {React.SyntheticEvent} event the mouse event
     */
    function onMouseEnter(event) {
        // set hover state to true,
        setIsHovering(true)
    }

    /**
     * Handle when the mouse hovers over the element.
     * @param {React.SyntheticEvent} event the mouse event
     */
    function onMouseLeave(event) {
        // set hover state to false,
        setIsHovering(false)
    }

    /**
     * Line Parent Style.
     */
    const lineParentStyle = {
        width: '100%'
    }

    /**
     * Style of the line number.
     */
    const lineNumberStyle = {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        // when hovering increase the opacity,
        opacity: isHovering ? 0.8 : 0.3,
        lineHeight: theme.editorTextStyle.lineHeight,
        fontSize: theme.editorTextStyle.fontSize,
        cursor: 'pointer'
    }

    return (
        <div style={lineParentStyle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <span style={lineNumberStyle}>{lineNumber}</span>
        </div>
    )
}