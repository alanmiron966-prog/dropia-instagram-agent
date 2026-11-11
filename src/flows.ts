// Palabra clave del reel -> DM que se manda a quien comenta.
// Cierre = gancho de DROPIA (marca/voice.md): saludo + dolor + pregunta con 3 opciones en texto (sin botones).

export interface Flow {
  dm: string;
  hook: string;
  options?: [string, string, string]; // sin opciones, el DM cierra solo con el hook
}

const SALUDO = "Buenas, por aquí DROPIA";

export const FLOWS: Record<string, Flow> = {
  NUBE: {
    dm: `${SALUDO}

lo de NUBE, dos formas:
• PC encendido: escribe /rc en Claude Code, escanea el QR y síguelo desde el móvil
• PC apagado: claude --cloud "tu tarea" y corre en la nube (tu proyecto tiene que estar en Git)

las dos van con el plan Pro`,
    hook: "ahora mismo qué es lo que más tiempo te come cuando trabajas con Claude Code",
    options: ["esperar a que termine", "no poder seguirlo fuera del PC", "explicarle cada vez lo mismo"],
  },
  TV: {
    dm: `${SALUDO}

el repo de la tele: https://github.com/Gathin23/cleanyourtv
• va con Android TV y Google TV (Samsung y LG no)
• ojo, a algunos se les quedó la tele inservible: mira que tu modelo esté en su lista`,
    hook: "si lo de la tele te gustó, imagina eso en tu trabajo. ¿qué es lo que más tiempo te come en el día",
    options: ["pasar datos a mano", "contestar mensajes", "hacer facturas"],
  },
  SEGURO: {
    dm: `${SALUDO}

lo de SEGURO, 3 reglas si le das a una IA acceso a tu dinero:
• que pagar o borrar lo apruebe una persona
• nada de claves maestras, una tarjeta aparte con límite
• revisa lo que hace cada semana`,
    hook: "ahora mismo qué es lo que más te frena para meter un agente de IA en tu negocio",
    options: ["el miedo a que toque lo que no debe", "no saber por dónde empezar", "el coste"],
  },
  BOT: {
    dm: `${SALUDO}

lo de BOT, así funciona el que te acaba de escribir:
• Instagram avisa cuando alguien comenta tu palabra
• un servidor gratis de Cloudflare manda el DM y responde el comentario
• lo montamos con Claude Code`,
    hook: "ahora mismo qué es lo que más tiempo te come en Instagram",
    options: ["contestar comentarios", "contestar DMs", "crear contenido"],
  },
  CLAUDE: {
    dm: `${SALUDO}

lo de CLAUDE, las 3:
• Claude in Chrome: le da ojos en tu navegador
• /model: cambia de modelo sin perder la conversación
• frontend-design: para que el diseño no parezca IA

la guía con los pasos: https://dropia-ig-bot.dropia.workers.dev/guia/claude`,
    hook: "cuéntanos si te funcionó 🙌 y si quieres una asesoría personalizada para tu caso, respóndenos por aquí y lo vemos",
  },
  VOZ: {
    dm: `${SALUDO}

lo de VOZ:
• actualiza Claude Code y escribe /voice
• mantén pulsada la barra espaciadora, habla y suelta
• lo que dices aparece escrito en el prompt, y puedes mezclarlo con el teclado

si aún no te aparece, es que todavía lo están activando por fases`,
    hook: "cuéntanos si te funcionó 🙌 y si quieres una asesoría personalizada para tu caso, respóndenos por aquí y lo vemos",
  },
  CV: {
    dm: `${SALUDO}

lo de CV:
• conecta Apify en Claude (Ajustes → Conectores → personalizado → https://mcp.apify.com)
• adjunta tu CV y pega el prompt
• Claude te da una tabla de ofertas ordenada por encaje, con el enlace para postular

la guía con el prompt para copiar: https://dropia-ig-bot.dropia.workers.dev/guia/cv`,
    hook: "cuéntanos si te funcionó 🙌 y si quieres una asesoría personalizada para tu caso, respóndenos por aquí y lo vemos",
  },
  ANUNCIO: {
    dm: `${SALUDO}

lo de ANUNCIO:
• instala Claude Code y crea un proyecto de Remotion (npx create-video@latest)
• pega el prompt cambiando tu marca, colores y datos
• Claude te monta el anuncio y te lo abre para verlo

la guía con el prompt para copiar: https://dropia-ig-bot.dropia.workers.dev/guia/anuncio`,
    hook: "cuéntanos si te funcionó 🙌 y si quieres una asesoría personalizada para tu caso, respóndenos por aquí y lo vemos",
  },
  // REVISAR: texto de AGENTE escrito sin guion del reel, confirmar con el usuario.
  WEB: {
    dm: `${SALUDO}

el sistema de la pizzería que no da abasto:
• sale primero en Google, con su carta y pedido online en tres toques
• un agente de IA que contesta dudas y pedidos al momento, también de madrugada
• cada pedido suma: a la décima, pizza gratis (y por eso vuelven)

en DROPIA lo montamos a medida para tu negocio`,
    hook: "ahora mismo qué es lo que más te frena para llenar",
    options: ["no salgo en Google", "no llego a contestar a todos", "vienen una vez y no vuelven"],
  },
  AGENTE: {
    dm: `${SALUDO}

lo de AGENTE, así trabaja uno de ventas:
• contesta al cliente al momento, también fuera de horario
• apunta en tu CRM lo que dijo, sin que nadie lo meta a mano
• te avisa cuando alguien está listo para comprar

en DROPIA lo montamos a medida de cada negocio`,
    hook: "ahora mismo qué es lo que más tiempo te come con tus clientes",
    options: ["contestar mensajes", "pasar datos al CRM", "saber a quién llamar primero"],
  },
  TIENDA: {
    dm: `${SALUDO}

así funciona el agente de la web del reel:
• vive dentro de tu web y solo ve lo que el cliente hace ahí (qué mira, dónde duda)
• le contesta y le recomienda al momento, también a las 3 de la madrugada
• tú ves cada conversación y cada venta que cierra

en DROPIA lo montamos a medida para tu tienda`,
    hook: "ahora mismo qué es lo que más te frena en tu web",
    options: ["entran pero no compran", "no llego a contestar a todos", "no sé qué buscan"],
  },
  CITAS: {
    dm: `${SALUDO}

así funciona lo de la clínica del reel:
• recordatorio automático el día antes de cada cita
• si el paciente no puede, el agente de IA le cambia la hora por mensaje
• el hueco se ofrece al momento a la lista de espera

en DROPIA lo montamos a medida para tu clínica o negocio con citas`,
    hook: "ahora mismo qué es lo que más te cuesta con la agenda",
    options: ["gente que no se presenta", "cambios de cita por teléfono", "huecos que no se llenan"],
  },
  SOCIOS: {
    dm: `${SALUDO}

así funciona lo del gimnasio del reel:
• el agente de IA mira los accesos y detecta quién deja de venir
• le escribe un mensaje cercano antes de que se dé de baja
• tú ves quién vuelve sin abrir ni una hoja de cálculo

en DROPIA lo montamos a medida para tu gimnasio o negocio con socios`,
    hook: "ahora mismo qué es lo que más te frena con tus socios",
    options: ["se dan de baja sin avisar", "no sé quién deja de venir", "no tengo tiempo de escribirles"],
  },
  // Clave sin ñ: matchKeyword quita tildes, así que "RESEÑAS" llega como RESENAS.
  RESENAS: {
    dm: `${SALUDO}

así funciona lo de las reseñas del reel:
• una hora después de pagar, el cliente recibe un mensaje: ¿qué tal?
• si está contento, le llega el enlace para dejar la reseña en Google
• si algo fue mal, avisa al encargado antes de que acabe en una estrella

en DROPIA lo montamos a medida para tu negocio`,
    hook: "ahora mismo qué es lo que más te frena con las reseñas",
    options: ["tengo muy pocas", "me llegan sobre todo las malas", "no sé ni por dónde empezar"],
  },
  EXCEL: {
    dm: `${SALUDO}

lo de EXCEL:
• abre claude.ai y arrastra el excel de ventas (o el csv que te saca la caja)
• pega esto: "analiza estas ventas. dime qué producto me hace perder dinero, qué día vendo menos y qué harías tú en mi lugar. hazme una gráfica"
• luego pídele lo mismo con el mes anterior y compara`,
    hook: "ahora mismo qué es lo que más tiempo te come con los números del negocio",
    options: ["hacer las cuentas a mano", "no sé qué producto me deja dinero", "lo miro tarde, cuando ya no hay arreglo"],
  },
  PERMISOS: {
    dm: `${SALUDO}

lo de PERMISOS:
• shift + tab hasta "plan mode": te enseña el plan, lo apruebas una vez y lo hace del tirón
• /permissions → allow: añade los comandos que usas siempre (npm run, git status, python...)
• para editar archivos sin preguntar, shift + tab hasta "accept edits"`,
    hook: "ahora mismo qué es lo que más te frena con claude code",
    options: ["que pregunte tanto", "que se pase de límite", "no saber qué pedirle"],
  },
  CLIENTES: {
    dm: `${SALUDO}

lo de CLIENTES, en 3 prompts:
• con claude in chrome: "busca en google maps negocios de [sector] en [ciudad] que publiquen poco en instagram y hazme una tabla"
• "para cada uno, prepara una muestra de 3 posts con su logo y sus colores"
• "escríbeme un mensaje corto y personal para mandarle la muestra"`,
    hook: "ahora mismo qué es lo que más te cuesta para conseguir clientes",
    options: ["encontrar a quién escribir", "qué mandarles", "que me contesten"],
  },
  APP: {
    dm: `${SALUDO}

lo de APP: pídele a claude las 6 piezas desde el principio
• base de datos y login (supabase)
• apis + frontend
• pagos (stripe) y despliegue (vercel)

prompt: "quiero una app para [idea]. antes de programar, propón base de datos, apis, frontend, login, pagos y despliegue, y espera a que lo apruebe"`,
    hook: "ahora mismo en qué punto estás con tu app",
    options: ["solo tengo la idea", "tengo una maqueta", "la tengo pero no sé publicarla"],
  },
  FINDE: {
    dm: `${SALUDO}

los 5 de FINDE, uno por prompt en claude:
• web: "hazme una web de una página para mi [negocio] con horario, carta y botón de whatsapp"
• reseñas: "escribe respuestas cortas para estas reseñas" (y le pegas las de google)
• redes: "calendario de 12 posts para este mes para mi [negocio]"
• ventas: arrastras el excel y "hazme un panel con lo que más y menos vende"
• presupuesto: "plantilla de presupuesto con mi logo y mis datos"`,
    hook: "ahora mismo qué es lo que más tiempo te come en el negocio",
    options: ["redes y reseñas", "números y presupuestos", "contestar a clientes"],
  },
  CURSOS: {
    dm: `${SALUDO}

los cursos oficiales de anthropic, gratis: https://anthropic.skilljar.com
• empieza por el básico de claude
• luego claude code in action
• están en inglés, con subtítulos se siguen bien`,
    hook: "ahora mismo para qué quieres aprender claude",
    options: ["para mi trabajo", "para mi negocio", "para programar"],
  },
  SISTEMA: {
    dm: `${SALUDO}

lo de SISTEMA, por partes:
• Claude Code graba la pantalla de tu app usándola de verdad (con playwright) y le pone voz y subtítulos
• antes de cobrar, pon botones de funciones que aún no existen y mide cuáles pulsan. él puso 8 y 2 se llevaron el 83% de los clics
• publica todos los días en reels, tiktok y shorts, y mira qué canal te trae gente`,
    hook: "ahora mismo qué es lo que más te frena con tu app o tu negocio",
    options: ["no sé qué crear", "nadie la conoce", "no sé cómo cobrar"],
  },
  TRADING: {
    dm: `${SALUDO}

los 3 repos de TRADING, gratis en github:
• TradingAgents: varios agentes de IA analizan una acción y debaten → https://github.com/TauricResearch/TradingAgents
• Qlib (Microsoft): pruebas tu estrategia con datos reales → https://github.com/microsoft/qlib
• Freqtrade: bot de cripto, empieza en modo simulación → https://github.com/freqtrade/freqtrade
ojo: ninguno garantiza ganancias, no metas dinero que no puedas perder`,
    hook: "ahora mismo qué es lo que más te frena en el trading",
    options: ["no sé por dónde empezar", "no tengo tiempo de mirar gráficos", "pierdo más de lo que gano"],
  },
  NVIDIA: {
    dm: `${SALUDO}

lo de NVIDIA, más de 80 modelos gratis con una sola clave:
• entra en https://build.nvidia.com y saca tu clave (sin tarjeta)
• pégala en cursor o en tu agente: es compatible con openai
• elige el modelo (deepseek, kimi, qwen...) y sigues trabajando
tiene límite de uso, pero para no quedarte tirado a mitad de proyecto sobra`,
    hook: "ahora mismo qué es lo que más te frena con los tokens",
    options: ["se me acaban a mitad de sesión", "me sale caro", "no sé qué modelo usar"],
  },
  ANUNCIO: {
    dm: `${SALUDO}

el prompt del ANUNCIO, para pegarlo en claude code:
• "crea un proyecto de remotion con un anuncio vertical de 15 s (1080x1920) para mi negocio: <nombre>, oferta <oferta>, colores <colores>. 4 escenas: gancho, producto, oferta grande y llamada a la acción. textos cortos y animados, y expórtalo en mp4"
• antes: instala node y ejecuta npx create-video@latest (es gratis)
• para cambiar precio o texto, pídeselo a claude y vuelve a exportar`,
    hook: "ahora mismo qué es lo que más tiempo te come con los anuncios",
    options: ["no sé qué poner", "editar me lleva horas", "pagar a alguien sale caro"],
  },
  MOTOR: {
    dm: `${SALUDO}

lo de MOTOR, las 3 piezas:
• Claude escribe el guion de cada reel
• voz, animación y subtítulos salen solos, sin abrir un editor
• este bot contesta a quien comenta la palabra en segundos

lo mismo se monta para tu negocio, con clientes en vez de seguidores`,
    hook: "ahora mismo qué es lo que más tiempo te come en tu negocio",
    options: ["crear contenido", "contestar clientes", "tareas repetitivas"],
  },
  PROCESO: {
    dm: `${SALUDO}

lo de PROCESO, para elegir cuál automatizar primero:
• el que repites cada día igual (correos, pedidos, facturas)
• el que hoy depende de copiar y pegar entre programas
• el que, si falla, nadie se da cuenta hasta tarde

pásanos cuál es el tuyo y te decimos cómo lo haría la IA sola`,
    hook: "ahora mismo qué proceso te come más tiempo en tu empresa",
    options: ["responder correos", "pasar pedidos", "hacer facturas"],
  },
  OFICINA: {
    dm: `${SALUDO}

lo de OFICINA, así se arma:
• un agente por tarea: clientes, citas, facturas y resumen diario
• todos conectados a tus herramientas (correo, calendario, Excel)
• lo importante te lo piden aprobar antes de hacerlo

en DROPIA la montamos a medida de tu negocio`,
    hook: "ahora mismo qué es lo que más te frena en tu oficina",
    options: ["atender clientes", "agendar citas", "sacar facturas"],
  },
  EDITOR: {
    dm: `${SALUDO}

lo de EDITOR, cómo montarlo:
• instala Claude Code y pídele que te instale ffmpeg, Whisper, Remotion y Python
• crea dos carpetas: una para lo que grabas y otra para lo terminado
• dejas el video y le pides que quite silencios, ponga subtítulos y animaciones`,
    hook: "ahora mismo qué es lo que más tiempo te come al editar",
    options: ["cortar silencios", "poner subtítulos", "animar el video"],
  },
};

// Texto final del DM: contenido + gancho + "¿a, b o c?".
export function flowText(f: Flow): string {
  if (!f.options) return `${f.dm}

${f.hook}`;
  const [a, b, c] = f.options;
  return `${f.dm}

${f.hook}

¿${a}, ${b} o ${c}?`;
}

export const COMMENT_REPLY = "Listo, revisa tus DM 📩";

// Normaliza (mayúsculas, sin tildes) y busca la palabra clave como palabra suelta.
export function matchKeyword(text: string): string | null {
  const words = text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .split(/[^A-Z0-9]+/);
  return (
    Object.keys(FLOWS).find((k) => words.includes(k)) ??
    // Erratas de una letra ("TRAFING") solo en claves largas, para no confundir TV/CV/BOT.
    Object.keys(FLOWS).find((k) => k.length >= 5 && words.some((w) => oneEdit(w, k))) ??
    null
  );
}

// true si a y b difieren en una sola letra cambiada, sobrante o que falta.
function oneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return a.slice(i + 1) === b.slice(i + 1) || a.slice(i) === b.slice(i + 1) || a.slice(i + 1) === b.slice(i);
}
