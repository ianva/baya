var parser  = require("./parser.js").parser
,   fs      = require("fs")     
;

require('shelljs/global');


var setAction = function( data, outpath, fn ){

    data.forEach(function(item,i){

        if( item.level ){

            while( --i + 1 ){
                if(  item.level - data[i].level ===1 ){
                    fn( item, data[i] );
                    break;
                }
            }
        
        }else{
            item.path = outpath + item.name;
        }
    
    });

    return data;

};

exports.generate = function( input, output){
    var str = '';
    
    try{
        str = fs.readFileSync(input, 'utf8');
    }catch(e){
        console.log("Configuration file is not exist!");
        return;
    }

    var data = parser.parse(str);

    var pathData = setAction (data, output,function( item, parent ){
        item.path = parent.path + '/' + item.name;
    });

    pathData.forEach(function( item, i ){
        // mkdir
        if( item.isDir ){
            mkdir('-p', item.path);
        }else{
            fs.open(item.path,"w");
        }
    });

};





