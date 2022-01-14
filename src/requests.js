const { MongoClient } = require("mongodb");

// Error messages
requestFailed = '[ERROR] Request failed.'

async function appendTimeEntry(projectName, date, time, description, tags) {
    try {
        client = await connect()

        if (client != null) {
            collection = client.db('dotm').collection('projects')

            if (collection != null) {
                const query = { name: projectName };
                const update = {
                    $push: {
                        timeEntries: {
                            "date": date,
                            "time": time,
                            "desc": description,
                            "tags": tags
                        }
                    }
                };
                const options = { upsert: true };

                let res = await collection.updateOne(query, update, options);

                if (res == null || res.modifiedCount == 0) {
                    console.log(requestFailed)
                    return false
                }
            }
            else {
                return false
            }
        }
    }
    catch (error) {
        console.log(error)

        return false
    }
    finally {
        disconnect(client)
    }

    return true
}

async function connect() {
    client = new MongoClient(
        "mongodb://root:root@162.38.112.132:27017?retryWrites=true&w=majority&authSource=admin");

    try {
        // Connect the client to the server
        await client.connect();

        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });

        return client
    }
    catch (error) {
        console.log(error)

        return null
    }
}

async function disconnect(client) {
    await client.close();
}

module.exports = {
    appendTimeEntry
}