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

    const [lines, setLines] = useState<Map<number, string>>(new Map())

    const [scrollTop, setScrollTop] = useState(0)
    
    useEffect(() => {
        if (props.files.length == 0) {
            setLines(new Map())
            return
        }

        FilesIO.readFile(props.files[currentFile])
            .then(res => {
                console.debug("[EDITOR] Success reading file:",
                    props.files[currentFile])

                // Map the file lines to the in memory map.
                const map = new Map<number, string>()

                lexer.splitNewLine(res).forEach(it => 
                    map.set(Math.random(), it)
                )

                setLines(map)
            })
            .catch(err => {
                console.error("[EDITOR] Error reading current file:",
                    props.files[currentFile], err);
                
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

    
    function onGutterScroll(event: React.SyntheticEvent) {
        setScrollTop(event.currentTarget.scrollTop)
    }
    
    function onEditorScroll(event: React.SyntheticEvent) {
        setScrollTop(event.currentTarget.scrollTop)
    }
 
    return (
        <div className="editor-workspace">
            <TabLayout files={props.files}
                currentTab={props.files[currentFile]}
                onTabClick={onTabClick}
                onTabClose={props.onTabClose}/>
            <div className="editor">
                <Gutter lines={lines}
                    scrollTop={scrollTop}
                    onScroll={onGutterScroll}/>
                <TextEditor lines={lines}
                    scrollTop={scrollTop}
                    onScroll={onEditorScroll}/>
            </div>
        </div>
    )
}

