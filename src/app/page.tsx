import HeroSlider from './components/Landing';
import Products from './components/Products';
import About from "./components/About"

export default function Home() {
  return (
    <>
      <HeroSlider />
      <About />
      <Products />
    </>
  );
}