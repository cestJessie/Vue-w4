export default {
  props: ["pagination", "getProduct"],
  template: "#pagination", // 透過 x-template 綁定 HTML
  methods: {
    emitGetProduct(page) {
      this.$emit("emit-get-product", page);
    }
  }
};