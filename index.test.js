const { checkHash } = require('./checkHash')

test('выдавать ошибку 100 при чтении несуществующего файла', async() => {
    await expect(checkHash('./fixtures/nothing.txt')).rejects.toThrow('100')
})

test('выдавать ошибку 100 при чтении несуществующего файла по https ссылке', async() => {
    await expect(checkHash('./fixtures/nothing.txt')).rejects.toThrow('100')
})

test('выдавать ошибку 101 при отсутствии хэш-файла', async() => {
    await expect(checkHash('./fixtures/test1')).rejects.toThrow('101')
})

test('выдавать ошибку 101 при отсутствии хэш-файла по https ссылке', async() => {
    await expect(checkHash('https://raw.githubusercontent.com/belikcost/hash-checker-cli/master/fixtures/test1')).rejects.toThrow('101')
})

test('выдавать ошибку 102 при неверном хэше', async () => {
    await expect(checkHash('./fixtures/test3')).rejects.toThrow('102')
})

test('выдавать ошибку 102 при неверном хэше в файле из интернета', async () => {
    await expect(checkHash('https://raw.githubusercontent.com/belikcost/hash-checker-cli/master/fixtures/test3')).rejects.toThrow('102')
})

test('проверять текстовые файлы', async() => {
    await expect(checkHash('./fixtures/test')).resolves.not.toThrow()
})

test('проверять текстовые файлы из интернета', async() => {
    await expect(checkHash('https://raw.githubusercontent.com/belikcost/hash-checker-cli/master/fixtures/test')).resolves.not.toThrow()
})

test('игнорировать переносы строк в хэш-файле', async() => {
    await expect(checkHash('./fixtures/test2')).resolves.not.toThrow()
})

test('игнорировать переносы строк в хэш-файле из интернета', async() => {
    await expect(checkHash('https://raw.githubusercontent.com/belikcost/hash-checker-cli/master/fixtures/test2')).resolves.not.toThrow()
})

test('проверять бинарные файлы', async() => {
    await expect(checkHash('./fixtures/test4.jpg')).resolves.not.toThrow()
})

test('проверять бинарные файлы из интернета', async() => {
    await expect(checkHash('https://raw.githubusercontent.com/belikcost/hash-checker-cli/master/fixtures/test4.jpg')).resolves.not.toThrow()
})

