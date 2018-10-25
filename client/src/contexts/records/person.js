import { Record } from 'immutable';
import moment from 'moment';

import defaultMalePicture from 'images/male-default.png';
import defaultFemalePicture from 'images/female-default.png';

const renderDate = dateValue => {
  if (!dateValue) {
    return 'Không rõ';
  }

  return new moment(dateValue).locale('vi').format('DD MMMM, YYYY');
};

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
    return this.name || 'Không rõ tên';
  }

  getPictureUrl() {
    if (this.picture) {
      return `/pictures/${this.picture}`;
    }

    return (this.gender || 'male') === 'male' ? defaultMalePicture : defaultFemalePicture;
  }

  getBirthDate() {
    return renderDate(this.birthDate);
  }

  getDeathDate() {
    return renderDate(this.deathDate);
  }

  getGender() {
    return this.gender === 'female' ? 'Nữ' : 'Nam';
  }
}
