import styles from './SearchFilter.module.css'

export default function SearchFilter(props) {
  return props.trigger ? (
    <div className={styles.popup}>
      <div className={styles.popupinner}>
        <button
          className={styles.closebtn}
          onClick={() => props.setTrigger(false)}
        >
          close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ''
  )
}
