import React, { useContext, useEffect, useState, useRef } from 'react';
import { useInterval } from 'usehooks-ts' ;
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import cube from '../Cube.png';
import Grid from '@mui/material/Grid';
import { AuthContext } from '../auth'
import { GlobalStoreContext } from '../store'


const Cube = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [loginOpen, setLoginOpen] = React.useState(false);
    const [nameInput, setNameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');

    const handleRegisterOpen = () => {
        setOpen(true);
    }

    const handleLoginOpen = () => {
        setLoginOpen(true);
    }

    const handleClose = () => {
        setLoginOpen(false);
        setOpen(false);
    }

    const handleRegister = () => {
        auth.registerUser({
            name: nameInput,
            password: passwordInput
        });
        setOpen(false);
    }

    const handleLogin = () => {
        auth.loginUser({
            name: nameInput,
            password: passwordInput
        }, store);
        setLoginOpen(false);
    }

    const handleLogout = () => {
        auth.logoutUser();
    }

    const handleChange = (event) => {
        setNameInput(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordInput(event.target.value);
    }

    const handleSave = () => {
        let upgradeCardsToSave = store.upgradeCards.filter((item) => item.bought);
        let upgradesBought = [];
        upgradeCardsToSave.map(function (item) {
            upgradesBought.push(item.ID);
        })

        upgradeCardsToSave = store.upgradeCards.filter((item) => !item.bought && item.unlocked);
        let upgradesUnlocked = [];
        upgradeCardsToSave.map(function (item) {
            upgradesUnlocked.push(item.ID);
        })

        auth.updateUser({
            name: auth.user.name,
            password: auth.user.password,
            count: store.count,
            CpS: store.cubesPerSecond,
            CpC: store.cubesPerClick,
            unlocked: upgradesUnlocked,
            bought: upgradesBought,
            buildings: store.buildingCards
        })
    }

    function handleCubeClick(event) {
        store.incrementCount(store.cubesPerClick);
    }

    useInterval(() => {
        store.incrementCount(store.cubesPerSecond);
      }, 1000);

    return (
        <div className="Cube">
            <div>Cubes: {store.count}</div>
            <div>Cubes per click: {store.cubesPerClick}</div>
            <div>Cubes per second: {store.cubesPerSecond}</div>
            <img src={cube} onClick={handleCubeClick} width="300" height="300" />
            <div>
                <Button style={{display: auth.loggedIn ? "none" : "inline"}} onClick={handleRegisterOpen}>Register</Button>
                <Button style={{display: auth.loggedIn ? "none" : "inline"}} onClick={handleLoginOpen}>Login</Button>
                <Button style={{display: auth.loggedIn ? "inline" : "none"}} onClick={handleSave}>Save</Button>
                <Button style={{display: auth.loggedIn ? "inline" : "none"}} onClick={handleLogout}>Logout</Button>
            </div>
            <Modal id="login-modal" open={open} onClose={handleClose}>
                <Grid id='login-box'>
                    <Grid item id='login-item' xs={12}>
                        <TextField onChange={handleChange} fullWidth label="Name"/>
                    </Grid>
                    <Grid item id='login-item' xs={12}>
                        <TextField onChange={handlePasswordChange} fullWidth label="Password"/>
                    </Grid>
                    <Grid item id='login-item' xs={12}>
                        <Button onClick={handleRegister}>Register</Button>
                    </Grid>
                </Grid>
            </Modal> 
            <Modal id="login-modal" open={loginOpen} onClose={handleClose}>
                <Grid id='login-box'>
                    <Grid item id='login-item' xs={12}>
                        <TextField onChange={handleChange} fullWidth label="Name"/>
                    </Grid>
                    <Grid item id='login-item' xs={12}>
                        <TextField onChange={handlePasswordChange} fullWidth label="Password"/>
                    </Grid>
                    <Grid item id='login-item' xs={12}>
                        <Button onClick={handleLogin}>Login</Button>
                    </Grid>
                </Grid>
            </Modal> 
        </div>
    );
}

export default Cube;

