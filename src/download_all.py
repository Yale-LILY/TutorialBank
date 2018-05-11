#!/usr/bin/env python
import time
import os.path
import sys
import subprocess as sp
import csv

count = 0
data = []
with open("data/resources.csv", "r") as resources:
    reader = csv.reader(resources)
    next(reader)
    for row in reader:
        txtpath = row[8]
        #if ("files" not in txtpath) and ("url" not in txtpath):
        #    continue
        #else:
        data.append((int(row[0].replace("\"","")),row[2], row[7],row[9] ))
        count +=1
print(count)
    
basepath = "data"
try:
    os.makedirs(basepath + "/files/")
except:
    pass
try:
    os.makedirs(basepath + "/url/")
except:
    pass
wget_ext = [".pdf", ".pptx", ".ppt", ".pps"]

print("Download all which are not yet downloaded")
## number of files to ignore (because of file extension)
n_ignore = 0
existing = []
# ignore file extensions
ignore_ext = [".zip", ".tar.gz", ".tar", ".gz", ".rar"]
for count,row in enumerate(data):
    rid  = row[0]
    url  = row[1]

    if rid == 2241 or 'arXiv' in url:
        continue

    outpath = basepath 
    print(outpath)
    print(url)

    ignore = False
    # Check if it matches any extensions
    for ext in ignore_ext:
        if url.endswith(ext):
            n_ignore += 1
            ignore = True
            break

    if ignore:
        print("Skipped", rid)
        continue

    use_wget = False
    for ext in wget_ext:
        if url.endswith(ext):
            outpath += "/files/{}{}".format(rid, ext)
            use_wget = True
            break

    if not use_wget:
        outpath += "/url/{}.txt".format(rid)

    print(outpath)

    if os.path.exists(outpath):
        existing.append(rid)
        print("Already exists", rid)
        continue

    if not use_wget:
        with open(outpath, 'w') as f:
            command = ["lynx", "-dump", url, "-connect-timeout=15"]
            line = sp.call(command, stdout=f)            
    else:
        command = ["wget", "-O", outpath, url, "--timeout=30", "--tries=3"]
        line = sp.call(command)
