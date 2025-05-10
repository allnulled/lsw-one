# Lsw-one

Aplicación de gestión del tiempo y la información + Proyecto base para el desarrollo web del lado cliente.

> Nota: esta aplicación está en desarrollo todavía y puede sufrir cambios que la deshabiliten si no se hace un borrado de caché.

# Contenidos del documento

- [Lsw-one](#lsw-one)
- [Contenidos del documento](#contenidos-del-documento)
- [¿Qué es esta aplicación?](#qué-es-esta-aplicación)
  - [Características específicas](#características-específicas)
- [Instrucciones para el usuario](#instrucciones-para-el-usuario)
  - [Estructura de la base de datos](#estructura-de-la-base-de-datos)
  - [Aplicaciones menores](#aplicaciones-menores)
- [Instrucciones en local](#instrucciones-en-local)
  - [Requisitos](#requisitos)
  - [Comandos para el desarrollo](#comandos-para-el-desarrollo)
  - [Ficheros para el desarrollo](#ficheros-para-el-desarrollo)
- [Trucos para usuario](#trucos-para-usuario)
  - [Ficheros del kernel](#ficheros-del-kernel)
      - [Configurar los fondos de pantalla](#configurar-los-fondos-de-pantalla)
      - [Configurar los automensajes](#configurar-los-automensajes)
      - [Configurar el mensaje rutinario](#configurar-el-mensaje-rutinario)
      - [El lenguaje de Protolang](#el-lenguaje-de-protolang)

# ¿Qué es esta aplicación?

Es una aplicación de gestión del tiempo y la información.

Esto se hace a través de una *base de datos* y unas *aplicaciones menores*.

Estas aplicaciones se ponen en común y a disposición de un sistema de diálogos pintados con opacidad atenuada por un eje de profundidad, concretamente el `z-index` del `css` inyectado por componentes `vue@2`.

## Características específicas

Aunque se parezca a un sistema operativo, es simplemente que el funcionamiento principal de la aplicación y el proyecto base es:

  - Se crea una **base de datos** (basada en [*IndexedDB*](https://en.wikipedia.org/Indexed_Database_API)), lo que quiere decir que usa memoria local y por tanto:
     - Los datos *no se envían* a ninguna base de datos o servidor externo, todo ocurre en el navegador.
     - Los datos *pueden borrarse* si limpias la caché.
     - Los datos *pueden no aparecer* si accedes a la misma aplicación desde diferente perfil de navegador, dominio web, o máquina directamente.
  - Se define un **sistema de diálogos** para poder jugar con diferentes ventanas y aplicaciones a la vez, entre otras utilidades.
  - Se definen unos **componentes gráficos** y/o **aplicaciones menores** que interactúan con esta **base de datos** y entre sí.
  - Se arranca una **página inicial**, concretamente la de [`src/modules/app/app.html`](./src/modules/app/app.html).

# Instrucciones para el usuario

La app consiste en una base de datos que alimenta a diferentes aplicaciones menores. Por eso aquí, se explicará:

  - Estructura de la base de datos
  - Aplicaciones menores

A continuación se detallan estas secciones.

## Estructura de la base de datos

Las estructuras de **datos conceptuales** son:

- **Automensaje**: para proyectarte mensajes.
- **Acción**: para establecer tareas con duración en el tiempo.
- **Concepto**: para crear nuevas tareas predefinidas u otros conceptos de interés (objetivos, roles, etc).
- **Nota**: para registrar un pensamiento de interés.
- **Propagador_prototipo**: para definir un artefacto propagador abstracto reutilizable.

Las estructuras de **datos relacionales** son:

- **Categoria_de_concepto**: para asociar nuevos grupos de concepto reconocidos.
- **Impresión_de_concepto**: para asociar una percepción de estado de concepto de interés con un momento del tiempo.
- **Propagador_de_concepto**: para asociar un artefacto propagador a un concepto.

## Aplicaciones menores

Las aplicaciones menores *básicas* son:

- **agenda**: con calendario y acciones para trackeo del **yo planificativo y ejecutivo**.
- **filesystem**: para persistencia multiuso ordenada.
- **base de datos**: para persistencia estructurada ordenada.
- **notas**: para persistencia natural informal.
- **wiki**: para persistencia natural formal.
- **protolang**: para persistencia lógica.
- **automensajes**: para autoinfluenciar al yo.

# Instrucciones en local

## Requisitos

Se requieren instalados y accesibles desde línea de comandos:

  - `node`
  - `npm`
  - `npx`
  - `npx http-server`

Se requiere también:

  - ejecutar `npm install`
  - en la carpeta [`src/lsw-framework/src/apis/lsw-reloader`](src/lsw-framework/src/apis/lsw-reloader)
  - para que luego funcione el comando `npm run reloader`.

## Comandos para el desarrollo

Usa **npm run serve** para reconstruir el JS y el CSS mientras editas.

Usa **npm run build** para reconstruir el JS y el CSS.

Usa **npm run dev** para reconstruir el JS y el CSS mientras editas.

Usa **npm run reloader** para encender el servidor de escucha de cambios en ficheros.

Usa `serve` + `dev` + `reloader` combinados para desarrollo con refresco automático.

## Ficheros para el desarrollo

Tienes que:

1. Ir poniendo en [devfiles.txt](devfiles.txt) los **ficheros que editas**.
2. Ir poniendo en [dev/bundlers/distribution/bundlelist.components.js](dev/bundlers/distribution/bundlelist.components.js) los **componentes propios de la aplicación**.
3. Ir poniendo en [dev/bundlers/distribution/bundlelist.css.js](dev/bundlers/distribution/bundlelist.css.js) los **estilos propios de la aplicación**.
4. Ir poniendo en [dev/bundlers/distribution/bundlelist.js.js](dev/bundlers/distribution/bundlelist.js.js) los **scripts propios de la aplicación**.

Para ir engrosando el framework:

1. Ir poniendo en [dev/bundlers/lsw-framework/bundlelist.components.js](dev/bundlers/lsw-framework/bundlelist.components.js) los **componentes del framework**.
2. Ir poniendo en [dev/bundlers/lsw-framework/bundlelist.css.js](dev/bundlers/lsw-framework/bundlelist.css.js) los **estilos del framework**.
3. Ir poniendo en [dev/bundlers/lsw-framework/bundlelist.js.js](dev/bundlers/lsw-framework/bundlelist.js.js) los **scripts del framework**.

----

# Trucos para usuario

## Ficheros del kernel

Algunos ficheros controlan configuraciones de la aplicación.

#### Configurar los fondos de pantalla

- `/kernel/settings/background.env`

#### Configurar los automensajes

- `/kernel/settings/automessages.env`

#### Configurar el mensaje rutinario

- `/kernel/settings/rutiner.md`

#### El lenguaje de Protolang

Ves aquí que lo explica bien:

  - [./src/modules/org.allnulled.lsw-conductometria/lang/README.md](src/modules/org.allnulled.lsw-conductometria/lang/README.md)