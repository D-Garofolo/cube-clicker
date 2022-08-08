import React, { useContext, useEffect, useState } from 'react';
import cube from '../Cube.png';
import { GlobalStoreContext } from '../store'


const Cube = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        const intervalId = setInterval(() => {
            store.incrementCount(store.cubesPerSecond);
        }, 1000);
        return () => clearInterval(intervalId);
      }, [store]);


    function handleCubeClick(event) {
        store.incrementCount(store.cubesPerClick);
    }

    return (
        <div className="Cube">
            <div>Cubes: {store.count}</div>
            <div>Cubes per click: {store.cubesPerClick}</div>
            <div>Cubes per second: {store.cubesPerSecond}</div>
            <img src={cube} onClick={handleCubeClick} width="300" height="300" />
        </div>
    );
}

export default Cube;

