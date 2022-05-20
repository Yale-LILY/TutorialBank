var fs = require('fs');

module.exports = splitter

function splitter(readPath, pattern, cleanName, writePath, limit){
  try {
    var array = fs.readFileSync(readPath).toString().split("\n");
    var file_name = readPath.split(".md")[0]
  }
  catch (err) {
    throw err;
  }
  var title = "", file = "", first = true;
  var counter = 1;
  for(var i=0; i < array.length; i++) {
    if (first) {
      file = "<!-- order:" + counter + " -->\n";
    }

    pattern2 = "----------"
    if (array[i].indexOf(pattern) == 0 || array[i].indexOf(pattern2) == 0)
    {
          if (!first) 
          {
            if(array[i].indexOf(pattern2) ==0)
            {

               file.replace(array[i-1], "")
               fs.writeFile(title, file, function (err) 
               {
                 if (err) throw err;
               });
               counter += 1;
               if (typeof limit != "undefined" && counter > limit)
                 break;
               file = "<!-- order:" + counter + " -->\n";
               file += array[i-1]
            }
            else
            {
                fs.writeFile(title, file, function (err) 
                {
                  if (err) throw err;
                });
                counter += 1;
                if (typeof limit != "undefined" && counter > limit)
                  break;
                file = "<!-- order:" + counter + " -->\n";
            }
          }
          counter_minus_1 = counter -1
          title = file_name + "-" + counter_minus_1 + ".md"
          console.log(title)
          file += array[i];
          first = false;
    }
    else 
    {
          var newline = "\n" + array[i]
          file += newline;
    }
  }

  // handle last file
  fs.writeFile(title, file, function (err) {
    if (err) throw err;
  });
}


