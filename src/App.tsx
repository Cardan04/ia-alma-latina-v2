/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  BookOpen, 
  GraduationCap, 
  Music, 
  ChevronRight, 
  X,
  ArrowRight,
  Menu
} from 'lucide-react';
import { 
  ALBUM_NAME, 
  ARTIST_NAME, 
  INSTAGRAM_URL, 
  SONGS, 
  PROJECTS,
  Song
} from './data';

export default function App() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openSong = (song: Song) => {
    setSelectedSong(song);
    document.body.style.overflow = 'hidden';
  };

  const closeSong = () => {
    setSelectedSong(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#1a1a1a] font-sans selection:bg-[#5A5A40] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-serif font-bold tracking-tight text-[#5A5A40]"
          >
            {ARTIST_NAME}
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#album" className="text-sm font-medium hover:text-[#5A5A40] transition-colors">Álbum</a>
            <a href="#projects" className="text-sm font-medium hover:text-[#5A5A40] transition-colors">Projetos</a>
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-[#5A5A40] text-white rounded-full hover:bg-[#4a4a34] transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-32 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 bg-[#5A5A40]/10 text-[#5A5A40] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              Novo Lançamento
            </span>
            <h1 className="text-7xl md:text-9xl font-serif font-bold leading-[0.9] mb-10">
              {ALBUM_NAME}
            </h1>
            <p className="text-xl md:text-2xl text-[#4a4a4a] mb-12 max-w-2xl mx-auto leading-relaxed">
              Uma jornada musical profunda através das letras de louvor que tocam a alma. Acompanhe cada palavra desta experiência espiritual.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="#album" 
                className="px-10 py-5 bg-[#5A5A40] text-white font-bold rounded-full hover:bg-[#4a4a34] transition-all flex items-center group shadow-xl shadow-[#5A5A40]/20"
              >
                Ver Letras <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white text-[#5A5A40] border border-[#5A5A40]/20 font-bold rounded-full hover:bg-[#5A5A40]/5 transition-all flex items-center"
              >
                Seguir no Instagram
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-[#5A5A40] rounded-full opacity-[0.03] blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#5A5A40] rounded-full opacity-[0.05] blur-3xl -z-10"></div>
      </header>

      {/* Album Songs List */}
      <section id="album" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Letras do Álbum</h2>
              <p className="text-[#6a6a6a]">Selecione um louvor para ler a letra completa</p>
            </div>
            <div className="flex items-center space-x-2 text-[#5A5A40] font-bold pb-2 border-b-2 border-[#5A5A40]/20">
              <Music size={20} />
              <span>{SONGS.length} Faixas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SONGS.map((song, index) => (
              <motion.button
                key={song.id}
                whileHover={{ y: -5 }}
                onClick={() => openSong(song)}
                className="group p-8 bg-[#fcfaf7] border border-[#5A5A40]/10 rounded-3xl text-left hover:border-[#5A5A40]/40 transition-all text-balance"
              >
                <span className="text-xs font-mono text-[#5A5A40] opacity-50 block mb-4">0{index + 1}</span>
                <h3 className="text-xl font-serif font-bold group-hover:text-[#5A5A40] transition-colors mb-4">{song.title}</h3>
                <div className="w-8 h-[2px] bg-[#5A5A40]/20 group-hover:w-16 group-hover:bg-[#5A5A40] transition-all"></div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-[#1a1a1a]/5 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-16">
            {/* Brand & Copyright */}
            <div className="space-y-6">
              <div className="text-[#5A5A40] font-serif font-bold text-3xl uppercase tracking-tighter">
                {ARTIST_NAME}
              </div>
              <p className="text-[#6a6a6a] max-w-xs leading-relaxed">
                Compartilhando a fé através da música e da poesia. Louvor que nasce do coração para a alma.
              </p>
              <p className="text-[#a1a1a1] text-xs">
                © {new Date().getFullYear()} Roma Louvor. Todos os direitos reservados.
              </p>
            </div>

            {/* Projects (In Footer) */}
            <div id="projects" className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5A5A40]">Projetos Em Breve</h3>
              <ul className="space-y-6">
                {PROJECTS.map((project, index) => (
                  <li key={index} className="group">
                    <span className="text-[10px] font-bold text-[#5A5A40]/50 uppercase block mb-1">Lançamento</span>
                    <h4 className="font-serif font-bold text-lg group-hover:text-[#5A5A40] transition-colors">{project.title}</h4>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#5A5A40]">Redes Sociais</h3>
              <p className="text-[#6a6a6a] text-sm">Fique por dentro das novidades e bastidores.</p>
              <a 
                href={INSTAGRAM_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 text-[#1a1a1a] hover:text-[#5A5A40] transition-all group"
              >
                <div className="p-3 bg-[#5A5A40]/5 rounded-full group-hover:bg-[#5A5A40] group-hover:text-white transition-all">
                  <Instagram size={20} />
                </div>
                <span className="font-bold">@romalouvor</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Lyrics Modal */}
      <AnimatePresence>
        {selectedSong && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div 
              className="absolute inset-0 bg-[#000]/40 backdrop-blur-sm" 
              onClick={closeSong}
            ></div>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-[40px] flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-[#f0f0f0] flex justify-between items-center sticky top-0 bg-white z-10">
                <div>
                  <span className="text-xs font-bold text-[#5A5A40]/60 uppercase tracking-widest mb-1 block">Álbum Alma Latina</span>
                  <h3 className="text-2xl font-serif font-bold">{selectedSong.title}</h3>
                </div>
                <button 
                  onClick={closeSong}
                  className="p-3 bg-[#fcfaf7] rounded-full hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 md:p-16 custom-scrollbar">
                <pre className="whitespace-pre-wrap font-serif text-lg md:text-xl leading-relaxed text-[#3a3a3a] text-center italic">
                  {selectedSong.lyrics}
                </pre>
                <div className="mt-16 pt-8 border-t border-[#f0f0f0] text-center">
                  <p className="text-[#a1a1a1] text-sm font-serif">Roma Louvor</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fcfaf7;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5A5A4030;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #5A5A4050;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;700&display=swap');
        
        h1, h2, h3, .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        
        body, .font-sans {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}
