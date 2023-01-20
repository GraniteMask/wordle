import React from 'react'
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbarWrapper}>
        <div><i className='bx bx-menu'></i></div>
        <div>Wordle</div>
        <div>
            <i className='bx bx-help-circle'></i>
            <i className='bx bxs-cog'></i>
        </div>
    </div>
  )
}
