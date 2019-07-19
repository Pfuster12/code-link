import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SplitPane from './ui-components/SplitPane';
import EditorPane from './ui-components/editor/EditorPane';

/**
 * Load the Code Link private styles file. These are not user-facing customisable styles,
 * but essential, under-the-hood styles for the app to work properly.
 */
import './styles/code-link-styles.css'

/**
 * This is the entry point of this React Electron Editor Program.
 * We initialise the Editor theme to apply app-wide.
 */
export default function App() {

    return (
        <main>
            <SplitPane>
                <h1>CL</h1>
                <EditorPane/>
            </SplitPane>
        </main>
    )
}

// render inside the html,
ReactDOM.render(<App/>, document.getElementById('root'))