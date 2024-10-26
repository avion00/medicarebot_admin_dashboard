import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  Box,
  InputLabel,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { tokens } from "../theme";

const DialogBox = ({
  showDialog,
  toggleDialog,
  formData,
  handleChange,
  handleImageChange,
  handleSubmit,
  isEdit,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [setInputFocus] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputFocus = (field) => {
    setInputFocus((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputBlur = (field) => {
    setInputFocus((prev) => ({ ...prev, [field]: false }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleImageChange(event);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Dialog
      open={showDialog}
      onClose={toggleDialog}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          padding: ".5em",
          borderRadius: "12px",
          backgroundColor: colors.primary[400]
        },
      }}
    >
      <DialogTitle
        style={{ textAlign: "center", fontSize: "20px", fontWeight: "800" }}
      >
        {isEdit ? "Edit Client" : "Add New Client"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {["name", "username", "email", "address", "contact", "dob"].map(
            (field) => (
              <TextField
                key={field}
                label={capitalizeFirstLetter(field)}
                name={field}
                type={
                  field === "dob"
                    ? "date"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                value={formData[field]}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: "1em", color: colors.greenAccent[100] },
                }}
                onFocus={() => handleInputFocus(field)}
                onBlur={() => handleInputBlur(field)}
                style={{ marginBottom: "0.5em" }}
              />
            )
          )}
          <Box
            sx={{
              position: "relative",
              marginTop: "1em",
              width: "100%",
              border: `1px solid ${colors.grey[400]}`,
              borderRadius: "5px",
              padding: "16px",
              cursor: "pointer",
              "&:hover": {
                border: `1px solid ${colors.grey[200]}`,
              },
            }}
          >
            <InputLabel
              htmlFor="upload-image"
              style={{ cursor: "pointer", color: colors.grey[100] }}
            >
              Upload Image
            </InputLabel>
            <input
              id="upload-image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </Box>
          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Preview"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginTop: "1em",
                boxShadow: `0 4px 10px ${colors.greenAccent[100]}`,
              }}
            />
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={toggleDialog}
          color="secondary"
          variant="outlined"
          style={{
            borderRadius: "20px",
            marginRight: "8px",
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          startIcon={<SaveIcon />}
          style={{
            borderRadius: "20px",
          }}
        >
          {isEdit ? "Update" : "Add"} Client
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default DialogBox;
