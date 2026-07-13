import { Bell, Search } from 'lucide-react'
import styles from './Topbar.module.css'

function Topbar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>InfluenceOS</div>

      <label className={styles.searchBox}>
        <Search size={16} />
        <input type="search" placeholder="Search campaigns, influencers, clients" />
      </label>

      <div className={styles.actions}>
        <button type="button" className={styles.iconButton} aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className={styles.avatar} aria-label="User avatar">
          U
        </div>
      </div>
    </header>
  )
}

export default Topbar
