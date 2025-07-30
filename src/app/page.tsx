import HeroSlider from './components/Landing';
import Products from './components/Products';
import About from "./components/About"
import ContactUs from './components/Contact';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <About />
      <Products />
      <ContactUs />
    </>
  );
}