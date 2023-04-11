import React from 'react';
import styles from '../styles/StagingForm.module.css';
import FormSelect from './FormSelect';

export default function FormAdd() {
  interface Option {
    value: string;
    label: string;
  }

  const furnitureOptions: Option[] = [
    { value: 'bedroom9000.pt', label: 'bedroom9000' },
    { value: 'bedroom9800.pt', label: 'bedroom9800' },
    { value: 'boardroom6000.pt', label: 'boardroom6000' },
    { value: 'boardroom10000.pt', label: 'boardroom10000' },
    { value: 'empty5000.pt', label: 'empty5000' },
    { value: 'living6000.pt', label: 'living6000' },
    { value: 'living10000.pt', label: 'living10000' },
    { value: 'office10000.pt', label: 'office10000' },
    { value: 'office13200.pt', label: 'office13200' },
    { value: 'privateoffice8200.pt', label: 'privateoffice8200' },
    { value: 'privateoffice10000.pt', label: 'privateoffice10000' },
  ];

  return (
    <div className={styles.formSec}>
      <label htmlFor="what_to_add" className={styles.label}>
        Choose room type
      </label>
      <FormSelect
        options={furnitureOptions}
        onChange={undefined}
        hasOnChange={false}
        name="what_to_add"
        placeholder="Select room type"
      />
    </div>
  );
}
