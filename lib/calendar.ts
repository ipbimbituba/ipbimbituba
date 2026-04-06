type typeCalendar = {
  month: string;
  activities: {
    day: string;
    title: string;
    time: string;
    description: string;
    location: string;
    category: "Culto" | "Evento" | "Reunião" | "Outros"; // Categorias fixas facilitam o código
    featured: boolean; // Se for true, podemos dar um destaque visual
  }[];
};
export function getMonthNow() {
  const month = new Date().toLocaleString("pt-BR", { month: "long" });
  return month.charAt(0).toUpperCase() + month.slice(1);
}
export function getMonthText(index: number) {

  const date = new Date(2026, index, 1);

  const monthName = date.toLocaleString("pt-BR", { month: "long" });

  const cleanMonth = monthName.replace(/^de\s/i, "");
  return cleanMonth.charAt(0).toUpperCase() + cleanMonth.slice(1);
}

export const SchuduleChurch: typeCalendar[] = [

  {
    month: "Abril",
    activities: [
      {
        day: "12",
        title: "Culto de Páscoa",
        time: "19:00",
        description: "Celebração da Ressurreição de nosso Senhor Jesus Cristo.",
        location: "Templo Principal",
        category: "Culto",
        featured: true,
      },
      {
        day: "18",
        title: "Reunião da SAF",
        time: "15:00",
        description: "Momento de oração e planejamento das mulheres.",
        location: "Salão Social",
        category: "Reunião",
        featured: false,
      },
    ],
  },
  {
    month: "Maio",
    activities: [
      {
        day: "10",
        title: "Culto de Dia das Mães",
        time: "19:30",
        description: "Homenagem especial às mães da nossa comunidade.",
        location: "Templo Principal",
        category: "Culto",
        featured: true,
      },
      {
        day: "23",
        title: "Encontro da UPA",
        time: "18:00",
        description: "Noite de louvor e comunhão dos adolescentes.",
        location: "Igreja Presbiteriana de Imbituba",
        category: "Evento",
        featured: false,
      },
    ],
  },
  {
    month: "Junho",
    activities: [
      {
        day: "14",
        title: "Dia do Pastor",
        time: "19:30",
        description: "Culto em gratidão pela vida de nossos pastores.",
        location: "Templo Principal",
        category: "Culto",
        featured: true,
      },
      {
        day: "27",
        title: "Arraial da UCP",
        time: "16:00",
        description: "Festa de comunhão para as crianças.",
        location: "Salão de Festas",
        category: "Evento",
        featured: false,
      },
    ],
  },
  {
    month: "Julho",
    activities: [
      {
        day: "11",
        title: "Conferência Teológica",
        time: "09:00",
        description: "Estudo aprofundado sobre as Doutrinas da Graça.",
        location: "Auditório",
        category: "Evento",
        featured: true,
      },
    ],
  },
  {
    month: "Agosto",
    activities: [
      {
        day: "12",
        title: "Aniversário da IPB",
        time: "19:30",
        description: "Celebração de 167 anos da Igreja Presbiteriana do Brasil.",
        location: "Templo Principal",
        category: "Culto",
        featured: true,
      },
      {
        day: "22",
        title: "Chá das Mulheres (SAF)",
        time: "16:00",
        description: "Tarde de edificação e comunhão feminina.",
        location: "Salão Social",
        category: "Evento",
        featured: false,
      },
    ],
  },
  {
    month: "Setembro",
    activities: [
      {
        day: "07",
        title: "Retiro de Homens (UPH)",
        time: "08:00",
        description: "Dia de oração e reflexão em meio à natureza.",
        location: "Sítio Recreio",
        category: "Evento",
        featured: false,
      },
      {
        day: "20",
        title: "Domingo de Missões",
        time: "19:30",
        description: "Relatórios missionários e oferta especial.",
        location: "Templo Principal",
        category: "Culto",
        featured: true,
      },
    ],
  },
  {
    month: "Outubro",
    activities: [
      {
        day: "12",
        title: "Dia das Crianças (UCP)",
        time: "14:00",
        description: "Programação especial para os pequenos.",
        location: "Igreja Presbiteriana de Imbituba",
        category: "Evento",
        featured: true,
      },
      {
        day: "31",
        title: "Dia da Reforma Protestante",
        time: "20:00",
        description: "Culto comemorativo aos 509 anos da Reforma.",
        location: "Templo Principal",
        category: "Culto",
        featured: true,
      },
    ],
  },
  {
    month: "Novembro",
    activities: [
      {
        day: "15",
        title: "Assembleia Ordinária",
        time: "10:00",
        description: "Relatório anual de atividades e tesouraria.",
        location: "Templo Principal",
        category: "Reunião",
        featured: false,
      },
      {
        day: "28",
        title: "Noite de Talentos",
        time: "19:00",
        description: "Apresentações musicais e artísticas da comunidade.",
        location: "Templo Principal",
        category: "Evento",
        featured: false,
      },
    ],
  },
  {
    month: "Dezembro",
    activities: [
      {
        day: "20",
        title: "Cantata de Natal",
        time: "19:30",
        description: "Musical de Natal com o coro da igreja.",
        location: "Templo Principal",
        category: "Evento",
        featured: true,
      },
      {
        day: "24",
        title: "Culto de Véspera de Natal",
        time: "20:00",
        description: "Celebração do nascimento de Cristo.",
        location: "Templo Principal",
        category: "Culto",
        featured: true,
      },
      {
        day: "31",
        title: "Culto de Vigília",
        time: "22:00",
        description: "Agradecimento pelo ano que se encerra e boas vindas ao novo ano.",
        location: "Templo Principal",
        category: "Culto",
        featured: true,
      },
    ],
  },
];

