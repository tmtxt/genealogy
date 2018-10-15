import { Record } from 'immutable';
import moment from 'moment';

import defaultMalePicture from 'images/male-default.svg';
import defaultFemalePicture from 'images/female-default.svg';

const renderDate = (dateValue) => {
  if (!dateValue) {
    return 'Không rõ';
  }

  return new moment(dateValue).locale('vi').format('DD MMMM, YYYY');
}

const defaultProps = {
  id: null,
  name: null,
  gender: null,
  birthDate: null,
  deathDate: null,
  job: null,
  summary: null,
  isDead: false,
  marriages: null,
  father: null,
  mother: null,
  children: null,
  picture: null
};

export default class PersonRecord extends Record(defaultProps) {
  getDisplayName() {
    return this.name || 'Không rõ';
  }

  getPictureUrl() {
    if (this.picture) return this.picture;

    return (this.gender || 'male') === 'male' ? defaultMalePicture : defaultFemalePicture;
  }

  getBirthDate() {
    return renderDate(this.birthDate);
  }

  getDeathDate() {
    return renderDate(this.deathDate);
  }
}
