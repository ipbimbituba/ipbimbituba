import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

interface SocialProps {
  size?: number;
  className?: string;
  hoverColor?: string;
}

export default function SocialButtons({ className = "" }: { className?: string }) {
  // Configuração dos links da igreja
  const socialLinks = {
    facebook: "https://facebook.com/ipbimbituba",
    instagram: "https://instagram.com/ipbimbituba",
    linkedin: "#", // Se não tiver, pode deixar "#" ou remover o ícone
    youtube: "https://youtube.com/@ipbimbituba",
  };
  const iconSizeClasses = "w-4 h-4 xl:w-[15px] xl:h-[15px] 2xl:w-[20px] 2xl:h-[20px]";

  return (
    <div className={`flex gap-4 ${className}`}>
      {/* Facebook */}
      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer "title="Ir para Pagina do Facebook">
        <FaFacebook 
          
          className={`text-gray-600 hover:text-igreja-dourado transition-all cursor-pointer hover:scale-110 ${iconSizeClasses}`}
        />
      </a>

      {/* Instagram */}
      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Ir para Pagina do Instagram">
        <FaInstagram 
          
          className={`text-gray-600 hover:text-igreja-dourado transition-all cursor-pointer hover:scale-110 ${iconSizeClasses}`}
        />
      </a>

      {/* Linkedin */}
      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" title="Ir para Pagina do Linkedin">
        <FaLinkedin 
         
          className={`text-gray-600 hover:text-igreja-dourado transition-all cursor-pointer hover:scale-110 ${iconSizeClasses}`}
        />
      </a>

      {/* Youtube */}
      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" title="Ir para Pagina do Youtube">
        <FaYoutube 
         
          className={`text-gray-600 hover:text-igreja-dourado transition-all cursor-pointer hover:scale-110 ${iconSizeClasses}`}
        />
      </a>
    </div>
  );
}