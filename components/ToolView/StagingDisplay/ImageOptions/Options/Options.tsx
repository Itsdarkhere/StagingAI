import FormAdd from '@/components/FormAdd';
import Spinner from '@/components/Spinner';
import React from 'react';
import styles from '../../../../../styles/ToolView/StagingDisplay/ImageOptions/Options/Options.module.css';
import Image from 'next/image';
import wand from "../../../../../public/generate.svg";
import { Slider } from "@mui/material"
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material"
import FormSelect from '@/components/FormSelect';

export default function Options({
  fetching,
  changeMode,
  mode,
  copies,
  sliderChange,
}: {
  fetching: boolean;
  changeMode: (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => void;
  mode: string;
  copies: number;
  sliderChange: (event: Event, value: number | number[], activeThumb: number) => void;
}) {

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
    <div className={styles.container}>
      {/* <OptionsModel clickMode={clickMode} mode={mode} /> */}
      <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={changeMode}
      aria-label="text alignment"
      >
        <ToggleButton value="inpainting" aria-label="left aligned">
          Inpainting
        </ToggleButton>
        <ToggleButton value="img2img" aria-label="centered">
          IMG2IMG
        </ToggleButton>
        <ToggleButton value="controlnet" aria-label="right aligned">
          Controlnet
        </ToggleButton>
      </ToggleButtonGroup>
      <label htmlFor="what_to_add" className={styles.label}>
        Select room type
      </label>
      <FormSelect
        options={furnitureOptions}
        onChange={undefined}
        hasOnChange={false}
        name="what_to_add"
        placeholder="Room type"
      />
      <label htmlFor="copies" className={styles.label}>
        Amount of copies
      </label>
      <Slider
        id="copies"
        name="copies"
        aria-label="copies"
        min={1}
        max={8}
        defaultValue={2}
        step={1}
        value={copies}
        onChange={sliderChange}
      />
      <Button
        type="submit"
        disabled={fetching}
        variant='contained'
        style={{marginTop: 12, height: 45}}
      >
        {fetching ? <Spinner wh={30} white={true} /> : (
          <>Generate <Image src={wand} style={{width: 25, height: 25, marginLeft: 2}} alt="wand" /></>
        )}
      </Button>
    </div>
  );
}
