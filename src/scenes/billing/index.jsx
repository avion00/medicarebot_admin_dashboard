import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import Plans from "../../data/plans.json";
import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

const KPIData = [
  {
    id: "Successful Interactions",
    label: "Successful Interactions",
    value: 85,
    color: "hsl(205, 70%, 50%)",
  },
  {
    id: "Failed Interactions",
    label: "Failed Interactions",
    value: 15,
    color: "hsl(340, 70%, 50%)",
  },
];

function BillingManagement(props) {
  const [plans, setPlans] = useState(Plans);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [planName, setPlanName] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planStatus, setPlanStatus] = useState("Active");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:768px)");


  const openModal = (index = -1) => {
    if (index >= 0) {
      const plan = plans[index];
      setEditingIndex(index);
      setPlanName(plan.name);
      setPlanPrice(plan.price);
      setPlanStatus(plan.status);
    } else {
      setEditingIndex(-1);
      setPlanName("");
      setPlanPrice("");
      setPlanStatus("Active");
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const savePlan = () => {
    if (editingIndex >= 0) {
      const updatedPlans = [...plans];
      updatedPlans[editingIndex] = {
        name: planName,
        price: parseFloat(planPrice),
        status: planStatus,
      };
      setPlans(updatedPlans);
    } else {
      const newPlan = {
        name: planName,
        price: parseFloat(planPrice),
        status: planStatus,
      };
      setPlans([...plans, newPlan]);
    }
    closeModal();
  };

  const deletePlan = (index) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
  };

  return (
    <Box m="20px" style={{ position: "relative" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
      >
        <Header
          title="Billing Management"
          subtitle="Manage your Bills Account"
        />
        <Box>
          <Button
            id="create-plan"
            onClick={() => openModal()}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginBottom: isNonMobile ? undefined : "2em",
            }}
          >
            <DriveFileRenameOutlineIcon sx={{ mr: ".5em" }} />
            Create New Plans
          </Button>
        </Box>
      </Box>
      <div className="main-content" style={{ fontFamily: "Inter, sans-serif" }}>
        <section id="subscription-plans" className="dashboard-section">
          <Box
            className="plan-management"
            sx={{ overflow: isNonMobile ? undefined : "auto" }}
          >
            <table
              className="plan-table"
              id="plan-table"
              textAlign="center"
              width="100%"
            >
              <thead style={{ backgroundColor: colors.blueAccent[700] }}>
                <tr>
                  <th style={{ width: "25%", padding: "1em 0.5em" }}>
                    Plan Name
                  </th>
                  <th style={{ width: "25%", padding: "1em 0.5em" }}>Price</th>
                  <th style={{ width: "25%", padding: "1em 0.5em" }}>Status</th>
                  <th style={{ width: "25%", padding: "1em 0.5em" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: colors.primary[400] }}>
                {plans.map((plan, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: "0.25em .5em",
                        textAlign: "center",
                      }}
                    >
                      {plan.name}
                    </td>
                    <td
                      style={{
                        padding: "0.25em .5em",
                        textAlign: "center",
                      }}
                    >
                      ${plan.price.toFixed(2)}
                    </td>
                    <td
                      style={{
                        padding: "0.25em .5em",
                        textAlign: "center",
                      }}
                    >
                      {plan.status}
                    </td>
                    <td
                      style={{
                        padding: "0.25em",
                        alignContent: "center",
                        display: "flex",
                        flexWrap: isNonMobile ? "wrap" : "nowrap",
                        gap: ".5em",
                        justifyContent: "center",
                      }}
                    >
                      <Box mt=".25em" mb=".25em">
                        <Button
                          onClick={() => openModal(index)}
                          color="secondary"
                          variant="outlined"
                          style={{
                            borderRadius: "20px",
                            marginRight: "8px",
                          }}
                        >
                          <EditRoundedIcon sx={{ mr: "5px" }} />
                          Edit
                        </Button>
                      </Box>
                      <Box mt=".25em" mb=".25em">
                        <Button
                          onClick={() => deletePlan(index)}
                          variant="outlined"
                          sx={{
                            color: colors.redAccent[300],
                            borderColor: colors.redAccent[300],
                            borderRadius: "20px",
                            marginRight: "8px",
                            "&:hover": {
                              backgroundColor: colors.redAccent[700],
                              borderColor: colors.redAccent[700],
                            },
                          }}
                        >
                          <DeleteForeverRoundedIcon sx={{ mr: "5px" }} />
                          Delete
                        </Button>
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </section>

        <section id="kpi" className="dashboard-section">
          <Box mt="2em">
            <Header title="Key Performance Indicators (KPIs)" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              gap: isNonMobile ? undefined : "2em",
              // alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              className="kpi-item"
              style={{
                height: "300px",
                minWidth: "250px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                flexGrow: "1",
                maxWidth: "50%",
              }}
            >
              <h3 style={{ color: colors.blueAccent[500] }}>
                Interaction Success Rate
              </h3>

              <ResponsivePie
                data={KPIData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 50,
                  left: 20,
                }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: "nivo" }}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                enableArcLinkLabels={false}
                enableArcLabels={true}
                arcLabelsTextColor="inherif"
                arcLabelsRadiusOffset={0.4}
                arcLabelsSkipAngle={10}
              />
            </Box>

            <Box
              className="kpi-item"
              style={{
                flexGrow: "1",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: "50%",
              }}
            >
              <Box
                style={{
                  fontSize: "1.15em",
                  fontWeight: "600",
                  color: colors.blueAccent[500],
                }}
              >
                Total Payments Processed
              </Box>
              <Box
                sx={{
                  fontSize: "46px",
                  fontWeight: "700",
                  textAlign: "center",

                  marginTop: isNonMobile ? "2em" : "1em",
                  color: colors.greenAccent[400],
                }}
              >
                $12,300
              </Box>
            </Box>
          </Box>
        </section>
      </div>

      {modalVisible && (
        <>
          <Box
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              zIndex: 999,
            }}
            onClick={closeModal}
          />

          <Box
            id="plan-modal"
            className="modal"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: colors.primary[400],
              padding: "1em",
              zIndex: 1000,
              width: isNonMobile ? "400px" : "300px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <div
              className="modal-content"
              style={{ padding: "20px", position: "relative" }}
            >
              <Box
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  borderRadius: "50%",
                  padding: "0.2em",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={closeModal}
              >
                <CloseIcon
                  style={{ fontSize: "1.5em", color: colors.redAccent[100] }}
                />
              </Box>

              {/* Modal Title */}
              <h2
                id="modal-title"
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                {editingIndex >= 0 ? "Edit Plan" : "Create New Plan"}
              </h2>

              {/* Form Elements */}
              <div
                className="input_div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Plan Name"
                  required
                  style={{
                    padding: "10px",
                    fontSize: "1em",
                    border: `1px solid ${colors.grey[500]}`,
                    boxShadow: "none",
                    borderRadius: "4px",
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                    font: "inherit",
                  }}
                />
                <input
                  type="number"
                  value={planPrice}
                  onChange={(e) => setPlanPrice(e.target.value)}
                  placeholder="Price"
                  required
                  style={{
                    padding: "10px",
                    fontSize: "1em",
                    border: `1px solid ${colors.grey[500]}`,
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                    font: "inherit",
                    borderRadius: "4px",
                  }}
                />
                <select
                  value={planStatus}
                  onChange={(e) => setPlanStatus(e.target.value)}
                  style={{
                    padding: "10px",
                    fontSize: "1em",
                    border: `1px solid ${colors.grey[500]}`,
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                    font: "inherit",
                    borderRadius: "4px",
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Save Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={savePlan}
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  width: "100%",
                  fontSize: "1em",
                  borderRadius: "4px",
                  background: colors.greenAccent[500],
                }}
              >
                Save Plan
              </Button>
            </div>
          </Box>
        </>
      )}
    </Box>
  );
}

BillingManagement.propTypes = { intl: PropTypes.object.isRequired };

export default BillingManagement;
