import * as React from 'react'
import * as logo from '../assets/icons/codelink_logo.svg'
import { remote } from 'electron';
const { BrowserWindow } = remote

/**
 * Displays a system draggable title bar with window system controls.
 */
export default function TitleBar() {

    function onCloseClick() {
        const win = BrowserWindow.getFocusedWindow()
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
        <nav className="title-bar title-bar-theme">
            <img className="title-bar-logo" src={logo}/>
            <span className="title-bar-title title-bar-title-theme">code~link</span>
            <div className="title-bar-window-controls">
                <div onClick={onMaximiseClick} className="title-bar-icon title-bar-maximize-icon"/>
                <div onClick={onMinimiseClick} className="title-bar-icon title-bar-minimize-icon"/>
                <div onClick={onCloseClick} className="title-bar-icon title-bar-close-icon"/>
            </div>
        </nav>
    )
}