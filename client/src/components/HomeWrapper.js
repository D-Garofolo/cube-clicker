import React, { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext} from '../store'
import UpgradeMenu from './UpgradeMenu'
import BuildingMenu from './BuildingMenu'
import Cube from './Cube'
import Grid from '@mui/material/Grid'

export default function HomeWrapper() {
    const { store } = useContext(GlobalStoreContext);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <UpgradeMenu/>
                </Grid>
                <Grid item xs={4}>
                    <Cube/>
                </Grid>
                <Grid item xs={4}>
                    <BuildingMenu/>
                </Grid>
            </Grid>
        </div>
    );
}


              