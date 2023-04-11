import Image from 'next/image';
import { Tooltip } from 'react-tooltip';
import PLUS from '../../../../../../public/plus.svg';
import REPLACE from '../../../../../../public/replace.svg';
import TRASH from '../../../../../../public/trash.svg';
import styles from '../../../../../../styles/FormInpainting.module.css';

export default function OptionsModel({
  clickMode,
  mode,
}: {
  clickMode: (mode: boolean) => void;
  mode: string;
}) {
  return (
    <div className={styles.ipButtonContainer}>
      <Tooltip
        place="bottom"
        style={{ opacity: 1 }}
        variant="light"
        delayShow={500}
        anchorSelect=".my-tooltip"
      />
      <button
        data-tooltip-content="Edit only a part of the picture."
        type="button"
        className={`${styles.ipButton} 
              ${!mode && styles.selected} my-tooltip`}
        onClick={() => clickMode(false)}
      >
        {/* <Image
          className={`${!mode && styles.brightImage}`}
          src={PLUS}
          alt="plus"
          style={{ marginBottom: 5 }}
        /> */}
        Inpainting
      </button>
      <button
        type="button"
        className={`${styles.ipButton} ${mode && styles.selected} my-tooltip`}
        data-tooltip-content="Edit the whole picture."
        onClick={() => clickMode(true)}
      >
        {/* <Image
          className={`${mode && styles.brightImage}`}
          src={TRASH}
          alt="plus"
          style={{ marginBottom: 5 }}
        /> */}
        Img2Img
      </button>
      <button
        type="button"
        className={`${styles.ipButton} ${mode && styles.selected} my-tooltip`}
        data-tooltip-content="Edit full image, try to retain dimensions."
        onClick={() => clickMode(true)}
      >
        {/* <Image
          className={`${mode && styles.brightImage}`}
          src={REPLACE}
          height={15}
          alt="plus"
          style={{ marginBottom: 5 }}
        /> */}
        Controlnet
      </button>
    </div>
  );
}