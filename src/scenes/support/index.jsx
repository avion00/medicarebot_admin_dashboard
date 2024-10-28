import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useState, useEffect, useRef } from "react";
import data from "../../data/supportData.json";
import SendIcon from "@mui/icons-material/Send";
import PublishIcon from "@mui/icons-material/Publish";

const Support = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userInput, setUserInput] = useState("");
  const [botMessages, setBotMessages] = useState([]);
  const [issueDescription, setIssueDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const botResponses = data.responses;

  // Reference for chatbox to scroll
  const chatboxRef = useRef(null);

  // Flag to prevent double execution in Strict Mode
  const isInitialMount = useRef(true);

  // Append a message
  const appendMessage = (sender, message) => {
    setBotMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  // Respond based on user input
  const respondToUser = (userMessage) => {
    let botResponse = botResponses.default;

    if (userMessage.includes("setup")) {
      botResponse = botResponses.setup;
    } else if (userMessage.includes("training")) {
      botResponse = botResponses.training;
    } else if (userMessage.includes("configuration")) {
      botResponse = botResponses.configuration;
    }

    appendMessage("Bot", botResponse);

    if (userMessage.includes("escalate")) {
      appendMessage(
        "Bot",
        "Your issue is being escalated. Please fill out the ticket form below."
      );
      document.getElementById("ticketing-section").scrollIntoView();
    }
  };

  // Send user message
  const handleSendMessage = () => {
    const trimmedMessage = userInput.trim().toLowerCase();
    if (trimmedMessage) {
      appendMessage("You", trimmedMessage);
      respondToUser(trimmedMessage);
      setUserInput("");
    }
  };

  // Handle ticket submission
  const handleTicketSubmission = (e) => {
    e.preventDefault();
    if (issueDescription && userEmail) {
      alert("Ticket submitted! We'll get back to you soon.");
      setIssueDescription("");
      setUserEmail("");
    } else {
      alert("Please fill out both the issue description and your email.");
    }
  };

  // Scroll to bottom of chatbox when new messages are added
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [botMessages]);

  // Append a default bot message on mount
  useEffect(() => {
    if (isInitialMount.current) {
      appendMessage("Bot", "Hello! How can I assist you today?");
      isInitialMount.current = false; // Ensure this runs only once
    }
  }, []);

  return (
    <Box m="20px">
      <Box>
        <Header
          title="SUPPORT"
          subtitle="Welcome to your Medicare Bot Support Management"
        />
      </Box>
      <Box>
        <Box>
          <Box
            className="bot-messages"
            id="bot-messages"
            ref={chatboxRef}
            style={{
              height: "220px",
              width: "100%",
              overflowY: "auto",
              overflowX: "hidden",
              border: "1px solid rgb(125, 125, 125, .2)",
              padding: ".5em 1em",
              backgroundColor: colors.primary[400],
            }}
          >
            {botMessages.map((msg, index) => (
              <p key={index}>
                <strong style={{ color: colors.blueAccent[400] }}>
                  {msg.sender}:
                </strong>{" "}
                {msg.message}
              </p>
            ))}
          </Box>
          <Box
            style={{
              display: "flex",
              gap: "1em",
              alignItems: "center",
              margin: "1em 0",
            }}
          >
            <input
              type="text"
              id="user-input"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              style={{
                width: "100%",
                padding: "1em",
                fontFamily: "Inter",
                backgroundColor: colors.primary[400],
                border: "1px solid rgb(150, 150, 150, .3)",
                color: "inherit",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.outline = `1px solid ${colors.greenAccent[600]}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "none";
                e.target.style.outline = "none";
              }}
            />

            <Box>
              <Button
                id="send-message"
                onClick={handleSendMessage}
                sx={{
                  backgroundColor: colors.greenAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <SendIcon sx={{ mr: "8px" }} />
                Send
              </Button>
            </Box>
          </Box>
        </Box>

        <section id="ticketing-section">
          <Box mt="3em">
            <Header title="Escalate Unresolved Issues" />
          </Box>
          <form
            id="ticket-form"
            onSubmit={handleTicketSubmission}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              htmlFor="issue-description"
              style={{
                fontSize: "1.2em",
                fontWeight: "600",
              }}
            >
              Issue Description:
            </label>
            <textarea
              id="issue-description"
              placeholder="Describe your issue..."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              style={{
                margin: ".5em 0",
                height: "200px",
                padding: "1em",
                color: colors.primary[100],
                fontFamily: "Inter",
                backgroundColor: colors.primary[400],
                border: "1px solid rgb(150, 150, 150, .3)",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.outline = `1px solid ${colors.greenAccent[600]}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "none";
                e.target.style.outline = "none";
              }}
            />

            <label
              htmlFor="user-email"
              style={{
                fontSize: "1em",
                fontWeight: "600",
                marginTop: "1em",
              }}
            >
              Your Email:
            </label>
            <input
              type="email"
              id="user-email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              style={{
                padding: "1em",
                margin: "0.5em 0",
                backgroundColor: colors.primary[400],
                border: "1px solid rgb(150, 150, 150, .2)",
                color: colors.primary[100],
                fontFamily: "Inter",
              }}
              onFocus={(e) => {
                e.target.style.outline = `1px solid ${colors.greenAccent[600]}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "none";
                e.target.style.outline = "none";
              }}
            />
            <Box mt="1em">
              <Button
                type="submit"
                id="send-message"
                onClick={handleSendMessage}
                color="secondary"
                variant="outlined"
                style={{
                  borderRadius: "20px",
                  marginRight: "8px",
                }}
              >
                <PublishIcon sx={{ mr: "8px" }} />
                Submit
              </Button>
            </Box>
          </form>
        </section>
      </Box>
    </Box>
  );
};

export default Support;
