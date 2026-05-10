export type Activity = {
  day: string;
  title: string;
  time: string;
  description: string;
  location: string;
  category: "Culto" | "Evento" | "Reunião" | "Escola Dominical" | "Aniversário" | "SAF" | "UPH" | "Outros";
  featured: boolean;
};

export type typeCalendar = {
  month: string;
  activities: Activity[];
};

const API_KEY = process.env.NEXT_PUBLIC_API_CALENDARY;
const CALENDAR_ID = process.env.NEXT_PUBLIC_CALENDAR_ID;

// Função para converter o evento do Google para o nosso formato
function mapGoogleEventToActivity(event: any): Activity {
  const start = event.start.dateTime || event.start.date;
  const startDate = new Date(start);
  
  // Lógica simples para definir categoria baseada no título
  const title = event.summary || "Sem título";
  const lowTitle = title.toLowerCase();
  let category: Activity["category"] = "Outros";
  
// No calendar.ts, dentro da função mapGoogleEventToActivity:

if (lowTitle.includes("culto")) category = "Culto";
else if (lowTitle.includes("reunião") || lowTitle.includes("conselho")) category = "Reunião";
else if (lowTitle.includes("escola dominical") || lowTitle.includes("ebd")) category = "Escola Dominical";
else if (lowTitle.includes("aniversário") || lowTitle.includes("parabéns")) category = "Aniversário";
else if (lowTitle.includes("saf")) category = "SAF";
else if (lowTitle.includes("uph")) category = "UPH";
else if (lowTitle.includes("evento") || lowTitle.includes("congresso")) category = "Evento";

  

  return {
    day: startDate.getDate().toString(),
    title: title,
    time: event.start.dateTime 
      ? startDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) 
      : "Dia todo",
    description: event.description || "",
    location: event.location || "Igreja Presbiteriana de Imbituba",
    category: category,
    featured: title.toLowerCase().includes("especial") || title.toLowerCase().includes("congresso"),
  };
}

export async function getGoogleCalendarEvents(monthIndex: number): Promise<Activity[]> {
  if (!API_KEY || !CALENDAR_ID) {
    console.error("API Key ou Calendar ID não configurados no .env");
    return [];
  }

  const year = new Date().getFullYear();
  const timeMin = new Date(year, monthIndex, 1).toISOString();
  const timeMax = new Date(year, monthIndex + 1, 0, 23, 59, 59).toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.items) return [];
    
    return data.items.map(mapGoogleEventToActivity);
  } catch (error) {
    console.error("Erro ao buscar eventos do Google:", error);
    return [];
  }
}

// Mantendo para não quebrar o código enquanto migramos
export const SchuduleChurch: typeCalendar[] = []; 
