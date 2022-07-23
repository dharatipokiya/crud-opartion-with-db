import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  IconButton,
  Tooltip,
  TableRow,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
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

export default function List() {
  const classes = useStyles();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getAllStudent() {
      try {
        const students = await axios.get("http://localhost:3003/students");
        console.log("first", students);
        setStudents(students.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }

    getAllStudent();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3003/students/${id}`);
    var newstudata = students.filter((item) => {
      console.log("shhdc", item);
      return item.id !== id;
    });
    setStudents(newstudata);
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
            {students.map((student, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{student.stuname}</TableCell>
                  <TableCell align="center">{student.phoneNo}</TableCell>

                  <TableCell align="center">{student.email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton>
                        <Link to={`/view/${student.id}`}>
                          <VisibilityIcon color="primary" />
                        </Link>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                      <IconButton>
                        <Link to={`/edit/${student.id}`}>
                          <EditIcon />
                        </Link>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(student.id)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
