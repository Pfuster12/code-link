import * as React from 'react';

interface TabProps {
    file: string
}

/**
 * Represents a File item.
 */
export default function Tab(props: TabProps) {

    function onCloseClick() {

    }

    return (
        <div className="tab theme">
             <svg className="file-icon theme" viewBox="0 0 24 24">
                <path
                d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
            </svg>
            <span className="tab-text text theme">{props.file}</span>
            <div className="tab-close-box"
                onClick={onCloseClick}>
                    <svg className="tab-close"
                        viewBox="0 0 24 24">
                        <path
                            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </div>
        </div>
    )
}

