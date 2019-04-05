import React from 'react';

/**
 * A set of pre-defined themes styling the App.
 * @constant
 */
export const themes = {
    // light theme,
    light: {
        // background editor color,
        backgroundColorEditor: '#F8F8F8',
        // editor text style,
        editorTextStyle: {
            // the editor line height,
            lineHeight: 1.4,
            // editor text style
            fontFamily: 'consolas',
            // font size,
            fontSize: '14px'
        },
        gutterBackgroundColor: '#F8F8F8'
    },
    // dark theme,
    dark: {
        // background editor color,
        backgroundColorEditor: '#222222',
        // editor text style,
        editorTextStyle: {
            // the editor line height,
            lineHeight: 1.4,
            // editor text style
            fontFamily: 'consolas',
            // font size,
            fontSize: '14px'
        },
        gutterBackgroundColor: '#222222'
      },
}

/**
 * The Theme Context created from {@link React}. This holds the pre-defined
 * theme objects with properties for styling and other preferences.
 * @constant
 */
export const ThemeContext = React.createContext([themes.dark, () => {}])