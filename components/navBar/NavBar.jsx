import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/FFR-assets/Logo/FFR-logo.png'
import Insta from '../..//public/Social links/icon_instagram.svg'
import FaceBook from '../..//public/Social links/icon_facebook.svg'
import styles from '../navBar/NavBar.module.css'
import React from 'react'
import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'

export default function NavBar() {
  const [isActive, setisActive] = React.useState(false)

  return (
    <div>
      <nav
        className={styles.navBar}
        role="navigation"
        aria-label="main navigation"
      >
        <a className={styles.logo}>
          <Image src={logo} alt="FFR2"></Image>
        </a>

        <MobileNavigation />
        <Navigation />
      </nav>

      <div>
        <h1 className={styles.openCalls}>Open Calls</h1>
        <h2 className={styles.subtitleOpenCalls}>
          Browse through a list of fully funded residencies that we <br></br>
          update regularly and find the best fit for you.
        </h2>
      </div>
    </div>
  )
}
