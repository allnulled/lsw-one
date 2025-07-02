{
    const allProtocols = {
        "json://": column => JSON.parse(column),
        "eval://": column => eval(column),
    };
    const reduceColumns = function(columns) {
        const output = {};
        Iterating_columns:
        for(let index=0; index<columns.length; index++) {
          const { key } = columns[index];
          let { value } = columns[index];
          const knownProtocols = Object.keys(allProtocols);
          if(typeof value !== "string") {
              continue Iterating_columns;
          }
          Iterating_protocols:
          for(let indexProtocol=0; indexProtocol<knownProtocols.length; indexProtocol++) {
            const protocol = knownProtocols[indexProtocol];
            const matchesProtocol = value.startsWith(protocol);
            if(matchesProtocol) {
                const transformer = allProtocols[protocol];
                const contents = value.replace(protocol, "");
                try {
                    value = transformer(contents);
                    break Iterating_protocols;
                } catch (error) {
                    console.error(`Error parsing to protocol «${protocol}» on column «${key}» on «VolatileRowParser.parse#reduceColumns»`, error);
                }
            }
          }
          output[key] = value;
        }
        return output;
    }
}

Language = operations:VolatileRow* { return operations }

VolatileRow = VolatileRow_v1 / VolatileRow_v2

VolatileRow_v2 =
    table:TableAndRowId
        { return { into: table, row: {} } }

VolatileRow_v1 = 
    table:TableAndRowId?
    columns:PropertyAndValue+
        { return { into: table, row: reduceColumns(columns) } }

TableAndRowId "«@@»" =
    token0:_*
    token1:"@@"
    table:Table_token_sym
    id:Id_token?
        { return { table, id } }
    
Table_token_sym "«! =»" = (!("="/eol/eof) .)* { return text() }
Id_token_sym "«! eol»" = (!(eol/eof) .)* { return text() }
Property_token_sym = Table_token_sym
Value_token_sym "«! eol + @»" = (!(eol "@") .)+ { return text() }
Value_token_expr = Value_token_sym { return text() }

Id_token "«=»" = 
    token1:"="
    id:Id_token_sym
        { return id }

PropertyAndValue "«@»" =
    token0:_+
    token1:((!"@@") "@")
    key:Property_token_sym
    token2:"="
    value:Value_token_expr?
        { return { key, value } }

eol = ___
eof = !.

_ "«any space»" = __ / ___
__ = "\t" / " "
___ = "\r\n" / "\r" / "\n"