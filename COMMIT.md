# Último commit:

# 09-05-2025 12:57am

[x] Protolang (el parser): lenguaje para:
  [x] subir conceptos
  [x] subir prototipos de propagador
  [x] relacionar conceptos y propagadores
[x] sentencia inc
[x] botón gráficas
  [x] botón virtualizar
  [x] carpetas:
    [x] /kernel/agenda/proto/boot.proto
    [x] /kernel/agenda/report/*.js
[ ] proceso en lsw-conductometria.api.js:
  [x] borrar:
    [x] propagadores de concepto
    [x] propagadores prototipo
    [x] acciones virtuales
  [ ] iterar acciones reales
    [ ] ir ejecutando propagadores
    [ ] ir inflando acciones virtuales
[ ] reportes de conductometria
  [ ] acepta para dialog+table
  [ ] acepta para dialog+template
[ ] mejorar lsw-table para que sea más ligera
[ ] buscador de texto rápido accesible en ref-resources iría bien
  [ ] para ahorrarse el tags-control

# 06-05-2025 18:59pm - ?

[ ] Mantenimiento de bugs

# 05-05-2025 01:30am - 06-05-2025 18:59pm

[x] Fondos de pantalla configurables en:
  [x] /kernel/settings/background.env
[x] Normalizados otra vez los estilos de titulos con hX de html
[x] Eslóganes que también se ponga desde un fichero.
[x] Reelegir los botones iniciales
[x] Hacer la parte de wiki de:
  [x] Buscador de artículos
    [x] Que permita buscar entre artículos
    [x] Que permita ir al artículo y modificarlo
  [x] Explorador de libros
    [x] Que vengan del fs
    [x] De una carpeta
    [x] Con ficheros .tri
      [x] Donde se concatenan los artículos
      [x] Lo que habría que hacer en verdad es:
        [x] Lenguaje para construir árboles
        [x] Cada libro sería un árbol de artículos
        [x] En cada nodo:
          [x] un nombre del nodo
          [x] un artículo asociable al nodo
[x] Enciclopedia:
  [x] Tener un lenguaje para parsear árboles
    [x] lsw-tree-parser
  [x] Tener los componentes de las pantallas
    [x] De libros
      [x] Con botón de editar libros (diálogo)
      [x] Con botón de editar libro (diálogo)
      [x] Que puedas expandir el artículo
      [x] Con botón de editar artículo (diálogo)
    [x] De categorías
      [x] Prácticamente lo mismo que libros
    [x] De artículos
      [x] Un buscador de texto rápido
[ ] Añadidas algunas opciones en configuraciones » preferencias de usuario
  [ ] Para fondos, rutiner, etc.

----

# 04-05-2025 11:01am.

[x] Corregido bug de al eliminar row desde el diálogo de «Actualizar nota»
[x] Corregido bug de al actualizar row desde el diálogo de «Actualizar nota»
[x] Corregido bug que al expandir 1 row (en vista de tablas), expande todos
  [x] Le faltaba el id en los rows para que funcionara la feature por defecto de lsw-table
[x] Normalizados estilos de interfaz configuraciones de base de datos
[x] Botones para guardar/cargar backups:
  [x] Botones incorporados
    [x] Guardar estado
    [x] Cargar copia
    [x] Ver copia
  [x] Botones funcionando
[x] Notas del spontaneous-table:
  [x] Quitado que ponga 3 puntos al final si no llega al límite
  [x] Permiten togglear tag de parámetros de autogenerada
    [x] clicando a la mano o al robot
  [x] Se ordenan según:
    [x] urgency-first con tiene_estado de urgencia
    [x] posteriority-fist con tiene_fecha
    [x] permite alterar la fecha para ponerla encima
    [x] muestra las 3 primeras letras del estado (si tiene)
  [x] Mejorados estilos del editor
    [x] Botones de incremease/decrease fontsize
    [x] Botón de alternar tipo de fuente
[ ] Intruder
  [x] Para irse quedando con el Rutiner
    [x] Que sea dinámico, a partir de un fichero .env
  [ ] Para irse quedando con el Tracker
    [ ] Este no de momento.


----

# 29-04-2025 13:45pm.

[x] Ampliado los ítems por defecto en cada página del componente `lsw-table`
[x] Acabado bien el ciclo de actualizar tarea del componente `lsw-agenda-acciones-viewer`
  [x] afecta a la agenda
  [x] afecta a la vista de tareas anteriores
  [x] afecta a la vista de tareas posteriores
[x] De este artefacto, también cambiamos la funcionalidad y los colores de las barras de acción
  [x] el color del estado se pondrá en la hora
  [x] el color del concepto se pondrá más blanco seguramente.
  [x] el click para avanzar estado se hará en la hora
  [x] el click para desplegar detalles de tarea se hará en el nombre
    [x] le metemos markdown en los campos clave
      [x] tiene_comentarios
      [x] tiene_parametros
      [x] tiene_resultados
[x] Vamos a quitar los botones de paneles que no funcionan
  [x] Los buscadores físicos y virtuales que no tiran
    [x] Buscar por propagador
    [x] Buscar por impresion
    [x] Buscar por limite
    [x] Buscar por tablas virtuales
[x] El label de duration-control estaba fallando por el skipLabel.
[x] El lsw-table también, mejorado:
  [x] mejor distribución de botones
  [x] ampliada la opción de searcher rápido de texto
  [x] espacios laterales para scrol de móvil
  [x] redimensionamiento vertical con scrol accesible para todos
    [x] pc solo por abajo, so 200px de height inicial + resizable
[x] El lsw-schema-based-form le hemos sacado los plegadores/desplegadores al final.
[x] El picker de horas del calendario había que mejorarlo, no sé, a ver
[x] Mejorado el calendario y botones
[x] Agregamos paginador al lsw-table
[x] Tabla con paginación completa
[x] Modificada duración en tasks_viewer
[x] El flujo de new y update en la database-ui
  [x] Crea el concepto pero no redirecciona al formulario de ese row
