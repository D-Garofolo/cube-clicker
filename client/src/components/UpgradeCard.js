import React, { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store'

const UpgradeCard = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const { upgradeInfo } = props
    const [visible, setVisible] = React.useState(false);

    async function handleUpgrade(event) {
        if (store.count >= upgradeInfo.cost) {
            upgradeInfo.bought = true
            if (upgradeInfo.building === "Cursor") {
                await store.purchaseUpgrade(upgradeInfo)
            }
            else {
                let buildingID = upgradeInfo.ID.substring(0, 2);
                let building = store.buildingCards.filter((item) => {return item.ID == buildingID})
                building = building[0]
                building.baseCps *= upgradeInfo.multiplier

                await store.purchaseBuildingUpgrade({buildingInfo: building, upgradeInfo: upgradeInfo})
            }
        }
    }

    return (
        <div onClick={handleUpgrade} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <div>
                {upgradeInfo.name}
            </div>
            <div>
                {upgradeInfo.cost}
            </div>
            <div style={{display: visible ? "inline" : "none"}}>
                {upgradeInfo.description}
            </div>
        </div>
    );
}

export default UpgradeCard;