require(__dirname + "/volatile-row.parser.js");

const testSyntax = function(text) {
  const ast = VolatileRowParser.parse(text);
  console.log(JSON.stringify(ast, null, 2));
};

testSyntax(`

@@usuario=new
@nombre=Carlos
@edad=http://www.someacademy.com
@cosas=json://[{"id":"cosa 1"},{"id":"cosa 2"},{"id": "cosa 3"}]
@@usuario=new
@nombre=Loquesea
@apellido=Ok Progano

`);
