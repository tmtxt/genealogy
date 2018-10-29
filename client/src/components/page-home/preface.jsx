import React from 'react';
import withContentData from '../content/with-content-data';
import { CardText } from 'reactstrap';
import ReactMarkdown from 'react-markdown';

const PrefaceText = ({ contentValue }) => {
  return (
    <CardText>
      <ReactMarkdown source={contentValue} />
    </CardText>
  );
};

export default withContentData('preface')(PrefaceText);
