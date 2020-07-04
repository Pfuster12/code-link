import * as React from 'react';
import * as ReactDOM from 'react-dom';
// Load the Code Link private styles file. These are not user-facing customisable styles,
// but essential, under-the-hood styles for the app to work properly.
import './styles.css'
import TitleBar from './components/titlebar/TitleBar';
import SplitPane, { SplitPaneOrientation } from './components/paneling/SplitPane';
import ToolBar from './components/toolbar/ToolBar';
import { ToolbarItems } from './components/toolbar/ToolBarItem';
import { useState } from 'react';
import Folders from './components/toolbar/folders/Folders';
import Settings from './components/toolbar/settings/Settings';
import Plugins from './components/toolbar/plugins/Plugins';
import EditorWorkspace from './components/editor/EditorWorkspace';
require('dotenv').config()

/**
 * The entry point component of this application's renderer window.
 */
export default function App() {

    // The open folder.
    const [workingDir, setWorkingDir] = useState<string>(process.env.TEST_FOLDER_PATH)

    // Open files.
    const [files, setFiles] = useState<string[]>([])

    // Current Toolbar Item Selected.
    const [toolbarItem, setToolbarItem] = useState<ToolbarItems>(ToolbarItems.FOLDERS)

    function handleToolbarClick(id: ToolbarItems) {
        setToolbarItem(id)
    }

    /**
     * Get a ToolbarItem Component from a given id.
     * @param {ToolbarItems} id
     * @returns {JSX.Element} component.
     */
    function getToolbarItem(id: ToolbarItems): JSX.Element {
        switch(id) {
            case ToolbarItems.FOLDERS:
                return <Folders path={workingDir}
                    onFileOpen={onFileOpen}/>
            case ToolbarItems.PLUGINS:
                return <Plugins/>
            case ToolbarItems.SETTINGS:
                return <Settings/>
        }
    }

    /**
     * Handle a file click callback.
     * @param {string} path
     */
    function onFileOpen(path: string) {
        setFiles(files => [...files, path])
    }

    /**
     * Handle Tab close click callback.
     * @param {string} file
     */
    function onTabClose(file: string) {
        setFiles(files => files.filter(it => file != it))
    }

    return (
        <>
        <TitleBar/>
        <main className="workspace theme">
            <ToolBar 
                currentItem={toolbarItem} 
                onItemClick={handleToolbarClick}/>
            <SplitPane 
                orientation={SplitPaneOrientation.HORIZONTAL}>
                { 
                    getToolbarItem(toolbarItem) 
                }
                <EditorWorkspace files={files}
                    onTabClose={onTabClose}/>
            </SplitPane>
        </main>
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))