
// const fs = require("fs")
// const path = require("path")

// console.log(path.join(__dirname, "..", "DB", "database.json"));


// const FilePath = path.join(__dirname, "..", "DB", "database.json")

// fs.readFile(FilePath, "utf-8", (error, data) => {
//     if (error) {
//         console.log("Error : ", error)
//         return false;
//     }

//     console.log(JSON.parse(data))
// })

// fs.writeFile("src/fn.txt",
//     JSON.stringify({ id: 999, username: "Easyskill" }, null, 2), (error) => {
//         if (error) {
//             console.log("Error : ", error)
//             return false;
//         }
//         console.log("success")
//     })

// fs.writeFileSync(FilePath, JSON.stringify({ id: 1999, username: "1Easyskill" }, null, 2))

// console.log("Yes")


// fs.appendFile("user.txt", "\nIJKL", (error) => {
//     if (error) {
//         console.log("Error : ", error)
//         return false;
//     }
//     console.log("success")
// })


const { readData, writeData, deleteData } = require("./src/db.js")

console.log(readData())
console.log(writeData({
    id: Date.now(),
    username: "User1",
    email: "user@gmail.com"
}))


deleteData("1773911516702")