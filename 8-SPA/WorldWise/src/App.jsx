import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage.jsx";
import Pricing from "./pages/Pricing.jsx";
import NotFound from "./pages/NotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import {useEffect, useState} from "react";
import CountriesList from "./components/CountriesList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

const App = () => {

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
            async function fecthCities() {
                try {
                    setIsLoading(true);
                    const res = await fetch("http://localhost:8000/cities");
                    const data = await res.json();
                    console.log(data)
                    setCities(data)
                } catch {
                    alert("error")
                } finally {
                    setIsLoading(false)
                    console.log("Carregado")
                }
            }

            fecthCities()
        }
        , []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="app" element={<AppLayout/>}>
                    <Route index element={<Navigate to="cities" replace/>}/>
                    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="cities/:id" element={<City/>}/>
                    <Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="form" element={<Form/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;