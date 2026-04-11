"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import WaveBackground from "@/src/components/ui/WaveBackground";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="relative min-h-screen w-full  flex flex-col items-center justify-center bg-[#052c2c] px-6 overflow-hidden selection:bg-igreja-dourado/20">
      
      {/* Background absoluto e fixo cobrindo tudo */}
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-md py-12 max-w-sm xl"
      >
        {/* 1. TÍTULO */}
        <div className="text-center mb-16">
          <span className="text-igreja-dourado font-bold uppercase tracking-[0.4em] text-[10px] xl:text-[10px] mb-3 block">
            Área Restrita
          </span>
          <h2 className="text-5xl md:text-6xl xl:text-5xl font-serif text-white tracking-tighter italic">
            Portal do{" "}
            <span className="text-white not-italic font-black block md:inline underline decoration-igreja-dourado decoration-4 underline-offset-8">
              Membro
            </span>
          </h2>
        </div>

        {/* 2. FORMULÁRIO COM INPUTS EM ESTILO 'BOX' (Estilo Forven) */}
        <form onSubmit={handleLogin} className="space-y-5 md:space-y-8 ">
          
          {/* Campo E-mail em Caixa */}
          <div className="space-y-2">
            <label className="text-white/50 text-xs font-medium ml-1 tracking-wide">
                E-mail corporativo
            </label>
            <div className="relative group bg-[#031a1a]/80 border border-white/5 rounded-2xl transition-all focus-within:border-igreja-dourado/50 focus-within:ring-2 focus-within:ring-igreja-dourado/10 shadow-inner">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-igreja-dourado transition-colors" size={20} />
                <input
                    type="email"
                    required
                    placeholder="seu.nome@ipb.org.br"
                    // bg-transparent para usar o fundo da div pai. text-lg e py-5 para conforto.
                    className="w-full bg-transparent py-4 xl:py-4 pl-14 pr-4 text-white placeholder:text-white/20 outline-none text-lg font-light"
                />
            </div>
          </div>

          {/* Campo Senha em Caixa */}
          <div className="space-y-3">
            <label className="text-white/50 text-xs font-medium ml-1 tracking-wide">
                Sua senha segura
            </label>
            <div className="relative group bg-[#031a1a]/80 border border-white/5 rounded-2xl transition-all focus-within:border-igreja-dourado/50 focus-within:ring-2 focus-within:ring-igreja-dourado/10 shadow-inner">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-igreja-dourado transition-colors" size={20} />
                <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent py-4 xl:py-4 pl-14 pr-14 text-white placeholder:text-white/20 outline-none text-lg font-light"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
            </div>
            
            {/* Esqueceu a senha */}
            <div className="text-right">
              <a href="#" className="text-white/30 text-sm hover:text-igreja-dourado transition-colors italic tracking-tight">
                Esqueceu sua credencial?
              </a>
            </div>
          </div>

          {/* 3. AÇÕES */}
          <div className="flex flex-col gap-6 pt-10 xl:pt-4">
            <button
              type="submit"
              className="cursor-pointer w-full bg-igreja-teal text-white py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-igreja-teal-dark hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 active:translate-y-0"
            >
              Acessar Painel Restrito
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="cursor-pointer group flex items-center justify-center gap-2 text-white/40 hover:text-white transition-all text-[10px] uppercase tracking-[0.3em] font-bold"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Voltar ao Início do Site
            </button>
          </div>
        </form>

        {/* Rodapé disceto */}
        <div className="mt-24 text-center">
             <div className="h-px w-8 bg-white/10 mx-auto mb-6" />
             <p className="text-white/10 text-[9px] tracking-[0.5em] uppercase">
                Igreja Presbiteriana de Imbituba
             </p>
        </div>
      </motion.div>

      {/* Overlay de grão (Noise) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
    </main>
  );
}