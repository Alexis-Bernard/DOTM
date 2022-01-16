# DevOps time manager

A project to count working time

## Initialization

Use the node package manager [npm]
```bash
npm i
```

Set DataBase connextion string
```bash
export MONGODB_CONN_STRING="mongodb://<user>:<pass>@<host>:<port>?retryWrites=true&w=majority&authSource=admin"
```

Run mongoDB database easily
```bash
docker run --name 'mongo' -v [mountPoint]:/bitnami/mongodb -p 27017:27017 -e MONGODB_ROOT_PASSWORD="root" bitnami/mongodb
```

## Usage
Create new time entry
```bash
node src/main.js [date and time] [project name] [description]
# E.g: node src/main.js "Jan 10 3h10m" "DOTM" "Starting #start"
# Will add 195 minutes the last 01/10 in "DOTM" project with "#start" tag
```

Return the total amount of time on the [date] for each project
```bash
node src/main.js GET [date]
# E.g: node src/main.js GET 12/01/2022
```

Return the total amount of time on the [date] for the [project]
```bash
node src/main.js [date] [project]
# E.g: node src/main.js GET 12/01/2022 mongodb
```

Return the total amount of time with the [tag]
```bash
node src/main.js GET-HASH [tag]
# E.g: node src/main.js GET-HASH "#start"
```

Return the total amount of time with the [tag] for the [project]
```bash
node src/main.js GET-HASH [tag] [project]
# E.g: node src/main.js GET-HASH "#start" "mongodb"
```

Return for each day (where there is a time entry) the total amount of time that has been spent for the [project]
```bash
node src/main.js REPORT PERDAY [project]
# E.g: node src/main.js GET-HASH "#start" "mongodb"
```

## Unit tests
```bash
npm test
```