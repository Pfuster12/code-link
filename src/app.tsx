import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SplitPane from './ui/panes/SplitPane'
// Load the Code Link private styles file. These are not user-facing customisable styles,
// but essential, under-the-hood styles for the app to work properly.
import './ui/styles/code-link-styles.css'
import Editor from './ui/editor/Editor';
import { Folders } from './ui/sidebar/plugins/folders/Folders';
import { SideBar } from './ui/sidebar/SideBar';
import EditorPane from './ui/editor/EditorPane';

/**
 * The entry point component of this application's renderer window.
 */
export default function App() {

    return (
        <main>
            <SplitPane>
                <SideBar>
                    <Folders dirPath={'C:/Users/Pablo/projects/funky-releases'}/>
                </SideBar>
                <EditorPane/>
            </SplitPane>
        </main>
    )
}

// render inside the html,
ReactDOM.render(<App/>, document.getElementById('root'))