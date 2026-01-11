import React, { useRef, useState, useEffect } from 'react';
import { Link } from "wouter";
import { Music, Volume2, VolumeX, Play } from "lucide-react";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlayingMusic(!isPlayingMusic);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Audio element for background music (New World Symphony - Largo) */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.mfiles.co.uk/mp3-downloads/dvorak-new-world-symphony-2nd-movement.mp3"
      />

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
          <source src="/lipno-intro.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-5xl md:text-8xl font-bold mb-6 drop-shadow-2xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Lojzovy Paseky
          </h1>
          <p className="text-xl md:text-3xl mb-10 drop-shadow-lg font-light italic">
            "Kde se dětství potkává s přírodou..."
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/booking">
              <a className="bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-full font-bold transition-all shadow-2xl transform hover:scale-105">
                Rezervovat pobyt
              </a>
            </Link>
            <button 
              onClick={toggleMusic}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/40 px-8 py-4 rounded-full font-bold transition-all shadow-lg"
            >
              {isPlayingMusic ? <Volume2 size={20} /> : <Music size={20} />}
              {isPlayingMusic ? "Zastavit hudbu" : "Pustit atmosféru"}
            </button>
          </div>
        </div>

        {/* Tlačítko pro zvuk videa vpravo dole */}
        <button
          onClick={toggleSound}
          className="absolute bottom-10 right-10 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white p-4 rounded-full transition-all"
          title={isMuted ? "Zapnout zvuk videa" : "Vypnout zvuk videa"}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </section>

      {/* --- INFORMAČNÍ SEKCE --- */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-green-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          Symfonie klidu na břehu Lipna
        </h2>
        <p className="text-gray-600 text-xl leading-relaxed font-light">
          Vytváříme prostor, kde se čas zastaví. Naše moderní bungalovy v Lojzových Pasekách 
          jsou navrženy tak, aby splynuly s okolní přírodou a poskytly vaší rodině 
          dokonalé zázemí pro společné objevování krás Šumavy.
        </p>
      </section>

      {/* --- SEKCE S VÝHODAMI --- */}
      <section className="py-24 bg-[#fdfbf7] px-6 border-y border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center group">
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">🌲</div>
            <h3 className="text-2xl font-bold mb-4 text-green-900">Nedotčená příroda</h3>
            <p className="text-gray-600 text-lg">Probouzejte se za zpěvu ptáků a šumění lesa přímo u vašich dveří.</p>
          </div>
          <div className="text-center group">
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">🏡</div>
            <h3 className="text-2xl font-bold mb-4 text-green-900">Designový komfort</h3>
            <p className="text-gray-600 text-lg">Moderní architektura, která ctí tradici a nabízí veškeré pohodlí 21. století.</p>
          </div>
          <div className="text-center group">
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">✨</div>
            <h3 className="text-2xl font-bold mb-4 text-green-900">Unikátní atmosféra</h3>
            <p className="text-gray-600 text-lg">Místo, kde každá vteřina hraje tu nejkrásnější melodii vašeho života.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
