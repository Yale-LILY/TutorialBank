from shutil import copyfile
from shutil import rmtree
import subprocess
import os
import csv

cards_dir = "data/cards/"
files = "data/files/"
urls = "data/url/"
tmp_markdown_dir = "data/cards/markdowns/"

id2url = dict()
with open("data/resources.csv", "r") as resources:
    reader = csv.reader(resources)
    next(reader)
    for row in reader:
        id2url[int(row[0])] = row[2]


try:
    os.makedirs(cards_dir)
except:
    pass
try:
    os.makedirs(tmp_markdown_dir)
except:
    pass
for filename in os.listdir(files):
    print(filename)
    if "pdf" not in filename:
        continue
    else:
        copyfile(files + filename,cards_dir+filename)
        subprocess.call("java -jar src/pdfbox-app-1.8.13.jar PDFSplit -split 1 {}".format(cards_dir + filename), shell=True)
        os.remove(cards_dir + filename)

# NOTE The below was used to generate cards for HTML pages, but later experiments show 
# that this is not fully reliable, so we restrict the code above to just PDFs. 
#for filename in os.listdir(urls):
#    try:
#        id1 = int(filename.split(".")[0])
#        url = id2url[id1]
#        card_dest = cards_dir + str(id1) + ".html"
#        markdown_dest = tmp_markdown_dir + str(id1) + ".md"
#        subprocess.call("wget {} -O {}".format(url,card_dest), shell=True)
#        # convert html to markdown
#        cmd1 = []
#        cmd1.append("pandoc")
#        cmd1.append("-f")
#        cmd1.append("html")
#        cmd1.append("-t")
#        cmd1.append("markdown")
#        cmd1.append("-o")
#        cmd1.append(markdown_dest)
#        cmd1.append(card_dest)
#        subprocess.call(cmd1)
#        #os.remove(card_dest)
#
#        ## split the markdown
#        cmd2 = []
#        cmd2.append("src/split-md/src/index.js")
#        cmd2.append(markdown_dest)
#        cmd2.append("##")
#        cmd2.append("")
#        cmd2.append(tmp_markdown_dir)
#        subprocess.call(cmd2)
#        os.remove(card_dest)
#        os.remove(markdown_dest)
#    except:
#        continue
 
# convert md to pdf
#for filename in os.listdir(tmp_markdown_dir):
#    print(filename)
#    name = filename.split(".md")[0] 
#    cmd3 = []
#    cmd3.append("pandoc")
#    cmd3.append("-f")
#    cmd3.append("markdown")
#    cmd3.append("--latex-engine=xelatex")
#    cmd3.append("-o")
#    cmd3.append(cards_dir + name + ".pdf")
#    cmd3.append(tmp_markdown_dir + filename)
#    subprocess.call(cmd3)
#rmtree(tmp_markdown_dir)
