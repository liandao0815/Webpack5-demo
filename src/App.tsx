import React from 'react'
import { hot } from 'react-hot-loader/root'
import styles from '@style/App.module.less'

const App = () => (
  <div className={styles.red}>
    Hello Webpack5
    <div className={styles.logo} />
  </div>
)

export default hot(App)
