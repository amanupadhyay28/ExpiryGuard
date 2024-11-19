import Carousel from "./Carousel";
import {} from '../../assets';
const cards = [
  {
    icon: "🚀",
    title: "Launch Your Business",
    content: "Get started with our amazing tools to grow your business.",
  },
  {
    icon: "💡",
    title: "Innovative Ideas",
    content: "Explore creative solutions tailored to your needs.",
  },
  {
    icon: "📊",
    title: "Analyze Data",
    content: "Make informed decisions with advanced analytics.",
  },
  {
    icon: "🌟",
    title: "Achieve Excellence",
    content: "Reach your goals with our expert guidance.",
  },
  {
    icon: "🔒",
    title: "Secure Your Future",
    content: "Protect your investments with our secure solutions.",
  },
];

export default function App() {
  return (
    <div className="p-8 bg-orange-100">
      <h2 className="text-4xl font-extrabold text-orange-600 text-center mb-10 mt-4">
        What Our Customer Say
      </h2>
      <Carousel cards={cards} />
    </div>
  );
}
