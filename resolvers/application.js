// const db = require('./../helpers/db');
const auth = require('./../helpers/auth');
const Application = require('./../models/application')();
const uuidAPIKey = require('uuid-apikey');
const helper = require('../helpers/helper');
const connectToMongoDB = require('../helpers/db');
const sendEmail = require('../helpers/ses_sendTemplatedEmail');
let conn;

async function createApplication(_, { application }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            const secret = await uuidAPIKey.create();

            application['uuid'] = await secret.uuid;
            application['apiKey'] = await secret.apiKey;

            const app = await new Application(application);
            await app.save(application).then(async a => {
                console.log(a)
                await Application.find({ createdBy: application.createdBy }, (err, apps) => {
                    if (err) {
                        return reject(err);
                    } else {
                        const params = {...sendEmail.emailParams};
                        params.Template = 'ProductCreationNotificationToAdmin',
                        params.Source = 'sumitvekariya7@gmail.com',
                        params.Destination.ToAddresses = ['sumitvekariya7@gmail.com'], // 'sumi@dreamjobb.com'
                        params.TemplateData = JSON.stringify({
                            'name': 'Sumit',
                            'appName': application.name,
                            'link': `${process.env.FRONT_END_URL}/#/application/applications/${a._id}`
                        });
                        sendEmail.sendTemplatedEmail(params);
                        // db.disconnect();
                    }
                    return resolve(apps);
                    
                })
                // return resolve([a]);
                
            });


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}


async function updateApplication(_, { application, notifyAdmin }, { headers, db }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await db();
            } else {
                console.log('Using existing mongoose connection.');
            }

            // const app = await new Application(application);
            await Application.findByIdAndUpdate(application._id, application, {new:true}, (err, app) => {
                if (err) {
                    return reject(err);
                }
                console.log(notifyAdmin);
                // if (notifyAdmin) {
                    
                // }
                return resolve(app);
            })

            // await db.disconnect();


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getApplications(_, { userId }, { headers, db, decodedToken }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            // console.log(headers)
            const isUserAdmin= await helper.checkIfUserIsAdmin(decodedToken);
            // console.log('isUserAdmin', isUserAdmin);

            if (isUserAdmin) {
                await Application.find({}, (err, apps) => {
                    if (err) {
                        return new Error(err);
                    }
                    return resolve(apps);
                })  
            } else {
                await Application.find({ createdBy: userId }, (err, apps) => {
                    if (err) {
                        return new Error(err);
                    }
                    return resolve(apps);
                })
            }

            // await db.disconnect(() =>  {
            //     console.log('DB CONNECTION CLOSED')
            // });


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getApplicationById(_, { appId }, { headers, db }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            await Application.findOne({ _id: appId }, (err, app) => {
                if (err) {
                    return reject(err);
                }
                console.log(app);
                return resolve(app);
            });

            // await db.disconnect();


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

async function getUserApplications(_, { userId }, { headers, db }) {
    return new Promise(async (resolve, reject) => {
        try {

            if (!db) {
                console.log('Creating new mongoose connection.');
                conn = await connectToMongoDB();
            } else {
                console.log('Using existing mongoose connection.');
            }

            await Application.find({ userId: userId }, (err, apps) => {
                if (err) {
                    return new Error(err);
                }
                console.log(apps);
                return resolve(apps);
            });

            // // await db.disconnect();


        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

module.exports = {
    createApplication,
    getApplications,
    getApplicationById,
    getUserApplications,
    updateApplication
};