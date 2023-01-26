const { checkHash } = require('./checkHash')

checkHash(process.argv[2])
    .then(() => process.exit())
    .catch((e) => process.exit(e))
