import Navbar from "./Navbar";
import Footer from './Footer';
import Home from "../pages/Home";

function Index() {
    return (
        <div className='Index'>
           <Navbar />
           <Home/>
           <Footer />
        </div>
    )
}

export default Index