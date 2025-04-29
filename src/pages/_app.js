import { LayoutPageWrapper } from "@/components/layout";
import "@/styles/globals.css";
import 'typeface-open-sans';
import 'typeface-bubblegum-sans';
import { ToastContainer } from "react-toastify";
import { CartProvider } from "@/components/contex";
// import { CartProvider } from "@/components/context/CartContext";
export default function App({ Component, pageProps }) {
  
  return (<LayoutPageWrapper>
 <CartProvider><Component {...pageProps} /></CartProvider>
    <ToastContainer/>
  </LayoutPageWrapper>)
}
