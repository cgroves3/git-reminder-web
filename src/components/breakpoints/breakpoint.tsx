import React, { Component } from 'react'
import MediaQuery from 'react-responsive'

const breakpoints: { [index: string] : string } = {
    desktop: '(min-width: 1025px)',
    phone: '(max-width: 1024px)',
}

type BreakpointProps = {
    name: string
}

export class Breakpoint extends Component {
    breakpoint: string

    constructor(props: BreakpointProps) {
        super(props)
        this.breakpoint = breakpoints[props.name] || breakpoints.desktop
    }

    render() {
        return (
            <MediaQuery query={this.breakpoint}>
                {this.props.children}
            </MediaQuery>
        )
    }
}

export class DesktopBreakpoint extends Breakpoint {
    breakpoint: string = breakpoints.desktop

    render(): JSX.Element {
        return super.render();
    }
}

export class PhoneBreakpoint extends Breakpoint {
    breakpoint: string = breakpoints.phone

    render(): JSX.Element {
        return super.render();
    }
}