# Critical CSS extractor
Script to extract and inline the critical css of .html files, makes use of Critical-tool (https://github.com/addyosmani/critical). 
Allows as input a directory containing directories. Each lower-directory should contain an index.html file.

## Requirements
- Python 3 (https://www.python.org/downloads/)
- Node/NPM (https://nodejs.org/en/download/)
- Critical CLI (https://github.com/addyosmani/critical) 
Suggested installation: npm i -D critical

## Usage
Without Critical debugging output
```sh
 python3 '.\02 criticalcss_extractor.py' --path <path to head directory>
```

With Critical debugging output
```sh
 python3 '.\02 criticalcss_extractor.py' --path <path to head directory> --criticalDebug True
```
Change the viewport used by Critical (default is 412x732)
```sh
 python3 '.\02 criticalcss_extractor.py' --path <path to head directory> --width <width> --height <height>
```


## Example 
An example folder is available containing three subfolders of which one is valid. 

##### Example expected behaviour:
###### Input
```sh
python3 '.\02 criticalcss_extractor.py' --path example
```
###### Output
```sh
invalid_folder_example - Skipping: example/invalid_folder_example: Given directory is empty
invalid_folder_example_2 - Skipping: example/invalid_folder_example_2: Folder does not contain index.html
python_website - Succes: created index.critical.html in example/python_website
```
