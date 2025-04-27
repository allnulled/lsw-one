const path = require("path");
const basepath = path.resolve(__dirname + "/../../../src");

module.exports = [
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // FRAMEWORK:
  `${basepath}/lsw-framework/src/styles/lsw-styling-structure.css`,
  `${basepath}/lsw-framework/src/styles/lsw-styling-theme.css`,
  `${basepath}/lsw-framework/src/styles/lsw-styling-framework.css`,
  // IMPORTER:
  `${basepath}/lsw-framework/src/apis/lsw-importer/importer.js`,
  // VUE2:
  `${basepath}/lsw-framework/src/others/vue/vue2.min.js`,
  // VUE2 SORTABLE & DRAGGABLE:
  `${basepath}/lsw-framework/src/others/vue.draggable/sortable.js`,
  `${basepath}/lsw-framework/src/others/vue.draggable/vue.draggable.js`,
  // SOCKET.IO:
  `${basepath}/lsw-framework/src/others/socket.io-client/socket.io-client.js`,
  // LSW INITIALIZATION
  `${basepath}/bootloader/initialization.js`,
  // LSW ERROR MANAGER:
  `${basepath}/lsw-framework/src/apis/lsw-error-manager/lsw-error-manager.js`,
  // LSW RELOADER:
  `${basepath}/lsw-framework/src/apis/lsw-reloader/reloadable.js`,
  // LSW ENSURER:
  `${basepath}/lsw-framework/src/apis/lsw-ensurer/ensure.js`,
  // LSW TESTER:
  `${basepath}/lsw-framework/src/apis/lsw-tester/universal-tester.js`,
  // LSW DOM:
  `${basepath}/lsw-framework/src/apis/lsw-dom/lsw-dom.js`,
  // LSW VUE2:
  `${basepath}/lsw-framework/src/apis/lsw-dom/lsw-vue2.js`,
  // LSW PROXIFIER:
  `${basepath}/lsw-framework/src/apis/lsw-proxifier/proxifier.unbundled.js`,
  // LSW RANDOMIZER:
  `${basepath}/lsw-framework/src/apis/lsw-randomizer/lsw-randomizer.js`,
  // LSW AGENDA RANDOMIZER:
  `${basepath}/lsw-framework/src/apis/lsw-agenda-randomizer/lsw-agenda-randomizer.js`,
  `${basepath}/lsw-framework/src/apis/lsw-agenda-randomizer/lsw-agenda-randomizer-reglas.js`,
  // LSW ASYNCIRCUIT:
  `${basepath}/lsw-framework/src/apis/lsw-circuiter/async-circuit.js`,
  // LSW COMMANDER:
  `${basepath}/lsw-framework/src/apis/lsw-commander/url-command.js`,
  // LSW TRIGGER:
  `${basepath}/lsw-framework/src/apis/lsw-trigger/triggers-class.js`,
  // LSW DATABASE:
  `${basepath}/lsw-framework/src/apis/lsw-database/browsie.unbundled.js`,
  // LSW LOGGER:
  `${basepath}/lsw-framework/src/apis/lsw-logger/superlogger.unbundled.js`,
  // LSW RETURNER:
  `${basepath}/lsw-framework/src/apis/lsw-returner/controlled-function.js`,
  // LSW STORE:
  `${basepath}/lsw-framework/src/apis/lsw-store/dist/store.unbundled.js`,
  // LSW TIMER:
  `${basepath}/lsw-framework/src/apis/lsw-timer/timeformat.bundled.js`,
  // LSW CYCLER:
  `${basepath}/lsw-framework/src/apis/lsw-cycler/lsw-cycler.js`,
  // LSW LIFECYCLE:
  `${basepath}/lsw-framework/src/apis/lsw-lifecycle/lsw-lifecycle.js`,
  // LSW COMPROMISER:
  `${basepath}/lsw-framework/src/apis/lsw-compromiser/lsw-compromiser.js`,
  // LSW UTILS:
  `${basepath}/lsw-framework/src/apis/lsw-utils/lsw-utils.js`,
  // LSW FILESYSTEM:
  `${basepath}/lsw-framework/src/apis/lsw-filesystem/ufs-v1.0.2.js`,
  `${basepath}/lsw-framework/src/apis/lsw-filesystem/lsw-filesystem.unbundled.js`,
  // LSW SCHEMA:
  `${basepath}/lsw-framework/src/apis/lsw-schema/lsw-schema.js`,
  // LSW CLASS REGISTER:
  `${basepath}/lsw-framework/src/apis/lsw-class-register/lsw-class-register.js`,
  // LSW DATABASE VIRTUALIZER:
  `${basepath}/lsw-framework/src/apis/lsw-database-virtualizer/lsw-database-virtualizer.js`,
  // `${basepath}/lsw-framework/src/apis/lsw-database-adapter/LswDatabaseAdapter.js`, // Por si se requiere pero en principio no y debe eliminarse
  // LSW DEPENDER:
  `${basepath}/lsw-framework/src/apis/lsw-depender/lsw-depender.js`,
  // LSW TYPER:
  `${basepath}/lsw-framework/src/apis/lsw-typer/lsw-typer.js`,
  // LSW DATABASE-UI:
  `${basepath}/lsw-framework/src/components/lsw-database-ui/database-adapter/LswDatabaseAdapter.js`,
  // DIRECTIVE V-DESCRIPTOR:
  `${basepath}/lsw-framework/src/directives/v-descriptor/v-descriptor.js`,
  // DIRECTIVE V-FOCUS:
  `${basepath}/lsw-framework/src/directives/v-focus/v-focus.js`,
  // DIRECTIVE V-XFORM:
  `${basepath}/lsw-framework/src/directives/v-xform/v-xform.js`,
  // `${basepath}/lsw-framework/src/directives/v-form/v-form.js`, // Por si se requiere pero en principio no y debe eliminarse
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // CALENDARIO:
  `${basepath}/lsw-framework/src/components/lsw-calendario/lsw-calendario`,
  // TABLE:
  `${basepath}/lsw-framework/src/components/lsw-table/lsw-table/lsw-table`,
  `${basepath}/lsw-framework/src/components/lsw-table/lsw-table-transformers/lsw-table-transformers`,
  // DATA EXPLORER:
  `${basepath}/lsw-framework/src/components/lsw-data-explorer/lsw-data-explorer/lsw-data-explorer`,
  `${basepath}/lsw-framework/src/components/lsw-data-explorer/lsw-data-implorer/lsw-data-implorer`,
  // DIALOGS:
  `${basepath}/lsw-framework/src/components/lsw-dialogs/lsw-dialogs`,
  // WINDOWS AND PROCESSES:
  `${basepath}/lsw-framework/src/components/lsw-windows/lsw-windows-main-tab/lsw-windows-main-tab`,
  `${basepath}/lsw-framework/src/components/lsw-windows/lsw-windows-viewer/lsw-windows-viewer`,
  `${basepath}/lsw-framework/src/components/lsw-windows/lsw-windows-pivot-button/lsw-windows-pivot-button`,
  // TOASTS:
  `${basepath}/lsw-framework/src/components/lsw-toasts/lsw-toasts`,
  // CONSOLE HOOKER:
  `${basepath}/lsw-framework/src/components/lsw-console-hooker/console-hooker-api.js`,
  `${basepath}/lsw-framework/src/components/lsw-console-hooker/console-hooker`,
  // DATABASE:
  `${basepath}/lsw-framework/src/components/lsw-database-ui/database-explorer/database-explorer`,
  `${basepath}/lsw-framework/src/components/lsw-database-ui/database-breadcrumb/database-breadcrumb`,
  `${basepath}/lsw-framework/src/components/lsw-database-ui/page-databases/page-databases`,
  `${basepath}/lsw-framework/src/components/lsw-database-ui/page-rows/page-rows`,
  `${basepath}/lsw-framework/src/components/lsw-database-ui/page-row/page-row`,
  `${basepath}/lsw-framework/src/components/lsw-database-ui/page-schema/page-schema`,
  `${basepath}/lsw-framework/src/components/lsw-database-ui/page-tables/page-tables`,
  // FILESYSTEM:
  `${basepath}/lsw-framework/src/components/lsw-filesystem-explorer/lsw-filesystem-explorer/lsw-filesystem-explorer`,
  `${basepath}/lsw-framework/src/components/lsw-filesystem-explorer/lsw-filesystem-buttons-panel/lsw-filesystem-buttons-panel`,
  `${basepath}/lsw-framework/src/components/lsw-filesystem-explorer/lsw-filesystem-editor/lsw-filesystem-editor`,
  `${basepath}/lsw-framework/src/components/lsw-filesystem-explorer/lsw-filesystem-treeviewer/lsw-filesystem-treeviewer`,
  // WIKI:
  `${basepath}/lsw-framework/src/components/lsw-wiki/lsw-wiki/lsw-wiki`,
  // CLOCKWATCHER:
  `${basepath}/lsw-framework/src/components/lsw-clockwatcher/lsw-clockwatcher`,
  // AGENDA:
  `${basepath}/lsw-framework/src/components/lsw-agenda/lsw-agenda/lsw-agenda`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-accion-add/lsw-agenda-accion-add`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-accion-search/lsw-agenda-accion-search`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-acciones-viewer/lsw-agenda-acciones-viewer`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-breadcrumb/lsw-agenda-breadcrumb`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-concepto-add/lsw-agenda-concepto-add`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-concepto-search/lsw-agenda-concepto-search`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-evento-search/lsw-agenda-evento-search`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-form/lsw-agenda-form`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-impresion-add/lsw-agenda-impresion-add`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-impresion-search/lsw-agenda-impresion-search`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-infraccion-search/lsw-agenda-infraccion-search`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-limitador-add/lsw-agenda-limitador-add`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-limitador-search/lsw-agenda-limitador-search`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-limitador-viewer/lsw-agenda-limitador-viewer`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-postimpresion-search/lsw-agenda-postimpresion-search`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-propagacion-search/lsw-agenda-propagacion-search`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-propagador-search/lsw-agenda-propagador-search`,
  // FORMTYPES:
  `${basepath}/lsw-framework/src/components/lsw-formtypes/api/api.js`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-form-builder/lsw-form-builder`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/lsw-formtype`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/partials/lsw-control-label/lsw-control-label`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/partials/lsw-control-error/lsw-control-error`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/partials/lsw-error-viewer/lsw-error-viewer`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/type/lsw-text-control/lsw-text-control`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/type/lsw-long-text-control/lsw-long-text-control`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/type/lsw-date-control/lsw-date-control`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/type/lsw-duration-control/lsw-duration-control`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/type/lsw-number-control/lsw-number-control`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/type/lsw-options-control/lsw-options-control`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/type/lsw-source-code-control/lsw-source-code-control`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/type/lsw-ref-object-control/lsw-ref-object-control`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/type/lsw-ref-list-control/lsw-ref-list-control`,
  `${basepath}/lsw-framework/src/components/lsw-formtypes/components/lsw-formtype/type/lsw-ref-relation-control/lsw-ref-relation-control`,
  // SCHEMA-BASED FORMS:
  `${basepath}/lsw-framework/src/components/lsw-schema-based-form/lsw-schema-based-form`,
  // NOTAS:
  `${basepath}/lsw-framework/src/components/lsw-notes/lsw-notes`,
  `${basepath}/lsw-framework/src/components/lsw-configurations-page/lsw-configurations-page`,
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // APIs Componente:
  `${basepath}/lsw-framework/src/lsw-api.js`,
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // APPLICATION:
  `${basepath}/modules/app/app`,
];