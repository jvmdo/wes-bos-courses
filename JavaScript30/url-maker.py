import os
import re

BASE_URL = "https://jvmdo.github.io/wes-bos-courses/JavaScript30/"

folder_names = os.listdir("./")
p = re.compile("\s")

preview_url = []

for name in folder_names:
  if (name[0:2].isdigit()):
    path = p.sub("%20", name)
    url = BASE_URL + path + "/index-START.html"
    preview_url.append({"name": name, "url": url})

for url in preview_url:
  with open("./preview_url.txt", "a+") as f:
    line = f"  - [{url['name']}]({url['url']})\n"
    f.write(line)