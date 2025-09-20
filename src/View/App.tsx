import '../App.css';
import React from "react";
import {CardPage} from "./Components/CardPage";
import {BrowserRouter, Route, Routes} from 'react-router';
import {Layout} from "./Components/Layout";
import {CollectionsPage} from "./Components/CollectionsPage";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/cards/:id" element={<CardPage />} />
                    <Route path="/collections" element={<CollectionsPage/>}/>
                    <Route path="*" element={<NotFoundPage />} />

                </Routes>
            </Layout>
        </BrowserRouter>)
}

function NotFoundPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Page Not Found</h1>
        </div>
    );
}

export default App;
