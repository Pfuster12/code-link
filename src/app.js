import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SplitPane from './ui-components/SplitPane';
import { themes, ThemeContext } from './theme/theme-context'
import Chopstring from './lexer/chopstring';
import PluginReader from './lexer/PluginReader';
import './styles/CodeLinkStyles.css'

/**
 * This is the entry point of this React Electron Editor Program.
 * We initialise the Editor theme to apply app-wide.
 */
export default function App() {

    /**
     * A state variable for the App-wide theme. Default to the light theme.
     */
    const [theme, setTheme] = useState(themes.light)

    // create a new plugin reader,
    const pluginReader = PluginReader()

    // read the js plugin,
    pluginReader.readPlugin('./src/lexer/language-plugins/javascript-plugin.json')
        .then(result => {
            console.log(result)
            Chopstring('function triple() {\n}', result).applyPatterns()
        })
        .catch(error => {
            console.log(error)
        })

    return (
        <>
            {/* The context is passed to a Theme Context Provider app-wide. */}
            <ThemeContext.Provider value={[theme, setTheme]}>
                <SplitPane/>
            </ThemeContext.Provider>
        </>
    )
}

// render inside the html,
ReactDOM.render(<App/>, document.getElementById('root'))