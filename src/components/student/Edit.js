import {
  Typography,
  Box,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import { deepPurple, green, orange } from "@material-ui/core/colors";
import { TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "White",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "White",
  },
});

export default function Edit() {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    stuname: "",
    email: "",
    phone:"",
  });

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

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3003/students/${id}`, student);
      navigate("/");
    } catch (error) {
      console.log("Something is wrong");
    }
  };

  const handleclick = () => {
    navigate("/");
  };

  return (
    <div>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h2">React CRUD with API call</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Edit Student</Typography>
          </Box>

          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  fullWidth
                  id="id"
                  //   label="id"
                  autoFocus
                  value={student.id}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="Name"
                  value={student.stuname}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="phone"
                  name="phone"
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone No Address"
                  onChange={(e) => handleChange(e)}
                  value={student.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e) => handleChange(e)}
                  value={student.email}
                />
              </Grid>
            </Grid>

            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onFormSubmit(e)}
              >
                Update
              </Button>
            </Box>
          </form>

          <Box m={3} textAlign="center">
            <Button variant="contained" color="primary" onClick={handleclick}>
              Back to Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
