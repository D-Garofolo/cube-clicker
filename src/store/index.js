import { createContext, useContext, useState } from 'react'
import upgradeList from '../data/upgrades.json';
import buildingList from '../data/buildings.json';

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    CHANGE_COUNT: "CHANGE_COUNT",
    CHANGE_CPC: "CHANGE_CPC",
    BUY_UPGRADE: "BUY_UPGRADE",
    BUY_BUILDING: "BUY_BUILDING"
}

let upgrades = []
upgradeList["upgrades"].map(function(item) {        
    upgrades.push({ 
        "name": item.name,
        "cost": item.cost,
        "description": item.description,
        "building": item.building,
        "multiplier": item.multiplier
     });
 });

 let buildings = []
 buildingList["buildings"].map(function(item) {        
    buildings.push({ 
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
                    upgradeCards: store.upgradeCards.filter(curr => curr.name !== payload.name),
                    buildingCards: store.buildingCards
                })
            }
            case GlobalStoreActionType.BUY_BUILDING: {
                return setStore({
                    count: store.count - payload.baseCost,
                    cubesPerClick: store.cubesPerClick,
                    cubesPerSecond: store.cubesPerSecond + payload.baseCps,
                    upgradeCards: store.upgradeCards,
                    buildingCards: store.buildingCards.map((item, i) => i == payload.index ? payload : item)
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

    store.purchaseBuilding = async function (buildingInfo) {
        storeReducer({
            type: GlobalStoreActionType.BUY_BUILDING,
            payload: buildingInfo
        });
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