import React, { Component } from 'react'
import '../css/modal.css'

export default class errMsg extends Component {
    render() {
        console.log("cbsdga",this.props)
        return (
            <div className="modalWrapper" style={{
                transform: this.props.show ? 'translateY(0vh)' :' translateY(-50vh)',
                opacity: this.props.show ? '1' : '0'
            }}>
                <div className="modalBody">
                    <h3>{this.props.error}</h3>
                </div>
            </div>
        )
    }
}
