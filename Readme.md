
# baya

  baya 是一个文件和目录的生成器，通过很简单的配置文件生成你所需要的目录结构。  
  
  baya本身是基于[peg.js](http://pegjs.majda.cz/) 完成的文件parser
  
  
## Installation  

	npm install -g baya

## Commands


	Create the directory structure.
	Usage: baya -i <configuration file> -o <outputfile>

	Options:
  	 -i, --input     Config file path                                            [required]
  	 -o, --output    Output path                                [required]  [default: "./"]
  	 -t, --template  Copy files and directory from the template [required]  [default: "./"]

## Usage


	baya -i conf -t ./tpl/ -o ./project/
	
或者	  

	baya -i conf -t ./tpl/	
	baya -i conf
	
-i, -t 默认都为 './' 可不填

## Documentation

### 配置文件

#### 标识符
`  `： 空格， 不同层级通过2个空格分开  
`+` ： 文件夹  
`-` ： 文件   
`<` ： 从模板目录拷贝文件或文件夹，后跟模板文件路径名    
  
即为：     
`+ dirname`  
`- filename`  
`- filename < templateFilePath`



####拷贝模板文件规则：  

1. 如果路径名以 `../`,`./`,`/`开头的相对路径或绝对路径，会从该路径下拷贝文件
2. `<` 后不跟任何路径，则会在指定的模板目录拷贝相同文件名的文件到生成目录下，如果不存在会创建一个
3. 以文件或文件夹名开头的路径会从模板目录拷贝该文件，即便模板文件名和生成文件名不一致仍会把模板文件的内容拷贝到生成文件


配置文件示例：

    + test
      + app
        + module
          - media.html
          - a.html
        + html
          - index.html < ../History.md
          - a.js 
          - bigscreen.js <
        + styl
        + conf
    - conf

 
	
### 生成命令

	baya -i conf -t ./tpl/ -o ./project/

	
	
### 生成的目录结构

    ├── conf
    └── test
        └── app
            ├── conf
            ├── html
            │   ├── a.js
            │   ├── bigscreen.js
            │   └── index.html
            ├── module
            │   ├── a.html
            │   └── media.html
            └── styl


## License 

(The MIT License)

Copyright (c) 2014 ianva &lt;ianva7@gmail.com&gt;