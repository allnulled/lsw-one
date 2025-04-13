# lsw-one

Aplicación de gestión del tiempo y la información + Proyecto base para el desarrollo web del lado cliente.

**Nota: esta aplicación está en desarrollo todavía y puede sufrir cambios que la deshabiliten si no se hace un borrado de caché.**

# Contenidos del documento

- [lsw-one](#lsw-one)
- [Contenidos del documento](#contenidos-del-documento)
- [¿Qué es esta aplicación?](#qué-es-esta-aplicación)
  - [Características específicas](#características-específicas)
- [Instrucciones para el usuario](#instrucciones-para-el-usuario)
  - [Estructura de la base de datos](#estructura-de-la-base-de-datos)
  - [Aplicaciones menores](#aplicaciones-menores)
- [Instrucciones para el desarrollador](#instrucciones-para-el-desarrollador)
  - [Comandos para el desarrollo](#comandos-para-el-desarrollo)
  - [Ficheros para el desarrollo](#ficheros-para-el-desarrollo)

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

# Instrucciones para el desarrollador


## Comandos para el desarrollo

Usa **npm run build** para reconstruir el JS y el CSS.

Usa **npm run dev** para reconstruir el JS y el CSS mientras editas.

## Ficheros para el desarrollo

Tienes que:

1. Ir poniendo en [devfiles.txt](devfiles.txt) los **ficheros que editas**.
2. Ir poniendo en [dev/bundlers/distribution/bundlelist.components.js](dev/bundlers/distribution/bundlelist.components.js) los **componentes propios**.
3. Ir poniendo en [dev/bundlers/distribution/bundlelist.css.js](dev/bundlers/distribution/bundlelist.css.js) los **estilos propios**.
4. Ir poniendo en [dev/bundlers/distribution/bundlelist.js.js](dev/bundlers/distribution/bundlelist.js.js) los **scripts propios**.

Para ir engrosando el framework:

1. Ir poniendo en [dev/bundlers/lsw-framework/bundlelist.components.js](dev/bundlers/lsw-framework/bundlelist.components.js) los **componentes del framework**.
2. Ir poniendo en [dev/bundlers/lsw-framework/bundlelist.css.js](dev/bundlers/lsw-framework/bundlelist.css.js) los **estilos del framework**.
3. Ir poniendo en [dev/bundlers/lsw-framework/bundlelist.js.js](dev/bundlers/lsw-framework/bundlelist.js.js) los **scripts del framework**.

