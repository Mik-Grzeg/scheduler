import { blueGrey } from '@material-ui/core/colors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addCell from '../checkedStore/checkedActions';

export default class Cell extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            bgColor: ""
        }
        this.handleClick = this.handleClick.bind(this);
    }

   // dipatch = useDispatch()

    handleClick() {
        console.log(`CLICK ${this.state.isToggleOn} - ${this.state.bgColor}`);
        this.props.addNewCell({ "hour": `${this.props.hour}`,
                                "index": `${this.props.index}`
        
        })

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
            console.log(this.props.content)
            return(
                this.props.content ? 
                    <td className="Cell" style={{color: "white", backgroundColor: '#757ce8'}}>
                        {this.props.content}    
                    </td> : 
                    <td className="Cell" onClick={this.handleClick} style={{backgroundColor: this.state.bgColor}}/>
            )
        }
    }
}

