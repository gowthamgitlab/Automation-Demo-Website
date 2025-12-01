import { InstrumentCard } from "@/components/InstrumentCard";
import { Button } from "@/components/ui/button";
import pianoImg from "@/assets/piano.jpg";
import guitarImg from "@/assets/guitar.jpg";
import violinImg from "@/assets/violin.jpg";
import drumsImg from "@/assets/drums.jpg";
import saxophoneImg from "@/assets/saxophone.jpg";
import electricGuitarImg from "@/assets/electric-guitar.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const instruments = [
  {
    name: "Grand Piano",
    category: "Keyboard",
    price: "$45,000",
    image: pianoImg,
  },
  {
    name: "Acoustic Guitar",
    category: "Strings",
    price: "$2,500",
    image: guitarImg,
  },
  {
    name: "Professional Violin",
    category: "Strings",
    price: "$8,500",
    image: violinImg,
  },
  {
    name: "Premium Drum Kit",
    category: "Percussion",
    price: "$3,200",
    image: drumsImg,
  },
  {
    name: "Alto Saxophone",
    category: "Brass",
    price: "$4,800",
    image: saxophoneImg,
  },
  {
    name: "Electric Guitar",
    category: "Strings",
    price: "$1,800",
    image: electricGuitarImg,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl text-primary-foreground drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Artistry in Sound
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Discover exceptional instruments crafted for musicians who demand perfection
          </p>
          <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-lg shadow-[var(--shadow-elegant)]"
            >
              Explore Collection
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-lg backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Instruments Grid */}
      <section className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl text-foreground">Our Collection</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each instrument is carefully selected for its exceptional quality and craftsmanship
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instruments.map((instrument, index) => (
            <InstrumentCard
              key={instrument.name}
              {...instrument}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Premium Instruments. Crafted with passion for music.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
