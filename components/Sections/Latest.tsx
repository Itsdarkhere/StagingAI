import React from 'react';
import styles from '../../styles/Latest.module.css';
import primaryStyles from '../../styles/PrimaryButton.module.css';
import LatestRender from '../LatestRender';
import LIVING from '../../public/living.jpeg';
import BED from '../../public/bed.jpeg';
import BEDROOM from '../../public/bedroom.jpeg';
import KITCHEN from '../../public/kitchen.jpeg';
import K from '../../public/4k.webp';
import Link from 'next/link';

export default function Latest() {
  return (
    <div className={styles.latest}>
      <div className={styles.latestInner}>
        <div className={styles.topBar}>
          <h2 className={styles.heading}>
            Before<span className={styles.span}> After</span>
          </h2>
          <Link className={styles.link} href={'/create'}>
            View all
          </Link>
        </div>
        <div className={styles.grid}>
          <LatestRender image={LIVING} />
        </div>
      </div>
    </div>
  );
}
