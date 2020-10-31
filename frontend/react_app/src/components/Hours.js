import * as React from 'react';
import Cell from './Cell';



export default function HoursColumn(){
    const hours = ['8:00', '9:00', '10:00', '11:00',
       '12:00', '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00', '20:00']

    const hours_column = hours.map((_hour, hourIndex) => {
        return (
            <tr>
                <Cell keys={`hours_${hourIndex}`}
                    content={_hour}
                    hours={true}
                />
            </tr>
        )
    })

    return (
        <div className="col-3 col-sm-2 HoursColumn pl-0 pr-0 pt-3">
            <table className="table table-bordered">
                <thead>
                    <Cell keys={`hours_header`}
                        content={'Hours'}
                        hours={true}
                    />
                </thead>
                <tbody>{hours_column}</tbody>
            </table>
        </div>
    )
}
