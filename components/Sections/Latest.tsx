import React from 'react';
import styles from '../../styles/Latest.module.css';
import primaryStyles from '../../styles/PrimaryButton.module.css';
import LatestRender from '../LatestRender';
import LIVING from '../../public/living.jpeg';
import BED from '../../public/bed.jpeg';
import BEDROOM from '../../public/bedroom.jpeg';
import KITCHEN from '../../public/kitchen.jpeg';

export default function Latest() {
  return (
    <div className={styles.latest}>
      <div className={styles.latestInner}>
        <div className={styles.topBar}>
          <h2 className={styles.heading}>
            Latest<span className={styles.span}> Renders</span>
          </h2>
          <button className={`${primaryStyles.button} ${styles.button}`}>
            Try It out
          </button>
        </div>
        <div className={styles.grid}>
          <LatestRender image={LIVING} />
          <LatestRender image={BED} />
          <LatestRender image={BEDROOM} />
          <LatestRender image={KITCHEN} />
        </div>
      </div>
    </div>
  );
}
