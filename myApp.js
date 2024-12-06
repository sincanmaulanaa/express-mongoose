require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'usersData',
});

let Person;

let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let newPerson = new Person({
    name: 'Sincan Maulana',
    age: 21,
    favoriteFoods: ['Ayam Goreng', 'Mie Kambing'],
  });
  newPerson.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

let arrayOfPeople = [
  {
    name: 'Sincan Maulana',
    age: 21,
    favoriteFoods: ['Ayam Goreng', 'Mie Kambing'],
  },
  {
    name: 'Zainur Roziqin',
    age: 20,
    favoriteFoods: ['Bakso Sapi', 'Keripik Kaca'],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, foundFood) => {
    if (err) return console.log(err);
    done(null, foundFood);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, foundPerson) => {
    if (err) return console.log(err);
    done(null, foundPerson);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  Person.findById({ _id: personId }, (err, foundPerson) => {
    if (err) return console.log(err);

    foundPerson.favoriteFoods.push(foodToAdd);
    foundPerson.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({ _id: personId }, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';
  Person.remove({ name: nameToRemove }, (err, removedDocs) => {
    if (err) return console.log(err);
    done(null, removedDocs);
  });
};

const queryChain = (done) => {
  const foodToSearch = 'burrito';
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, listPeople) => {
      if (err) return console.log(err);
      done(null, listPeople);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
