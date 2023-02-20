const converter = require("json-2-csv")
const fs = require('fs')
const DiscordSchema = require("../model/discordSchema")


// declare a JSON array
const todos = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
  {
    id: 3,
    title: 'fugiat veniam minus',
    completed: false
  }
]

const jsonToCSV = async () => {
    const DiscordData = await DiscordSchema.find({})
    console.log(DiscordData);
    converter.json2csv(await todos, (err, csv) => {
        if (err) {
          throw err
        }
      
        // print CSV string
        console.log(csv)
      
        fs.writeFileSync('todos.csv', csv)
      })
}
