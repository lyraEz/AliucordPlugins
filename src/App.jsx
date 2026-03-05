import React, { useState, useMemo, useEffect } from 'react';
import { Search, Download, Hash, Filter, Sparkles, Github, Heart } from 'lucide-react';

const pluginsData = [
  { id: "v1", name: "Themer", author: "Vendicated", repo: "Vendicated/AliucordPlugins", desc: "Motor de personalização visual avançado para aplicação de temas customizados na interface.", tags: ["UI", "Customização"] },
  { id: "v2", name: "MessageLogger", author: "Vendicated", repo: "Vendicated/AliucordPlugins", desc: "Registra localmente mensagens excluídas e editadas para auditoria e consulta posterior.", tags: ["Privacidade", "Mensagens"] },
  { id: "v3", name: "UpdateAll", author: "Vendicated", repo: "Vendicated/AliucordPlugins", desc: "Automatiza o processo de atualização de todos os plugins instalados no aplicativo.", tags: ["Sistema", "Utilidades"] },
  { id: "v4", name: "DiscordBypass", author: "Vendicated", repo: "Vendicated/AliucordPlugins", desc: "Remove restrições artificiais do cliente oficial e desabilita pop-ups intrusivos.", tags: ["Sistema", "Fixes"] },
  { id: "v5", name: "NoTrack", author: "Vendicated", repo: "Vendicated/AliucordPlugins", desc: "Desabilita o envio de métricas de telemetria e rastreamento para os servidores oficiais.", tags: ["Privacidade", "Sistema"] },
  { id: "v6", name: "CrashHandler", author: "Vendicated", repo: "Vendicated/AliucordPlugins", desc: "Intercepta falhas críticas do aplicativo e gera relatórios de erro detalhados para depuração.", tags: ["Dev", "Sistema"] },
  { id: "v7", name: "Experiments", author: "Vendicated", repo: "Vendicated/AliucordPlugins", desc: "Habilita o acesso irrestrito à aba oculta de experimentos do desenvolvedor.", tags: ["Dev", "UI"] },
  { id: "j1", name: "ShowHiddenChannels", author: "Juby210", repo: "Juby210/Aliucord-plugins", desc: "Exibe canais restritos na lista de servidores, revelando sua existência visualmente.", tags: ["UI", "Utilidades"] },
  { id: "j2", name: "ViewDeletedMessages", author: "Juby210", repo: "Juby210/Aliucord-plugins", desc: "Mantém mensagens apagadas visíveis no histórico do chat local de forma discreta.", tags: ["Privacidade", "Mensagens"] },
  { id: "j3", name: "PronounDB", author: "Juby210", repo: "Juby210/Aliucord-plugins", desc: "Integração externa para exibir pronomes preferidos dos usuários diretamente em seus perfis.", tags: ["UI", "Integração"] },
  { id: "j4", name: "Translate", author: "Juby210", repo: "Juby210/Aliucord-plugins", desc: "Tradução nativa e instantânea de mensagens estrangeiras utilizando a API do Google Tradutor.", tags: ["Mensagens", "Utilidades"] },
  { id: "j5", name: "UserBG", author: "Juby210", repo: "Juby210/Aliucord-plugins", desc: "Renderiza banners de perfil personalizados extraídos do banco de dados público UserBG.", tags: ["UI", "Customização"] },
  { id: "j6", name: "AlwaysAnimate", author: "Juby210", repo: "Juby210/Aliucord-plugins", desc: "Força a reprodução contínua de avatares e emojis animados, ignorando limitações de performance.", tags: ["UI", "Performance"] },
  { id: "j7", name: "HideMutedCategories", author: "Juby210", repo: "Juby210/Aliucord-plugins", desc: "Oculta categorias silenciadas para otimização visual da lista de navegação de canais.", tags: ["UI", "Organização"] },
  { id: "z1", name: "RoleColorEverywhere", author: "zt64", repo: "zt64/aliucord-plugins", desc: "Aplica a cor do cargo predominante em menções, canais de voz e interface geral.", tags: ["UI", "Customização"] },
  { id: "z2", name: "SpotifyListenAlong", author: "zt64", repo: "zt64/aliucord-plugins", desc: "Habilita a audição conjunta no Spotify sem a exigência de uma assinatura Premium ativa.", tags: ["Integração", "Mídia"] },
  { id: "z3", name: "CopyServerIcon", author: "zt64", repo: "zt64/aliucord-plugins", desc: "Utilitário para extração rápida e cópia do ícone de servidores em alta resolução.", tags: ["Utilidades", "Mídia"] },
  { id: "z4", name: "AccountSwitcher", author: "zt64", repo: "zt64/aliucord-plugins", desc: "Interface otimizada para alternância rápida entre múltiplas sessões autenticadas no dispositivo.", tags: ["Utilidades", "Sistema"] },
  { id: "z5", name: "ImageLogger", author: "zt64", repo: "zt64/aliucord-plugins", desc: "Armazena localmente imagens deletadas no cache para visualização e recuperação posterior.", tags: ["Privacidade", "Mídia"] },
  { id: "z6", name: "SplitLargeMessages", author: "zt64", repo: "zt64/aliucord-plugins", desc: "Fragmentação automatizada de textos longos para contornar o limite de envio de caracteres.", tags: ["Mensagens", "Utilitário"] },
  { id: "x1", name: "NoTyping", author: "X1nto", repo: "X1nto/AliucordPlugins", desc: "Bloqueia o envio do evento de digitação para os servidores, garantindo privacidade na escrita.", tags: ["Privacidade", "Mensagens"] },
  { id: "x2", name: "WhoReacted", author: "X1nto", repo: "X1nto/AliucordPlugins", desc: "Exibe os avatares dos usuários que reagiram diretamente integrados ao balão da mensagem.", tags: ["UI", "Mensagens"] },
  { id: "x3", name: "FavoriteGif", author: "X1nto", repo: "X1nto/AliucordPlugins", desc: "Bypass do limite padrão de armazenamento de GIFs favoritos permitidos pelo cliente.", tags: ["Mídia", "Nitro"] },
  { id: "x4", name: "OpenInApp", author: "X1nto", repo: "X1nto/AliucordPlugins", desc: "Redirecionamento nativo de links de plataformas suportadas diretamente para seus aplicativos.", tags: ["Integração", "Utilidades"] },
  { id: "x5", name: "BetterStatusIndicators", author: "X1nto", repo: "X1nto/AliucordPlugins", desc: "Melhoria estética e de resolução nos ícones de status de atividade dos usuários da lista.", tags: ["UI", "Customização"] },
  { id: "x6", name: "PluginRepo", author: "X1nto", repo: "X1nto/AliucordPlugins", desc: "Interface nativa otimizada para download e gerenciamento direto de plugins comunitários.", tags: ["Essencial", "Sistema"] }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set();
    pluginsData.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredPlugins = useMemo(() => {
    return pluginsData.filter(plugin => {
      const matchesSearch = plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            plugin.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            plugin.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                          selectedTags.every(tag => plugin.tags.includes(tag));
                          
      return matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedTags]);

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
            Dados extraídos diretamente dos repositórios oficiais da comunidade. Instalações otimizadas e livres de duplicatas.
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
            {filteredPlugins.length} modificações catalogadas
          </span>
        </div>

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
                  
                  <button className="w-10 h-10 rounded-xl bg-purple-100 hover:bg-purple-500 hover:text-white text-purple-600 flex items-center justify-center transition-colors duration-200 active:scale-95 shrink-0">
                    <Download className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-purple-800/90 text-sm mb-6 flex-grow leading-relaxed font-medium">
                  {plugin.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-purple-200/50">
                  {plugin.tags.map(tag => (
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
              <h3 className="text-2xl font-black text-purple-900 mb-2">Nenhum plugin encontrado.</h3>
              <p className="text-purple-700 font-medium">Ajuste os filtros de pesquisa para tentar novamente.</p>
            </div>
          )}
        </div>
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


