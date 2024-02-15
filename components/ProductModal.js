export default {
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "cj-project",
      productModal: null
    };
  },
  props: ["tempProduct", "isNew"],
  template: "#productModal",
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.productModal);
  },
  methods: {
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      let http = "put";

      // 透過 if 判斷 isNew 的值，得知當前開啟的是新增還是編輯 Modal，再動態調整這兩個變數內容
      if (this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
        http = "post";
      }

      axios[http](url, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          // 利用 hide 方法關閉 Modal
          this.productModal.hide();
          this.$emit("emitUpdate");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }
};