import StatCard from '../../components/shared/StatCard'
import styles from './DashboardPage.module.css'

const stats = [
  { title: 'Influencers', value: '184', detail: '+12% this month', accent: 'violet' as const },
  { title: 'Campaigns', value: '27', detail: '6 active now', accent: 'cyan' as const },
  { title: 'Clients', value: '43', detail: '9 new prospects', accent: 'amber' as const },
]

function DashboardPage() {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Performance overview</p>
          <h1>Welcome back, Maya.</h1>
          <p className={styles.description}>
            Keep every creator relationship and campaign milestone in one polished workspace.
          </p>
        </div>
        <div className={styles.heroBadge}>Live insights</div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  )
}

export default DashboardPage
