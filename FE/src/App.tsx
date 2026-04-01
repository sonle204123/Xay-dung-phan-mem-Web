import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout.tsx";
import Error from "./components/Error/Error.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Header />} />
          
        </Route>
        <Route path="*" element={<Error/>} />
      </Routes>
    </>
  );
}

export default App;
