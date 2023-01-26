'use client'
import StagingDisplay from '@/components/StagingDisplay';
import StagingForm from '@/components/StagingForm';
import React, { useState } from 'react';
import styles from '../../styles/Staging.module.css';

export default function Create() {
  const [copies, setCopies] = useState(1);

  const fetchImage = async () => {

  }

  const handleCopies = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCopies(parseInt(e.target.value));
  }
  return (
    <div className={styles.staging}>
      <StagingForm fetchImage={fetchImage} handleCopies={handleCopies} />
      <StagingDisplay copies={copies} />
    </div>
  );
}
