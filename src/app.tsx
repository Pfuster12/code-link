import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SplitPane from './ui/SplitPane'

// Load the Code Link private styles file. These are not user-facing customisable styles,
// but essential, under-the-hood styles for the app to work properly.
import './ui/styles/code-link-styles.css'
import Editor from './ui/editor/Editor';

/**
 * The entry point component of this editor application main window.
 */
export default function App() {

    // temp file path...
    const file = './src/test/files/coffee.txt'

    return (
        <main>
            <SplitPane>
                <h1>pane-1</h1>
                <Editor file={file}/>
            </SplitPane>
        </main>
    )
}

// render inside the html,
ReactDOM.render(<App/>, document.getElementById('root'))