import React, { useRef, useState } from 'react';
import { Link } from "wouter";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SEKCE S VIDEEM --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
        >
          {/* Soubor musí být ve složce 'public' pod tímto názvem */}
          <source src="/Nahrání_videa_a_jeho_dostupnost.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/30 z-10" />

        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-2xl">
            Dětství patří přírodě
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg font-light">
            Moderní bungalovy a rodinné zázemí na Lipně
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/booking">
              <a className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg">
                Nabídka pronájmu
              </a>
            </Link>
            <Link href="/gallery">
              <a className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 px-10 py-4 rounded-full font-bold transition-all shadow-lg">
                Prohlédnout galerii
              </a>
            </Link>
          </div>
        </div>

        {/* Tlačítko pro zvuk vpravo dole */}
        <button
          onClick={toggleSound}
          className="absolute bottom-10 right-10 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white p-4 rounded-full transition-all"
        >
          {isMuted ? "Zapnout zvuk 🔇" : "Vypnout zvuk 🔊"}
        </button>
      </section>

      {/* --- INFORMAČNÍ SEKCE --- */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-800">Specialista na Lojzovy Paseky</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Vytváříme moderní zázemí pro rodiny s důrazem na sepětí s přírodou. 
          Spojení špičkového designu, komfortu a klidu Lipenské přehrady je cesta k nezapomenutelným zážitkům.
        </p>
      </section>

      {/* --- SEKCE S VÝHODAMI --- */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="text-4xl mb-4">🌲</div>
            <h3 className="text-xl font-bold mb-2">Čistá příroda</h3>
            <p className="text-gray-600">Bydlení přímo u lesa a jen pár kroků od břehu Lipna.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🏡</div>
            <h3 className="text-xl font-bold mb-2">Moderní bungalovy</h3>
            <p className="text-gray-600">Špičkové vybavení a design, který vás nadchne svou jednoduchostí.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-bold mb-2">Rodinné zázemí</h3>
            <p className="text-gray-600">Ideální místo pro děti, kde mohou bezpečně objevovat svět.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
