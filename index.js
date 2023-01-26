const crypto = require('crypto')
const fs = require('fs')

const readFile = (filePath, err) => {
    try {
        return fs.readFileSync(filePath)
    } catch (e) {
        err()
    }
}

const sourceFile = readFile(process.argv[2], () => {
    console.log('Ошибка чтения файла')
    process.exit(100)
})

const sourceFileHash = readFile(process.argv[2] + '.sha256', () => {
    console.log('Ошибка чтения хэш-файла')
    process.exit(101)
})

const hashSum = crypto.createHash('sha256')
hashSum.update(sourceFile)

const sourceFileHashHex = sourceFileHash.toString().replace(/\\n|\\rn/, '');
const calculatedHashHex = hashSum.digest('hex');

if (sourceFileHashHex.toLowerCase() !== calculatedHashHex.toLowerCase()) {
    console.log('Хэш-файл содержит неверный хэш')
    process.exit(102)
}

console.log('Проверка успешно пройдена')
process.exit()

