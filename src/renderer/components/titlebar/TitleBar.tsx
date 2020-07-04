import * as React from 'react';
import { remote } from 'electron';
import './styles.css'
const { BrowserWindow } = remote

/**
 * Title Bar holds window controls and App name.
 */
export default function TitleBar() {

    function onCloseClick() {
        const win = BrowserWindow.getFocusedWindow()
        console.log(win);
        
        win.close()
    }

    function onMaximiseClick() {
        const win = BrowserWindow.getFocusedWindow()
        win.maximize()
    }

    function onMinimiseClick() {
        const win = BrowserWindow.getFocusedWindow()
        win.minimize()
    }

    return (
        <header className="title-bar theme">
            <div className="title-bar-text">                
                <span className="workspace text theme">
                    CodeLink
                </span>
            </div>
            <div className="window-controls">
                <div className="window-control-box window-close-box"
                onClick={onCloseClick}>
                <svg className="window-close"
                    viewBox="0 0 24 24">
                    <path
                        d="M19,6.41L17.59,5L12,10.59L6.41,
                        5L5,6.41L10.59,12L5,17.59L6.41,
                        19L12,13.41L17.59,19L19,17.59L13.41,
                        12L19,6.41Z" />
                </svg>
                </div>
            </div>
        </header>
    )
}

