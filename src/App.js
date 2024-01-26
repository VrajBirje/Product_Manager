import { Routes, Route } from "react-router-dom";
import { ProductPage } from './pages/ProductPage/ProductPage.js';
import { AddProduct } from "./pages/AddProduct/addProduct.js";
import EditProductPage from "./pages/EditProduct/editProduct.js";
import { DeleteProductPage } from "./pages/DeleteProduct/deleteProduct.js";


function App() {
  return (
    <div className="App">

      <Routes>
        <Route
          exact
          path="/"
          element={<ProductPage />}
        ></Route>
        <Route
          exact
          path="/addproduct"
          element={<AddProduct />}
        ></Route>
        <Route
          exact
          path="/editproduct"
          element={<EditProductPage />}
        ></Route>
        <Route
          exact
          path="/deleteproduct"
          element={<DeleteProductPage />}
        ></Route>
      </Routes>
    </div>

  );
}

export default App;
