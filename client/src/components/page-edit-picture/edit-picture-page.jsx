import React, { Component } from 'react';
import { requestToApi } from 'react-data-fetching';

const upload = async file => {
    const form = new FormData();
    form.append('pic', file);
  //
  // const res = await requestToApi({
  //   url: '/api/persons/abc/picture',
  //   headers: {
  //     'Content-Type': undefined
  //   },
  //   method: 'FORM_DATA',
  //   // body: {
  //   //   pic: file
  //   // }
  //   body: {
  //     pic: file
  //   }
  // });

  const res = await fetch('/api/persons/0/picture', {
    method: 'POST',
    body: form
  });

  console.log(res);
};

class EditPicturePage extends Component {
  handleChange = e => {
    console.log(e.target.files[0]);
    upload(e.target.files[0]);
  };

  render() {
    return (
      <div>
        <img src="/pictures/1540391752422.JPG" alt="" />
        <input onChange={this.handleChange} type="file" />
        <button>Test</button>
      </div>
    );
  }
}

export default EditPicturePage;
