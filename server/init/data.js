'use strict';
// ensure some data for the app to run

const dal = require('../dal');

const personDal = dal.person;
const userDal = dal.user;

// ensure person data
const ensurePersonData = async logTrail => {
  // count number of person first
  const personCount = await personDal.countPerson(logTrail);

  // no need to insert
  if (personCount) return;

  // insert root person
  const rootPerson = await personDal.insertRootPerson({ name: 'Root', gender: 'male' }, logTrail);
  const rootWifePerson = await personDal.addWife(
    rootPerson.id,
    1,
    1,
    { name: 'Root Wife', gender: 'female' },
    logTrail
  );

  // f1, 1st child, male with 1 wife
  const f1MalePerson = await personDal.addChild(
    rootPerson.id,
    rootWifePerson.id,
    1,
    { name: 'F1 Male', gender: 'male' },
    logTrail
  );
  const f1MaleWifePerson = await personDal.addWife(
    f1MalePerson.id,
    1,
    1,
    { name: "F1 Male's wife" },
    logTrail
  );

  // f1, 2nd child, female, no husband
  await personDal.addChild(
    rootPerson.id,
    rootWifePerson.id,
    2,
    { name: 'F1 Female', gender: 'female' },
    logTrail
  );

  // f2, 1st child, male with 1 wife
  const f2MalePerson = await personDal.addChild(
    f1MalePerson.id,
    f1MaleWifePerson.id,
    1,
    { name: 'F2 Male', gender: 'male' },
    logTrail
  );
  await personDal.addWife(f2MalePerson.id, 1, 1, { name: "F2 Male's wife" }, logTrail);

  // f2, 2nd child, female with no marriage
  await personDal.addChild(
    f1MalePerson.id,
    f1MaleWifePerson.id,
    2,
    { name: 'F2 Female', gender: 'female' },
    logTrail
  );
};

// create default admin user
const ensureUserData = async logTrail => {
  try {
    await userDal.addNewUser({
      username: 'admin',
      password: 'admin'
    });
    logTrail.push('info', 'ensureUserData', 'User admin inserted');
  } catch (e) {
    logTrail.push('info', 'ensureUserData', 'Admin user already exists');
  }
};

// create data if necessary
const ensureData = async logTrail => {
  await ensurePersonData(logTrail);
  await ensureUserData(logTrail);
};

module.exports = ensureData;
