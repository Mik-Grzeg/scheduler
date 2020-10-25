import React, { Component } from 'react';

export default class Cell extends Component{
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
                <td className="Cell">
                    {this.props.content}
                </td>
            )
        }
    }
}