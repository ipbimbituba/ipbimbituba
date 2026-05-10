"use client";
import photo from "@/public/image/igreja/agenda.jpeg";
import HeroSection from "@/src/components/ui/HeroBanner";
// Adicionando a função de busca e o tipo Activity
import { getGoogleCalendarEvents, Activity } from "@/src/lib/calendar";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowUpRight, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react"; // Adicionado useRef

const allMonths = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function ContentCalendar() {
  const monthNow = new Date().getMonth();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(monthNow);

  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Estados para os dados dinâmicos
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca os dados sempre que o mês mudar
  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const data = await getGoogleCalendarEvents(selectedMonthIndex);
        setActivities(data);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, [selectedMonthIndex]);

  const categoryStyles = {
    Culto: "bg-igreja-teal text-white shadow-sm",             // Verde da Igreja
    "Escola Dominical": "bg-emerald-600 text-white shadow-sm", // Verde folha (ensino/crescimento)
    Evento: "bg-amber-500 text-white shadow-sm",              // Dourado vivo (celebração)
    Reunião: "bg-slate-500 text-white shadow-sm",             // Cinza azulado (administrativo)
    Aniversário: "bg-rose-500 text-white shadow-sm",          // Rosa/Vermelho (festa/alegria)
    SAF: "bg-purple-600 text-white shadow-sm",                // Roxo (sociedade feminina)
    UPH: "bg-blue-700 text-white shadow-sm",                  // Azul forte (homens)
    Outros: "bg-gray-400 text-white shadow-sm",               // Cinza neutro
  };

  const filterOptions = ["Todas", ...Object.keys(categoryStyles)];

  // Filtra as atividades com base na categoria selecionada
  const currentActive = selectedCategory === "Todas"
    ? activities
    : activities.filter(act => act.category === selectedCategory);

  // Funções de Navegação
  const nexPage = () => setSelectedMonthIndex((prev) => (prev < 11 ? prev + 1 : prev));
  const prevPage = () => setSelectedMonthIndex((prev) => (prev > 0 ? prev - 1 : prev));

  // Lógica de Swipe (Touch)
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const difX = startX - currentX;
    if (difX > 50) {
      nexPage();
      setIsDragging(false);
    } else if (difX < -50) {
      prevPage();
      setIsDragging(false);
    }
  };

  // Lógica de Arrastar com o Mouse (Desktop)
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startXScroll, setStartXScroll] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    if (!scrollRef.current) return;
    setStartXScroll(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXScroll) * 2; // Multiplicador de velocidade
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };


  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="relative">
        <HeroSection title="Agenda de Atividades" image={photo} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-gray-50 z-10 pointer-events-none" />
      </div>

      <div className="xl:max-w-5xl 2xl:max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        {/* Cabeçalho da Agenda */}
        <div className="flex flex-col mb-8 border-b border-gray-200 pb-8 gap-4">
          <div className="flex flex-col md:flex-row justify-between md:items-end">
            <div>
              <span className="text-igreja-teal font-bold tracking-[0.3em] uppercase text-sm mb-2 block">
                Programação Mensal
              </span>
              <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-serif italic text-slate-800">
                {allMonths[selectedMonthIndex]}
              </h1>
            </div>
            <p className="text-slate-400 font-medium italic hidden md:block">
              "Para tudo há uma ocasião certa..."
            </p>
          </div>

          <div className="flex flex-row mt-4 justify-between items-center">
            {/* Indicadores de Progresso do Ano */}
            {/* <div className="hidden md:flex gap-1.5 overflow-hidden">
              {allMonths.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${index === selectedMonthIndex
                    ? "w-8 bg-igreja-teal"
                    : "w-2 bg-igreja-dourado opacity-30"
                    }`}
                />
              ))}
            </div> */}

           
          </div>
        </div>
        {/* Container de Filtro e Navegação Alinhados */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          
          {/* Lado Esquerdo: Seletor de Meses (Botões de Seta) */}
          <div className="flex items-center gap-4 order-2 md:order-1">
            <button
              onClick={prevPage}
              disabled={selectedMonthIndex === 0}
              className="text-igreja-teal hover:text-igreja-dourado disabled:opacity-20 transition-all p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Navegar</span>
              <span className="font-serif italic text-slate-800 text-lg">Meses</span>
            </div>

            <button
              onClick={nexPage}
              disabled={selectedMonthIndex === 11}
              className="text-igreja-teal hover:text-igreja-dourado disabled:opacity-20 transition-all p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Lado Direito: Dropdown de Filtro */}
          <div className="relative w-full md:w-72 order-1 md:order-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full bg-white border border-slate-200 px-6 py-3.5 rounded-2xl flex items-center justify-between shadow-sm hover:border-igreja-teal/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${selectedCategory === "Todas" ? "bg-slate-400" : (categoryStyles[selectedCategory as keyof typeof categoryStyles]?.split(" ")[0] || "bg-slate-400")}`} />
                <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  {selectedCategory === "Todas" ? "Todos os eventos" : selectedCategory}
                </span>
              </div>
              <ChevronRight className={`text-slate-400 transition-transform duration-300 ${isFilterOpen ? "rotate-90" : "rotate-0"}`} size={20} />
            </button>

            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute right-0 top-full mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden py-2"
              >
                {filterOptions.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors ${selectedCategory === cat
                        ? "bg-igreja-teal/5 text-igreja-teal"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Seletor de Meses Horizontal */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex overflow-x-auto gap-3 pb-8 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
        >
          {allMonths.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectedMonthIndex(index)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${index === selectedMonthIndex
                ? "bg-igreja-teal text-white border-igreja-teal shadow-lg scale-105"
                : "bg-white text-slate-500 border-slate-200 hover:border-igreja-teal/40 hover:text-igreja-teal"
                }`}
            >
              {month}
            </button>
          ))}
        </div>

        {/* Filtro por Categoria (Dropdown) */}


        {/* Exibição condicional de carregamento ou conteúdo */}
        {loading ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-igreja-teal mx-auto"></div>
            <p className="mt-6 text-slate-400 font-medium">Buscando atividades no Google Agenda...</p>
          </div>
        ) : currentActive.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <Calendar className="mx-auto text-slate-200 mb-6" size={64} />
            <p className="text-slate-400 font-medium text-lg">
              Nenhuma atividade agendada {selectedCategory !== "Todas" ? `na categoria ${selectedCategory}` : ""} para {allMonths[selectedMonthIndex]}.
            </p>
          </div>
        ) : (
          <div
            className="space-y-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {currentActive.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative flex flex-col md:flex-row gap-6 bg-white p-6 rounded-3xl transition-all duration-300 border ${activity.featured
                  ? "border-igreja-dourado/30 shadow-xl ring-1 ring-igreja-dourado/10"
                  : "border-slate-100 shadow-sm"
                  } hover:shadow-2xl hover:border-igreja-teal/20`}
              >
                {/* O DIA */}
                <div className="flex-shrink-0 flex md:flex-col items-center justify-center bg-igreja-teal text-white w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-[0_6px_0_0_#064e4e] group-hover:translate-y-[-2px] group-hover:shadow-[0_8px_0_0_#064e4e] transition-all">
                  <span className="text-3xl md:text-4xl font-black">
                    {activity.day}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-80">
                    {allMonths[selectedMonthIndex].substring(0, 3)}
                  </span>
                </div>

                {/* CONTEÚDO */}
                <div className="flex-grow space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${categoryStyles[activity.category as keyof typeof categoryStyles] || categoryStyles.Outros}`}>
                        {activity.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 group-hover:text-igreja-teal transition-colors flex items-center gap-3">
                        {activity.title}
                        {activity.featured && (
                          <Star size={20} className="text-igreja-dourado fill-igreja-dourado" />
                        )}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-igreja-teal bg-igreja-teal/5 px-4 py-2 rounded-xl w-fit shrink-0 border border-igreja-teal/10">
                      <Clock size={16} />
                      <span className="text-sm font-bold">{activity.time}</span>
                    </div>
                  </div>

                  <p className="text-slate-500 leading-relaxed text-base italic">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={18} className="text-igreja-teal" />
                    <span className="font-medium text-sm md:text-base">{activity.location}</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                  <ArrowUpRight className="text-igreja-teal" size={28} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <footer className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <div className="h-px w-20 bg-igreja-dourado mx-auto mb-6 opacity-30" />
        <p className="text-[10px] text-gray-400 tracking-[0.5em] uppercase">
          Igreja Presbiteriana de Imbituba
        </p>
      </footer>
    </div>
  );
}
