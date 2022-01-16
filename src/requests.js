const { MongoClient } = require("mongodb");

// Error messages
requestFailed = '[ERROR] Request failed.'

/**
 * Insert time entry in database.
 *
 * @param {string} projectName The project name.
 * @param {Date} date The date object.
 * @param {number} time The time in minutes.
 * @param {string} description The description.
 * @param {Array<string>} tags The tag list.
 */
async function appendTimeEntry(projectName, date, time, description, tags) {
    try {
        client = await connect()

        if (client != null) {
            collection = client.db('dotm').collection('timeEntries')

            const document = {
                "name": projectName,
                "date": date,
                "time": time,
                "desc": description,
                "tags": tags
            };

            let res = await collection.insertOne(document);

            if (res == null) {
                throw "Entry insert failed."
            }
        }
    }
    catch (error) {
        throw error
    }
    finally {
        disconnect(client)
    }
}

/**
 * Get total time passed a day for all or a specific project.
 *
 * @param {Date} date The date object.
 * @param {string} projectName The project name.
 * 
 * @return {Array<object>} Array of time per project.
 */
async function getTimeByDate(date, projectName = null) {
    try {
        let client = await connect()

        if (client != null) {
            let query

            if (projectName != null) {
                query = {
                    '$match': {
                        'name': projectName,
                        'date': date
                    }
                }
            }
            else {
                query = {
                    '$match': {
                        'date': date
                    }
                }
            }

            let group = {
                '$group': {
                    '_id': { name: '$name', date: '$date' },
                    'total': {
                        '$sum': '$time'
                    }
                }
            };

            let collection = client.db('dotm').collection('timeEntries')

            let res = await collection
                .aggregate([query, group]);

            return await res.toArray()
        }
    }
    catch (error) {
        throw error
    }
    finally {
        disconnect(client)
    }
}

/**
 * Get total time passed a day for all or a specific project.
 *
 * @param {string} tag The tag searched.
 * @param {string} projectName The project name.
 * 
 * @return {Array<object>} Array of time per project.
 */
async function getTimeByTag(tag, projectName = null) {
    try {
        let client = await connect()

        if (client != null) {
            let query

            if (projectName != null) {
                query = {
                    '$match': {
                        'name': projectName,
                        'tags': tag
                    }
                }
            }
            else {
                query = {
                    '$match': {
                        'tags': tag
                    }
                }
            }

            let group = {
                '$group': {
                    '_id': { name: '$name', tags: '$tags' },
                    'total': {
                        '$sum': '$time'
                    }
                }
            };

            let collection = client.db('dotm').collection('timeEntries')

            let res = await collection
                .aggregate([query, group]);

            return await res.toArray()
        }
    }
    catch (error) {
        throw error
    }
    finally {
        disconnect(client)
    }
}

/**
 * Get total time passed a day for all or a specific project.
 *
 * @param {string} tag The tag searched.
 * @param {string} projectName The project name.
 * 
 * @return {Array<object>} Array of time per project.
 */
async function getTimeByProject(projectName) {
    try {
        let client = await connect()

        if (client != null) {
            let query

            query = {
                '$match': {
                    'name': projectName
                }
            }

            let group = {
                '$group': {
                    '_id': { name: '$name', date: '$date' },
                    'total': {
                        '$sum': '$time'
                    }
                }
            };

            let collection = client.db('dotm').collection('timeEntries')

            let res = await collection
                .aggregate([query, group]);

            return await res.toArray()
        }
    }
    catch (error) {
        throw error
    }
    finally {
        disconnect(client)
    }
}

/**
 * Connect to database.
 *
 * @return {object} Database connexion.
 */
async function connect() {
    client = new MongoClient(process.env.MONGODB_CONN_STRING);

    try {
        // Connect the client to the server
        await client.connect();

        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });

        return client
    }
    catch (error) {
        throw error
    }
}

/**
 * Disconnect to database.
 *
 * @param {object} client Database connexion.
 */
async function disconnect(client) {
    await client.close();
}

module.exports = {
    appendTimeEntry,
    getTimeByDate,
    getTimeByTag,
    getTimeByProject
}