{

    var isDir = function(mark){
        return /\+/.test(mark);
    }
}

start
= exp+

exp
= length:indent type:type name:name __* tpl:(tplpath)? __*line { 
    var ret =  {
        name: name,
        isDir: isDir( type ),
        level: length/2,
        tplPath: tpl
    }
    return ret
}

__ "whitespace" 
= [ ]

line
= [\n]*

tplpath
= inc __* path:[^\n]* {return path.join("")}

inc
= "<"

name
= n:[^\\/\n ]+ {return n.join("") }

indent 
= ws:__* { return ws.length }

type 
= [-+]__*

