import Link from 'next/link'
import Image from 'next/image'
import styles from '../public/contact.module.css'

export default function contact() {
  return (
    <div>
      <h1 className={styles.contactTitle}>Contact</h1>
      <p className={styles.contactSubtitle}>
        If you want to contribute with an open call or have a question, feel
        free to send us an email at <br></br>
        <Link href="/contact">fullyfunded.residencies@gmail.com</Link>
      </p>
      <p>_________________________________________________________________</p>

      <p className={styles.contactSubtitle}>
        Do you need help with writing an application, motivation letter or
        project proposal?{' '}
      </p>
      <p className={styles.contactSubtitle}>
        We can help! Write to us at <br></br>{' '}
        <Link href="/contact">fullyfunded.residencies@gmail.com</Link>
      </p>

      <p className={styles.contactAim}>
        Our aim is to help everyone with professional advice regardless of
        individual financial <br></br> situation. That's why our services are
        based on donations and pay-what-you-can.
      </p>
    </div>
  )
}
