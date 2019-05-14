import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SplitPane from './ui-components/SplitPane';
import { themes, ThemeContext } from './theme/theme-context'
import EditorPane from './ui-components/editor/EditorPane';

/**
 * Load the Code Link private styles file. These are not user-facing customisable styles,
 * but essential, under-the-hood styles for the app to work properly.
 */
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

    return (
        <>
            {/* The context is passed to a Theme Context Provider app-wide. */}
            <ThemeContext.Provider value={[theme, setTheme]}>
                <main>
                    <SplitPane>
                        <h1>CL</h1>
                        <EditorPane/>
                    </SplitPane>
                </main>
            </ThemeContext.Provider>
        </>
    )
}

// render inside the html,
ReactDOM.render(<App/>, document.getElementById('root'))