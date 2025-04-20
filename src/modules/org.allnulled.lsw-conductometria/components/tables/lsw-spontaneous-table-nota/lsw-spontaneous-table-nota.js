// @code.start: LswSpontaneousTableNota API | @$section: Módulo org.allnulled.lsw-conductometria » Vue.js (v2) Components » LswSpontaneousTableNota API » LswSpontaneousTableNota component
Vue.component("LswSpontaneousTableNota", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-spontaneous-table-nota.data");
    return {
      allNotas: false,
      currentNotas: false,
      currentPage: 0,
      totalPages: 0,
      currentItemsPerPage: 100,
      selectedNotas: [],
    };
  },
  methods: {
    toggleNota(notaId) {
      this.$trace("lsw-spontaneous-table-nota.methods.toggleNota");
      const pos = this.selectedNotas.indexOf(notaId);
      if(pos === -1) {
        this.selectedNotas.push(notaId);
      } else {
        this.selectedNotas.splice(pos, 1);
      }
    },
    goToNextPage() {
      this.$trace("lsw-spontaneous-table-nota.methods.goToNextPage");
      if((this.currentPage+1) < this.totalPages) {
        this.currentPage++;
        this.synchronizePagination();
      }
    },
    goToFirstPage() {
      this.$trace("lsw-spontaneous-table-nota.methods.goToFirstPage");
      this.currentPage = 0;
      this.synchronizePagination();
    },
    goToLastPage() {
      this.$trace("lsw-spontaneous-table-nota.methods.goToLastPage");
      this.currentPage = (this.totalPages-1);
      this.synchronizePagination();
    },
    goToPreviousPage() {
      this.$trace("lsw-spontaneous-table-nota.methods.goToPreviousPage");
      if(this.currentPage > 0) {
        this.currentPage--;
        this.synchronizePagination();
      }
    },
    async loadNotes() {
      this.$trace("lsw-spontaneous-table-nota.methods.loadNotes");
      this.allNotas = await this.$lsw.database.selectMany("Nota");
      this.synchronizePagination();
    },
    synchronizePagination() {
      this.$trace("lsw-spontaneous-table-nota.methods.synchronizePagination");
      this.totalPages = (() => {
        const totalFullPages = Math.floor(this.allNotas.length / this.currentItemsPerPage);
        const totalResidualPages = this.allNotas.length % this.currentItemsPerPage ? 1 : 0;
        return totalFullPages + totalResidualPages;
      })();
      this.currentNotas = (() => {
        const paginatedNotas = [];
        const minIndex = this.currentPage * this.currentItemsPerPage;
        const maxIndex = (this.currentPage+1) * this.currentItemsPerPage;
        console.log(minIndex, maxIndex);
        for(let index=0; index<this.allNotas.length; index++) {
          const nota = this.allNotas[index];
          console.log(index);
          const validByMin = index >= minIndex;
          const validByMax = index < maxIndex;
          const isValid = validByMin && validByMax;
          if(isValid) {
            paginatedNotas.push(nota);
          }
        }
        console.log(paginatedNotas);
        return paginatedNotas;
      })();
    },
    goToEditNota(notaId) {
      this.$trace("lsw-spontaneous-table-nota.methods.goToEditNota");
      this.$lsw.dialogs.open({
        title: "Actualizar nota",
        template: `
          <div>
            <lsw-database-explorer
              :show-breadcrumb="false"
              initial-page="lsw-page-row"
              :initial-args="{
                database: 'lsw_default_database',
                table: 'Nota',
                rowId: notaId,
              }"
            />
          </div>
        `,
        factory: {
          data: {
            notaId,
          }
        }
      });
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-spontaneous-table-nota.mounted");
      this.loadNotes();
      this.$window.sptt_notas = this;
    } catch(error) {
      console.log(error);
    }
  }
});
// @code.end: LswSpontaneousTableNota API