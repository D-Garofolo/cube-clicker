import React, { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store'

const BuildingCard = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const { buildingInfo } = props

    async function handleUpgrade(event) {
        if (store.count >= buildingInfo.baseCost) {
            buildingInfo.amount++
            await store.purchaseBuilding(buildingInfo)
        }
    }

    return (
        <div onClick={handleUpgrade}>
            <div>
                {buildingInfo.name}
            </div>
            <div>
                {buildingInfo.baseCost}
            </div>
        </div>
    );
}

export default BuildingCard;