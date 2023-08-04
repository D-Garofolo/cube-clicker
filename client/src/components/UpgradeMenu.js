import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid'
import { GlobalStoreContext } from '../store'
import UpgradeCard from './UpgradeCard'

const UpgradeMenu = () => {
    const { store } = useContext(GlobalStoreContext);

    let upgrades = store.upgradeCards.filter((item) => item.bought == false && item.unlocked == true).map((item) => (
        <Grid item xs={3} sx={{ border: 1 }}>
            <UpgradeCard
                key={item.name}
                upgradeInfo={item}
            />
        </Grid>
    ))

    return (
        <div className="UpgradeMenu">
            <Grid container spacing={1} sx={{height: 300}}>
                {upgrades}
            </Grid>
        </div>
    );
}

export default UpgradeMenu;

