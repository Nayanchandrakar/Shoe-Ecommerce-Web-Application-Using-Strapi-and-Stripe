import React, { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header, Loader, Footer, Cart, Search } from "./Files/Exporter"
import { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"



const App = () => {
    const GetHome = lazy(() => import("./pages/Home"))
    const LoadProductDetails = lazy(() => import("./pages/ProductDetail"))

    return (
        <>
            <SkeletonTheme baseColor="#D8D8D8" highlightColor="#C8C8C8">
                <BrowserRouter>
                    <Header />
                    <Search />
                    <Cart />
                    <main className="overflow-x-hidden">
                        <Suspense
                            fallback={
                                <div className="w-full flex justify-center items-center h-[80vh]">
                                    <Loader />
                                </div>
                            }
                        >
                            <Routes>
                                <Route exact path="/" element={<GetHome />} />
                                <Route
                                    exact
                                    path="/productdetails/:id"
                                    element={<LoadProductDetails />}
                                />
                            </Routes>
                        </Suspense>
                    </main>

                    <Footer />
                </BrowserRouter>
            </SkeletonTheme>
        </>
    )
}

export default App
