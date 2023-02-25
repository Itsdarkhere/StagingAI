import React from 'react';
import FormSelect from './FormSelect';
import styles from '../styles/StagingForm.module.css';

export default function FormFurnish() {
  interface Option {
    value: string;
    label: string;
  }

  const roomOptions: Option[] = [
    { value: 'living room', label: 'Living room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'study room', label: 'Study room' },
    { value: 'home office', label: 'Home office' },
    { value: 'dining room', label: 'Dining room' },
    { value: 'bathroom', label: 'Bathroom' },
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
      <label htmlFor="room" className={styles.label}>
        Room Type
      </label>
      <FormSelect
        options={roomOptions}
        onChange={undefined}
        hasOnChange={false}
        name="room"
        placeholder="Room"
      />
      <label htmlFor="style" className={styles.label}>
        Style
      </label>
      <FormSelect
        options={styleOptions}
        onChange={undefined}
        hasOnChange={false}
        name="style"
        placeholder="Style"
      />
    </div>
  );
}
