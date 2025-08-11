import './App.css';
import React from "react";
import {CardsPage} from "./Components/CardsPage";
import {BrowserRouter, Route, Routes} from 'react-router';
import {Layout} from "./Components/Layout";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/cards" element={<CardsPage/>}/>
                    <Route path="/collections" element={<CardsPage/>}/>

                </Routes>
            </Layout>
        </BrowserRouter>)
}




export default App;
