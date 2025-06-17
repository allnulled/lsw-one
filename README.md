# Lsw-one

Complemento personal de software.

## Links del proyecto:

- web: [https://allnulled.github.io/lsw-one](https://allnulled.github.io/lsw-one)
- android: *los links expiran en 1 semana*
   - última versión: [https://limewire.com/d/XPVEI#ke3F0Dv4y3](https://limewire.com/d/XPVEI#ke3F0Dv4y3)
   - versión del 17 de junio de 2025: [https://limewire.com/d/XPVEI#ke3F0Dv4y3](https://limewire.com/d/XPVEI#ke3F0Dv4y3)
   - versión del 11 de junio de 2025: [https://limewire.com/d/3ozEK#mes5pxNwiq](https://limewire.com/d/3ozEK#mes5pxNwiq)
   - versión del 07 de junio de 2025: [https://limewire.com/d/Jssxd#rz6sW7c7fb](https://limewire.com/d/Jssxd#rz6sW7c7fb)
   - versión del 25 de mayo de 2025: [https://limewire.com/d/wwZ9R#XVbUKcXNYT](https://limewire.com/d/wwZ9R#XVbUKcXNYT)
   - versión del 22 de mayo de 2025: [https://limewire.com/d/78RSi#zH7uOedSQi](https://limewire.com/d/78RSi#zH7uOedSQi)
   - versión del 20 de mayo de 2025: [https://limewire.com/d/kudnT#OM1lPo9zPT](https://limewire.com/d/kudnT#OM1lPo9zPT)
   - versión del 19 de mayo de 2025: [https://limewire.com/d/Mrfnh#KhXWBctbGg](https://limewire.com/d/Mrfnh#KhXWBctbGg)
- github: [https://github.com/allnulled/lsw-one](https://github.com/allnulled/lsw-one)
- documentación: [https://allnulled.github.io/lsw-one/reference](https://allnulled.github.io/lsw-one/reference)

### Aplicaciones:

Las aplicaciones que vienen por defecto son:

- 📦 Base de datos
- 📂 Sistema de ficheros
- 💣 Binarios
- 📆 Calendario con:
   - 📊 Reportes
   - 🔮 Conductometría
   - 🏁 Objetivos y hábitos
- ⬅️🕔 Tareas anteriores
- 🕔➡️ Tareas posteriores
- 💬 Notas
- 💬➕ Nueva nota
- 🔬 Enciclopedia
- 🔬➕ Nuevo artículo
- 🪲 Inspector de JS
- 💻 Consola de JS
- ✅ Tests de aplicación (⚠️: en construcción todavía 🏗)
- 🔧 Configuraciones
- ✨ Nueva feature (⚠️: reservado para desarrollo)
- 🏅 Example of app (⚠️: también reservado para desarrollo)

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
- [/kernel/components/$componente/$componente.{html,css,js}](#):
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
- [/kernel/settings/rutiner.config.env](#):
   - Para las configuraciones del mensaje rutinario.
- [/kernel/settings/user.env](#):
   - Para preferencias de usuario simples.
- [/kernel/settings/goals/factory](#):
   - Funciones que devuelven los parámetros de un objetivo.
- [/kernel/wiki/categorias.tri](#):
   - Para las categorías disponibles desde la enciclopedia.
   - Sí, **tripilang** (los *.tri) no está documentado. Pero no es difícil.
- [/kernel/wiki/libros/*.tri](#):
   - Para los índices de artículos de los libros disponibles desde la enciclopedia.
- [/kernel/goals/goals.week](#):
   - Para adjuntar objetivos a fechas y días de semanas
   - Permite crear escuchas de barras en el widget de `calendario » después`.
   - Permite crear acciones pendientes a los días
      - se crean cuando se visita el día y se encuentra la coincidencia
   - Debe seguir la sintaxis de `weeklang`, lenguaje documentado en:
      - [./src/lsw-framework/src/apis/lsw-languages/weeklang/README.md](./src/lsw-framework/src/apis/lsw-languages/weeklang/README.md)

Seguramente hay más.

### Flujos ocultos o no intuitivos

- El botón con `🎲↗️`:
   - al clicar, en silencio se importan los `randomizables` que falten, como `Concepto`.
   - es el bloque `Load_secretly_random_actions_as_concepts` en el código en `lsw-agenda-acciones-viewer.js`.
- El boton de `Resetear` en *Configuraciones » Base de datos*:
   - borrará la base de datos si no hay conexiones extra:
   - pero puede que tengas que refrescar (o salir y entrar de la app) para que se pueda seguir usando la base de datos.
      - son cosas de *IndexedDB* y yo no puedo hacer nada con esto.

# Flujo funcional básico

- Se trataría de hacer el script de `weeklang` para que las barras se te vayan poniendo para tus cosas.
   - en el calendario, este botón: `🏁↗️`
   - está escondido, porque en principio te pones la rutina semanal y él ya te la va recordando.
- Y tienes luego para ir añadiendo información, organizándote una base de datos de artículos y libros, de momento.
- Y tienes el apartado de binarios también, para lanzar scripts rápidamente.

# Extras de interés

## Variables del editor en entorno normal

A parte de toda la API normal, con todas sus globales y demás, destacar:

```js
// Las básicas:
Vue.prototype.$lsw.toasts.collapse({});
this.$lsw;
lsw.toasts.send({
   title: "whatever",
   text: "whatever else",
});
Vue.prototype.$lsw.toasts.debug({});
await LswAndroid.eval(es6code);
await LswAndroid.evalFile(es6file);
// Si necesitas más:
await Vue.prototype.$lsw.dialogs.open({
   title: "título",
   template: `<pre class="codeblock">{{ typeof debuggable === 'string' ? debuggable : JSON.stringify(debuggable, null, 2) }}</pre>`,
   factory: {
      data: {
         debuggable: {}
      }
   }
});
```

## Variables del editor en entorno android

```js
cordova
cordova.plugins.Rhinobridge.evaluate(es5code);
applicationContext
Packages
System
Math
$RhinobridgePluginClass
$rhinobridgePlugin
$scope
$rhino
$webview /*
$webview.loadUrl("javascript:" + es5code);
*/
abg /*
abg instanceof class AndroidBridge {
   public Context getContext()
   public Object getSystemService(String name)
   public Class<?> getClass(String name) throws ClassNotFoundException
   public Class<?> forName(String name) throws ClassNotFoundException
   public void toast(String text, int duration)
   public String getPackageName()
   public Object getApplicationInfo()
   public Object getResources()
   public Object getAssets()
   public Object getContentResolver()
   public Object getApplicationContext()
}
*/
print('not seen anywhere')
evaluateByBrowser("alert('hello')");
```