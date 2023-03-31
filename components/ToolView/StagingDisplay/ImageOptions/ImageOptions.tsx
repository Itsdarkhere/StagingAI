import Sketch from '@/components/ToolView/StagingDisplay/ImageOptions/Sketch/Sketch';
import { RefObject } from 'react';
import styles from '../../../../styles/ImageOptions.module.css';
import Options from './Options/Options';
import Image from 'next/image';
import TRASH from '../../../../public/trash.svg';
import REPLACE from '../../../../public/replace.svg';

export default function ImageOptions({
  clickMode,
  mode,
  originalImage,
  sketchRef,
  fetching,
}: {
  clickMode: (mode: boolean) => void;
  mode: boolean;
  originalImage: string | undefined;
  sketchRef: RefObject<any>;
  fetching: boolean;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.sketchcontainer}>
        <button className={styles.button}>
          <Image
            className={styles.icon}
            src={REPLACE}
            alt="plus"
          />
            Replace</button>
        {originalImage && (
          <Sketch originalImage={originalImage} sketchRef={sketchRef} mode={mode} />
        )}
      </div>
      <Options fetching={fetching} clickMode={clickMode} mode={mode} />
    </div>
  );
}
