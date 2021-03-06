import * as React from 'react'
import { useState, useEffect, useMemo, useRef } from 'react'
import Line from './Line'
import FilesIO from '../../io/FilesIO'
import * as Lexer from '../../lexer/Lexer'
import PluginReader from '../../lexer/PluginReader'
import Gutter from './gutter/Gutter'
import { SelectionManager, Selection } from './SelectionManager'
import KeyHandler from './KeyHandler'
import { Editor } from './EditorPane'
import VirtualizedList from './VirtualizedList'

interface EditorProps {
    // File path name the editor opens.
    file: string,
    onStatusChange: (status: Editor.Status) => void
}

function createEmptyEditorState(): Editor.State {
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
}

/**
 * The code editor component handling syntax highlighting and text editing.
 * The editor is responsible for its file, handling io operations and 
 * language plugin selection.
 * The editor works by mapping an array of strings aka 'lines', vertically 
 * to visualize the text content of the given file.
 * @param props
 */
export default function TextEditor(props: EditorProps) {

    /**
     * Store the current {@link Lexer.Plugin} for this editor 
     * to provide down the component tree.
     */
    const [plugin, setPlugin] = useState<Lexer.Lexer.Plugin | null>(null)

    // Stores the EditorState.
    const [editorState, setEditorState] = useState<Editor.State>(createEmptyEditorState())

    // Selecting state flag.
    const [isSelecting, setIsSelecting] = useState(false)

    // Count of items rendered in virtual list.
    const [firstVisibleIndex, setFirstVisibleIndex] = useState(0)
    
    /**
     * Stores the editor scrollTop to synchronise other UI components.
     */
    const [editorScrollTop, setEditorScrollTop] = useState(0)

    /**
     * Stores the gutter scrollTop to synchronise other UI components.
     */
    const [gutterScrollTop, setGutterScrollTop] = useState(0)

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

    useEffect(() => {
        props.onStatusChange({
            selection: editorState.selection,
            file: props.file
        })
    },
    [editorState, props.file])

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
                    return createEmptyEditorState()
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
        const textEditor = document.getElementById('virtualized-list') as HTMLDivElement

        var line: HTMLDivElement;
        if (textEditor) {
            const firstPosition = firstVisibleIndex
            // get the virtual list container's child node,
            line = textEditor.childNodes[0].childNodes[editorState.selection.start.line
                - firstPosition] as HTMLDivElement
        }

        if (line) {
            const range = selManager.getRangeByCharOffset(line, 
                editorState.selection.start.offset,
                editorState.selection.start.offset)
            
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
     * Handle the editor mouse down event.
     * @param event 
     */
    function onEditorMouseDown(event: React.SyntheticEvent) {
        setIsSelecting(true)
    }

    function onEditorClick(event: React.SyntheticEvent) {
        const sel = document.getSelection()

        // assign the selection,
        if (document.getSelection && sel.rangeCount > 0) {
            const range = document.getSelection().getRangeAt(0)
            const editor = document.getElementById('virtualized-list') as HTMLDivElement

            setEditorState(prevState => {
                return {
                    lines: prevState.lines,
                    selection: selManager.getSelection(range, editor)
                }
            })
        }
    }

    /**
     * Handle the editor mouse move event.
     * @param event 
     */
    function onEditorMouseMove(event: React.SyntheticEvent) {
        if (isSelecting) {
            const sel = document.getSelection()

            // assign the selection,
            if (document.getSelection && sel.rangeCount > 0) {
                const range = document.getSelection().getRangeAt(0)
                const editor = document.getElementById('virtualized-list') as HTMLDivElement
    
                setEditorState(prevState => {
                    return {
                        lines: prevState.lines,
                        selection: selManager.getSelection(range, editor)
                    }
                })
            }
        }
    }

    /**
     * Handle the editor mouse up event.
     * @param event 
     */
    function onEditorMouseUp(event: React.SyntheticEvent) {
        setIsSelecting(false)
        const sel = document.getSelection()

        // assign the selection,
        if (document.getSelection && sel.rangeCount > 0) {
            const range = document.getSelection().getRangeAt(0)
            const clone = range.cloneRange()
            textarea.current.focus()
        }
    }

    /**
     * Handle the editor scroll.
     * @param event 
     */
    function onEditorScroll(event: React.SyntheticEvent) {        
        setEditorScrollTop(event.currentTarget.scrollTop)
    }

    function onGutterScroll(event: React.SyntheticEvent) {
        setGutterScrollTop(event.currentTarget.scrollTop)
    }

    /**
     * Virtual list visible items measured callback.
     * @param event 
     */
    function onFirstVisibleIndexCalculated(firstVisibleIndex: number) {
        setFirstVisibleIndex(firstVisibleIndex)
    }

    return (
        <div className="editor editor-theme">
            <Gutter lines={editorState.lines}
                scrollTop={editorScrollTop}
                onScrollCallback={onGutterScroll}/>
            <div className="text-editor text-editor-theme"
                onMouseDown={onEditorMouseDown}
                onClick={onEditorClick}
                onMouseMove={onEditorMouseMove}
                onMouseUp={onEditorMouseUp}>
                <VirtualizedList
                    id="virtualized-list"
                    width={-1}
                    innerWidth="1600px"
                    height={-1}
                    rowHeight={19}
                    count={editorState.lines.length}
                    overflowCount={8}
                    onFirstVisibleIndexCalculated={onFirstVisibleIndexCalculated}
                    onScrollCallback={onEditorScroll}
                    scrollTop={gutterScrollTop}
                    renderItem={(index, style) =>
                        {
                            return editorState.lines[index] && <Line key={editorState.lines[index][0]}
                                style={style}
                                lexer={lexer}
                                value={editorState.lines[index][1]} 
                                plugin={plugin}/>
                        }}>
                        <div id="text-editor-overlays">
                            <div className="caret caret-theme"/>
                        </div>
                    </VirtualizedList>
            </div>
            <textarea className="text-edit"
                ref={textarea}
                onKeyDown={onKeyDown}/>
        </div>
    )
}