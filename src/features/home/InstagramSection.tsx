
"use client";
import { useState, useEffect } from "react";

// Componente para um card individual (para organizar melhor o código)
const InstagramCard = ({ post }: { post: any }) => {
  // Verificação simples para pular vídeos se a media_type não for IMAGE ou CAROUSEL_ALBUM
  if (post.media_type === "VIDEO") return null;

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gray-100"
    >
      {/* Imagem Principal */}
      <img
        src={post.media_url}
        alt={post.caption || "Post do Instagram"}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      {/* Overlay que aparece no Hover */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
        {/* Ícone do Instagram no canto superior */}
        <div className="absolute top-3 right-3 opacity-70">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.281 0 3.689-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.281-.014-3.689-.073-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.689.014 15.281 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </div>

        {/* Legenda (truncada para não quebrar o layout) */}
        {post.caption && (
          <p className="text-sm font-light line-clamp-2 leading-relaxed opacity-90">
            {post.caption}
          </p>
        )}

        {/* Linha decorativa ou infos extras */}
        <div className="w-10 h-0.5 bg-white/70 mt-3 rounded"></div>
      </div>
    </a>
  );
};

const InstagramSectionMinimal = () => {
  interface Post {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  media_type: string;
}

const [posts, setPosts] = useState<Post[]>([]);
  const token = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;

  useEffect(() => {
    const fetchPhotos = async () => {
      // Importante adicionar media_type na query para filtrar vídeos
      const url = `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type&access_token=${token}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        // Filtra para garantir que pegamos apenas imagens/carrosséis e limita a 6
        const onlyImages =
          data.data?.filter((p: { media_type: string }) => p.media_type !== "VIDEO").slice(0, 6) || [];
        setPosts(onlyImages);
      } catch (err) {
        console.error("Erro ao carregar Instagram:", err);
      }
    };

    if (token) fetchPhotos();
  }, [token]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Acompanhe nossa comunidade
            </h2>
            <p className="text-xl text-gray-600 mt-2 font-light">
              Siga-nos no Instagram para ficar por dentro de tudo.
            </p>
          </div>
          <a
            href={`https://instagram.com/SUA_CONTA_AQUI`} // Coloque o user da igreja
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 sm:mt-0 inline-flex items-center gap-2.5 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.281 0 3.689-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.281-.014-3.689-.073-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.689.014 15.281 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            @igrejapresbiteriana
          </a>
        </div>

        {/* Grid de Fotos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {posts.map((post) => (
            <InstagramCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSectionMinimal;
