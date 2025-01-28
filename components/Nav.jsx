import React from "react"
import { useState, useEffect } from "react"
import styles from '../styles/Nav.module.css'
import logo from '../public/images/logo.svg'

export default function Nav() {
    return (
        <div className={styles.navMain}>
            <img src={logo.src} alt="" />
            <ul >
                <li className = {styles.navItem}>
                    <a href="">Home</a>
                </li>
                
                <li className = {styles.navItem}>
                    <a href="">Logout</a>
                </li>
                <li className = {styles.navItem}>
                    <a href="">About App</a>
                </li>
            </ul>

        </div>
    )
}