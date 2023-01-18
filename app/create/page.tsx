import StagingDisplay from '@/components/StagingDisplay';
import StagingForm from '@/components/StagingForm';
import React from 'react';
import styles from '../../styles/Staging.module.css';

export default function Create() {
  return (
    <div className={styles.staging}>
      <StagingForm />
      <StagingDisplay />
    </div>
  );
}
