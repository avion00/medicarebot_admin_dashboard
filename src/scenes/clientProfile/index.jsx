import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import data from "../../data/userdata.json";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { tokens } from "../../theme";
import ProfileCard from "../../components/clientProfileCard";
import DialogBox from "../../components/clientDialogBox";
import useMediaQuery from "@mui/material/useMediaQuery";


const ClientProfile = () => {
  const isNonMobile = useMediaQuery("(min-width:768px)");
  const [clients, setClients] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
    contact: "",
    dob: "",
    profileImage: "",
    isSuspended: ""
  });

  const [isEdit, setIsEdit] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setClients(data);
  }, []);

  const addNewUser = () => {
    setShowDialog(true);
    setIsEdit(false);
    setFormData({
      name: "",
      username: "",
      email: "",
      address: "",
      contact: "",
      dob: "",
      profileImage: "",
      isSuspended: "",
    });
  };

  

  const handleEdit = (username) => {
    const clientToEdit = clients.find((client) => client.username === username);
    if (clientToEdit) {
      setFormData(clientToEdit);
      setShowDialog(true);
      setIsEdit(true);
    }
  };

  const handleDelete = (username) => {
    const updatedClients = clients.filter(
      (client) => client.username !== username
    );
    setClients(updatedClients);
  };

  const handleSuspend = (username) => {
    console.log("Suspending user: ", username);
  };

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setClients(
        clients.map((client) =>
          client.username === formData.username ? formData : client
        )
      );
    } else {
      setClients([...clients, formData]);
    }
    setShowDialog(false);
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap="10px"
        alignItems="center"
      >
        <Header title="CLIENT PROFILE" subtitle="List of clients" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginBottom: isNonMobile ? "inherit" : "2em"
            }}
            onClick={addNewUser}
          >
            <PersonAddIcon sx={{ mr: "10px" }} />
            Add New Client
          </Button>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: "2em"
      }}>
        {clients.map((client) => (
          <ProfileCard
            key={client.username}
            client={client}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSuspend={handleSuspend}
          />
        ))}
      </Box>

      <DialogBox
        showDialog={showDialog}
        toggleDialog={toggleDialog}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEdit={isEdit}
      />
    </Box>
  );
};

export default ClientProfile;
