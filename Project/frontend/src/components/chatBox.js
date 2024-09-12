import React from 'react';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ChatBox = ({ open, onClose }) => {
  if (!open) return null; // Don't render if not open

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 100, // Position it to the right, relative to the screen
        width: 320, // Width of the chat box
        height: 400, // Height of the chat box
        backgroundColor: 'background.paper',
        borderRadius: '8px', // Rounded corners
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1,
          backgroundColor: 'primary.main',
          color: 'white',
          borderTopLeftRadius: '8px', // Rounded top left corner
          borderTopRightRadius: '8px', // Rounded top right corner
        }}
      >
        <Typography variant="h6" sx={{ ml: 2 }}> {/* Add left margin to move text right */}
          Live Chat
        </Typography>
        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          flex: 1,
          p: 2, // Padding for inner content
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          borderBottomLeftRadius: '8px', // Rounded bottom left corner
          borderBottomRightRadius: '8px', // Rounded bottom right corner
        }}
      >
        {/* Chat messages go here */}
        <Typography variant="body2">
          Hello! How can I help you?
        </Typography>
        {/* Add more messages as needed */}
      </Box>
      <Box
        sx={{
          p: 1,
          borderTop: '1px solid',
          borderTopColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          borderBottomLeftRadius: '8px', // Rounded bottom left corner
          borderBottomRightRadius: '8px', // Rounded bottom right corner
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Type your message..."
          sx={{ mr: 1 }}
        />
        <Button variant="contained" color="primary">Send</Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
