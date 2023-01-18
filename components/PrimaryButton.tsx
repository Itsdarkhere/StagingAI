import React from 'react'
import styles from '@/styles/PrimaryButton.module.css';

export default function PrimaryButton({text}: {text: string}) {
  return (
    <button className={styles.button}>{text}</button>
  )
}
