import { useRouter } from "next/router";

import Navbar from "./navbar"
import Footer from "./Footer";

export const LayoutPageWrapper = ({ children }) => {
    const router = useRouter();
    const hiddenRoutes = ["/menu-card", "/my-cart"];
    const isHidden = hiddenRoutes.includes(router.pathname) || router.pathname.startsWith("/food-details/");

    return (
        <div>
            {!isHidden && <Navbar />}
            <main>{children}</main>
            {!isHidden && <Footer />}
        </div>
    );
}