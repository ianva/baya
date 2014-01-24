%lex

%%
\n                  return 'EOL'
[+-]\s*             return 'opt';
\s+                 return 'ws';
[a-zA-Z0-9._-]+     return 'name';
<<EOF>>             return 'EOF'

/lex

%left '+' 
%left 'x'

%%

inp
    : sta
        { list.push($1); $$ = list }
    | inp sta
        { list.push($2); $$ = list }
    | inp EOF
        { $$ = $1; return $$ }
    ;

sta
    : ex EOL 
        { $$ = $1 }
    ;

ex  
    : opt ex
        %{ 
            $$ = getEx($2,$1) 
        %}
    | ws opt ex
        %{ 
            $$ = getEx($3,$2,$1) 
        %}
    | name 
        {$$ = $1}
    ;

%%

var list = []
;

var getLevel = function( wp ){
        return wp.length?(wp.length)/4:0;
    },
    isDir = function(opt){
        return /\+/.test(opt);
    },
    getEx = function( name, opt, ws ){
        var ret = {
            name: name,
            isDir: isDir( opt ),
            level: 0,
        };
        if( arguments.length > 2 ){
            ret.level = getLevel(ws)
        }
        return ret;
    }
;
