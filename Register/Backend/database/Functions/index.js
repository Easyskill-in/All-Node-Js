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

    return true
}

function UpdateData(id, newData) {
    let arr = ReadData();
    arr = arr.map(value => {
        if (value.id == id) {
            return { ...newData, id }
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

function FindById(id) {
    let arr = ReadData();
    let data = arr.find(value => value.id == id)
    if (!data) {
        return false;
    }
    return data
}



function FindByUsername(name) {
    let arr = ReadData();

    const data = arr.filter(value => {
        return value.username === name
    })
    return data[0]
}


module.exports = {
    ReadData,
    WriteData,
    DeleteData,
    UpdateData,
    FindById,
    FindByUsername

}