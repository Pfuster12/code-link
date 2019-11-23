import * as React from 'react';
import { useState } from 'react'
import * as ReactDOM from 'react-dom';
import SplitPane from './ui/panes/SplitPane'
// Load the Code Link private styles file. These are not user-facing customisable styles,
// but essential, under-the-hood styles for the app to work properly.
import './ui/styles/code-link-styles.css'
import { Folders } from './ui/sidebar/plugins/folders/Folders';
import { SideBar } from './ui/sidebar/SideBar';
import EditorPane from './ui/editor/EditorPane';

/**
 * The entry point component of this application's renderer window.
 */
export default function App() {

    // The root dir of this window.
    const [rootDir, setRootDir] = useState('C:/Users/Pablo/projects/funky-releases')

    // Store the files this editor pane handles.
    const [files, setFiles] = useState<string[]>([])

    /**
     * Handle the folder click.
     */
    function onFileClick(filepath: string) {
        console.log('File clicked: ', filepath);   
        setFiles(prevState => {
            const a = prevState.slice()
            a.push(filepath)
            return a
        })
    }

    return (
        <main>
            <SplitPane>
                <SideBar>
                    <Folders dirPath={rootDir}
                        onFileClick={onFileClick}/>
                </SideBar>
                <EditorPane dirPath={rootDir}
                    files={files}/>
            </SplitPane>
        </main>
    )
}

// render inside the html,
ReactDOM.render(<App/>, document.getElementById('root'))