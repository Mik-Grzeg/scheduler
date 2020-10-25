import * as React from 'react';
import Cell from './Cell';
import './DataTable.css';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cellHeights: [],
        };

        this.tableRef = React.createRef();
    }

    renderHeadingRow = (_cell, cellIndex) => {
        const {headings} = this.props;
        console.log(this.props)
        return (
        <Cell
            key={`heading-${headings[cellIndex].id}`}
            content={headings[cellIndex].name}
            header={true}
        />
        )
    };



  renderRow = (_row, rowIndex) => {
    const {rows} = this.props;
    return (
      <tr key={`row-${rowIndex}`}>
                <Cell
                keys={`row-${_row}`}
                content={_row}
                hours={true}
                  />
        {rows[rowIndex].map((_cell, cellIndex) => {
            return (
                <Cell
                    keys={`${rowIndex}-${cellIndex}`}
                    content={rows[rowIndex][cellIndex].client}
                />
            )
        })}
      </tr>
    )
  };


  render() {
    const {headings, rows} = this.props;
    
    const hours = ['8:00', '9:00', '10:00', '11:00',
       '12:00', '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00', '20:00']
        
    this.renderHeadingRow = this.renderHeadingRow.bind(this);
    this.renderRow = this.renderRow.bind(this);

    const theadMarkup = (
      <tr key="heading">
        <Cell   
            key={'Hours'}
            content={'Hours'}
            hours={true}
        />
        {headings.map(this.renderHeadingRow)}
      </tr>
    );

    const tbodyMarkup = hours.map(this.renderRow);


    return (
        <div className="DataTable">
            <div className="table table-striped">
                <table className="table table-bordered" ref={this.tableRef} >
                    <thead>{theadMarkup}</thead>
                    <tbody>{tbodyMarkup}</tbody>
                </table>
            </div>
        </div>
    );
  }
}