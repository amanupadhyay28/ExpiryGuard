import "./Marque.css";
import { Parle } from "../../assets/index"
import { Britania } from "../../assets/index";
import { MotherDairy } from "../../assets/index";
import { Nestle } from "../../assets/index";
import { Haldiram } from "../../assets/index";
import { Bikaji } from "../../assets/index";
import { Amul } from "../../assets/index";

const MarqueeCarousel = () => {
  const customers = [
    { logo: Amul },
    { logo: Bikaji },
    { logo: Haldiram },
    { logo: Nestle },
    { logo: MotherDairy },
    { logo: Britania },
    { logo: Parle },
  ];

  return (
    <section >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Trusted by Industry Leaders
      </h2>
      <div className="marquee-container overflow-hidden relative">
        <div className="marquee-content flex items-center space-x-8">
          {customers.map((customer, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[150px]  shadow-md p-4 rounded-lg hover:scale-105 transition-transform"
            >
              <img src={customer.logo} className="w-20 h-auto" />
              <p className="mt-4 text-gray-600">{customer.name}</p>
            </div>
          ))}
          {/* Duplicate the content for seamless scrolling */}
          {customers.map((customer, index) => (
            <div
              key={`copy-${index}`}
              className="flex flex-col items-center justify-center min-w-[150px]  shadow-md p-4 rounded-lg hover:scale-105 transition-transform"
            >
              <img
                src={customer.logo}
                alt={customer.name}
                className="w-20 h-auto"
              />
              <p className="mt-4 text-gray-600">{customer.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeCarousel;
