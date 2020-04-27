import * as React from 'react';
import Gutter from './gutter/Gutter';
import TabLayout from './tabs/TabLayout';
import TextEditor from './texteditor/TextEditor';

interface EditorWorkspaceProps {
    files: string[]
}

/**
 * Represents a File item.
 */
export default function EditorWorkspace(props: EditorWorkspaceProps) {

    const testLines = ['Test line 1', 'Test line 2']
 
    return (
        <div className="editor-workspace">
            <TabLayout files={props.files}/>
            <div className="editor">
                <Gutter lines={testLines}/>
                <TextEditor/>
            </div>
        </div>
    )
}

