
# baya

  baya 是一个文件和目录的生成器，通过很简单的配置文件生成你所需要的目录结构。  
  
  baya本身是基于[jison](https://github.com/zaach/jison) 完成的文件parser
  
  
## Installation  

	npm install baya

## Commands


	Create the directory structure.
	Usage: baya -i <configuration file> -o <outputfile>

	Options:
  	-i, --input   configuration file path                               [required]
  	-o, --output  Output path                          [required]  [default: "./"]

## Usage

### 配置文件

`+` ： 文件夹  
`-` ： 文件   
  
即为：     
`+ dirname`  
`- filename`  

不同层级通过4个空格分开  

配置文件示例：

    + test
        + app
            + module
                - media.html
            - a.html
        + html
            - index.html
        - a.js
        + styl
        + conf
 
	
### 生成命令

	./baya -i conf -o ./project/
	
	
### 生成的目录结构

    test
    ├── a.js
    ├── app
    │   ├── a.html
    │   └── module
    │       └── media.html
    ├── conf
    ├── html
    │   └── index.html
    └── styl

  

## License 

(The MIT License)

Copyright (c) 2014 ianva &lt;ianva7@gmail.com&gt;