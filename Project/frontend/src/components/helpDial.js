import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Question mark icon
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'; // FAQ icon
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Support icon
import ChatIcon from '@mui/icons-material/Chat'; // Live chat icon
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ChatBox from './chatBox'; // Import ChatBox

// Define a purple theme
const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a', // Purple color
    },
    secondary: {
      main: '#ab47bc', // Light purple color
    },
  },
});

const HelpDial = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [chatOpen, setChatOpen] = useState(false); // State to manage chat box visibility

  const actions = [
    { icon: <ChatIcon />, name: 'FAQ', action: () => navigate('/faq') }, // Redirect to FAQ page
    { icon: <QuestionAnswerIcon />, name: 'Support', action: () => navigate('/support') }, // Redirect to Support page
    { icon: <SupportAgentIcon />, name: 'Live Chat', action: () => setChatOpen(true) }, // Open chat box
  ];

  return (
    <ThemeProvider theme={purpleTheme}>
      {/* Basic SpeedDial Component */}
      <SpeedDial
        ariaLabel="Help Menu"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        icon={<HelpOutlineIcon />} // Question Mark Icon
        FabProps={{
          sx: {
            bgcolor: 'primary.main', // Purple background
            color: 'white', // White question mark
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          },
        }}
      >
        {/* SpeedDial Actions */}
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action} // Calls the respective action
            sx={{
              bgcolor: 'secondary.main', // Light purple action button
              color: 'white',
              '&:hover': {
                bgcolor: 'secondary.dark',
              },
            }}
          />
        ))}
      </SpeedDial>
      {/* Chat Box */}
      {chatOpen && <ChatBox open={chatOpen} onClose={() => setChatOpen(false)} />}
    </ThemeProvider>
  );
};

export default HelpDial;
