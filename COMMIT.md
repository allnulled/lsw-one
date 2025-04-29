En este commit hemos:

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

[ ] El flujo de new y update en la database-ui
  [ ] Crea el concepto pero no redirecciona al formulario de ese row
