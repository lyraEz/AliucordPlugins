import React, { useState, useMemo, useEffect } from 'react';
import { Search, Download, Hash, Filter, Sparkles, Github, Heart, Loader2 } from 'lucide-react';

export default function App() {
  const [pluginsData, setPluginsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Faz o fetch brabo direto do teu repositório qnd carrega o app
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Puxa o arquivo JSON lá do teu repo na branch main
    fetch('https://raw.githubusercontent.com/lyraEz/AliucordPlugins/main/plugins/list/plugins.json')
      .then(response => {
        if (!response.ok) throw new Error("A base não respondeu, fudeu!");
        return response.json();
      })
      .then(data => {
        setPluginsData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Erro ao puxar os plugins:", error);
        setIsLoading(false);
        // Fallback pra caso o link quebre antes de tu criar o arquivo lá
        setPluginsData([]); 
      });
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set();
    pluginsData.forEach(p => p.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [pluginsData]);

  const filteredPlugins = useMemo(() => {
    return pluginsData.filter(plugin => {
      const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            plugin.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            plugin.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                          selectedTags.every(tag => plugin.tags?.includes(tag));
                          
      return matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedTags, pluginsData]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const nameArray = ['L','y','r','a','E','z'];

  return (
    <div className="min-h-screen bg-[#E6E6FA] text-purple-900 font-sans selection:bg-purple-300 selection:text-purple-900 pb-12 relative">
      
      <div className="fixed top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#E6E6FA] to-transparent pointer-events-none z-40"></div>
      <div className="fixed bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#E6E6FA] to-transparent pointer-events-none z-40"></div>

      <style>{`
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: linear-gradient(135deg, #E6E6FA 0%, #D8BFD8 50%, #E0B0FF 100%);
          background-attachment: fixed;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-float-icon {
          animation: float 3.5s ease-in-out infinite;
        }
        .wave-text span {
          display: inline-block;
          animation: wave 1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
      `}</style>

      <nav className="sticky top-0 z-50 px-6 py-4 bg-white/40 backdrop-blur-md border-b border-white/40 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 cursor-pointer group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center shadow-md shadow-purple-500/20 transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
              <Sparkles className="text-white w-6 h-6 animate-float-icon" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600 transition-colors duration-300 hidden sm:block">
              Aliucord<span className="font-light">Hub</span>
            </h1>
          </div>
          
          <div className="relative w-full max-w-xl group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-purple-500/60 transition-colors duration-200 group-focus-within:text-purple-600" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar plugins ou autores..."
              className="w-full pl-10 pr-4 py-2 bg-white/60 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/40 text-purple-900 placeholder-purple-500/60 transition-colors duration-200 focus:bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <a 
            href="https://github.com/lyraEz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white/50 hover:bg-purple-600 hover:text-white text-purple-700 rounded-xl border border-white/60 shadow-sm transition-all duration-200 active:scale-95 text-sm font-bold shrink-0 ml-auto"
          >
            <Github className="w-5 h-5" />
            <span className="hidden md:inline">lyraEz</span>
          </a>

        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12 relative z-10">
        
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-purple-900 drop-shadow-sm tracking-tight">
            Repositório Central
          </h2>
          <p className="text-purple-700/80 font-medium max-w-2xl text-lg leading-relaxed">
            Dados extraídos diretamente do seu repositório no GitHub. Downloads diretos, otimizados e sem delay.
          </p>
        </div>

        <div className="mb-12 p-6 rounded-2xl bg-white/50 border border-white/60 shadow-sm">
          <div className="flex items-center gap-2 mb-5 text-purple-800 font-bold">
            <Filter className="w-5 h-5" />
            <h3 className="text-lg">Parâmetros de Filtragem</h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors duration-200 flex items-center gap-1.5 active:scale-95 ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-500 text-white border border-purple-400 shadow-sm'
                    : 'bg-white/60 text-purple-700 border border-white/60 hover:bg-white/80'
                }`}
              >
                <Hash className={`w-3.5 h-3.5 ${selectedTags.includes(tag) ? 'opacity-100' : 'opacity-70'}`} />
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button 
                onClick={() => setSelectedTags([])}
                className="px-4 py-1.5 rounded-full text-sm font-bold text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 active:scale-95 border border-transparent hover:border-red-400 ml-2"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center px-2">
          <span className="text-purple-800 font-bold bg-white/60 px-5 py-2 rounded-full text-sm border border-white/50 shadow-sm">
            {isLoading ? "Buscando na API..." : `${filteredPlugins.length} modificações catalogadas`}
          </span>
        </div>

        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
            <h3 className="text-xl font-bold text-purple-900">Puxando os plugins brabos...</h3>
            <p className="text-purple-700 font-medium">Lá do github.com/lyraEz</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
            {filteredPlugins.length > 0 ? (
              filteredPlugins.map((plugin) => (
                <div 
                  key={plugin.id}
                  className="flex flex-col bg-white/60 border border-white/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-white/80"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-purple-900 tracking-tight">
                        {plugin.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600 mt-1 opacity-90">
                        <Github className="w-3.5 h-3.5" />
                        <a href={`https://github.com/${plugin.repo}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {plugin.author}
                        </a>
                      </div>
                    </div>
                    
                    {/* Botão de Download FUNCIONAL de vdd puxando o .zip direto */}
                    <a 
                      href={plugin.downloadUrl}
                      download
                      className="w-10 h-10 rounded-xl bg-purple-100 hover:bg-purple-500 hover:text-white text-purple-600 flex items-center justify-center transition-colors duration-200 active:scale-95 shrink-0"
                      title="Baixar Plugin"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>

                  <p className="text-purple-800/90 text-sm mb-6 flex-grow leading-relaxed font-medium">
                    {plugin.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-purple-200/50">
                    {plugin.tags?.map(tag => (
                      <span 
                        key={tag} 
                        className="text-[11px] font-extrabold px-3 py-1 bg-white/70 text-purple-700 rounded-lg border border-white/60 flex items-center shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white/40 rounded-3xl border border-white/50">
                <span className="text-6xl mb-6">🔍</span>
                <h3 className="text-2xl font-black text-purple-900 mb-2">Putz, nada encontrado.</h3>
                <p className="text-purple-700 font-medium">Será q o arquivo JSON tá lá no GitHub msm? Dá um confere lá.</p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="relative z-50 mt-10 pb-12 pt-6 text-center text-purple-800 font-bold flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2 text-lg">
          <span>Feito por</span>
          <a 
            href="https://github.com/lyraEz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="wave-text text-purple-600 hover:text-purple-500 transition-colors no-underline flex font-black text-xl"
            style={{ textDecoration: 'none' }}
          >
            {nameArray.map((letter, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{letter}</span>
            ))}
          </a>
          <Heart className="w-5 h-5 text-purple-500 fill-purple-500 ml-1" />
        </div>
      </footer>
    </div>
  );
}
