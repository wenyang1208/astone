import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Button, Divider} from '@mui/material';
import { styled } from '@mui/material/styles';
import SellerSidebar from '../../components/sellerSidebar';
import SellerHeader from '../../components/sellerHeader';

function Dashboard() {
    const StatsContainer = styled(Box)({
        textAlign: 'center',
        padding: '16px',
        position: 'relative',
    });
    
    const TodoCard = ({ value, label, showDivider = true }) => (
    <StatsContainer>
        <Typography variant="h4" 
            sx={{ 
                color: '#1976d2', 
                fontWeight: 500, 
                mb: 0.5 
            }}>
            {value}
        </Typography>
        <Typography variant="body2" 
            sx={{ 
                color: '#666',
                fontSize: '0.95rem'
            }}>
            {label}
        </Typography>
        {showDivider && (
            <Divider 
                orientation="vertical" 
                sx={{ 
                    position: 'absolute',
                    right: 0,
                    top: '20%',
                    height: '65%'
                }} 
            />
        )}
    </StatsContainer>
    );

    const TodoRow = ({ items }) => (
    <Grid container>
        {items.map((item, index) => (
        <Grid item xs={3} key={item.label}>
            <TodoCard 
                value={item.value} 
                label={item.label} 
                showDivider={index < items.length - 1}
            />
        </Grid>
        ))}
    </Grid>
    );

    const firstRowItems = [
        { value: "4", label: "Unpaid" },
        { value: "82", label: "To-Process Shipment" },
        { value: "59", label: "Processed Shipment" },
        { value: "6", label: "Pending Cancellation" }
    ];

    const secondRowItems = [
        { value: "0", label: "Pending Return/Refund" },
        { value: "21", label: "Removed Products" },
        { value: "11", label: "Sold Products" },
        { value: "1", label: "Pending Promotion" }
    ];


    return (
        <Box sx={{ display: 'flex' }}>
            <SellerHeader sx={{ position: 'fixed', zIndex: 1200 }} />
            <Grid container>
                <Grid item xs={1.5}>
                    <SellerSidebar />
                </Grid>
                <Grid item xs sx = {{backgroundColor: '#f5f5f5'}}>
                    <Box sx={{ flexGrow: 1, p: 3}}>
                        {/* To Do List */}
                        <Paper sx={{ p: 3, pt: 2, mb: 3, mt:8 }}>
                            <Typography variant="h5" sx = {{fontWeight: 600, fontSize: 30}}>
                            To Do List
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Things you need to deal with
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <TodoRow items={firstRowItems} />
                            </Box>
                            <Box>
                                <TodoRow items={secondRowItems} />
                            </Box>
                        </Paper>

                        {/* Business Insights */}
                        <Paper sx={{ p: 3, pt: 2}}>
                            <Typography variant="h5" sx = {{fontWeight: 600, fontSize: 30}}>
                            Business Insights
                            </Typography>

                            {/* Stats */}
                            <Grid container spacing={3} sx={{ mb: 3 }}>
                                <Grid item xs={12} md={4}>
                                <Grid sx={{ p: 2 }}>
                                    <Typography variant="body1" color="text.secondary">Visitors</Typography>
                                    <Typography variant="h4">1,572</Typography>
                                    <Typography variant="body2" color="success.main">
                                    vs yesterday 5.72% ↑
                                    </Typography>
                                </Grid>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                <Grid sx={{ p: 2 }}>
                                    <Typography variant="body1" color="text.secondary">Orders</Typography>
                                    <Typography variant="h4">5</Typography>
                                    <Typography variant="body2" color="error.main">
                                    vs yesterday 58.33% ↓
                                    </Typography>
                                </Grid>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                <Grid sx={{ p: 2 }}>
                                    <Typography variant="body1" color="text.secondary">Total Sales</Typography>
                                    <Typography variant="h4">MYR 0.32</Typography>
                                    <Typography variant="body2" color="error.main">
                                    vs yesterday RM 50 ↓
                                    </Typography>
                                </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        );
    };
        
export default Dashboard;