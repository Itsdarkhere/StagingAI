import React from 'react'
import FormSelect from './FormSelect';
import styles from "../styles/StagingForm.module.css";

export default function FormRemove() {
    interface Option {
        value: string;
        label: string;
    }
    
    const furnitureOptions: Option[] = [
        { value: 'sofa', label: 'Sofa' },
        { value: 'chair', label: 'Chair' },
        { value: 'table', label: 'Table' },
    ];

  return (
    <div className={styles.formSec}>
        <label htmlFor="item_to_remove" className={styles.label}>
          What to remove
        </label>
        <FormSelect options={furnitureOptions} onChange={undefined} hasOnChange={false} name='item_to_remove' placeholder='Room' />
    </div>
  )
}
