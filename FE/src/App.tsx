import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Home from "./components/Layout/Home.tsx"; // Đây là nơi lắp ráp
import SignIn from "./components/SignIn/SignIn.tsx";
import Login from "./components/Login/Login.tsx";
import Error from "./components/Error/Error.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
        {/* Các trang khác nếu cần */}
        <Route path="san-pham" element={<div>Trang sản phẩm</div>} />
      </Route>

      {/* Login/Logout thường không cần Header chung nên để ngoài Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<SignIn />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;