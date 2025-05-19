LswConstants.global.define("rutiner.md", `

Aprovecha para poner algo guapo aquí.

Y se te irá recordando.

`.trim());

LswConstants.global.define("randomizables.env", `

números = 1
conceptos = 1
ideas = 1
interfaces gráficas = 1
patrones = 1
arquitectura de la realidad = 1
arquitectura del yo = 1
lenguajes formales = 1
cocina = 1
nutrición = 1
química = 1
nutrición = 1
química = 1
física = 1
matemáticas = 1
geometría = 1
canvas = 1
perspectiva = 1
medicina = 1
biología = 1
fisiología = 1
musculación = 1
flexibilidad = 1
emociones = 1
actividad física = 1
optimización de ram = 1
autocontrol = 1
autobservación = 1
autoanálisis = 1
meditación = 1
relajación = 1
paisajismo = 1
dibujo 3d = 1
perspectiva = 1
geometría = 1
mates = 1
dibujo artístico = 1
anime = 1
abstracto = 1
esquemista = 1
conceptualista = 1
reflexión = 1
diálogo interno = 1

`.trim());

LswConstants.global.define("backgrounds.env", `

assets/images/montania1.png
assets/images/playa1.png
assets/images/playa2.png

`.trim());

LswConstants.global.define("automessages.env", `

Sé tu propia luz.
Lo conseguiremos.
Todo se andará.
Sigamos adelante.
En algún momento encontraremos la luz.

`.trim());

LswConstants.global.define("Boot.tri", `

@{
  "categorias": [],
  "asco": [],
  "de": [],
  "persona": [],
  "universal": "ok"
}
Boot [Artículo para el boot] {
  @{
    "autor": "github.com/allnulled",
    "mensaje": "Dios, métete tu puto universo por tu puto culo de rata malnacida, no?",
    "año": 2025
  }
  Capitulo 1 {}
  Otro más nuevo [Otro más nuevo] {
    Parte 1 [Capitulo 2/Parte 1] {}
    Parte 2 [Capitulo 2/Parte 2] {}
    Parte 3 [Capitulo 2/Parte 3] {}
    Parte 4 [Capitulo 2/Parte 4] {}
    Parte 5 [Capitulo 2/Parte 5] {}
  }
  Capítulo 3 [] {
    Parte 1 [Capitulo 2/Parte 1] {}
    Parte 2 [Capitulo 2/Parte 2] {}
    Parte 3 [Capitulo 2/Parte 3] {}
    Parte 4 [Capitulo 2/Parte 4] {}
    Parte 5 [Capitulo 2/Parte 5] {}
  }
  Capítulo 4 [] {
    Parte 1 [Capitulo 2/Parte 1] {}
    Parte 2 [Capitulo 2/Parte 2] {}
    Parte 3 [Capitulo 2/Parte 3] {}
    Parte 4 [Capitulo 2/Parte 4] {}
    Parte 5 [Capitulo 2/Parte 5] {}
  }
  Capítulo 5 [] {
    Parte 1 [Capitulo 2/Parte 1] {}
    Parte 2 [Capitulo 2/Parte 2] {}
    Parte 3 [Capitulo 2/Parte 3] {}
    Parte 4 [Capitulo 2/Parte 4] {}
    Parte 5 [Capitulo 2/Parte 5] {}
  }
  Capítulo 6 [] {
    Parte 1 [Capitulo 2/Parte 1] {}
    Parte 2 [Capitulo 2/Parte 2] {}
    Parte 3 [Capitulo 2/Parte 3] {}
    Parte 4 [Capitulo 2/Parte 4] {}
    Parte 5 [Capitulo 2/Parte 5] {}
  }
}
  
`.trim());


LswConstants.global.define("categorias.tri", `

Árbol de categorías [] {
  Biología [] {
    Vegetal [] {}
    Animal [] {}
    Social [] {}
  }
  Medicina [] {
    Fisiología [] {}
    Nutrición [] {}
  }
  Química [] {}
  Física [] {}
  Matemáticas [] {
    Programación [] {}
    Lógica abstracta [] {}
  }
  Arte [] {}
}

`.trim());


LswConstants.global.define("report/inicio.js", `

const conceptos = await lsw.database.selectMany("Concepto");
const acciones = await lsw.database.selectMany("Accion");
const acciones_virtuales = await lsw.database.selectMany("Accion_virtual");
const propagadores = await lsw.database.selectMany("Propagador_de_concepto");
const prototipos = await lsw.database.selectMany("Propagador_prototipo");
const acumulaciones_objeto = acciones_virtuales.reduce((out, it) => {
  if(!(it.en_concepto in out)) {
    out[it.en_concepto] = 0;
  }
  out[it.en_concepto] += (LswTimer.utils.fromDurationstringToMilliseconds(it.tiene_duracion) || 0);
  return out;
}, {});
const acumulaciones = Object.keys(acumulaciones_objeto).sort((k1, k2) => {
  const c1 = acumulaciones_objeto[k1];
  const c2 = acumulaciones_objeto[k2];
  return c2 > c1 ? 1 : -1;
}).map(id => {
  const ms = acumulaciones_objeto[id];
  return {
    nombre: id,
    total: LswTimer.utils.fromMillisecondsToDurationstring(ms)
  };
});

return {
  "Acumulaciones virtuales": acumulaciones,
  "Conceptos": conceptos,
  "Acciones": acciones,
  "Acciones virtuales": acciones_virtuales,
  "Propagadores": propagadores,
  "Propagadores prototipo": prototipos,
};

`.trim());

LswConstants.global.define("boot.proto", `

inc /kernel/agenda/proto/concepto
inc /kernel/agenda/proto/funcion
inc /kernel/agenda/proto/relacion

def desayunar, comer, cenar

fun unEjemplo: param1, param2 {
  console.log("Solo un ejemplo.");
}

rel desayunar
  > consumir * 1
  > abstenerse * 0
  >> unEjemplo: 500, 1000

`.trim());

LswConstants.global.define("boot.js", `

// Cuidadito con este script que te cargas la app
// y luego tienes que borrar la caché para volver a tenerla.
        
`.trim());

LswConstants.global.define("multiplicador.js", `

fun multiplicador: contexto {
  const {
    accion,
    propagador_de_concepto
  } = contexto;
  return {
    tiene_duracion: LswTimer.utils.multiplyDuration(
      accion.tiene_duracion,
      propagador_de_concepto.tiene_parametros_extra
    )
  };
}
        
`.trim());

LswConstants.global.define("user.env", `

app.username=usuario
app.clock_message=💎
        
`.trim());

LswConstants.global.define("/kernel/settings/goals/factory/fisico-3-veces.js", `

return LswGoals.ensureActionHasMinimumTimesToday("actividad física", 3, {
  id: "actividad física",
  urgencia: 0,
  completado: "Actividad física 3 veces al día completada",
  fallido: "Hay que hacer 3 veces de actividad física al día",
});

`.trim());

LswConstants.global.define("/kernel/settings/goals/factory/fisico-4h.js", `

  
return LswGoals.ensureActionHasMinimumDurationToday("actividad física", "4h", {
  id: "actividad física",
  urgencia: 0,
  completado: "Actividad física 4 horas mínimo veces al día completada",
  fallido: "Hay que hacer 4 horas mínimo de actividad física al día",
});

`.trim());

LswConstants.global.define("/kernel/settings/goals/list/focus.env", `

nombre=enfócate
urgencia=100
mensaje=ok
intervalo=2025-05-17 - 2025/12/30

`.trim());