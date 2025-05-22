# Lsw-one

Complemento personal de software.

## Links del proyecto:

- web: [https://allnulled.github.io/lsw-one](https://allnulled.github.io/lsw-one)
- android: *los links expiran en 1 semana*
   - última versión: [https://limewire.com/d/GH4Hg#zEnaOHhxpu](https://limewire.com/d/GH4Hg#zEnaOHhxpu)
   - versión del 22 de mayo de 2025: [https://limewire.com/d/GH4Hg#zEnaOHhxpu](https://limewire.com/d/GH4Hg#zEnaOHhxpu)
   - versión del 20 de mayo de 2025: [https://limewire.com/d/kudnT#OM1lPo9zPT](https://limewire.com/d/kudnT#OM1lPo9zPT)
   - versión del 19 de mayo de 2025: [https://limewire.com/d/Mrfnh#KhXWBctbGg](https://limewire.com/d/Mrfnh#KhXWBctbGg)
- github: [https://github.com/allnulled/lsw-one](https://github.com/allnulled/lsw-one)
- documentación: [https://allnulled.github.io/lsw-one/reference](https://allnulled.github.io/lsw-one/reference)

### Aplicaciones:

- [Base de datos](#):
   - Para gestionar todos los datos desde 1 mismo sitio al menos
- [Sistema de ficheros](#):
   - Para persistir en forma de árbol indexado
- [Agenda](#):
   - Para llevar un control de los números del yo
   - Con conductometría como instrumento complementario
- [Notas rápidas](#):
   - Para persistir ideas sin forma ni mucho orden
   - Para hacerse borradores de artículo y pasarlos rápido
- [Enciclopedia](#):
   - Para ordenar las ideas
   - Para clasificar las ideas, con categorías
   - Para empaquetas las ideas, con libros
- [Configuraciones](#):
   - Para gestionar preferencias de usuario
   - Para operar contra la base de datos globalmente
   - Para acceder a configuración
   - Para otras que se pudieran prestar y parezca adecuado

## Trucos:

La aplicación es bastante intuitiva considero, así que paso a explicar directamente los "trucos" o aspectos más particulares y específicos.

### Ficheros útiles

En el filesystem virtual de la app puedes configurar:

- [/kernel/boot.js](#):
   - Para el evento de inicio automático.
- [/kernel/agenda/proto/boot.proto](#):
   - Para iniciar una lógica de virtualización de la conductometría.
   - Puedes usar toda la carpeta para crear tus *includes* de **protolang**
      - Sí, **protolang** (los *.proto) es un lenguaje no documentado
      - El **tripilang** (los *.tri) tampoco está documentado
- [/kernel/agenda/report/*.js](#):
   - Para importar reportes de conductometría.
- [/kernel/components/$1/$1.{html,css,js}](#):
   - Para importar componentes vue@2 desde el boot.
- [/kernel/settings/table/storage/*.json](#):
   - Para la caché de las tablas de la aplicación con identificador de almacén especificado.
- [/kernel/settings/automessages.env](#):
   - Para los mensajes de automotivación.
- [/kernel/settings/backgrounds.env](#):
   - Para las imágenes de fondo de pantalla.
- [/kernel/settings/randomizables.env](#):
   - Para las actividades randomizables de la agenda.
- [/kernel/settings/rutiner.md](#):
   - Para el mensaje rutinario.
- [/kernel/settings/user.env](#):
   - Para preferencias de usuario simples.
- [/kernel/settings/goals/factory](#):
   - Funciones que devuelven los parámetros de un objetivo.
- [/kernel/wiki/categorias.tri](#):
   - Para las categorías disponibles desde la enciclopedia.
   - Sí, **tripilang** (los *.tri) no está documentado. Pero no es difícil.
- [/kernel/wiki/libros/*.tri](#):
   - Para los índices de artículos de los libros disponibles desde la enciclopedia.

### Flujos ocultos o no intuitivos

- El botón con `{🎲}`:
   - al clicar, en silencio se importan los `randomizables` que falten, como `Concepto`.
- El boton de `Resetear` en *Configuraciones » Base de datos*:
   - borrará la base de datos si no hay conexiones extra:
   - pero puede que tengas que refrescar (o salir y entrar de la app) para que se pueda seguir usando la base de datos.
      - son cosas de *IndexedDB* y yo no puedo hacer nada con esto.
