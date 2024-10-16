import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Typography, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import SellerSidebar from '../../components/sellerSidebar';
import { SellerService } from '../../services/SellerService';
import { ACCESS_TOKEN } from '../../constant';
import { jwtDecode } from 'jwt-decode';
import SellerHeader from '../../components/sellerHeader';
import { ButtonBase } from '@mui/material';

function Dashboard() {
    const StatsContainer = styled(Box)({
        textAlign: 'center',
        padding: '16px',
        position: 'relative',
    });

    const sellerService = new SellerService();
    const token = localStorage.getItem(ACCESS_TOKEN);
    const sellerId = jwtDecode(token).seller_id;
    
    const TodoCard = ({ value, label, showDivider = true, onClick }) => (
        <ButtonBase onClick={onClick} sx={{ width: '100%' }}>
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
                            position: 'relative',
                            right: 0,
                            top: '20%',
                            height: '65%'
                        }} 
                    />
                )}
            </StatsContainer>
        </ButtonBase>
    );

    const TodoRow = ({ items }) => (
        <Grid container>
            {items.map((item, index) => (
                <Grid item xs={3} key={item.label}>
                    <TodoCard 
                        value={item.value} 
                        label={item.label} 
                        showDivider={index < items.length - 1}
                        onClick={() => handleTodoClick(item.label)}  // Define click handler
                    />
                </Grid>
            ))}
        </Grid>
    );

    const handleTodoClick = (label) => {
        console.log(`You clicked on ${label}`);
        // Navigate to the respective page or perform an action based on the label
    };

    const [todoData, setTodoData] = useState({
        unpaid: 0,
        toProcessShipment: 0,
        processedShipment: 0,
        pendingCancellation: 0,
        pendingReturnRefund: 0,
        removedProducts: 0,
        soldProducts: 0,
        pendingPromotion: 0,
    });

    // Fetch todo data when the component mounts
    useEffect(() => {
        const fetchTodoData = async () => {
            try {
                const response = await sellerService.getSellerById(sellerId);
                console.log(response.data);
                setTodoData(response.data.todo);
            } catch (error) {
                console.error('Failed to fetch todo data:', error);
            }
        };

        fetchTodoData();
    }, []);

    const firstRowItems = [
        { value: todoData.unpaid, label: "Unpaid" },
        { value: todoData.to_processed_shipment, label: "To-Process Shipment" },
        { value: todoData.processed_shipment, label: "Processed Shipment" },
        { value: todoData.pending_cancellation, label: "Pending Cancellation" },
    ];

    const secondRowItems = [
        { value: todoData.pending_return, label: "Pending Return/Refund" },
        { value: todoData.removed_product, label: "Removed Products" },
        { value: todoData.sold_product, label: "Sold Products" },
        { value: todoData.pending_promotion, label: "Pending Promotion" },
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

                        {/* Marketing Centre */}
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                            Marketing Centre
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                            Your advertisement credit has fallen to MYR0.00.
                            </Typography>
                            <Button variant="contained" color="primary">
                            Top Up
                            </Button>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
