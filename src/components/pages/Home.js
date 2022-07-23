import { Typography, Box, makeStyles, Grid, Button } from "@material-ui/core";
import { deepPurple, green, orange } from "@material-ui/core/colors";
import { TextField } from "@mui/material";
import List from "../student/List";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "White",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "White",
  },
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

export default function Home() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [student, setStudent] = useState({
    stuname: "",
    email: "",
    phoneNo: "",
  });
  const [status, setStatus] = useState(false);
  const [ phoneInput, setphoneInput ] = useState("");


  const validation = () => {
    let formIsValid = true;
    const error = {};
    if (student && !student.stuname) {
      formIsValid = false;
      error["stuname"] = "Please enter your name";
    }

    if (student && !student.email) {
      formIsValid = false;
      error["email"] = "Please enter your email";
    } else if (
      student.email &&
      !student.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      formIsValid = false;
      error["email"] = "Please enter valid email";
    }

    if (!phoneInput) {
      formIsValid = false;
      error["phoneNo"] = "Please enter your phone";
    }
    setError(error);
    return formIsValid;
  };


  const onTextFieldChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
    if (e.target.name.trim()) {
      setError({ ...error, [name]: "" });
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      const body = {
        ...student,
        phoneNo:phoneInput
      }
     
      try {
        await axios.post(`http://localhost:3003/students`,body);
        setStatus(true);
        toast.success("Data added Sucessfully");
      } catch (error) {
        toast.error("Something is wrong");
      }
    }
  };
  

  if (status === true) {
    return <Home />;
  }

  return (
    <div>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h2">React CRUD with API call</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Add Student</Typography>
          </Box>

          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="Name"
                  onChange={(e) => onTextFieldChange(e)}
                />
                <span style={{ color: "red", top: "5px", fontSize: "12px" }}>
                  {error["stuname"]}
                </span>
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
                  onChange={(e) => onTextFieldChange(e)}
                />
                <span style={{ color: "red", top: "5px", fontSize: "12px" }}>
                  {error["email"]}
                </span>
              </Grid>
              <Grid item xs={12}>
                    <PhoneInput
                        placeholder="Enter Phone Number"
                        value={phoneInput}
                        name="phoneNo"
                        maxLength="15"
                        onChange={(e) => {
                        setphoneInput(e);
                        }}
                      />
                <span style={{ color: "red", top: "5px", fontSize: "12px" }}>
                  {error["phoneNo"]}
                </span>
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
                Add
              </Button>
            </Box>
          </div>
        </Grid>

        <Grid item md={6} xs={12}>
          <List />
        </Grid>
      </Grid>
    </div>
  );
}
