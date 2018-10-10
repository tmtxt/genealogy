import React from 'react';
import moment from 'moment';

const renderDate = (dateValue: ?string) => {
  if (!dateValue) {
    return 'Không rõ';
  }

  return new moment(dateValue).locale('vi').format('DD MMMM, YYYY');
};

const PersonInfoRow = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

const PersonInfoTable = ({ person }) => {
  return (
    <table className="table">
      <tbody>
        <PersonInfoRow label="Ngày Sinh" value={renderDate(person.get('birthDate'))} />
        {person.get('deathDate') && (
          <PersonInfoRow label="Ngày Mất" value={renderDate(person.get('deathDate'))} />
        )}
        <PersonInfoRow label="Nghề Nghiệp" value={person.get('job')} />
        <PersonInfoRow label="Thông Tin Thêm" value={person.get('summary')} />
      </tbody>
    </table>
  );
};

export default PersonInfoTable;
