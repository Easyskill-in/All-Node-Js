const fs = require("fs")
const path = require("path")


const FilePath = path.join(__dirname, "..", "DB", "database.json")


function readData() {
    // const data = JSON.parse(fs.readFileSync(FilePath, "utf-8"))
    // return data
    return JSON.parse(fs.readFileSync(FilePath, "utf-8"))
}

function writeData(data) {
    const user = readData()
    user.push(data)

    fs.writeFileSync(FilePath, JSON.stringify(user, null, 2))

    return true
}


function deleteData(id) {
    const user = readData()

    const newUser = user.filter(v => v.id !== id)

    console.log("New : ", newUser)

    writeData(newUser)
}

module.exports = { readData, writeData, deleteData }