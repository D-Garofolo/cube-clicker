import React, { StrictMode, useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';

const BuildingCard = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const { buildingInfo } = props;

    async function handleBuy(event) {
        if (store.count >= buildingInfo.baseCost) {
            buildingInfo.amount++
            buildingInfo.baseCost = Math.round(buildingInfo.baseCost * 1.1)

            let upgradeID = buildingInfo.ID + buildingInfo.amount.toString() 
            let upgrade = store.upgradeCards.filter((item) => {return item.ID == upgradeID})
            if (upgrade.length > 0) {
                upgrade = upgrade[0]
                upgrade.unlocked = true
            }

            await store.purchaseBuilding({buildingInfo: buildingInfo, upgradeInfo: upgrade})
        }
    }

    async function handleSell(event) {
        if (buildingInfo.amount > 0) {
            let upgradeID = buildingInfo.ID + buildingInfo.amount.toString()
            let upgrade = store.upgradeCards.filter((item) => {return item.ID == upgradeID})
            if (upgrade.length > 0) {
                upgrade = upgrade[0]
                upgrade.unlocked = false
            }

            buildingInfo.amount--
            buildingInfo.baseCost = Math.round(buildingInfo.baseCost / 1.1)

            await store.sellBuilding({buildingInfo: buildingInfo, upgradeInfo: upgrade})
        }
    }

    return (
        <div>
            <div>
                {buildingInfo.name}
            </div>
            <div>
                {buildingInfo.baseCost}
            </div>
            <div>
                {buildingInfo.amount}
            </div>
            <div>
                <Button onClick={handleBuy}>Buy</Button>
                <Button onClick={handleSell}>Sell</Button>
            </div>
        </div>
    );
}

export default BuildingCard;