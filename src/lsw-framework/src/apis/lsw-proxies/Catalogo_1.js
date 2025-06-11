$proxifier.define("org.allnulled.lsw-conductometria.Catalogo", {
  Item: class extends $proxifier.AbstractItem {

  },
  List: class extends $proxifier.AbstractList {

  },
  SchemaEntity: class extends $proxifier.AbstractSchemaEntity {
    static getEntityId() {
      return "org.allnulled.lsw-conductometria.Catalogo@SchemaEntity";
    }
    static getName() {
      return "Catalogo";
    }
    static getVersion() {
      return "1.0.0";
    }
    static getMethods() {
      return {};
    }
    static getProperties() {
      return {
        en_concepto: {
          refersTo: {
            entity: "org.allnulled.lsw-conductometria.Concepto@SchemaEntity",
            table: "Concepto",
            property: "tiene_nombre",
            constraint: false,
          },
          isType: "ref-object",
          isFormType: "ref-object",
          isIndexed: true,
          hasFormtypeParameters: {},
          hasValidator(v) {
            if(v.trim() === '') throw new Error("Cannot be empty");
          },
          hasFormatter: false,
          hasLabel: "En concepto de:",
          hasDescription: "Nombre del concepto al que se atribuye el artículo del catálogo",
          hasPlaceholder: "Ej: Correr",
          hasExtraAttributes: {},
        },
        en_catalogo: {
          isType: "text",
          isFormType: "text",
          isIndexed: false,
          hasFormtypeParameters: {},
          hasValidator(v) {
            // Ok.
          },
          hasFormatter: false,
          hasLabel: "En catálogo:",
          hasDescription: "Catálogo al que pertenece el artículo",
          hasPlaceholder: "Nombre único del catálogo",
          hasExtraAttributes: {},
        },
        tiene_creacion: {
          isType: "text",
          isFormType: "date",
          isFormSubtype: "datetime",
          isIndexed: true,
          hasFormtypeParameters: {},
          hasValidator: function (v) {
            LswTimer.utils.isDatetimeOrThrow(v);
          },
          hasFormatter: function (v) {
            return LswTimer.utlis.getDateFromMomentoText(v);
          },
          hasLabel: "Tiene creación:",
          hasDescription: "Momento en que se creó el artículo del catálogo",
          hasPlaceholder: false,
          hasExtraAttributes: {},
        },
        tiene_texto: {
          isType: "text",
          isFormType: "long-text",
          isIndexed: false,
          hasFormtypeParameters: {},
          hasValidator(v) {
            // Ok.
          },
          hasFormatter: false,
          hasLabel: "Tiene texto:",
          hasDescription: "Contenido del artículo del catálogo",
          hasPlaceholder: "Puede ser un **markdown**",
          hasExtraAttributes: {},
        },
        tiene_esquema: {
          isType: "text",
          isFormType: "long-text",
          isIndexed: false,
          hasFormtypeParameters: {},
          hasValidator(v) {
            MermoidParser.parse(v);
          },
          hasFormatter: false,
          hasLabel: "Tiene esquema:",
          hasDescription: "Esquema del artículo del catálogo",
          hasPlaceholder: "Puede ser un **mermaid**",
          hasExtraAttributes: {},
        },
      }
    }
    static getVirtualizerId() {
      return "org.allnulled.lsw-conductometria.Catalogo@Virtualizer";
    }
    static getFormSettings() {
      return {};
    }
    static getExtraAttributes() {
      return {
        readableName: "catálogo"
      };
    }
  },
  Virtualizer: class extends $proxifier.AbstractVirtualizer {

  }
});