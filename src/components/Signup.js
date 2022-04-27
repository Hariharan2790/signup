import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { FormHelperText } from "@material-ui/core";
import * as Yup from "yup";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function Signup() {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [getState, setGetState] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  const country = [...new Set(data.map((item) => item.country))];
  country.sort();

  const handleCountryChange = (e) => {
    let states = data.filter((state) => state.country === e.target.value);
    // console.log(states);
    setSelectedCountry(e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    // console.log(states);
    setGetState(states);
  };

  const handleStateChange = (e) => {
    let cities = data.filter((city) => city.subcountry === e.target.value);
    console.log(cities);
    setCities(cities);
    cities.sort();
  };

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "green" };
  const initialValues = {
    name: "",
    email: "",
    gender: "",
    phonenumber: "",
    country: "",
    state: "",
    city: "",
    password: "",
    confirmpassword: "",
    termsandConditions: false,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "its too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Required")
      .required("Required"),
    phonenumber: Yup.number()
      .typeError("Please enter the valid phone number")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
    termsandConditions: Yup.string().oneOf(
      ["true"],
      "Accept terms & conditions"
    ),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption">
            Please fill this form to create an account!
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                name="name"
                label="Name"
                placeholder="Enter your name"
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                placeholder="Enter your email"
                helperText={<ErrorMessage name="email" />}
              />
              <FormControl style={{ marginTop: 10 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <Field
                  as={RadioGroup}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="gender"
                  style={{ display: "initial" }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </Field>
              </FormControl>
              <FormHelperText>
                <ErrorMessage name="gender" />
              </FormHelperText>
              <Field
                as={TextField}
                fullWidth
                name="phonenumber"
                label="Phone Number"
                placeholder="Enter your phone number"
                helperText={<ErrorMessage name="phonenumber" />}
              />
              <FormControl variant="standard" sx={{ minWidth: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Country
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  onChange={handleCountryChange}
                  autoWidth
                  label="Country"
                  name="country"
                  value={selectedCountry}
                >
                  <MenuItem value="">Select Country</MenuItem>
                  {country.map((items) => (
                    <MenuItem key={items} value={items} name="country">
                      {items}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormHelperText>
                <ErrorMessage name="country" />
              </FormHelperText>
              <FormControl variant="standard" sx={{ minWidth: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  onChange={handleStateChange}
                  autoWidth
                  label="State"
                  name="state"
                  value={selectedState}
                >
                  <MenuItem value="">Select State</MenuItem>
                  {getState.map((items) => (
                    <MenuItem key={items} value={items}>
                      {items}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormHelperText>
                <ErrorMessage name="state" />
              </FormHelperText>
              <FormControl variant="standard" sx={{ minWidth: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  label="City"
                  name="city"
                >
                  <MenuItem value="">Select City</MenuItem>
                  {cities.map((items) => (
                    <MenuItem key={items.name} value={items.name}>
                      {items.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormHelperText>
                <ErrorMessage name="city" />
              </FormHelperText>

              <Field
                as={TextField}
                fullWidth
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                helperText={<ErrorMessage name="confirmpassword" />}
              />
              <FormControlLabel
                control={<Field as={Checkbox} name="termsandConditions" />}
                label="I accept the terms and conditions."
              />
              <FormHelperText>
                <ErrorMessage name="termsandConditions" />
              </FormHelperText>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? "Loading" : "Sign up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default Signup;
