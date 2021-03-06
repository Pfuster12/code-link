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
import TitleBar from './ui/titlebar/TitleBar';
require('dotenv').config()

/**
 * The entry point component of this application's renderer window.
 */
export default function App() {

    const defaultFileStart = 'untitled'

    // The root dir of this window.
    const [rootDir, setRootDir] = useState(process.env.TEST_FOLDER_PATH)

    // Store the files this editor pane handles.
    const [files, setFiles] = useState<string[]>([defaultFileStart])

    /**
     * Handle the folder click.
     */
    function onFileClick(filepath: string) {
        console.log('File clicked: ', filepath);
        // check if file is already opened,
        const isOpened = files.find(file => file === filepath) 
        if (!isOpened) {
            setFiles(prevState => prevState.concat(filepath))
        }
    }

    /**
     * Handle the folder click.
     */
    function onFileClose(index: number) {
        setFiles(prevState => prevState.filter((_, i) => index != i))
    }

    return (
        <main>
            <TitleBar/>
            <SplitPane>
                <SideBar>
                    <Folders dirPath={rootDir}
                        onFileClick={onFileClick}/>
                </SideBar>
                <EditorPane dirPath={rootDir}
                    files={files}
                    onFileClose={onFileClose}/>
            </SplitPane>
        </main>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))