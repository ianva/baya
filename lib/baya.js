var parser  = require("./parser.js")
,   fs      = require("fs")     
;

require('shelljs/global');

var setLevelAction = function( data, outpath, fn ){

    data.forEach(function(item,i){

        if( item.level ){
            while( --i + 1 ){
                if(  item.level - data[i].level ===1 ){
                    fn( item, outpath, data[i] );
                    break;
                }
            }
        }else{
            fn( item, outpath, null );
        }
    });

    return data;

};

var useTplPath = function ( path ) {
        return !/^\.*\//.test(path);   
    }, 

    setTpl = function(data,templateRootPath){

        var tplPath = data.tplPath;

        if( tplPath === null ) return;

        if( tplPath === ''){
            tplPath = data.name;
        }else{
            tplPath = data.tplPath;
        }

        if( templateRootPath && useTplPath( tplPath ) ){
            tplPath = templateRootPath + tplPath;
        }    

        data.isDir?cp('-Rf', tplPath + '*', data.path  ):cp(tplPath, data.path);

    },
    
    // create file or dir
    createItem = function(data){

        if( data.isDir ){
            mkdir('-p', data.path);
        }else{
            fs.open(data.path,"w");
        }

    }
;


exports.generate = function( input, output, templateRootPath ){
    var str = '';
    
    try{
        str = fs.readFileSync(input, 'utf8');
    }catch(e){
        console.log("Configuration file is not exist!");
        return;
    }

    var data = parser.parse(str);



    // processing levels 
    var pathData = setLevelAction (data, output,function( item, outpath, parent ){
        if(parent){
            item.path = parent.path + '/' + item.name;
        }else{
            item.path = outpath + item.name;
        }
    });

    pathData.forEach(function( item, i ){

        // copy template
        if( item.tplPath !== null ){
            setTpl( item, templateRootPath);
        }
        
        // create new file or dir
        if( !fs.existsSync(item.path) ){
            createItem( item );
        }

    });

};





