import React from 'react';
import withContentData from '../content/with-content-data';
import ReactMarkdown from 'react-markdown';

const PrefaceText = ({ contentValue }) => {
  return <ReactMarkdown source={contentValue} />;
};

export default withContentData('preface')(PrefaceText);
