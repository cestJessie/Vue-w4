export default {
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "cj-project",
      delProductModal: null
    };
  },
  props: ["tempProduct"],
  template: "#delProductModal",
  mounted() {
    this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal);
  },
  methods: {
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      axios
        .delete(url)
        .then((res) => {
          alert(res.data.message);
          this.delProductModal.hide();
          this.$emit("emitUpdate");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }
};