import React from 'react';
import styles from '../styles/PricingCard.module.css';
import primaryStyles from '../styles/PrimaryButton.module.css';
import SellingPoint from './SellingPoint';

export default function PricingCard({
  marginTop,
  price,
  tier,
  text,
  sp1,
  sp2,
  sp3,
}: {
  marginTop: boolean;
  price: string;
  tier: string;
  text: string;
  sp1: string;
  sp2: string;
  sp3: string;
}) {
  return (
    <div
      className={`${styles.pricingCard} ${
        marginTop ? styles.mt : styles.selected
      }`}
    >
      <h4 className={styles.headingOne}>{tier}</h4>
      <h5 className={styles.headingTwo}>
        ${price} <span className={styles.span}>/ Month</span>
      </h5>
      <p className={styles.p}>{text}</p>
      <SellingPoint spt="Max images" sp={sp1} />
      <SellingPoint spt="Support" sp={sp3} />
      <SellingPoint spt="Speed" sp={sp2} />
      <button className={`${primaryStyles.button} ${styles.button}`}>
        Subscribe
      </button>
    </div>
  );
}
