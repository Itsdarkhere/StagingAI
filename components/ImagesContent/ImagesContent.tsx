import React from 'react';
import InfiniteScroll from './InfiniteScroll/InfiniteScroll';
import styles from '../../styles/ImagesContent.module.css';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export default async function ImagesContent() {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.container}>
      <InfiniteScroll
        session={session}
      />
    </div>
  );
}
