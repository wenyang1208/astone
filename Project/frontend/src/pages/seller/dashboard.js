import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Button, Divider, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import SellerSidebar from '../../components/sellerSidebar';
import { SellerService } from '../../services/SellerService';
import { ACCESS_TOKEN } from '../../constant';
import { jwtDecode } from 'jwt-decode';
import SellerHeader from '../../components/sellerHeader';

function Dashboard() {
    const StatsContainer = styled(Box)({
        textAlign: 'center',
        padding: '16px',
        position: 'relative',
    });

    const sellerService = new SellerService();
    const token = localStorage.getItem(ACCESS_TOKEN);
    const sellerId = jwtDecode(token).seller_id;
    const navigate = useNavigate();
    
    const TodoCard = ({ value, label, showDivider = true, onClick, showBadge = false }) => (
        <StatsContainer onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <Badge color="error" variant="dot" invisible={!showBadge}>
                <Typography variant="h4" 
                    sx={{ 
                        color: '#1976d2', 
                        fontWeight: 500, 
                        mb: 0.5
                      
                    }}>
                    {value}
                </Typography>
            </Badge>
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
                        onClick={item.onClick}
                        showBadge={item.showBadge}
                    />
                </Grid>
            ))}
        </Grid>
    );

    const handleToProcessShipmentClick = () => {
        navigate('/shipment');
    };

    const [todoData, setTodoData] = useState({
        unpaid: 0,
        to_processed_shipment: 0,
        processed_shipment: 0,
        pending_cancellation: 0,
        pending_return: 0,
        removed_product: 0,
        sold_product: 0,
        pending_promotion: 0,
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
        { value: todoData.to_processed_shipment, label: "To-Process Shipment", onClick: handleToProcessShipmentClick, showBadge: todoData.to_processed_shipment > 0 },
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

                        {/* Rest of the dashboard content remains the same */}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;