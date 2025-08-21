{
    const reduceBlock = function(ast) {
        return ast.length === 0 ? null : ast.length === 1 ? ast[0] : {
            grupo: ast.map((sentencia, i) => {
                return Object.assign({ indice: i }, sentencia);
            })
        };
    };
    const filterSentences = function(s) {
        return (s !== null);
    };
}

NatyScript_block = ast:Bloque_naty? { return ast }

Bloque_naty = _* ast:Sentencia_completa+ _* { return reduceBlock(ast.filter(filterSentences)) }

Sentencia_completa = s:Sentencia_incompleta { return s }

Sentencia_incompleta = 
    s:(Sentencia_tipo_1
    / Sentencia_tipo_2
    / Sentencia_tipo_3
    / Conjunto
    / Conjuntivo
    / Disjuntivo
    / Negativo
    / Fin_de_sentencia)
        { return s }

Sentencia_tipo_2 = Grupo_nominal

Sentencia_tipo_3 = Predicado

Conjunto "{...}" = _* "{" _* ast:Bloque_naty _* "}" { return ast }

Conjuntivo "&..." = _* "&" _* compuesto:Bloque_naty { return { grupo: "conjuntivo", ...compuesto } }

Disjuntivo "|..." = _* "|" _* compuesto:Bloque_naty { return { grupo: "disjuntivo", ...compuesto } }

Negativo "¬..." = _* "¬" _* compuesto:Bloque_naty { return { grupo: "disjuntivo", ...compuesto } }

Negacion "¬..." = _* "¬" _* { return true }

Sentencia_tipo_1 = 
    sujeto:Grupo_nominal
    predicado:Predicado
        { return { ...sujeto, predicado } }

Grupo_nominal =
    negado:Negacion?
    texto:Token_texto
    especificidades:Complementos_de_grupo?
        { return Object.assign({ texto, negado: negado ?? undefined, especificidades: especificidades ?? undefined }) }

Predicado =
    verbo:Verbo
    complementos:Complementos_de_grupo? { return { verbo, complementos: complementos ?? undefined } }

Verbo ">..." =
    token1:(_* ">" _*)
    verbo:Grupo_nominal
        { return verbo }

Complementos_de_grupo = Complemento_de_grupo+

Complemento_de_grupo =
    Complemento_adjetivo
    / Complemento_listativo
    / Complemento_agrupativo

Complemento_adjetivo = _* "@" adjetivo:Bloque_naty { return { complemento: "adjetivo", ...adjetivo } }
Complemento_listativo = _* "[" _* colectivo:Bloque_naty _* "]" { return { complemento: "lista", ...colectivo } }
Complemento_agrupativo = _* "{" _* especificativo:Bloque_naty _* "}" { return { complement: "aclarativo", especificativo } }

Fin_de_sentencia = _* Token_eol _* { return null }

Token_texto = (!(
    Token_into_verb /
    Token_into_spec /
    Token_into_list /
    Token_into_adj /
    Token_into_conj /
    Token_into_disj /
    Token_into_neg /
    Token_eol /
    Token_eof
) .)+ { return text().trim() }

Token_into_verb = (_* ">")
Token_into_spec = (_* "{") / (_* "}")
Token_into_list = (_* "[") / (_* "]")
Token_into_adj = (_* "@")
Token_into_conj = (_* "&")
Token_into_disj = (_* "|")
Token_into_neg = (_* "¬")
Token_eol "." = "."
Token_eof = !.

Comentario "comment" = Comentario_unilinea / Comentario_multilinea
Comentario_unilinea = "//" (!(Token_eol) .)* 
Comentario_multilinea = "/*" (!("*/").)* "*/"

_ "any space" = __ / ___ / Comentario
__ "short space" = "\t" / " "
___ "long space" = "\r\n" / "\r" / "\n"