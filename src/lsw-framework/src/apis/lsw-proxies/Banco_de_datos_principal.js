$proxifier.define("org.allnulled.lsw-conductometria.Banco_de_datos_principal", {
  Item: class extends $proxifier.AbstractItem {

  },
  List: class extends $proxifier.AbstractList {

  },
  SchemaEntity: class extends $proxifier.AbstractSchemaEntity {
    static getEntityId() {
      return "org.allnulled.lsw-conductometria.Banco_de_datos_principal@SchemaEntity";
    }
    static getName() {
      return "Banco_de_datos_principal";
    }
    static getVersion() {
      return "1.0.0";
    }
    static getMethods() {
      return {};
    }
    static getProperties() {
      return {
        datatype: {
          isType: "text",
          isFormType: "text",
          isIndexed: true,
          hasValidator(v) {
            // Ok.
          },
          hasFormatter: false,
          hasLabel: "Tipo de dato:",
          hasDescription: "El tipo de dato asociado al concepto",
          hasPlaceholder: "Ej: persona, empresa, país, idioma, idea, categoría abstracta (lo que quieras)",
          hasExtraAttributes: {},
        }
      }
    }
    static getVirtualizerId() {
      return "org.allnulled.lsw-conductometria.Banco_de_datos_principal@Virtualizer";
    }
    static getFormSettings() {
      return {};
    }
    static getExtraAttributes() {
      return {
        readableName: "concepto"
      };
    }
  },
  Virtualizer: class extends $proxifier.AbstractVirtualizer {

  }
});