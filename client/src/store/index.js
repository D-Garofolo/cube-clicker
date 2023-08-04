import { createContext, useContext, useState } from 'react'
import upgradeList from '../data/upgrades.json';
import buildingList from '../data/buildings.json';

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    CHANGE_COUNT: "CHANGE_COUNT",
    CHANGE_CPC: "CHANGE_CPC",
    BUY_UPGRADE: "BUY_UPGRADE",
    BUY_BUILDING: "BUY_BUILDING",
    BUY_BUILDING_UPGRADE: "BUY_BUILDING_UPGRADE"
}

let upgrades = []
upgradeList["upgrades"].map(function(item) {        
    upgrades.push({ 
        "ID": item.ID,
        "name": item.name,
        "cost": item.cost,
        "description": item.description,
        "building": item.building,
        "multiplier": item.multiplier,
        "unlocked": item.unlocked,
        "bought": item.bought
     });
 });

 let buildings = []
 buildingList["buildings"].map(function(item) {        
    buildings.push({ 
        "ID": item.ID,
        "name": item.name,
        "baseCost": item.baseCost,
        "description": item.description,
        "amount": item.amount,
        "baseCps": item.baseCps
     });
 });

function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        count: 0,
        cubesPerClick: 1,
        cubesPerSecond: 0,
        upgradeCards: upgrades,
        buildingCards: buildings
    });


    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_COUNT: {
                return setStore({
                    count: store.count + payload,
                    cubesPerClick: store.cubesPerClick,
                    cubesPerSecond: store.cubesPerSecond,
                    upgradeCards: store.upgradeCards,
                    buildingCards: store.buildingCards
                });
            }
            case GlobalStoreActionType.CHANGE_CPC: {
                return setStore({
                    count: store.count,
                    cubesPerClick: store.cubesPerClick * payload,
                    cubesPerSecond: store.cubesPerSecond,
                    upgradeCards: store.upgradeCards,
                    buildingCards: store.buildingCards
                })
            }
            case GlobalStoreActionType.BUY_UPGRADE: {
                return setStore({
                    count: store.count - payload.cost,
                    cubesPerClick: store.cubesPerClick * payload.multiplier,
                    cubesPerSecond: store.cubesPerSecond,
                    upgradeCards: store.upgradeCards.map((item) => item.ID == payload.ID ? payload : item),
                    buildingCards: store.buildingCards
                })
            }
            case GlobalStoreActionType.BUY_BUILDING: {
                return setStore({
                    count: store.count - Math.round(payload.buildingInfo.baseCost/1.1),
                    cubesPerClick: store.cubesPerClick,
                    cubesPerSecond: store.cubesPerSecond + payload.buildingInfo.baseCps,
                    upgradeCards: store.upgradeCards.map((item) => item.ID == payload.upgradeInfo.ID ? payload.upgradeInfo: item),
                    buildingCards: store.buildingCards.map((item, i) => i == payload.buildingInfo.index ? payload.buildingInfo : item)
                })
            }
            case GlobalStoreActionType.BUY_BUILDING_UPGRADE: {
                return setStore({
                    count: store.count - payload.upgradeInfo.cost,
                    cubesPerClick: store.cubesPerClick,
                    cubesPerSecond: store.cubesPerSecond + (payload.buildingInfo.amount * payload.buildingInfo.baseCps / payload.upgradeInfo.multiplier),
                    upgradeCards: store.upgradeCards.map((item) => item.ID == payload.upgradeInfo.ID ? payload.upgradeInfo: item),
                    buildingCards: store.buildingCards.map((item, i) => i == payload.buildingInfo.index ? payload.buildingInfo : item)
                })
            }
            
            default: 
                return store;
        }
    }

    store.incrementCount = async function (num) {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_COUNT,
            payload: num
        });
    }

    store.changeCubesPerClick = async function (num) {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_CPC,
            payload: num
        });
    }

    store.purchaseUpgrade = async function (upgradeInfo) {
        storeReducer({
            type: GlobalStoreActionType.BUY_UPGRADE,
            payload: upgradeInfo
        });
    }

    store.purchaseBuilding = async function (info) {
        storeReducer({
            type: GlobalStoreActionType.BUY_BUILDING,
            payload: info
        });
    }

    store.purchaseBuildingUpgrade = async function (info) {
        storeReducer({
            type: GlobalStoreActionType.BUY_BUILDING_UPGRADE,
            payload: info
        })
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}


export default GlobalStoreContext;
export { GlobalStoreContextProvider };