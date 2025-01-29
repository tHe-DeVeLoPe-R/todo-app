import React from "react"
import styles from '../styles/Nav.module.css'
import logo from '../public/images/logo.svg'
import { useDispatch } from "react-redux"
import { logout } from "@/redux/authSlice"
import { useRouter } from "next/router"

export default function Nav() {
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogout = ()=>{
     dispatch(logout)
     router.push('/')
    }
    return (
        <div className={styles.navMain}>
            <img src={logo.src} alt="" />
            <ul >
                <li className = {styles.navItem}>
                    <a href="">Home</a>
                </li>
                
                <li className = {styles.navItem}>
                    <a onClick={handleLogout} href="#">Logout</a>
                </li>
                <li className = {styles.navItem}>
                    <a href="">About App</a>
                </li>
            </ul>

        </div>
    )
}