const requests = require('./requests');
const parser = require('./parser');

// Error messages
argumentsNumber = '[ERROR] Invalid command arguments.'

// Success messages
insertSuccess = 'Time entry successfully inserted !'

//console.log(process.argv[2])
args = ['', '', '15', 'proj1', 'desc']

async function start() {
    if (args.length > 3) {
        switch (args[2]) {
            case 'GET':
                console.log('Show time by day (or day and project)');
                break;
            case 'GET-HASH':
                console.log('Show time by tag (or tag and project)')
                break;
            case 'REPORT':
                if (args[3] == 'PERDAY') {
                    console.log('All times entrys of a project (per day)');
                }
                break
            default:
                if (args.length == 5) {
                    let res = await requests.appendTimeEntry('proj1', '2022-01-12', 15, 'desc #test', ['test'])
                    // [ERROR] Time couldn't be parse.
                    if (res == true) {
                        console.log(insertSuccess)
                    }
                }
                else {
                    console.log(argumentsNumber)
                }
        }
    }
    else {
        console.log(argumentsNumber)
    }
}

console.log(parser.stringParser("y 12"))

//start()