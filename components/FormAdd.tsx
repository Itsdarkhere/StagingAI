import React from 'react';
import FormSelect from './FormSelect';
import styles from '../styles/StagingForm.module.css';

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
    { value: 'office3600.pt', label: 'office3600' },
    { value: 'openoffice8200.pt', label: 'openoffice8200' },
  ];

  const styleOptions: Option[] = [
    { value: 'modern', label: 'Modern' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'scandinavian', label: 'Scandinavian' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'midcentury modern', label: 'Midcentury modern' },
    { value: 'rustic', label: 'Rustic' },
  ];
  return (
    <div className={styles.formSec}>
      <label htmlFor="what_to_add" className={styles.label}>
        What to add
      </label>
      <FormSelect
        options={furnitureOptions}
        onChange={undefined}
        hasOnChange={false}
        name="what_to_add"
        placeholder="Room"
      />
    </div>
  );
}
