import React, { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store'

const UpgradeCard = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const { upgradeInfo } = props

    async function handleUpgrade(event) {
        if (store.count >= upgradeInfo.cost) {
            if (upgradeInfo.building === "Cursor") {
                await store.purchaseUpgrade(upgradeInfo)
            }
        }
    }

    return (
        <div onClick={handleUpgrade}>
            <div>
                {upgradeInfo.name}
            </div>
            <div>
                {upgradeInfo.cost}
            </div>
        </div>
    );
}

export default UpgradeCard;