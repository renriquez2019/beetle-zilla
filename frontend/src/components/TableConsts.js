import { 
    TableHead,
    TableCell,
    TablePagination
} from "@mui/material";

import {styled} from '@mui/system';


export const HeaderTableRow = styled(TableHead)({
    backgroundColor: '#012970',
    color: '#ffff',
    borderWidth: '2px',
    borderColor: 'black'
});

export const HeaderTableCell = styled(TableCell)({
    color: '#ffff',
    height: '50px',
    fontWeight: 'bolder',
    fontSize: '18px',
    fontFamily: 'Nunito',
});

export const StyledTableCell = styled(TableCell)({
    color: '#012970',
    fontWeight: 'bold',
    fontSize: '14px',
    fontFamily: 'Nunito',
    borderWidth: '2px',
    borderColor: 'black'
});


export const StyledTablePag = styled(TablePagination)({
    backgroundColor: '#ffff',
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    borderWidth: '2px',
    borderColor: 'black'
});


export default {
    HeaderTableRow, 
    HeaderTableCell, 
    StyledTableCell, 
    StyledTablePag,
}