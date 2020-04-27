import * as React from 'react';
import Gutter from './gutter/Gutter';
import TabLayout from './TabLayout';
import TextEditor from './texteditor/TextEditor';

interface EditorWorkspaceProps {
}

/**
 * Represents a File item.
 */
export default function EditorWorkspace(props: EditorWorkspaceProps) {

    const testLines = ['Test line 1', 'Test line 2']
 
    return (
        <div className="editor-workspace">
            <TabLayout/>
            <div className="editor">
                <Gutter lines={testLines}/>
                <TextEditor/>
            </div>
        </div>
    )
}

