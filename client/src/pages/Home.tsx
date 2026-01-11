import React, { useRef, useState } from 'react';
import { Link } from "wouter";
import { Music, Volume2, VolumeX, Zap, Leaf, ShieldCheck, Layout, Settings, Droplets } from "lucide-react";

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

        <button
          onClick={toggleSound}
          className="absolute bottom-10 right-10 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white p-4 rounded-full transition-all"
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

      {/* --- SEKCE "DO STŘEV" - TECHNOLOGIE A SOBĚSTAČNOST --- */}
      <section className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Pohled do střev projektu</h2>
            <p className="text-gray-400 text-xl">Když se špičková technologie snoubí s respektem k přírodě.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="bg-green-600/20 p-4 rounded-xl h-fit">
                  <Zap className="text-green-500 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Energetická soběstačnost</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Naše domy jsou navrženy s důrazem na minimální energetickou stopu. 
                    Využíváme moderní fotovoltaické systémy a inteligentní řízení spotřeby.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-blue-600/20 p-4 rounded-xl h-fit">
                  <Settings className="text-blue-500 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Tepelná čerpadla</h3>
                  <p className="text-gray-400 leading-relaxed">
                    O tepelnou pohodu se starají nejmodernější tepelná čerpadla vzduch-voda, 
                    která zajišťují efektivní vytápění i ohřev vody s minimálními náklady.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="bg-orange-600/20 p-4 rounded-xl h-fit">
                  <Droplets className="text-orange-500 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Chytré hospodaření s vodou</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Využíváme systémy pro sběr dešťové vody a její následné využití v zahradě, 
                    čímž šetříme drahocenné přírodní zdroje.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="aspect-video bg-gray-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-white/5">
                {/* Placeholder pro půdorys */}
                <div className="text-center p-8">
                  <Layout className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Technický půdorys bungalovu</p>
                  <p className="text-gray-400 mt-2 italic">Prostor vymyšlený do posledního milimetru.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-gray-500 block mb-1">Užitná plocha</span>
                  <span className="text-xl font-bold">115 m²</span>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-gray-500 block mb-1">Počet pokojů</span>
                  <span className="text-xl font-bold">4 + KK</span>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-gray-500 block mb-1">Terasa</span>
                  <span className="text-xl font-bold">28 m²</span>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <span className="text-gray-500 block mb-1">Energetická třída</span>
                  <span className="text-xl font-bold text-green-500">A+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEKCE MATERIÁLY --- */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-green-900" style={{ fontFamily: "'Playfair Display', serif" }}>Přírodní materiály, které dýchají</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Vsadili jsme na poctivé materiály, které stárnou do krásy. Masivní dřevo ze šumavských lesů, 
                přírodní kámen a ekologické izolace vytvářejí v interiéru klima, které pocítíte hned při prvním nadechnutí.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-700">
                  <ShieldCheck className="text-green-600" /> Masivní modřínové obklady s dlouhou životností
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <ShieldCheck className="text-green-600" /> Izolace z ovčí vlny a dřevovláknitých desek
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <ShieldCheck className="text-green-600" /> Lokální kámen pro akumulaci tepla
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="h-64 bg-gray-100 rounded-2xl overflow-hidden">
                <img src="/images/bungalow-kitchen-detail.jpg" alt="Detail materiálu" className="w-full h-full object-cover" />
              </div>
              <div className="h-64 bg-gray-100 rounded-2xl overflow-hidden mt-8">
                <img src="/images/sustainable-living.jpg" alt="Udržitelné bydlení" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
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
