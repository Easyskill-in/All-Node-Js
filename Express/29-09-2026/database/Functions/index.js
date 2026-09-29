const fs = require("fs")
const path = require("path")

const FilePath = path.join(__dirname, "..", "data", "Data.json")
// console.log(FilePath)

function ReadData() {
    const data = fs.readFileSync(FilePath, "utf-8")
    return JSON.parse(data)
}

function WriteData(data) {
    const arr = ReadData();
    arr.push({ ...data, id: Date.now() })

    fs.writeFileSync(FilePath, JSON.stringify(arr, null, 2))
}

function UpdateData(id, newData) {
    let arr = ReadData();
    arr = arr.map(value => {
        if (value.id == id) {
            return newData
        } else {
            return value
        }
    })

    fs.writeFileSync(FilePath, JSON.stringify(arr, null, 2))
}

function DeleteData(id) {
    let arr = ReadData();
    arr = arr.filter(value => value.id != id)

    fs.writeFileSync(FilePath, JSON.stringify(arr, null, 2))
}


module.exports = { ReadData, WriteData, DeleteData, UpdateData }