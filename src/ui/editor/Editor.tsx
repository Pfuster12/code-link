import * as React from 'react'
import { useState, useEffect, useMemo, useRef } from 'react'
import Line from './Line'
import FilesIO from '../../io/FilesIO'
import * as Lexer from '../../lexer/Lexer'
import PluginReader from '../../lexer/PluginReader'
import Gutter from './gutter/Gutter'
import { SelectionManager, SelectionOffset, Selection } from './SelectionManager'
import KeyHandler from './KeyHandler'

interface EditorProps {
    //File path name the editor opens.
    file: string
}

export interface EditorState {
    lines: string[][],
    selection: Selection
}

/**
 * The code editor component handling syntax highlighting and text editing.
 * The editor is responsible for its file, handling io operations and 
 * language plugin selection.
 * The editor works by mapping an array of strings aka 'lines', vertically 
 * to visualize the text content of the given file.
 * @param props
 */
export default function Editor(props: EditorProps) {

    /**
     * Store the current {@link Lexer.Plugin} for this editor 
     * to provide down the component tree.
     */
    const [plugin, setPlugin] = useState<Lexer.Lexer.Plugin | null>(null)

    /**
     * Stores the {@link EditorState}.
     */
    const [editorState, setEditorState] = useState<EditorState>({
        lines: [],
        selection: {
            start: {
                line:0,
                offset:0
            },
            end: {
                line:0,
                offset:0
            }
        }
    })

    /**
     * Memoize the {@link Lexer} class use to parse the editor text.
     * Depends on the plugin to change.
     */
    const lexer = useMemo(() => new Lexer.Lexer(plugin ? plugin.id : ''), [plugin])

    /**
     * Memoize the {@link SelectionManager}.
     */
    const selManager = useMemo(() => new SelectionManager(), /* no deps */ [])

    /**
     * Reference for the text area consuming the keyboard input.
     * @see 
     */
    const textarea = useRef<HTMLTextAreaElement>(null)

    /**
     * Read editor file effect.
     */
    useEffect(() => {
        // read the given file using FileReader,
        FilesIO()
            .readFile(props.file)
            .then(res => {
                // split lines,
                const splitLines = lexer.splitNewLine(res)

                // map to unique keys,
                const map = splitLines.map(line=>[Math.random().toString(), line])

                // set state,
                setEditorState({
                    lines: map,
                    selection: {
                        start: {
                            line:0,
                            offset:0
                        },
                        end: {
                            line:0,
                            offset:0
                        }
                    }
                })
            })
            .catch(err => {
                setEditorState(prevState => {
                    return {
                        lines: [['0', '']],
                        selection: {
                            start: {
                                line:0,
                                offset:0
                            },
                            end: {
                                line:0,
                                offset:0
                            }
                        }
                    }
                })
                console.log(`Error reading file ${props.file} in editor`);
            })
    },
    // dep on the file path,
    [props.file])

    /**
     * Load the default language plugin into this editor.
     */
    useEffect(() => {
        // read the plugin,
        PluginReader()
            .readPlugin('./src/lexer/plugins/javascript-plugin.json')
            .then(res => {
                console.log('Plugin read ', res);
                
                // update the state,
                setPlugin(res)
            })
            .catch(err => {
                console.log(`Error reading plugin in editor`, err);
            })
    },
    // dep on the plugin,
    [])

    /**
     * Caret position effect depending on selection.
     */
    useEffect(() => {
        const caret = document.querySelector('.caret') as HTMLDivElement
        const textEditor = document.querySelector('.text-editor') as HTMLDivElement

        const line = textEditor.childNodes[0].childNodes[editorState.selection.start.line]
        
        if (line) {
            const range = selManager.getRangeByCharOffset(line, 
                editorState.selection.start.offset,
                editorState.selection.start.offset)

            // set the top+left pos including scrollY,
            caret.style.top = editorState.selection.start.line*19 + 'px'
            caret.style.left = (range.getBoundingClientRect().left
                - textEditor.getBoundingClientRect().left) + 'px'
        }
    },
    [editorState.selection])

    /**
     * Handles the text area on change event.
     * @param event 
     */
    function onKeyDown(event: React.KeyboardEvent) {
        document.getSelection().removeAllRanges()

        KeyHandler(event, setEditorState)

        textarea.current.value = ""
    }

    /**
     * Handle the editor click event.
     * @param event
     */
    function onEditorClick(event: React.SyntheticEvent) {
        const sel = document.getSelection()
        const range = sel.getRangeAt(0)

        const clone = range.cloneRange()
        
        textarea.current.focus()

        sel.removeAllRanges()
        sel.addRange(clone)
    }

    /**
     * Handle the editor mouse down event.
     * @param event 
     */
    function onEditorMouseDown(event: React.SyntheticEvent) {
        document.getSelection().removeAllRanges()
    }

    /**
     * Handle the editor mouse up event.
     * @param event 
     */
    function onEditorMouseUp(event: React.SyntheticEvent) {
        // assign the selection,
        if (document.getSelection) {
            const range = document.getSelection().getRangeAt(0)
            const editor = document.querySelector('.text-editor') as HTMLDivElement

            setEditorState(prevState => {
                return {
                    lines: prevState.lines,
                    selection: selManager.getSelection(range, editor)
                }
            })
        }
    }

    /**
     * Stores the editor scrollTop to synchronise other UI components.
     */
    const [editorScrollTop, setEditorScrollTop] = useState(0)

    /**
     * Handle the editor scroll.
     * @param event 
     */
    function onTextEditorScroll(event: React.SyntheticEvent) {        
        setEditorScrollTop(event.currentTarget.scrollTop)
    }

    return (
        <div className="editor editor-theme">
            <Gutter lines={editorState.lines}
                scrollTop={editorScrollTop}/>
            <div className="text-editor text-editor-theme"
                onScroll={onTextEditorScroll}
                onMouseDown={onEditorMouseDown}
                onMouseUp={onEditorMouseUp}
                onClick={onEditorClick}>
                <div className="text-editor-lines">
                    {
                        editorState.lines.map(line => <Line key={line[0]}
                            lexer={lexer}
                            value={line[1]} 
                            plugin={plugin}/>)
                    }
                </div>
                <div className="text-editor-overlays">
                    <div className="caret caret-theme"/>
                </div>
            </div>
            <textarea className="text-edit"
                ref={textarea}
                onKeyDown={onKeyDown}/>
        </div>
    )
}