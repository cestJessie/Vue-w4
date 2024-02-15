import pagination from "../components/Pagination.js"; // 分頁：拆分元件 - import module
import productModal from "../components/ProductModal.js"; // 建立產品：拆分元件 - import module
import delProductModal from "../components/DelProductModal.js"; // 刪除產品：拆分元件 - import module

// Vue
const app = Vue.createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "cj-project",
      products: [],
      // 預期開啟 Modal 時會代入的資料
      tempProduct: {
        // 儲存小圖
        imagesUrl: []
      },
      // 用於判斷當前 Modal 是新增或編輯 Modal
      isNew: false,
      pagination: {} // 分頁：定義分頁
    };
  },

  methods: {
    // #1 API: 確認使用者權限
    checkLogin() {
      axios
        .post(`${this.apiUrl}/api/user/check`)
        .then((res) => {
          this.getProduct();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    // #2 API: 取得所有產品資訊
    getProduct(page = 1) {
      // 分頁：參數預設值
      axios
        .get(`${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination; // 分頁：儲存分頁 data
          console.log(res);
        })
        .catch((err) => {
          alert(err.response.data.messaage);
        });
    },
    // #3 Modal: 判斷要開啟哪一個 Modal : 新增、編輯、刪除
    // item 代表的是當前點擊的產品資料
    openModal(status, item) {
      if (status === "new") {
        // 新增產品
        this.tempProduct = {
          imagesUrl: []
        };
        this.isNew = true;
        this.$refs.updateProduct.productModal.show();
      } else if (status === "edit") {
        // 編輯產品
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.updateProduct.productModal.show();
      } else if (status === "delete") {
        // 刪除產品
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.deleteProduct.delProductModal.show();
      }
    }
  },
  // #1 Token 設定
  // 取得 Token（Token 僅需要設定一次）
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 預設把 token 加入 headers 內
    axios.defaults.headers.common["Authorization"] = token;

    // #2 預設驗證登入
    this.checkLogin();
  },
  // 區域註冊
  components: {
    pagination,
    productModal,
    delProductModal
  }
});
app.mount("#app");