import { createContext, useContext, useState } from 'react'
import upgradeList from '../data/upgrades.json';
import buildingList from '../data/buildings.json';

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    CHANGE_COUNT: "CHANGE_COUNT",
    CHANGE_CPC: "CHANGE_CPC",
    BUY_UPGRADE: "BUY_UPGRADE",
    BUY_BUILDING: "BUY_BUILDING",
    SELL_BUILDING: "SELL_BUILDING",
    BUY_BUILDING_UPGRADE: "BUY_BUILDING_UPGRADE",
    SET_USER: "SET_USER",
    PRESTIGE: "PRESTIGE"
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
        buildingCards: buildings,
        prestigeLevel: 1.00,
        totalCubes: 0
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
                    buildingCards: store.buildingCards,
                    prestigeLevel: store.prestigeLevel,
                    totalCubes: store.totalCubes + payload
                });
            }
            case GlobalStoreActionType.CHANGE_CPC: {
                return setStore({
                    count: store.count,
                    cubesPerClick: store.cubesPerClick * payload,
                    cubesPerSecond: store.cubesPerSecond,
                    upgradeCards: store.upgradeCards,
                    buildingCards: store.buildingCards,
                    prestigeLevel: store.prestigeLevel,
                    totalCubes: store.totalCubes
                })
            }
            case GlobalStoreActionType.BUY_UPGRADE: {
                return setStore({
                    count: store.count - payload.cost,
                    cubesPerClick: store.cubesPerClick * payload.multiplier,
                    cubesPerSecond: store.cubesPerSecond,
                    upgradeCards: store.upgradeCards.map((item) => item.ID == payload.ID ? payload : item),
                    buildingCards: store.buildingCards,
                    prestigeLevel: store.prestigeLevel,
                    totalCubes: store.totalCubes
                })
            }
            case GlobalStoreActionType.BUY_BUILDING: {
                return setStore({
                    count: store.count - Math.round(payload.buildingInfo.baseCost/1.1),
                    cubesPerClick: store.cubesPerClick,
                    cubesPerSecond: store.cubesPerSecond + payload.buildingInfo.baseCps,
                    upgradeCards: store.upgradeCards.map((item) => item.ID == payload.upgradeInfo.ID ? payload.upgradeInfo: item),
                    buildingCards: store.buildingCards.map((item, i) => i == payload.buildingInfo.index ? payload.buildingInfo : item),
                    prestigeLevel: store.prestigeLevel,
                    totalCubes: store.totalCubes
                })
            }
            case GlobalStoreActionType.SELL_BUILDING: {
                return setStore({
                    count: store.count + Math.round(payload.buildingInfo.baseCost/1.1 * 0.65),
                    cubesPerClick: store.cubesPerClick,
                    cubesPerSecond: store.cubesPerSecond - payload.buildingInfo.baseCps,
                    upgradeCards: store.upgradeCards.map((item) => item.ID == payload.upgradeInfo.ID ? payload.upgradeInfo: item),
                    buildingCards: store.buildingCards.map((item, i) => i == payload.buildingInfo.index ? payload.buildingInfo : item),
                    prestigeLevel: store.prestigeLevel,
                    totalCubes: store.totalCubes
                })
            }
            case GlobalStoreActionType.BUY_BUILDING_UPGRADE: {
                return setStore({
                    count: store.count - payload.upgradeInfo.cost,
                    cubesPerClick: store.cubesPerClick,
                    cubesPerSecond: store.cubesPerSecond + (payload.buildingInfo.amount * payload.buildingInfo.baseCps / payload.upgradeInfo.multiplier),
                    upgradeCards: store.upgradeCards.map((item) => item.ID == payload.upgradeInfo.ID ? payload.upgradeInfo: item),
                    buildingCards: store.buildingCards.map((item, i) => i == payload.buildingInfo.index ? payload.buildingInfo : item),
                    prestigeLevel: store.prestigeLevel,
                    totalCubes: store.totalCubes
                })
            }
            case GlobalStoreActionType.SET_USER: {
                return setStore({
                    count: payload.count,
                    cubesPerClick: payload.cubesPerClick,
                    cubesPerSecond: payload.cubesPerSecond,
                    upgradeCards: payload.upgradeCards,
                    buildingCards: payload.buildingCards,
                    prestigeLevel: payload.prestigeLevel,
                    totalCubes: payload.totalCubes
                })
            }
            case GlobalStoreActionType.PRESTIGE: {
                return setStore({
                    count: 0,
                    cubesPerClick: 1,
                    cubesPerSecond: 0,
                    upgradeCards: payload.upgrades,
                    buildingCards: payload.buildings,
                    prestigeLevel: payload.prestigeLevel,
                    totalCubes: store.totalCubes
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

    store.sellBuilding = async function (info) {
        storeReducer({
            type: GlobalStoreActionType.SELL_BUILDING,
            payload: info
        })
    }

    store.purchaseBuildingUpgrade = async function (info) {
        storeReducer({
            type: GlobalStoreActionType.BUY_BUILDING_UPGRADE,
            payload: info
        })
    }

    store.loadUser = async function (user) {
        if (user.CpC != 1 || user.CpS != 0) {
            let updatedUser = {
                count: user.count,
                cubesPerClick: user.CpC,
                cubesPerSecond: user.CpS,
                upgradeCards: upgrades,
                buildingCards: buildings
            }
            let unlockedUpgrades = new Set(user.unlocked);
            let boughtUpgrades = new Set(user.bought);
            updatedUser.upgradeCards.map((upgrade) => {
                upgrade.unlocked = (boughtUpgrades.has(upgrade.ID) || unlockedUpgrades.has(upgrade.ID));
                upgrade.bought = (boughtUpgrades.has(upgrade.ID))
            });

            updatedUser.buildingCards.map((building, i) => {
                building.baseCost = user.buildings[i].nextCost;
                building.amount = user.buildings[i].quantity;
            });
            
            storeReducer({
                type: GlobalStoreActionType.SET_USER,
                payload: updatedUser
            })
        }
    }

    store.prestige = async function (info) {
        let newUpgrades = []
        upgradeList["upgrades"].map(function(item) {        
            newUpgrades.push({ 
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

        let newBuildings = []
        buildingList["buildings"].map(function(item) {        
            newBuildings.push({ 
                "ID": item.ID,
                "name": item.name,
                "baseCost": item.baseCost,
                "description": item.description,
                "amount": item.amount,
                "baseCps": item.baseCps
            });
        });

        let payload = {
            upgrades: newUpgrades,
            buildings: newBuildings,
            prestigeLevel: info
        }

        storeReducer({
            type: GlobalStoreActionType.PRESTIGE,
            payload: payload
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