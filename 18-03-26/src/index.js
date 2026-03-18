const fs = require("fs")
const path = require("path")

// const filePath = path.join("A", "B", "C", "..", "..", "index.txt")

// console.log(__dirname);
// console.log(__filename);

// console.log(path.extname(filePath))
// console.log(path.basename(filePath))
// console.log(path.dirname(filePath))
// console.log("FR:", path.parse(filePath))
// console.log("FR:", path.format(path.parse(filePath)))
// console.log("FR:", path.resolve("index.txt"))

// console.log(__dirname + "\\index.txt")
// console.log(path.join(__dirname, "..", "ABCD", "package.json"))

// fs.readFile("../index.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log("Data : ", data)
// })

// const FilePath = path.resolve("index.txt")
const FilePath = path.join(__dirname, "index.txt")

// console.log(path.resolve("index.txt"))
console.log(path.join(__dirname, "index.txt"))

// console.log("Hiiiii")

// fs.readFile(FilePath, "utf-8", (err, data) => {
//     if (err) {
//         console.log("Error : ", err)
//         return;
//     }
//     console.log("Data : ", data)
// })

console.log("HEYYYYYY")
const result = fs.readFileSync(FilePath, "utf-8")
console.log(result)
console.log("XYZZZZZZ")
