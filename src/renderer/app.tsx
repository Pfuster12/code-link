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
require('dotenv').config()

/**
 * The entry point component of this application's renderer window.
 */
export default function App() {

    // Current Toolbar Item Selected.
    const [toolbarItem, setToolbarItem] = useState<ToolbarItems>(ToolbarItems.FOLDERS)

    function handleToolbarClick(id: ToolbarItems) {
        setToolbarItem(id)
    }

    function getToolbarItem(id: ToolbarItems) {
        switch(id) {
            case ToolbarItems.FOLDERS:
                return <span>Folders</span>
            case ToolbarItems.PLUGINS:
                return <span>Plugins</span>
            case ToolbarItems.SETTINGS:
                return <span>Settings</span>
            default:
                return <span>Folders</span>
        }
    }

    return (
        <>
        <TitleBar/>
        <main className="workspace theme">
            <ToolBar onItemClick={handleToolbarClick}/>
            <SplitPane orientation={SplitPaneOrientation.HORIZONTAL}>
                { getToolbarItem(toolbarItem) }
                <span>Ho</span>
            </SplitPane>
        </main>
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))