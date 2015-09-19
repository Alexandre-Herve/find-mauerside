const fs = require('fs');

export default function writeMappingFile(name, data) {
  fs.writeFile("./tmp/" + name + ".json", JSON.stringify(data), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
}
