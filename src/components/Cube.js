import React, { useContext, useEffect, useState } from 'react';
import cube from '../Cube.png';
import { GlobalStoreContext } from '../store'


const Cube = () => {
    const { store } = useContext(GlobalStoreContext);

    function handleCubeClick(event) {
        store.incrementCount(1);
    }

    return (
        <div className="Cube">
            <div>Cubes: {store.count}</div>
            <img src={cube} onClick={handleCubeClick} width="300" height="300" />
        </div>
    );
}

export default Cube;

