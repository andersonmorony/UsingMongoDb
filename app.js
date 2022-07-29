const MongoClient = require("mongodb").MongoClient

const SeedData = require("./repository/SeedData")
const data = require("./circulation.json")

const url = 'mongodb://localhost:27017'
const dbName = "circulation"

async function main() {
    const client  = new MongoClient(url)
    await client.connect()

    const result = await SeedData.loadData(data)
    console.log(result.insertedCount, result.ops)

    const admin = client.db(dbName).admin()
    console.log(await admin.listDatabases())
}

main()