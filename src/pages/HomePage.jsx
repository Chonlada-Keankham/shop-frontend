import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";

function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Astrophytum",
      price: 250,
      stock: 12,
      image: "/img/Astrophytum.jpg",
    },
    {
      id: 2,
      name: "Mammillaria",
      price: 180,
      stock: 18,
      image: "/img/Mammillaria.png",
    },
    {
      id: 3,
      name: "Gymnocalycium",
      price: 220,
      stock: 10,
      image: "/img/Gymnocalycium.png",
    },
  ];

  return (
    <>
      <Navbar />
      <HeroSection />

      <section className="featured-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">แคคตัสยอดนิยม</h2>
          <div className="row">
            {featuredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Footer />
    </>
  );
}

export default HomePage;