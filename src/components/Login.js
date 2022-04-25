import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function Login() {
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: "green" }
    const buttonStyle = { margin: "8px 0" }
    const initialValues = {
        username: '',
        password: '',
        rememberMe: false
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().email('Please enter valid email').required("Required"),
        password: Yup.string().required("Required")
    })
    const onSubmit = (values, props) => {
        console.log(values)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)

    }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>

                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit}
                    validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            {/* {console.log(props)} */}
                            <Field as={TextField} id="outlined-basic" name="username"
                                label="Username" placeholder="Enter Username" variant="standard" fullWidth required
                                helperText={<ErrorMessage name="username" />} />
                            <Field as={TextField} id="outlined-basic" name="password" label="Password"
                                placeholder="Enter Password" type="password" variant="standard" fullWidth required
                                helperText={<ErrorMessage name="password" />} />
                            <Field as={FormControlLabel}
                                control={
                                    <Checkbox
                                        name="rememberMe"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button variant="contained" disabled={props.isSubmitting} type="submit" color="primary"
                                style={buttonStyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"} </Button>

                        </Form>
                    )}

                </Formik>
                <Typography>

                    <Link href="#">Forgot Password ?</Link>
                </Typography>
                <Typography>
                    Do you have an account?
                    <Link href="#">Sign Up</Link>
                </Typography>

            </Paper>
        </Grid>
    )

}

export default Login