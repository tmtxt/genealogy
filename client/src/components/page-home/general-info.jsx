import React from 'react';
import withContentData from '../content/with-content-data';
import ReactMarkdown from 'react-markdown';

const GeneralInfoText = ({ contentValue }) => {
  return <ReactMarkdown source={contentValue} />;
};

export default withContentData('general-info')(GeneralInfoText);
