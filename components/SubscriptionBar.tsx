import React from 'react';
import styles from '../styles/SubscriptionBar.module.css';
import Toggle from './Toggle';

export default function SubscriptionBar() {
  return (
    <div className={styles.subscriptionbar}>
      <h3 className={styles.heading}>Subscription</h3>
      <div className={styles.barRight}>
        <label className={styles.label}>Monthly</label>
        <Toggle />
        <label className={styles.label}>Annual</label>
        <div className={styles.save}>Save 30%</div>
      </div>
    </div>
  );
}
