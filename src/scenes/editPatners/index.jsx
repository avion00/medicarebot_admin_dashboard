import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone-style.css";

const EditPartners = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    setSnackbarOpen(true);
    navigate("/viewPartners");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlefullNameChange = (event, handleChange) => {
    handleChange(event);
  };
  const handleEmailChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleCityChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleCountryChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleCompanyNameChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleJobTitleChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleCompanySizeChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleIntegrationSummaryChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleIndustryChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleInterestChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleChallangingPointsChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleExistingSolutionsChange = (event, handleChange) => {
    handleChange(event);
  };

  const handleHowtheyfindyouChange = (event, handleChange) => {
    handleChange(event);
  };

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    country: "",
    companyName: "",
    jobTitle: "",
    companySize: "",
    industry: "",
    interest: "",
    preferredFrequency: "",
  };

  const checkoutSchema = yup.object().shape({
    fullName: yup.string().required("Bot Name is required"),
    email: yup.string().required("Email is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    companyName: yup.string().required("Company Name is required"),
    jobTitle: yup.string().required("Job Title is required"),
    companySize: yup.string().required("Company size is required"),
    industry: yup.string().required("Industry size is required"),
    interest: yup.string().required("Interest/Service of Interest is required"),
    preferredFrequency: yup
      .string()
      .required("Preferred Frequency contact is required"),
  });


  

  return (
    <Box m="20px">
      <Box>
        <Header
          title="Edit PARTNERS"
          subtitle="Edit your Partners informations"
        />
      </Box>

      <Box>
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
            setFieldValue,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: colors.grey[100] }}
                >
                  Basic Information
                </Typography>

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
                    label="Full Name"
                    onBlur={handleBlur}
                    onChange={(e) => handlefullNameChange(e, handleChange)}
                    value={values.fullName}
                    name="fullName"
                    error={!!touched.fullName && !!errors.fullName}
                    helperText={touched.fullName && errors.fullName}
                    sx={{
                      gridColumn: "span 1",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={(e) => handleEmailChange(e, handleChange)}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{
                      gridColumn: "span 1",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      gridColumn: "span 1",
                      width: "100%",
                    }}
                  >
                    <PhoneInput
                      country={"us"}
                      value={values.phoneNumber}
                      error={!!touched.phoneNumber && !!errors.phoneNumber}
                      onChange={(phone) => setFieldValue("phoneNumber", phone)}
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: false,
                      }}
                      containerStyle={{
                        width: `65%`,
                        height: "52px",
                        border: "none",
                      }}
                      inputStyle={{
                        width: "100%",
                        marginLeft: "54%",
                        height: "52px",
                        padding: "10px",
                        paddingLeft: "1.5em",
                        fontSize: "14px",
                        borderRadius: "0 .3em 0 0",
                        backgroundColor: colors.primary[400],
                        color: colors.primary[100],
                        border: "none",
                        borderBottom: `1px solid ${colors.primary[100]}`,
                      }}
                      buttonStyle={{
                        width: "50%",
                        backgroundColor: colors.primary[400],
                        borderRadius: " .3em 0 0 0 ",
                        border: "none",
                        borderBottom: `1px solid ${colors.primary[100]}`,
                      }}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{
                          mt: 1,
                          display: "block",
                          fontSize: "0.75rem",
                        }}
                      >
                        {errors.phoneNumber}
                      </Typography>
                    )}
                  </Box>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Country"
                    onBlur={handleBlur}
                    onChange={(e) => handleCountryChange(e, handleChange)}
                    value={values.country}
                    name="country"
                    error={!!touched.country && !!errors.country}
                    helperText={touched.country && errors.country}
                    sx={{
                      gridColumn: "span 1",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="City"
                    onBlur={handleBlur}
                    onChange={(e) => handleCityChange(e, handleChange)}
                    value={values.city}
                    name="city"
                    error={!!touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
                    sx={{
                      gridColumn: "span 1",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Job Title"
                    onBlur={handleBlur}
                    onChange={(e) => handleJobTitleChange(e, handleChange)}
                    value={values.jobTitle}
                    name="jobTitle"
                    error={!!touched.jobTitle && !!errors.jobTitle}
                    helperText={touched.jobTitle && errors.jobTitle}
                    sx={{
                      gridColumn: "span 1",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Company Name"
                    onBlur={handleBlur}
                    onChange={(e) => handleCompanyNameChange(e, handleChange)}
                    value={values.companyName}
                    name="companyName"
                    error={!!touched.companyName && !!errors.companyName}
                    helperText={touched.companyName && errors.companyName}
                    sx={{
                      gridColumn: "span 1",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Industry"
                    onBlur={handleBlur}
                    onChange={(e) => handleIndustryChange(e, handleChange)}
                    value={values.industry}
                    name="industry"
                    error={!!touched.industry && !!errors.industry}
                    helperText={touched.industry && errors.industry}
                    sx={{
                      gridColumn: "span 1",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: "2em", color: colors.grey[100] }}
                >
                  Business Information (Optional)
                </Typography>

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
                  <FormControl
                    fullWidth
                    variant="filled"
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <InputLabel
                      id="companySize"
                      sx={{ color: colors.primary[100] }}
                    >
                      Company Size
                    </InputLabel>
                    <Select
                      labelId="companySize"
                      id="companySize"
                      value={values.companySize}
                      name="companySize"
                      onChange={(e) => handleCompanySizeChange(e, handleChange)}
                      onBlur={handleBlur}
                      error={!!touched.companySize && !!errors.companySize}
                    >
                      <MenuItem value="small">Small</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="large">Large</MenuItem>
                    </Select>
                    {touched.companySize && errors.companySize && (
                      <Box color="red" mt="4px" fontSize="11px" ml="1.5em">
                        {errors.companySize}
                      </Box>
                    )}
                  </FormControl>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Interest/Service of Interest"
                    onBlur={handleBlur}
                    onChange={(e) => handleInterestChange(e, handleChange)}
                    value={values.interest}
                    name="interest"
                    error={!!touched.interest && !!errors.interest}
                    helperText={touched.interest && errors.interest}
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: "2em", color: colors.grey[100] }}
                >
                  Interaction Summary
                </Typography>

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
                    multiline
                    variant="filled"
                    type="text"
                    label="Latest Integration Summary"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleIntegrationSummaryChange(e, handleChange)
                    }
                    value={values.integrationSummary}
                    name="integrationSummary"
                    error={
                      !!touched.integrationSummary &&
                      !!errors.integrationSummary
                    }
                    helperText={
                      touched.integrationSummary && errors.integrationSummary
                    }
                    sx={{
                      gridColumn: "span 4",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ mt: "2em", color: colors.grey[100] }}
                >
                  Qualifying Questions (Optional)
                </Typography>

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
                    label="Pain Points or Challanges"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleChallangingPointsChange(e, handleChange)
                    }
                    value={values.challangingPoints}
                    name="challangingPoints"
                    error={
                      !!touched.challangingPoints && !!errors.challangingPoints
                    }
                    helperText={
                      touched.challangingPoints && errors.challangingPoints
                    }
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Existing Solutions or Competitors"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleExistingSolutionsChange(e, handleChange)
                    }
                    value={values.existingSolutions}
                    name="existingSolutions"
                    error={
                      !!touched.existingSolutions && !!errors.existingSolutions
                    }
                    helperText={
                      touched.existingSolutions && errors.existingSolutions
                    }
                    sx={{
                      gridColumn: "span 2",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="How they find you?"
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleHowtheyfindyouChange(e, handleChange)
                    }
                    value={values.howtheyfindyou}
                    name="howtheyfindyou"
                    error={!!touched.howtheyfindyou && !!errors.howtheyfindyou}
                    helperText={touched.howtheyfindyou && errors.howtheyfindyou}
                    sx={{
                      gridColumn: "span 4",
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: colors.blueAccent[500],
                        fontWeight: "bold",
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  m: "1.5em 0",
                }}
              >
                <Box>
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    sx={{
                      background: "linear-gradient(45deg, #062994, #0E72E1)",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      marginBottom: isNonMobile ? "inherit" : "2em",
                    }}
                  >
                    <PlaylistAddCheckCircleIcon sx={{ mr: "10px" }} />
                    Save Changes
                  </Button>
                </Box>
              </Box>

              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Alert
                  onClose={handleSnackbarClose}
                  severity="success"
                  sx={{
                    backgroundColor: colors.greenAccent[700],
                    color: colors.greenAccent[200],
                    fontWeight: "bold",
                  }}
                >
                  Congratulations, you have added new Patner Named:
                  <strong>{values.fullName}</strong>
                </Alert>
              </Snackbar>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default EditPartners;