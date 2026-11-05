import PatternWaves from "@/components/PatternWaves";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const LandingPage = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#120f17]">
      <div className="absolute inset-0 z-0">
        <PatternWaves
          preset="silk"
          color="#ffffff"
          backgroundColor="#120f17"
          fade="edges"
          interactive={false}
          cursorSize={50}
          cursorStrength={0.6}
          pattern="dot"
          wave="silk"
          spacing={9}
          markSize={0.6}
          depth={0.95}
          light={0}
          shine={0.4}
          contrast={0.7}
          speed={0.35}
          scale={1}
          direction={20}
          opacity={1}
          fadeSize={0.5}
          characters=".:-=+*#%@"
          intro
          paused={false}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Hero />
        </main>
        <Footer />
      </div>
    </main>
  );
};

export default LandingPage;
