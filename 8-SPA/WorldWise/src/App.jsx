import {lazy, Suspense} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import {AuthProvider} from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import CityList from "./components/CityList.jsx";
import CountriesList from "./components/CountriesList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";


// import Product from "./pages/Product.jsx";
// import Homepage from "./pages/Homepage.jsx";
// import Pricing from "./pages/Pricing.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import AppLayout from "./pages/AppLayout.jsx";
// import Login from "./pages/Login.jsx";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));


// dist/assets/index-Cvl1tvPK.css   30.47 kB │ gzip:   5.06 kB
// dist/assets/index-IeYPI7V8.js   506.38 kB │ gzip: 147.90 kB



const App = () => {

    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage/>}>
                    <Routes>
                        <Route path="/" element={<Homepage/>}/>
                        <Route path="product" element={<Product/>}/>
                        <Route path="pricing" element={<Pricing/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="app" element={
                            <ProtectedRoute>
                                <AppLayout/>
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="cities" replace/>}/>
                            <Route path="cities" element={<CityList/>}/>
                            <Route path="cities/:id" element={<City/>}/>
                            <Route path="countries" element={<CountriesList/>}/>
                            <Route path="form" element={<Form/>}/>
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
};

export default App;