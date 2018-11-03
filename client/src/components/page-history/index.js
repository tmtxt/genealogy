import React from 'react';
import ReactMarkdown from 'react-markdown';

import withContentData from 'components/content/with-content-data';

import styles from './style.scss';
import { Card, CardBody, CardHeader } from 'reactstrap';

const ContentValue = withContentData('history')(({ contentValue }) => (
  <ReactMarkdown source={contentValue} />
));

const HistoryPage = () => (
  <Card>
    <CardHeader className={styles.cardTitle}>Văn tế tổ</CardHeader>
    <CardBody>
      <ContentValue />
    </CardBody>
  </Card>
);

export default HistoryPage;
