import {
  Box,
  Button,
  TextField,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens, ColorModeContext } from "../../theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useContext, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    // After form submission, redirect to the dashboard page
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "100dvh",
        position: "relative",
      }}
    >
      <Box style={{ position: "absolute", top: "3em", right: "3em" }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
      <Box
        sx={{
          width: "300px",
          flexGrow: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Header
            title="WELCOME TO MEDICARE BOT"
            subtitle="Please Login to continue"
          />
        </Box>
      </Box>
      <Box
        m="20px"
        sx={{
          width: "300px",
          flexGrow: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "90%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Header title="LOGIN PAGE" />
            <Box
              sx={{
                color: colors.blueAccent[200],
                marginBottom: "2.5em",
                padding: ".5em",
                cursor: "pointer",
              }}
            >
              <a
                style={{
                  all: "unset",
                  display: "flex",
                  alignItems: "center",
                  gap: ".5em",
                }}
                href="/signUp"
              >
                <ArrowForwardIcon />
                Create New Account
              </a>
            </Box>
          </Box>

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{
                      gridColumn: "span 4",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{
                      gridColumn: "span 4",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{
                            marginRight: "1em",
                          }}
                        >
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box
                    sx={{
                      gridColumn: "span 4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 .5em",
                      marginBottom: "1.5em",
                      width: "100%",
                    }}
                  >
                    {/* Remember Me Section */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: "1em",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const checkbox =
                          document.getElementById("rememberMeCheckbox");
                        checkbox.checked = !checkbox.checked;
                      }}
                    >
                      {/* Checkbox Input */}
                      <input
                        type="checkbox"
                        id="rememberMeCheckbox"
                        onClick={(e) => e.stopPropagation()}
                        style={{ cursor: "pointer" }}
                      />

                      {/* Remember Label */}
                      <span style={{ color: colors.blueAccent[200] }}>
                        Remember
                      </span>
                    </Box>

                    <Box
                      sx={{
                        cursor: "pointer",
                        color: colors.blueAccent[200],
                        textDecoration: "none",
                        opacity: 1,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          textDecoration: "underline",
                          opacity: 0.7,
                        },
                      }}
                      onClick={() => {
                        // Handle forget password logic here
                      }}
                    >
                      Forget Password?
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    startIcon={<LoginIcon />} // Add the icon before the text
                    sx={{ gridColumn: "span 4", width: "100%", padding: "1em" }}
                  >
                    Log In
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default Form;
