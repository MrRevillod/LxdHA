
import { Helmet } from "react-helmet"
import { MainLayout } from "../layouts/MainLayout"

export const NotFoundPage = () => {

    return (

        <MainLayout>

            <Helmet>
                <title>Lx High Availability - 404 Not Found</title>
            </Helmet>

            <div className="w-full h-full flex items-center justify-center">
                <h1 className="text-5xl text-neutral-100 font-bold">404 - Not Found</h1>
            </div>

        </MainLayout>
    )
}