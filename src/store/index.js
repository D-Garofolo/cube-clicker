import { createContext, useContext, useState } from 'react'

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    CHANGE_COUNT: "CHANGE_COUNT"
}

function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        count: 0,
    });


    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_COUNT: {
                return setStore({
                    count: store.count + payload
                });
            }
            default: 
                return store;
        }
    }

    store.incrementCount = async function (num) {
        console.log("WORK");
        storeReducer({
            type: GlobalStoreActionType.CHANGE_COUNT,
            payload: num
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