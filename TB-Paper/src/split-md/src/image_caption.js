var fs = require('fs');

module.exports = splitter

function splitter(readPath,  writePath_images, writePath,  limit){
  try {
    var array = fs.readFileSync(readPath).toString().split("\n");
    var file_name = readPath.split(".md")[0];
    file_name = file_name.split("/").pop()
  }
  catch (err) {
    throw err;
  }
  var title = "", file = "", first = true, found=false, need_txt=false;
  var counter = 1;
  for(var i=0; i < array.length; i++) 
  {
    //if (first) 
    //{
    //  file = "<!-- order:" + counter + " -->\n";
    //}
    pattern1 = "![";
    pattern2 = "##";
    pattern3 = "-----";
    if (array[i].indexOf(".gif") == -1 && (array[i].indexOf(pattern1) == 0 || array[i].indexOf(pattern2) == 0 || array[i].indexOf(pattern3) == 0))
    {
      if(array[i].indexOf(pattern1) ==0)
      {
            if(need_txt)
            {
               counter_minus_1 = counter -1;
               title = writePath + "/" + file_name + "-" + counter_minus_1 + ".md";
               console.log(title);
               fs.writeFile(title, file, function (err) {
                 if (err) throw err;
               });
               counter += 1;
               need_txt = false
            }
            else
            {
            found = true 
            img_count = counter -1
            title = writePath_images + "/" + file_name + "-" + img_count + ".image.md";
            console.log(title);
            file = "<!-- order:" + counter + " -->\n";
            file += array[i];
            fs.writeFile(title, file, function (err) {
              if (err) throw err;
            });

            file = "<!-- order:" + counter + " -->\n";
            need_txt = true
            //counter +=1
            }
      }
      else
      {
           if(need_txt)
           {
               counter_minus_1 = counter -1;
               title = writePath + "/" + file_name + "-" + counter_minus_1 + ".md";
               console.log(title);
               fs.writeFile(title, file, function (err) {
                 if (err) throw err;
               });
               counter += 1;
               need_txt = false
           } 
      }
      //if (!first) 
      //{
      //  fs.writeFile(title, file, function (err) {
      //    if (err) throw err;
      //  });
      //  counter += 1;
      //  if (typeof limit != "undefined" && counter > limit)
      //    break;
      //  file = "<!-- order:" + counter + " -->\n";
      //}
      //counter_minus_1 = counter -1;
      //title = file_name + "-" + counter_minus_1 + ".md";
      //console.log(title);
      //file += array[i];
      //first = false;
    }
    else 
    {
      //console.log(found)
      if((! found) || (! need_txt)){}
      else{
      var newline = "\n" + array[i];
      file += newline;
      }
    }
  }

  // handle last file
  if(need_txt)
  {
       counter_minus_1 = counter -1;
       title = writePath + "/" + file_name + "-" + counter_minus_1 + ".md";
       console.log(title);
      file += "."
      fs.writeFile(title, file, function (err) 
      {
        if (err) throw err;
      });

  }
}
