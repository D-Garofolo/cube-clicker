import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid'
import { GlobalStoreContext } from '../store'
import BuildingCard from './BuildingCard'

const BuildingMenu = () => {
    const { store } = useContext(GlobalStoreContext);

    let buildings = store.buildingCards.map((item) => (
        <Grid item xs={12} sx={{ border: 1 }}>
            <BuildingCard
                key={item.name}
                buildingInfo={item}
            />
        </Grid>
    ))

    return (
        <div className="BuildingMenu">
            <Grid container spacing={1} sx={{height: 600}}>
                {buildings}
            </Grid>
        </div>
    );
}

export default BuildingMenu;

