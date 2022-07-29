const { MongoClient, ObjectId } = require('mongodb')


const url = 'mongodb://localhost:27017'
const dbName = "circulation"

const ConnectDataBase = async () => {
    const url = 'mongodb://localhost:27017'
    const dbName = "circulation"
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName)
    return {db, client}
}

function GetItems() {
    return new Promise(async (resolve, reject) => {
        
        const {db, client} = await ConnectDataBase()
        try{
            const result = await db.collection("newspapers").find().toArray();
            resolve(result);
        } catch(error) {
            reject(error)
        } finally {
            client.close()
        }
    });
}
function GetItemById(id) {
    return new Promise(async (resolve, reject) => {
        const {db, client} = await ConnectDataBase()
        try{
            const result = await db.collection("newspapers").findOne({ _id: ObjectId(id) });
            resolve(result);
        } catch(error) {
            reject(error)
        } finally {
            client.close()
        }
    });
}
function GetItem(newspaper) {
    return new Promise(async (resolve, reject) => {
        const {db, client} = await ConnectDataBase()
        try{
            const result = await db.collection("newspapers").findOne({Newspaper: newspaper});
            resolve(result);
        } catch(error) {
            console.log(error)
            reject(error)
        } finally {
            client.close()
        }
    });
}
const CreateItem = (item) => {
    return new Promise(async (resolve, reject) => {
        const {db, client} = await ConnectDataBase()
        try{
            const result = await db.collection("newspapers").insertOne(item)
            resolve(result);
        } catch(error) {
            console.log(error)
            reject(error)
        } finally {
            client.close()
        }
    })
}
const DeleteItem = (id) => {
    return new Promise(async (resolve, reject) => {
        const {db, client} = await ConnectDataBase()
        try{
            const result = await db.collection("newspapers").findOneAndDelete({_id: ObjectId(id)})
            resolve(result);
        } catch(error) {
            reject(error)
        } finally {
            client.close()
        }
    })
}

module.exports = {GetItems, GetItem, CreateItem, DeleteItem, GetItemById}