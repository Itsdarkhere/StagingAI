import React from 'react';
import InfiniteScroll from './InfiniteScroll/InfiniteScroll';
import styles from '../../styles/ImagesContent.module.css';
import { Alert, AlertTitle } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export default async function ImagesContent() {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.container}>
      {/* <Alert severity="info" variant='filled'>
        <AlertTitle>Information</AlertTitle>
        Generated images are only stored for 72 hours. 
      </Alert> */}
      <InfiniteScroll
        session={session}
      />
    </div>
  );
}
