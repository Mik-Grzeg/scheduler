import { blueGrey } from '@material-ui/core/colors';
import React, { Component } from 'react';


export default class Cell extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            bgColor: ""
        }
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(`CLICK ${this.state.isToggleOn} - ${this.state.bgColor}`);
        
        this.setState(state => ({
            isToggleOn: !state.isToggleOn,
            bgColor: !state.isToggleOn ? "grey": ""
        }));
    }

    render() {
        if (this.props.header) {
            return (
                <th className="Cell-header">
                    {this.props.content}
                </th>
            )
        }
        else if (this.props.hours) {
            return (
                <th className="Cell-hours">
                    {this.props.content}
                </th>
            )
        }
        else {
            return (
                <td className="Cell" onClick={this.handleClick} style={{backgroundColor: this.state.bgColor}}>
                    {this.props.content}
                </td>
            )
        }
    }
}