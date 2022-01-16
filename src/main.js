const requests = require('./requests');
const parser = require('./parser');
const moment = require('moment');

// Error messages
argumentsNumberError = '[ERROR] Invalid command arguments.'
timeParseError = "[ERROR] Time couldn't be parsed."
dateParseError = "[ERROR] Date couldn't be parsed."

// Success messages
insertSuccess = 'Time entry successfully inserted !'

args = process.argv

async function start() {
    try {
        if (args.length > 3) {
            switch (args[2]) {
                case 'GET':
                    if (args.length == 4 || args.length == 5) {
                        let res = parser.stringParser(args[3])

                        if (res["time"] == null) {
                            res = await requests.getTimeByDate(new Date(res["date"]), args[4])

                            if (res.length > 0) {
                                res.forEach(project => {
                                    console.log("Project '" + project["_id"]["name"] + "' : " + project["total"] / 60 + " hour(s).")
                                });
                            }
                            else {
                                console.log("No time entry found.")
                            }
                        }
                        else {
                            console.log(dateParseError)
                        }
                    }
                    else {
                        console.log(argumentsNumberError)
                    }

                    break;
                case 'GET-HASH':
                    if (args.length == 4 || args.length == 5) {
                        let res = await requests.getTimeByTag(args[3], args[4])

                        if (res.length > 0) {
                            res.forEach(project => {
                                console.log("Project '" + project["_id"]["name"] + "' : " + project["total"] / 60 + " hour(s).")
                            });
                        }
                        else {
                            console.log("No time entry found.")
                        }
                    }
                    else {
                        console.log(argumentsNumberError)
                    }

                    break;
                case 'REPORT':
                    if (args[3] == 'PERDAY') {
                        if (args.length == 5) {
                            let res = await requests.getTimeByProject(args[4])
    
                            if (res.length > 0) {
                                res.forEach(project => {
                                    date = moment(project["_id"]["date"]).format('MM-DD-YYYY')
                                    console.log(date + " : " + project["total"] / 60 + " hour(s).")
                                });
                            }
                            else {
                                console.log("No time entry found.")
                            }
                        }
                        else {
                            console.log(argumentsNumberError)
                        }
                    }
                    break
                default:
                    if (args.length == 4 || args.length == 5) {
                        let res = parser.stringParser(args[2])

                        if (res["time"]) {
                            tags = parser.descriptionParser(args[4])

                            res = await requests.appendTimeEntry(args[3], new Date(res["date"]), res["time"], args[4], tags)

                            console.log(insertSuccess)
                        }
                        else {
                            console.log(timeParseError)
                        }
                    }
                    else {
                        console.log(argumentsNumberError)
                    }
            }
        }
        else {
            console.log(argumentsNumberError)
        }
    }
    catch (error) {
        console.log('[ERROR] ' + error)
    }
}

start()