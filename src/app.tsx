import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SplitPane from './ui/panes/SplitPane'
// Load the Code Link private styles file. These are not user-facing customisable styles,
// but essential, under-the-hood styles for the app to work properly.
import './ui/styles/code-link-styles.css'
import Editor from './ui/editor/Editor';
import { Folders } from './ui/sidebar/folders/Folders';
import { SideBar } from './ui/sidebar/folders/SideBar';

/**
 * The entry point component of this application's renderer window.
 */
export default function App() {

    // temp file path...
    const file = './src/test/files/coffee.txt'

    return (
        <main>
            <SplitPane>
                <SideBar>
                    <Folders dirPath={'C:/Users/Pablo/projects/funky-releases'}/>
                </SideBar>
                <Editor file={file}/>
            </SplitPane>
        </main>
    )
}

// render inside the html,
ReactDOM.render(<App/>, document.getElementById('root'))