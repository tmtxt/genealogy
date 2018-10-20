import React from 'react';

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
        <PersonInfoRow label="Giới tính" value={person.getGender()} />
        <PersonInfoRow label="Ngày Sinh" value={person.getBirthDate()} />
        {person.get('isDead') && <PersonInfoRow label="Ngày Mất" value={person.getDeathDate()} />}
        <PersonInfoRow label="Nghề Nghiệp" value={person.get('job')} />
        <PersonInfoRow label="Thông Tin Thêm" value={person.get('summary')} />
      </tbody>
    </table>
  );
};

export default PersonInfoTable;
