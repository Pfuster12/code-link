import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SplitPane from './ui/SplitPane'

// Load the Code Link private styles file. These are not user-facing customisable styles,
// but essential, under-the-hood styles for the app to work properly.
import './ui/styles/code-link-styles.css'

/**
 * This is the entry point of this react x electron editor application.
 */
export default function App() {

    return (
        <main>
            <SplitPane>
                <h1>pane-1</h1>
                <h1>pane-2</h1>
            </SplitPane>
        </main>
    )
}

// render inside the html,
ReactDOM.render(<App/>, document.getElementById('root'))