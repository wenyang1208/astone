import React from 'react'
import { Box, Grid } from '@mui/material';
import SellerHeader from '../../components/sellerHeader';
import SellerSidebar from '../../components/sellerSidebar';

const Finance = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <SellerHeader sx={{ position: 'fixed', zIndex: 1200 }} />
            <Grid container>
                <Grid item xs={1.5}>
                    <SellerSidebar />
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        </Box>
                
    )
}

export default Finance;