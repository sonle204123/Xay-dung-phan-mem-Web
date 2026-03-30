import "./App.css";
import Data from "./components/Data";
import { Route, Routes } from "react-router-dom";
import ListData from "./components/ListData";
function App() {
    return (
        <>
            <Routes>
                <Route element={<Data></Data>} path="/"></Route>
                <Route element={<ListData></ListData>} path="/users"></Route>
            </Routes>
        </>
    );
}

export default App;
