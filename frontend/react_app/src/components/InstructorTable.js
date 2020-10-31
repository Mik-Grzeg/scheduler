import React, { Component } from 'react';
import Cell from './Cell';
import HoursColumn from './Hours';
import { hours } from '../settings';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
    }

    render() {
        const {instructor, appointments} = this.props;

        const theadMarkup = (
            <tr key="heading">
                <Cell 
                    key={`heading-name`}
                    content={instructor.name}
                    header={true}
                />
            </tr>
        )
        const tbodyMarkup = appointments.map((_cell, cellIndex) => {
            console.log(_cell);
            return (            
                <tr key={`row-${cellIndex}`}>
                    <Cell
                        keys={`cell-${cellIndex}`}
                        content={_cell.client}
                    />
                </tr>
            )
            
        })

        return (
            <div className="DataTable container-fluid">
                <div className="row justify-content-start">
                    <HoursColumn/>
                    <div className="col-9 col-sm-10 columns pl-0 pr-0 pt-3">
                        <table className="table table-bordered table-striped" ref={this.tableRef}>
                        <thead>{theadMarkup}</thead>
                        <tbody>{tbodyMarkup}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}