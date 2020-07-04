import * as React from 'react';
import Gutter from './gutter/Gutter';
import TabLayout from './tabs/TabLayout';
import TextEditor from './texteditor/TextEditor';
import './styles.css'
import { useState, useEffect } from 'react';
import FilesIO from '../../../io/FilesIO';
import { Lexer } from '../../../lexer/Lexer';

interface EditorWorkspaceProps {
    files: string[],
    onTabClose: (file: string) => void
}

/**
 * The Editor Workspace displays the Gutter, Text Editor and File Tab Layout.
 */
export default function EditorWorkspace(props: EditorWorkspaceProps) {

    const lexer = React.useMemo(() => new Lexer(), [])

    const [currentFile, setCurrentFile] = useState<number>(0)

    const [lines, setLines] = useState<string[]>([])
    
    useEffect(() => {
        if (props.files.length == 0) {
            setLines([])
            return
        }

        FilesIO.readFile(props.files[currentFile])
            .then(res => {
                console.log("[EDITOR] Success reading file:",
                    props.files[currentFile])
                setLines(lexer.splitNewLine(res))
            })
            .catch(err => {
                console.log("[EDITOR] Error reading current file:",
                    props.files[currentFile]);
                
            })
    },
    [props.files, currentFile])

    function onTabClick(file: string) {
        const index = props.files.indexOf(file)
        
        if (index == -1) {
            setCurrentFile(0)
            return
        }

        setCurrentFile(index)
    }
 
    return (
        <div className="editor-workspace">
            <TabLayout files={props.files}
                currentTab={props.files[currentFile]}
                onTabClick={onTabClick}
                onTabClose={props.onTabClose}/>
            <div className="editor">
                <Gutter lines={lines}/>
                <TextEditor lines={lines}/>
            </div>
        </div>
    )
}

