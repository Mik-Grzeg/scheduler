import * as React from 'react';
import Cell from './Cell';
import HoursColumn from './Hours';
import './DataTable.css';
import { hours } from '../settings'

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
        return (
        <Cell
            key={`heading-${headings[cellIndex].id}`}
            content={headings[cellIndex].name}
            header={true}
        />
        )
    };


    // headings[cellIndex] gives a name of an instructor
  renderRow = (_row, rowIndex) => {
    const {rows} = this.props;
    return (
      <tr key={`row-${rowIndex}`}>
        {rows[rowIndex].map((_cell, cellIndex) => {
            return (
              _cell ?
              <Cell
              key={`${rowIndex}-${cellIndex}`}
              content={rows[rowIndex][cellIndex].client.first_name}
            /> : 
              <Cell
              key={`${rowIndex}-${cellIndex}`}
              hour={_row}
              index={cellIndex}
              content={rows[rowIndex][cellIndex]}
              addNewCell = {this.props.addNewCell}
            /> 
            )
        })}
      </tr>
    )
  };


  render() {
    console.log(this.props)
    const {headings, rows} = this.props;

    this.renderHeadingRow = this.renderHeadingRow.bind(this);
    this.renderRow = this.renderRow.bind(this);

    const theadMarkup = (
      <tr key="heading">
        {headings.map(this.renderHeadingRow)}
      </tr>
    );

    const tbodyMarkup = hours.map(this.renderRow);


    return (
        <div className="DataTable container-fluid">
          <div className="row justify-content-start">
                <HoursColumn key="Hours_column" />
                <div className="col-9 col-sm-10 columns pl-0 pr-0 pt-3">
                  <table className="table table-bordered table-striped" ref={this.tableRef} >
                      <thead>{theadMarkup}</thead>
                      <tbody>{tbodyMarkup}</tbody>
                  </table>
                </div>
          </div>
        </div>
    );
  }
}
