import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage.jsx";
import Pricing from "./pages/Pricing.jsx";
import NotFound from "./pages/NotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountriesList from "./components/CountriesList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import {AuthProvider} from "./contexts/FakeAuthContext.jsx";

const App = () => {


    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Homepage/>}/>
                        <Route path="product" element={<Product/>}/>
                        <Route path="pricing" element={<Pricing/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="app" element={<AppLayout/>}>
                            <Route index element={<Navigate to="cities" replace/>}/>
                            <Route path="cities" element={<CityList/>}/>
                            <Route path="cities/:id" element={<City/>}/>
                            <Route path="countries" element={<CountriesList/>}/>
                            <Route path="form" element={<Form/>}/>
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
};

export default App;