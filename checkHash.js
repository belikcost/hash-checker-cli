const crypto = require('crypto')
const fs = require('fs')
const fetch = require('node-fetch')

const readFile = async (filePath) => {
    if (filePath.includes('http')) {
        const response = await fetch(filePath)
        if (+response.status === 404) throw new Error()

        const blob = await response.blob()
        return Buffer.from(await blob.arrayBuffer())
    }

    return fs.readFileSync(filePath)
}

const checkHash = async (filePath) => {
    const sourceFile = await readFile(filePath).catch(() => {
        console.log('Ошибка чтения файла')
        throw new Error('100')
    })

    const sourceFileHash = await readFile(filePath + '.sha256').catch(() => {
        console.log('Ошибка чтения хэш-файла')
        throw new Error('101')
    })

    const hashSum = crypto.createHash('sha256')
    hashSum.update(sourceFile)

    const sourceFileHashHex = sourceFileHash.toString().replace(/\r?\n|\r/g, '')
    const calculatedHashHex = hashSum.digest('hex')

    console.log(sourceFileHashHex, calculatedHashHex)
    if (sourceFileHashHex.toLowerCase() !== calculatedHashHex.toLowerCase()) {
        console.log('Хэш-файл содержит неверный хэш')
        throw new Error('102')
    }

    console.log('Проверка успешно пройдена')
    return '0'
}

module.exports = { checkHash }