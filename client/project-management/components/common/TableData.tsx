import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Edit2Icon, Trash2Icon } from 'lucide-react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const tableData = [
    {
        tilte:"Project post",
        category:"Design",
        client:"Sam karan",
        cost:"2400",
        date:"20-4-27",
        status:"Active",
        interactions:"5 ♥"
    },
    {
        tilte:"Project post",
        category:"Design",
        client:"Sam karan",
        cost:"2400",
        date:"20-4-27",
        status:"Active",
        interactions:"5 ♥"
    },{
        tilte:"Project post",
        category:"Design",
        client:"Sam karan",
        cost:"2400",
        date:"20-4-27",
        status:"Active",
        interactions:"5 ♥"
    },{
        tilte:"Project post",
        category:"Design",
        client:"Sam karan",
        cost:"2400",
        date:"20-4-27",
        status:"Active",
        interactions:"5 ♥"
    },{
        tilte:"Project post",
        category:"Design",
        client:"Sam karan",
        cost:"2400",
        date:"20-4-27",
        status:"Active",
        interactions:"5 ♥"
    },{
        tilte:"Project post",
        category:"Design",
        client:"Sam karan",
        cost:"2400",
        date:"20-4-27",
        status:"Active",
        interactions:"5 ♥"
    }
]

export default function TableData() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title Of Post</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Client</StyledTableCell>
            <StyledTableCell align="right">Cost</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Interactions</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row,idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell component="th" scope="row">
                {row.tilte}
              </StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right">{row.client}</StyledTableCell>
              <StyledTableCell align="right">{row.cost}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.interactions} Likes</StyledTableCell>
              <StyledTableCell align="right" sx={{display:"flex"}}>
                <Edit2Icon size={15} className="text-blue-500 cursor-pointer"  /> <Trash2Icon size={15} className="text-rose-700 mr-1 cursor-pointer" />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
