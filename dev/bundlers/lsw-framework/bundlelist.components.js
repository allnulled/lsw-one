const basepath = require("path").resolve(__dirname + "/../../../src");

module.exports = [
  `${basepath}/lsw-framework/src/components/lsw-calendario/lsw-calendario`,
  
  `${basepath}/lsw-framework/src/components/lsw-table/lsw-table/lsw-table`,
  `${basepath}/lsw-framework/src/components/lsw-table/lsw-table-transformers/lsw-table-transformers`,
  
  `${basepath}/lsw-framework/src/components/lsw-data-explorer/lsw-data-explorer/lsw-data-explorer`,
  `${basepath}/lsw-framework/src/components/lsw-data-explorer/lsw-data-implorer/lsw-data-implorer`,
  
  `${basepath}/lsw-framework/src/components/lsw-dialogs/lsw-dialogs`,
  
  `${basepath}/lsw-framework/src/components/lsw-windows/lsw-windows-main-tab/lsw-windows-main-tab`,
  `${basepath}/lsw-framework/src/components/lsw-windows/lsw-windows-viewer/lsw-windows-viewer`,
  `${basepath}/lsw-framework/src/components/lsw-windows/lsw-windows-pivot-button/lsw-windows-pivot-button`,
  
  `${basepath}/lsw-framework/src/components/lsw-toasts/lsw-toasts`,
  
  `${basepath}/lsw-framework/src/components/lsw-console-hooker/console-hooker`,
  
  `${basepath}/lsw-framework/src/components/lsw-database-ui/database-explorer/database-explorer`,
  `${basepath}/lsw-framework/src/components/lsw-database-ui/database-breadcrumb/database-breadcrumb`,
  
  `${basepath}/lsw-framework/src/components/lsw-database-ui/page-databases/page-databases`,
  `${basepath}/lsw-framework/src/components/lsw-database-ui/page-rows/page-rows`,
  `${basepath}/lsw-framework/src/components/lsw-database-ui/page-row/page-row`,
  `${basepath}/lsw-framework/src/components/lsw-database-ui/page-schema/page-schema`,
  `${basepath}/lsw-framework/src/components/lsw-database-ui/page-tables/page-tables`,
  
  `${basepath}/lsw-framework/src/components/lsw-filesystem-explorer/lsw-filesystem-explorer/lsw-filesystem-explorer`,
  `${basepath}/lsw-framework/src/components/lsw-filesystem-explorer/lsw-filesystem-buttons-panel/lsw-filesystem-buttons-panel`,
  `${basepath}/lsw-framework/src/components/lsw-filesystem-explorer/lsw-filesystem-editor/lsw-filesystem-editor`,
  `${basepath}/lsw-framework/src/components/lsw-filesystem-explorer/lsw-filesystem-treeviewer/lsw-filesystem-treeviewer`,
  
  `${basepath}/lsw-framework/src/components/lsw-wiki/lsw-wiki/lsw-wiki`,

  `${basepath}/lsw-framework/src/components/lsw-agenda/lsw-agenda/lsw-agenda`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-accion-add/lsw-agenda-accion-add`,
  `${basepath}/lsw-framework/src/components/lsw-agenda/components/lsw-agenda-accion-search/lsw-agenda-accion-search`,
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

  // `${basepath}/lsw-framework/src/components/lsw-formtypes/lsw-formtypes`,
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
  
  `${basepath}/lsw-framework/src/components/lsw-notes/lsw-notes`,

  `${basepath}/lsw-framework/src/components/lsw-schema-based-form/lsw-schema-based-form`,
  `${basepath}/modules/app/app`,
];