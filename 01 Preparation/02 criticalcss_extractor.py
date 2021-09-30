#!/usr/bin/env python

""" Script to extract and inline the critical css of .html files, makes use of Critical-tool (https://github.com/addyosmani/critical). 
Allows as input a directory containing directories. Each lower-directory should contain an index.html file.

Make sure critical is installed properly and usable via CLI. 
"""

# Imports
import sys
import os
import argparse
import glob
import subprocess
from subprocess import DEVNULL, STDOUT
from pathlib import Path


__author__ = "Lucas de Geus, Kalle Janssen, Tim Pelle, Reinier van der Gronden"
__version__ = "1.0.1"


RED = "\033[91m"
GREEN = "\033[92m"
END = "\033[0m"

def extract_and_inline_criticalcss(path, subfolder, width, height):
    subfolder_path = path + "/" + subfolder
    if (not os.path.isdir(subfolder_path)):
        print(f"{RED}" + subfolder + f" - Skipping: {END}" + subfolder_path + ": Given path is not a directory")
        return(False)

    if not any(os.scandir(subfolder_path)):
        print(f"{RED}" + subfolder + f" - Skipping: {END}" + subfolder_path + ": Given directory is empty")
        return(False)

    if not os.path.isfile(subfolder_path + "/" + 'index.html'):
        print(f"{RED}" + subfolder + f" - Skipping: {END}" + subfolder_path + ": Folder does not contain index.html")
        return(False)

    # os.system('critical '+ subfolder_path + "/index.html " + "--inline > " + subfolder_path + "/index.critical.html --base " + path) 
    cmd = 'critical '+ subfolder_path + "/index.html " + "--inline > " + subfolder_path + "/index.critical.html --base " + path + " -w " + width + " -h " + height
    if criticalDebug:
        subprocess.run(cmd,shell=True)
    else: 
        subprocess.run(cmd,shell=True,  stdout=DEVNULL, stderr=STDOUT)

    if (not os.path.getsize(subfolder_path + "/index.critical.html") > 0):
        os.remove(subfolder_path + "/index.critical.html")
        print(f"{RED}" + subfolder + f" - Skipping: {END}" + "Something went wrong during critical CSS creation")
        return(False)

    # critical_index = Path(subfolder_path + "/index.critical.html")
    # critical_index.write_text(critical_index.read_text(encoding="utf-16"), encoding="utf-8")


    # with open(subfolder_path + "/index.critical.html", 'rb') as source_file:
    #     with open(subfolder_path + "/index.critical.html", 'w+b') as dest_file:
    #         contents = source_file.read()
    #         dest_file.write(contents.decode('utf-16').encode('utf-8'))

    with open(subfolder_path + "/index.critical.html", 'a', encoding='utf-8') as f:
        f.write("") 

    print(f"{GREEN}" + subfolder + f" - Succes: {END}created index.critical.html in " + subfolder_path)
    return(True)


    

parser = argparse.ArgumentParser(description='''cript to extract and inline the critical css of .html files, makes use of Critical-tool (https://github.com/addyosmani/critical). 
Allows as input a directory containing directories. Each lower-directory should contain an index.html file.

Make sure critical is installed properly and usable via CLI. ''')

parser.add_argument('--path', dest='Path', metavar='path', type=str, help='base folder containing website folders (String)')
parser.add_argument('--criticalDebug', dest='criticalDebug', metavar='path', type=bool, help='print output from critical (Boolean)', default=False)
parser.add_argument('--width', dest='width', metavar='path', type=str, help='print output from critical (Boolean)', default="412")
parser.add_argument('--height', dest='height', metavar='path', type=str, help='print output from critical (Boolean)', default="732")

args = parser.parse_args()
path = args.Path
criticalDebug = args.criticalDebug
width = args.width
height = args.height
if (not os.path.isdir(path)):
    sys.exit("Given path is not a directory")

if not any(os.scandir(path)):
    sys.exit("Given directory is empty")

[extract_and_inline_criticalcss(path, subfolder, width, height) for subfolder in os.listdir(path)]



# critical websites/restaurantwebsite/index.html --inline > websites/restaurantwebsite/index.critical.html --base websites -w 412 -h 732
# critical websites/python/index.html --inline > websites/python/index.critical.html --base websites -w 412 -h 732