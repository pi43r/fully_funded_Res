import Navlinks from './NavLinks'
import styles from '../navBar/NavBar.module.css'
import { ImMenu } from 'react-icons/im'
import { FaWindowClose } from 'react-icons/fa'
import { useState } from 'react'

const MobileNavigation = () => {
  const [open, setOpen] = useState(false)

  const hamburgerIcon = (
    <ImMenu
      className={styles.Hamburger}
      size="50px"
      onClick={() => setOpen(!open)}
    />
  )
  const closeIcon = (
    <FaWindowClose
      classname={styles.Hamburger}
      size="50px"
      onClick={() => setOpen(!open)}
    />
  )

  const closeMobileMenu = () => setOpen(false)
  return (
    <nav className={styles.MobileNavigation}>
      {open ? closeIcon : hamburgerIcon}
      {open && <Navlinks isMobile={true} closeMobileMenu={closeMobileMenu} />}
    </nav>
  )
}

export default MobileNavigation
