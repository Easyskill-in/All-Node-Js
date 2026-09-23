const path = require("path")
const fs = require("fs")

const FilePath = path.join(__dirname, "Database", "Data.json")
// console.log(FilePath);


function getData() {
    try {

        let arr = fs.readFileSync(FilePath, "utf-8")
        return JSON.parse(arr)
        // console.log(arr)
        // console.log(typeof (arr))//JOSN String

        // arr = JSON.parse(arr)


        // console.log(arr)
        // console.log(typeof (arr))//JOSN String
    } catch (error) {
        console.log("Error ", error)
        return false;
    }
}

function WriteData(data) {

    try {
        const arr = getData()

        // arr.push(data)
        arr.push({ ...data, id: Date.now() })

        fs.writeFileSync(FilePath, JSON.stringify(arr, null, 2))

    } catch (error) {
        console.log("Error ", error)
        return false;
    }

}




function UpdateData(id, newData) {

    try {
        let arr = getData()

        arr = arr.map(value => {
            if (value.id === id) {
                return { ...newData, id }
            } else {
                return value
            }
        })

        fs.writeFileSync(FilePath, JSON.stringify(arr, null, 2))




    } catch (error) {
        console.log("Error ", error)
        return false;
    }
}


// getData()


// WriteData({ name: "Myname" })

UpdateData(1790143440253, { name: "Easyskill", marks: 99 })
