export default function addCell(cell) {
    return ({
        type: 'HANDLE_ADD_CELL',
        payload: cell
    })
}