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

function MatchFilter(value, filter = {}) {
    if (!filter || Object.keys(filter).length === 0) {
        return true;
    }

    return Object.keys(filter).every(key => value[key] == filter[key])
}

function SortData(arr, sort) {
    if (!sort || Object.keys(sort).length === 0) {
        return arr;
    }

    const key = Object.keys(sort)[0];
    const order = Number(sort[key]) == 1 ? 1 : -1;

    return [...arr].sort((a, b) => {
        if (a[key] == b[key]) return 0;
        return a[key] > b[key] ? order : -order;
    })
}

function FindData(filter = {}, { sort, skip = 0, limit } = {}) {
    let arr = ReadData();

    arr = arr.filter(value => MatchFilter(value, filter))
    arr = SortData(arr, sort)
    arr = arr.slice(Number(skip), limit ? Number(skip) + Number(limit) : undefined)

    return arr
}

function FindOne(filter = {}) {
    let arr = ReadData();

    let data = arr.find(value => MatchFilter(value, filter))
    if (!data) {
        return false;
    }
    return data
}

function WriteMany(items = []) {
    const arr = ReadData();

    const newData = (Array.isArray(items) ? items : [items]).map(value => ({ ...value, id: Date.now() + Math.floor(Math.random() * 1000) }))

    fs.writeFileSync(FilePath, JSON.stringify([...arr, ...newData], null, 2))

    return newData
}

function UpdateMany(filter = {}, newData = {}) {
    let arr = ReadData();
    let count = 0;

    arr = arr.map(value => {
        if (MatchFilter(value, filter)) {
            count++
            return { ...newData, id: value.id }
        } else {
            return value
        }
    })

    fs.writeFileSync(FilePath, JSON.stringify(arr, null, 2))

    return count
}

function FindByIdAndUpdate(id, newData = {}) {
    let arr = ReadData();
    let data = false;

    arr = arr.map(value => {
        if (value.id == id) {
            data = { ...newData, id }
            return data
        } else {
            return value
        }
    })

    if (!data) {
        return false;
    }

    fs.writeFileSync(FilePath, JSON.stringify(arr, null, 2))

    return data
}

function FindByIdAndDelete(id) {
    let arr = ReadData();
    let data = arr.find(value => value.id == id)

    if (!data) {
        return false;
    }

    arr = arr.filter(value => value.id != id)

    fs.writeFileSync(FilePath, JSON.stringify(arr, null, 2))

    return data
}

function DeleteMany(filter = {}) {
    let arr = ReadData();
    const oldLength = arr.length;

    arr = arr.filter(value => !MatchFilter(value, filter))

    fs.writeFileSync(FilePath, JSON.stringify(arr, null, 2))

    return oldLength - arr.length
}

function CountData(filter = {}) {
    let arr = ReadData();

    return arr.filter(value => MatchFilter(value, filter)).length
}


module.exports = {
    ReadData,
    WriteData,
    DeleteData,
    UpdateData,
    FindById,
    FindData,
    FindOne,
    WriteMany,
    UpdateMany,
    FindByIdAndUpdate,
    FindByIdAndDelete,
    DeleteMany,
    CountData
}