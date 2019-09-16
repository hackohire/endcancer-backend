var auth = require('./auth');
const Tag = require('../models/tag')();
const Unit = require('../models/purchased_units')();

async function checkIfUserIsAdmin (decodedToken) {
    const isUserAdmin = new Promise((resolve, reject) => {
        decodedToken.then((res, err) => {
            // console.log(res);
            if(err) reject(err);
            if (res && res['cognito:groups'] && res['cognito:groups'].length) {
                // console.log(res['cognito:groups'].indexOf('Admin'))
                resolve(res['cognito:groups'].indexOf('Admin') > -1);
            }
        });
    });
    return isUserAdmin;
}

// This method adds the tag only without Id, and then returns the array of ID of added tags with the id of tags we get from argument
async function insertManyIntoTags(tags) {
    console.log(tags);
    const tagsWithIds = tags.filter(p => p._id).map(p => p._id);
    const tagsWithoutIds = tags.filter(p => !p._id);

    const tagsAdded = new Promise((resolve, reject) => {
        Tag.insertMany(tagsWithoutIds, {ordered: false, rawResult: true}).then((d) => {
            console.log(d)
            const addedTags = d && d.ops && d.ops.length ? d.ops.map(id => id._id) : []
            const returnTags = addedTags.concat(tagsWithIds);
            resolve(returnTags.length ? returnTags : []);
        });
    })
    return tagsAdded;
}

async function insertManyIntoPurchasedUnit(units) {
    console.log(units);
    const unitsAdded = new Promise((resolve, reject) => {
        Unit.insertMany(units, {ordered: false, rawResult: true}).then((d) => {
            console.log(d)
            resolve(d.ops.map(id => id._id));
        });
    })
    return unitsAdded;
}

module.exports = {
    checkIfUserIsAdmin,
    insertManyIntoTags,
    insertManyIntoPurchasedUnit
}