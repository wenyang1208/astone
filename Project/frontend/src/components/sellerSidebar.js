import * as React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

const SellerSidebar = () => {
    return (
        <>
        <Toolbar />
            <List>
                <ListItemButton component={Link} to="/sellerDashboard">
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton component={Link} to="/productlist">
                    <ListItemText primary="My Products" />
                </ListItemButton>
                <ListItemButton component={Link} to="/finance">
                    <ListItemText primary="Finance" />
                </ListItemButton>
                <ListItemButton component={Link} to="/sellerProfile">
                    <ListItemText primary="My Shop Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/faq">
                    <ListItemText primary="FAQ" />
                </ListItemButton>
            </List>
        </>
    );
}

export default SellerSidebar;
