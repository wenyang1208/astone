import React from "react";
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constant';
import { Toolbar, Button, Box, Typography, AppBar } from "@mui/material";

const SellerHeader = () => {
    const title = 'Astoné Seller Center'; 
    const navigate = useNavigate();
    const token = localStorage.getItem(ACCESS_TOKEN);

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN); // Remove the token from localStorage
        navigate('/sell'); 
    };
    
    return (
        <AppBar 
            position="fixed"
            sx={{ 
                backgroundColor: '#dfc5fe',
                boxShadow: 'none',
            }}
        >
            <Toolbar
                sx={{ 
                    justifyContent: 'space-between',
                }}
            >
                <Typography 
                    variant="h6" 
                    component="h1" 
                    sx={{ 
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }}
                >
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button 
                        variant="outlined" 
                        sx={{ borderColor: '#7D0DC3', color: '#7D0DC3', mr: 2 }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default SellerHeader;
