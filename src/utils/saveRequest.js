const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'history'
const client = new MongoClient(connectionURL, { connectTimeoutMS: 1000, socketTimeoutMS: 1000 })

const saveRequest = (dataToSave) => {
    client.connect().then( () => {
        const db = client.db( databaseName )
        console.log('Connected to Mongo successfully!')
        db.collection(databaseName).insertOne(
            {
                ...dataToSave,
                requestTime: new Date()
            }
        ).then((result) => {
        }).catch((error) => {
            console.log(error)
        })    
    }).catch(() => {
        console.log("Error DB connection!")
    })
}

module.exports = saveRequest