import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import BotManagement from "../../data/botManagementData";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [bots, setBots] = useState([]);
  const [trainingMaterials, setTrainingMaterials] = useState("");
  const [selectedBots, setSelectedBots] = useState([]);

  useEffect(() => {
    setBots(BotManagement);
  }, []);

  const toggleBotStatus = (index) => {
    const updatedBots = [...bots];
    updatedBots[index].status =
      updatedBots[index].status === "Running" ? "Stopped" : "Running";
    setBots(updatedBots);
  };

  const deleteBot = (index) => {
    const updatedBots = bots.filter((_, i) => i !== index);
    setBots(updatedBots);
  };

  const editBot = (index) => {
    alert(`Edit configuration for ${bots[index].id}`);
  };

  const saveTrainingMaterials = () => {
    alert("Training materials saved!");
    console.log("Training Materials:", trainingMaterials);
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
      >
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your Medicare Bot Dashboard"
        />
        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>
      <Box>
        <div
          className="client_management"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <section className="bot-overview">
            {bots.length > 0 ? (
              <table id="bot-table" textAlign="center" width="100%">
                <thead style={{ backgroundColor: colors.blueAccent[600] }}>
                  <tr>
                    <th style={{ width: "20%", padding: "1em 0.25em" }}>
                      Bot ID
                    </th>
                    <th style={{ width: "20%", padding: "1em 0.25em" }}>
                      Status
                    </th>
                    <th style={{ width: "20%", padding: "1em 0.25em" }}>
                      Success Rate
                    </th>
                    <th style={{ width: "40%", padding: "1em 0.25em" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: colors.primary[400] }}>
                  {bots.map((bot, index) => (
                    <tr key={bot.id}>
                      <td
                        style={{
                          padding: "0.25em",
                          textAlign: "center",
                        }}
                      >
                        {bot.id}
                      </td>
                      <td
                        style={{
                          padding: "0.25em",
                          textAlign: "center",
                        }}
                      >
                        {bot.status}
                      </td>
                      <td
                        style={{
                          padding: "0.25em",
                          textAlign: "center",
                        }}
                      >
                        {bot.successRate}
                      </td>
                      <td
                        style={{
                          padding: "0.25em",
                          alignContent: "center",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: ".5em",
                          justifyContent: "center",
                        }}
                      >
                        <Box>
                          <Button
                            className="action-btn stop-btn"
                            onClick={() => toggleBotStatus(index)}
                            sx={{
                              backgroundColor: colors.blueAccent[700],
                              color: colors.grey[100],
                              fontSize: "14px",
                              fontWeight: "bold",
                              textTransform: "capitalize",
                              padding: ".35em 1em",
                              margin: ".5em",
                            }}
                          >
                            {bot.status === "Running" ? (
                              <>
                                <StopIcon sx={{ mr: "5px" }} />{" "}
                                {/* Stop icon */}
                                Stop
                              </>
                            ) : (
                              <>
                                <PlayArrowRoundedIcon sx={{ mr: "5px" }} />{" "}
                                {/* Play icon */}
                                Run
                              </>
                            )}
                          </Button>
                        </Box>
                        <Box>
                          <Button
                            className="action-btn delete-btn"
                            onClick={() => deleteBot(index)}
                            sx={{
                              backgroundColor: colors.redAccent[700],
                              color: colors.grey[100],
                              fontSize: "14px",
                              fontWeight: "bold",
                              textTransform: "capitalize",
                              padding: ".35em 1em",
                              margin: ".5em",
                            }}
                          >
                            <DeleteForeverRoundedIcon sx={{ mr: "5px" }} />
                            Delete
                          </Button>
                        </Box>
                        <Box>
                          <Button
                            className="action-btn edit-btn"
                            onClick={() => editBot(index)}
                            sx={{
                              backgroundColor: colors.greenAccent[700],
                              color: colors.grey[100],
                              fontSize: "14px",
                              fontWeight: "bold",
                              textTransform: "capitalize",
                              padding: ".35em 1em",
                              margin: ".5em",
                            }}
                          >
                            <EditRoundedIcon sx={{ mr: "5px" }} />
                            Edit
                          </Button>
                        </Box>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading bots...</p>
            )}
            <Box>
              <Button
                id="refresh-btn"
                className="refresh_bots"
                onClick={() => window.location.reload()}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  margin: "1em 0",
                }}
              >
                <RefreshRoundedIcon sx={{ mr: "10px" }} />
                Refresh Bots
              </Button>
            </Box>
          </section>

          <section className="training-materials">
            <Box mt="2em">
              <Header title=" Manage Training Materials" />
            </Box>

            <Autocomplete
              multiple
              id="tags-filled"
              options={bots.map((bot) => bot.id)}
              value={selectedBots}
              onChange={(event, newValue) => setSelectedBots(newValue)}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  style={{
                    border: "none",
                    transition: "all .3s ease",
                  }}
                  {...params}
                  variant="outlined"
                  label="Select Bots"
                  placeholder="Select Bots"
                  InputLabelProps={{
                    sx: {
                      color: colors.primary[100],
                      "&.Mui-focused": {
                        color: colors.primary[100],
                      },
                    },
                  }}
                  sx={{
                    width: "30%",
                    border: "1px solid",

                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: colors.primary[400],
                      },
                      "&:hover fieldset": {
                        borderColor: colors.greenAccent[700],
                      },
                      "&.Mui-focused fieldset": {
                        border: "2px solid",
                        borderColor: colors.greenAccent[500],
                      },
                    },
                  }}
                />
              )}
              sx={{
                marginBottom: "1.5em",
              }}
            />

            <TextareaAutosize
              id="training-materials"
              value={trainingMaterials}
              onChange={(e) => setTrainingMaterials(e.target.value)}
              placeholder="Edit training materials here..."
              minRows={5}
              style={{
                width: "100%",
                height: "300px",
                padding: "1em",
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
                fontFamily: "Inter",
                fontSize: "14px",
                border: "1px solid",
                borderColor: colors.primary[400],
                transition: "border-color 0.3s ease",
                outline: "none",
                // e.target.style.outline = "none";
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid";
                e.target.style.borderColor = colors.greenAccent[600];
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid";
                e.target.style.borderColor = colors.primary[400];
              }}
              onMouseOver={(e) => {
                e.target.style.border = "1px solid";
                e.target.style.borderColor = colors.greenAccent[800];
              }}
              onMouseOut={(e) => {
                e.target.style.border = "1px solid";
                e.target.style.borderColor = colors.primary[400];
              }}
            />
            <Box>
              <Button
                className="save_training"
                id="save-training-btn"
                onClick={saveTrainingMaterials}
                sx={{
                  backgroundColor: colors.greenAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  margin: "1em 0",
                }}
              >
                <SaveAltIcon sx={{ mr: "10px" }} />
                Save Training Materials
              </Button>
            </Box>
          </section>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
