import AppPage from "./pages/AppPage.jsx";
import Homepage from "./pages/Homepage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="apppage" element={<AppPage/>}/>
            </Routes>

        </BrowserRouter>
    );
};

export default App;