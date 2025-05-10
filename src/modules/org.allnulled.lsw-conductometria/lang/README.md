# protolang

Lenguaje para trackeo propagativo.

Parte del ecosistema `allnulled@lsw-one`, aunque no fuerza la API.

## Instalación

```sh
git clone [link] .
```

## Compilación

```sh
bash builder.sh
```

## Uso

Con node.js haces scripts con:

```js
require(__dirname + "/protolang.js");
const ast = ProtolangParser.parse("def concepto1, concepto2");
console.log(ast);
```

Con javascript de HTML igual, importas con un script-tag normal y ya puedes.

## Formatos válidos

Todos, cualquiera. Yo uso `*.prot` o `*.proto`. No sé aún.

## Sintaxis

Solo puedes hacer 4 cosas de momento:

 - `def`: definir concepto
 - `fun`: definir función
 - `rel`: relacionar propagadores
 - `inc`: incluir recurso

### Sentencia 1 de 4: definir concepto (def)

Puedes definir conceptos:

```proto
def concepto1, concepto2, concepto3
```

Insertará estos nombres como un `Concepto` si no estaban ya.

El único separador es la coma: `,`

### Sentencia 2 de 4: definir función (fun)

Puedes definir funciones:

```proto
fun nombre de función: parametro1, parametro2 {
    // Cuerpo de función, el parser no fuerza, pero aquí va JS.
}
```

Insertará estos nombres como un `Propagador_prototipo` si no estaban ya.

### Sentencia 3 de 4: relacionar propagadores (rel)

```proto
rel concepto1
  > concepto2 * 0.8
  > concepto3 * 0.5
  > concepto4 * 0.2
  >> nombre de función: parámetro 1, parámetro 2 /* esto iría aquí: JS.call( ### ) */
```

Insertará los `Propagador` necesarios.

  - asociando los `Propagador_prototipo` necesarios desde él.

### Sentencia 4 de 4: incluir recurso

```proto
inc ./conceptos
inc ./funciones
inc ./relaciones
```

Incluirá otro fichero o carpeta, como en el ejemplo. También `*.proto`.



