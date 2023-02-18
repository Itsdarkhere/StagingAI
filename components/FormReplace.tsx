import React from 'react'
import FormSelect from './FormSelect'
import styles from "../styles/StagingForm.module.css"

export default function FormReplace() {
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
        <label htmlFor="to_replace" className={styles.label}>
          What to replace
        </label>
        <FormSelect options={furnitureOptions} onChange={undefined} hasOnChange={false} name='to_replace' placeholder='Room' />
        <label htmlFor="replace_with" className={styles.label}>
          Replace with
        </label>
        <FormSelect options={furnitureOptions} onChange={undefined} hasOnChange={false} name='replace_with' placeholder='Style' />
    </div>
  )
}
