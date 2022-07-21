import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  IconButton,
  Tooltip,
  TestField,
  Button,
  TableRow,
} from "@material-ui/core";
import { deepPurple, green, orange } from "@material-ui/core/colors";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "White",
  },

  tableHeadCell: {
    color: "White",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default function View() {
  const classes = useStyles();
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3003/students/${id}`);
        // console.log("firstggg",student);
        setStudent(student.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }

    getStudent();
  }, [id]);

  const handleclick = () => {
    navigate("/home");
  };

  return (
    <div>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">Student List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                No
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Phone No.
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="center">{student.stuname}</TableCell>
              <TableCell align="center">{student.phone}</TableCell>

              <TableCell align="center">{student.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleclick}>
          Back to Home
        </Button>
      </Box>
    </div>
  );
}
