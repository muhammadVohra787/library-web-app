import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect, useRef, useState } from "react";
import useAccount from "../api/use-account";
// import useAuthentication from '../api/use-authentication'
// import authContext from '../api/auth-context'
import { Alert, Stack } from "@mui/material";

export default function SignUp() {
    const letters = /^[A-Za-z\s]+$/;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [account, setAccount] = useState();
    const { createAccount, data, error } = useAccount();

    useEffect(() => {
        if (data) {
            setAccount(data);
        }
    }, [data]);

    const validateInput = (name, value) => {
        if (name === "name") {
            return {
                isValid: letters.test(value),
                errorMessage: "Names may only contain letters",
            };
        }
        if (name === "email") {
            const emailPattern =
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
            return {
                isValid: emailPattern.test(value),
                errorMessage: "Invalid email address",
            };
        }
        if (name === "password") {
            // Add your password validation logic here if needed
            return {
                isValid: true, // Change this based on your password validation
                errorMessage: "Password validation error message",
            };
        }

        return { isValid: true, errorMessage: "" };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Clear previous errors for the current input
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));

        const { isValid, errorMessage } = validateInput(name, value);
        if (!isValid) {
            // Set new error for the current input
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { name, email, password } = formData;

        const nameValidation = validateInput("name", name);
        const emailValidation = validateInput("email", email);
        const passwordValidation = validateInput("password", password);

        // Clear all previous errors
        setErrors({
            name: "",
            email: "",
            password: "",
        });

        // Set new errors if any
        if (!nameValidation.isValid) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: nameValidation.errorMessage,
            }));
        }

        if (!emailValidation.isValid) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: emailValidation.errorMessage,
            }));
        }

        if (!passwordValidation.isValid) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: passwordValidation.errorMessage,
            }));
        }

        if (
            emailValidation.isValid &&
            nameValidation.isValid &&
            passwordValidation.isValid
        ) {
            // Send the correct data to createAccount
            await createAccount({ name, email, password });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            {error && <Alert severity="error">Something went wrong.</Alert>}
            {account && (
                <Stack alignItems="center" spacing={4} mt={10} mb={10}>
                    <Alert severity="success">
                        <Typography fontSize="1.5rem">
                            Account created!
                        </Typography>
                    </Alert>
                    <Button variant="contained" href="/signin">
                        Sign in
                    </Button>
                </Stack>
            )}
            {!account && (
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    name="password"
                                    label="Password (not implemented)"
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </Container>
    );
}
