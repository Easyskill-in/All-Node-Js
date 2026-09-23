const path = require("path")
const fs = require("fs")

const FilePath = path.join(__dirname, "data.json")

function getData() {
    return JSON.parse(fs.readFileSync(FilePath, "utf-8"))
}

function setData(data) {
    const arr = getData()

    arr.push(data)

    fs.writeFileSync(FilePath, JSON.stringify(arr, null, 2))

    return true

}

module.exports = { getData, setData }