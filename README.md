# Lsw-one

## Links del proyecto:

- web: [https://allnulled.github.io/lsw-one](https://allnulled.github.io/lsw-one)
- android:
   - última versión: [https://limewire.com/d/EDXeM#dgmBEGtoxE](https://limewire.com/d/EDXeM#dgmBEGtoxE)
   - versión del 16 de mayo de 2025: [https://limewire.com/d/EDXeM#dgmBEGtoxE](https://limewire.com/d/EDXeM#dgmBEGtoxE)
- github: [https://github.com/allnulled/lsw-one](https://github.com/allnulled/lsw-one)
- documentación: [https://allnulled.github.io/lsw-one/reference](https://allnulled.github.io/lsw-one/reference)

### Aplicaciones:

- Base de datos
- Sistema de ficheros
- Agenda
   - Conductometría
- Notas rápidas
- Enciclopedia
- Configuraciones

## Trucos:

### Ficheros útiles

- `/kernel/boot.js`: para el evento de inicio automático.
- `/kernel/agenda/proto/boot.proto`: para iniciar una lógica de virtualización de la conductometría.
- `/kernel/agenda/report/*.js`: para importar reportes de conductometría.
- `/kernel/components/$1/$1.{html,css,js}`: para importar componentes vue@2 desde el boot.
- `/kernel/settings/table/storage/*.json`: para la caché de las tablas de la aplicación con identificador de almacén especificado.
- `/kernel/settings/automessages.env`: para los mensajes de automotivación.
- `/kernel/settings/backgrounds.env`: para las imágenes de fondo de pantalla.
- `/kernel/settings/randomizables.env`: para las actividades randomizables de la agenda.
- `/kernel/settings/rutiner.md`: para el mensaje rutinario.
- `/kernel/settings/user.env`: para preferencias de usuario simples.