import React from 'react';
import styles from '../../styles/Pricing.module.css';
import PricingCard from '../PricingCard';
import SubscriptionBar from '../SubscriptionBar';

export default function Pricing() {
  return (
    <div className={styles.pricing}>
      <div className={styles.pricingInner}>
        <h2 className={styles.heading}>Pricing</h2>
        <SubscriptionBar />
        <div className={styles.cardGrid}>
          <PricingCard
            marginTop={true}
            price="20"
            tier="Hobbyist"
            text="More power for businesses looking to improve organizational efficiency and remote package management"
            sp1='1.000'
            sp2='Regular'
            sp3='In 7 days'
          />
          <PricingCard
            marginTop={false}
            price="150"
            tier="Realtor"
            text="More power for businesses looking to improve organizational efficiency and remote package management"
            sp1='10.000'
            sp2='Fast'
            sp3='In 3 days'
          />
          <PricingCard
            marginTop={true}
            price="399"
            tier="Enterprise"
            text="More power for businesses looking to improve organizational efficiency and remote package management"
            sp1='50.000'
            sp2='Turbo'
            sp3='Inside 24h'
          />
        </div>
      </div>
    </div>
  );
}
