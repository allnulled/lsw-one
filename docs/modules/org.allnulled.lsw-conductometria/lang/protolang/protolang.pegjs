{
  const reduceLoc = function(loc) {
    return `${loc.start.offset}-${loc.end.offset}|${loc.start.line}:${loc.start.column}-${loc.end.line}:${loc.end.column}`;
  };
}

start
  = MAYSPACES statements:(statement)* MAYSPACES { return statements; }

statement
  = st:(
    incStatement
  / defStatement
  / funStatement
  / relStatement)
    { return Object.assign({}, st, { $len: text().length, $loc: reduceLoc(location()) })}

incStatement
  = MAYSPACES "inc" MINSPACE path:UNTIL_NEWLINE (EOL/EOF) { return { type: "inc", path }; }

defStatement
  = MAYSPACES "def" MINSPACE names:identifierList { return { type: "def", names }; }

funStatement
  = MAYSPACES "fun" MINSPACE header:funHeader MAYSPACES code:funContent {
      return { type: "fun", ...header, code };
  }

funHeader = funHeaderWithParameters / funHeaderWithoutParameters
funHeaderWithoutParameters = name:identifier { return { name, params: "" } }
funHeaderWithParameters
  = name:identifier MAYSPACES ":" MAYSPACES params:identifierList {
    return { name, params }
  }

funContent = funContentEmpty / funContentFilled
funContentEmpty = "{" MAYSPACES "}" { return "" }
funContentFilled
  = "{" code:codeBlock EOL "}"
    { return code; }

relStatement
  = MAYSPACES "rel" MINSPACE name:identifier MAYSPACES effects:relEffect* MAYSPACES triggers:relTrigger* {
      return { type: "rel", name, effects, triggers };
  }

relEffect
  = MAYSPACES ">" MAYSPACES concept:identifier MAYSPACES "*" MAYSPACES value:number { return { type: "effect", concept, value }; }

relTrigger
  = MAYSPACES ">>" MAYSPACES expr:triggerExpr { return expr; }

triggerExpr = triggerExprByCall / triggerExprByCode

triggerExprByCall
  = name:identifier MAYSPACES ":" MAYSPACES args:UNTIL_NEWLINE (EOL/EOF) { return { type: "trigger-by-call", name, args }; }

triggerExprByCode
  = UNTIL_NEWLINE (EOL/EOF) { return { type: "trigger-by-code", code: text().trim() } }

identifierList
  = first:identifier rest:(MAYSPACES "," MAYSPACES identifier)* {
      return [first].concat(rest.map(r => r[3]));
  }

identifier
  = (!( EOL/","/"*"/":"/"{" ) .)+ { return text().trim() }

number
  = [0-9]+ ("." [0-9]+)? { return text(); }

codeBlock "Codeblock"
  = ((!( EOL "}" )) (EOL/.))+ { return text().trim() }

UNTIL_NEWLINE = (!(EOL) .)+ { return text() }
MAYSPACES = _*
MAYSPACE = _?
MINSPACE = _+
SPACE = _
EOL = ___
EOF = !.

_ = __ / ___
__ = " " / "\t"
___  = "\r\n" / "\r" / "\n"