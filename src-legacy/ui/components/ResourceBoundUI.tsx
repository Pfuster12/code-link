import * as React from 'react'

interface ResourceBoundUIProps {
    resource: any
    children: React.ReactNode[]
}

/**
 * A component fragment bound to the availability of a nullable or empty resource.
 * If resource is null displays the first child, else displays the second.
 */
export function ResourceBoundUI(props: ResourceBoundUIProps) {
    return (
        <>
          {
              props.resource ? props.children[1] : props.children[0]
          }  
        </>
    )
}