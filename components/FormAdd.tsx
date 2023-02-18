import React from 'react'
import FormSelect from './FormSelect'
import styles from "../styles/StagingForm.module.css";

export default function FormAdd() {
    interface Option {
        value: string;
        label: string;
    }
    
    const furnitureOptions: Option[] = [
        { value: 'sofa', label: 'Sofa' },
        { value: 'chair', label: 'Chair' },
        { value: 'table', label: 'Table' },
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
        <FormSelect options={furnitureOptions} onChange={undefined} hasOnChange={false} name='what_to_add' placeholder='Room' />
        <label htmlFor="style" className={styles.label}>
          Style
        </label>
        <FormSelect options={styleOptions} onChange={undefined} hasOnChange={false} name='style' placeholder='Style' />
    </div>
  )
}
