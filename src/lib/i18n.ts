export type Language = {
  id: string;
  code: string;
  label: string;
  native: string;
};

export const UI_LANGUAGES: Language[] = [
  { id: 'lang-en', code: 'en', label: 'English', native: 'English' },
  { id: 'lang-hi', code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { id: 'lang-bn', code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { id: 'lang-ta', code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { id: 'lang-te', code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { id: 'lang-kn', code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { id: 'lang-ml', code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { id: 'lang-mr', code: 'mr', label: 'Marathi', native: 'मराठी' },
  { id: 'lang-gu', code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { id: 'lang-or', code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
];

export const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    Dashboard: 'Dashboard', 'Live Map': 'Live Map', Alerts: 'Alerts', 'Disaster Intel': 'Disaster Intel',
    'Air Quality': 'Air Quality', Forecast: 'Forecast', Climate: 'Climate', 'AI Assistant': 'AI Assistant',
    SOS: 'SOS', 'Offline Mode': 'Offline Mode', 'Experience mode': 'Experience mode',
    'General weather awareness': 'General weather awareness', 'City, commute, heat & air quality': 'City, commute, heat & air quality',
    'Village, storms & infrastructure': 'Village, storms & infrastructure', 'Crop, rain & field planning': 'Crop, rain & field planning',
    'Sea, wind & visibility': 'Sea, wind & visibility', 'Flight weather & visibility': 'Flight weather & visibility',
    'Climate trends & research data': 'Climate trends & research data', 'User Account': 'User Account', Live: 'Live',
    'Updated 5 min ago': 'Updated 5 min ago', 'Notifications': 'Notifications', 'No notifications': 'No notifications',
    'Language': 'Language', 'Select language': 'Select language', 'View all alerts': 'View all alerts',
    'Current alerts': 'Current alerts', 'Mark all read': 'Mark all read', 'Close': 'Close',
  },
  hi: {
    Dashboard: 'डैशबोर्ड', 'Live Map': 'लाइव मानचित्र', Alerts: 'अलर्ट', 'Disaster Intel': 'आपदा जानकारी',
    'Air Quality': 'वायु गुणवत्ता', Forecast: 'पूर्वानुमान', Climate: 'जलवायु', 'AI Assistant': 'एआई सहायक',
    SOS: 'एसओएस', 'Offline Mode': 'ऑफलाइन मोड', 'Experience mode': 'अनुभव मोड',
    'General weather awareness': 'सामान्य मौसम जानकारी', 'City, commute, heat & air quality': 'शहर, यात्रा, गर्मी और वायु गुणवत्ता',
    'Village, storms & infrastructure': 'गांव, तूफान और बुनियादी ढांचा', 'Crop, rain & field planning': 'फसल, बारिश और खेत योजना',
    'Sea, wind & visibility': 'समुद्र, हवा और दृश्यता', 'Flight weather & visibility': 'उड़ान मौसम और दृश्यता',
    'Climate trends & research data': 'जलवायु रुझान और शोध डेटा', 'User Account': 'उपयोगकर्ता खाता', Live: 'लाइव',
    'Updated 5 min ago': '5 मिनट पहले अपडेट', Notifications: 'सूचनाएं', 'No notifications': 'कोई सूचना नहीं',
    Language: 'भाषा', 'Select language': 'भाषा चुनें', 'View all alerts': 'सभी अलर्ट देखें',
    'Current alerts': 'वर्तमान अलर्ट', 'Mark all read': 'सभी पढ़े हुए चिह्नित करें', Close: 'बंद करें',
  },
  bn: {
    Dashboard: 'ড্যাশবোর্ড', 'Live Map': 'লাইভ মানচিত্র', Alerts: 'সতর্কতা', 'Disaster Intel': 'দুর্যোগ তথ্য',
    'Air Quality': 'বায়ু মান', Forecast: 'পূর্বাভাস', Climate: 'জলবায়ু', 'AI Assistant': 'এআই সহায়ক',
    SOS: 'এসওএস', 'Offline Mode': 'অফলাইন মোড', 'Experience mode': 'অভিজ্ঞতা মোড',
    'General weather awareness': 'সাধারণ আবহাওয়া তথ্য', 'User Account': 'ব্যবহারকারী অ্যাকাউন্ট', Live: 'লাইভ',
    'Updated 5 min ago': '৫ মিনিট আগে আপডেট', Notifications: 'বিজ্ঞপ্তি', 'No notifications': 'কোনও বিজ্ঞপ্তি নেই',
    Language: 'ভাষা', 'Select language': 'ভাষা নির্বাচন করুন', 'View all alerts': 'সব সতর্কতা দেখুন',
    'Current alerts': 'বর্তমান সতর্কতা', 'Mark all read': 'সব পড়া হিসেবে চিহ্নিত করুন', Close: 'বন্ধ করুন',
  },
  ta: {
    Dashboard: 'டாஷ்போர்டு', 'Live Map': 'நேரடி வரைபடம்', Alerts: 'எச்சரிக்கைகள்', 'Disaster Intel': 'பேரிடர் தகவல்',
    'Air Quality': 'காற்றுத் தரம்', Forecast: 'முன்னறிவிப்பு', Climate: 'காலநிலை', 'AI Assistant': 'AI உதவியாளர்',
    SOS: 'SOS', 'Offline Mode': 'ஆஃப்லைன் பயன்முறை', 'Experience mode': 'அனுபவ பயன்முறை',
    'General weather awareness': 'பொது வானிலை தகவல்', 'User Account': 'பயனர் கணக்கு', Live: 'நேரலை',
    'Updated 5 min ago': '5 நிமிடங்களுக்கு முன் புதுப்பிக்கப்பட்டது', Notifications: 'அறிவிப்புகள்', 'No notifications': 'அறிவிப்புகள் இல்லை',
    Language: 'மொழி', 'Select language': 'மொழியைத் தேர்ந்தெடுக்கவும்', 'View all alerts': 'அனைத்து எச்சரிக்கைகளையும் காண்க',
    'Current alerts': 'தற்போதைய எச்சரிக்கைகள்', 'Mark all read': 'அனைத்தையும் படித்ததாக குறிக்கவும்', Close: 'மூடு',
  },
  te: {
    Dashboard: 'డాష్‌బోర్డ్', 'Live Map': 'లైవ్ మ్యాప్', Alerts: 'హెచ్చరికలు', 'Disaster Intel': 'విపత్తు సమాచారం',
    'Air Quality': 'గాలి నాణ్యత', Forecast: 'వాతావరణ అంచనా', Climate: 'వాతావరణం', 'AI Assistant': 'AI సహాయకుడు',
    SOS: 'SOS', 'Offline Mode': 'ఆఫ్‌లైన్ మోడ్', 'Experience mode': 'అనుభవ మోడ్',
    'General weather awareness': 'సాధారణ వాతావరణ సమాచారం', 'User Account': 'వినియోగదారు ఖాతా', Live: 'లైవ్',
    'Updated 5 min ago': '5 నిమిషాల క్రితం నవీకరించబడింది', Notifications: 'నోటిఫికేషన్లు', 'No notifications': 'నోటిఫికేషన్లు లేవు',
    Language: 'భాష', 'Select language': 'భాషను ఎంచుకోండి', 'View all alerts': 'అన్ని హెచ్చరికలు చూడండి',
    'Current alerts': 'ప్రస్తుత హెచ్చరికలు', 'Mark all read': 'అన్నింటినీ చదివినట్లు గుర్తించండి', Close: 'మూసివేయి',
  },
  kn: {
    Dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', 'Live Map': 'ಲೈವ್ ನಕ್ಷೆ', Alerts: 'ಎಚ್ಚರಿಕೆಗಳು', 'Disaster Intel': 'ವಿಪತ್ತು ಮಾಹಿತಿ',
    'Air Quality': 'ಗಾಳಿಯ ಗುಣಮಟ್ಟ', Forecast: 'ಮುನ್ನೋಟ', Climate: 'ಹವಾಮಾನ', 'AI Assistant': 'AI ಸಹಾಯಕ',
    SOS: 'SOS', 'Offline Mode': 'ಆಫ್‌ಲೈನ್ ಮೋಡ್', 'Experience mode': 'ಅನುಭವ ಮೋಡ್',
    'General weather awareness': 'ಸಾಮಾನ್ಯ ಹವಾಮಾನ ಮಾಹಿತಿ', 'User Account': 'ಬಳಕೆದಾರ ಖಾತೆ', Live: 'ಲೈವ್',
    'Updated 5 min ago': '5 ನಿಮಿಷಗಳ ಹಿಂದೆ ನವೀಕರಿಸಲಾಗಿದೆ', Notifications: 'ಅಧಿಸೂಚನೆಗಳು', 'No notifications': 'ಯಾವುದೇ ಅಧಿಸೂಚನೆಗಳಿಲ್ಲ',
    Language: 'ಭಾಷೆ', 'Select language': 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ', 'View all alerts': 'ಎಲ್ಲಾ ಎಚ್ಚರಿಕೆಗಳನ್ನು ನೋಡಿ',
    'Current alerts': 'ಪ್ರಸ್ತುತ ಎಚ್ಚರಿಕೆಗಳು', 'Mark all read': 'ಎಲ್ಲವನ್ನೂ ಓದಿದಂತೆ ಗುರುತಿಸಿ', Close: 'ಮುಚ್ಚಿ',
  },
  ml: {
    Dashboard: 'ഡാഷ്ബോർഡ്', 'Live Map': 'ലൈവ് മാപ്പ്', Alerts: 'അറിയിപ്പുകൾ', 'Disaster Intel': 'ദുരന്ത വിവരം',
    'Air Quality': 'വായു ഗുണനിലവാരം', Forecast: 'കാലാവസ്ഥ പ്രവചനം', Climate: 'കാലാവസ്ഥ', 'AI Assistant': 'AI സഹായി',
    SOS: 'SOS', 'Offline Mode': 'ഓഫ്‌ലൈൻ മോഡ്', 'Experience mode': 'അനുഭവ മോഡ്',
    'General weather awareness': 'പൊതുവായ കാലാവസ്ഥാ വിവരം', 'User Account': 'ഉപയോക്തൃ അക്കൗണ്ട്', Live: 'ലൈവ്',
    'Updated 5 min ago': '5 മിനിറ്റ് മുമ്പ് പുതുക്കി', Notifications: 'അറിയിപ്പുകൾ', 'No notifications': 'അറിയിപ്പുകളൊന്നുമില്ല',
    Language: 'ഭാഷ', 'Select language': 'ഭാഷ തിരഞ്ഞെടുക്കുക', 'View all alerts': 'എല്ലാ മുന്നറിയിപ്പുകളും കാണുക',
    'Current alerts': 'നിലവിലെ മുന്നറിയിപ്പുകൾ', 'Mark all read': 'എല്ലാം വായിച്ചതായി അടയാളപ്പെടുത്തുക', Close: 'അടയ്ക്കുക',
  },
  mr: {
    Dashboard: 'डॅशबोर्ड', 'Live Map': 'लाइव्ह नकाशा', Alerts: 'सूचना', 'Disaster Intel': 'आपत्ती माहिती',
    'Air Quality': 'हवेची गुणवत्ता', Forecast: 'अंदाज', Climate: 'हवामान', 'AI Assistant': 'AI सहाय्यक',
    SOS: 'SOS', 'Offline Mode': 'ऑफलाइन मोड', 'Experience mode': 'अनुभव मोड',
    'General weather awareness': 'सामान्य हवामान माहिती', 'User Account': 'वापरकर्ता खाते', Live: 'लाइव्ह',
    'Updated 5 min ago': '5 मिनिटांपूर्वी अपडेट', Notifications: 'सूचना', 'No notifications': 'सूचना नाहीत',
    Language: 'भाषा', 'Select language': 'भाषा निवडा', 'View all alerts': 'सर्व सूचना पहा',
    'Current alerts': 'सध्याच्या सूचना', 'Mark all read': 'सर्व वाचलेले म्हणून चिन्हांकित करा', Close: 'बंद करा',
  },
  gu: {
    Dashboard: 'ડેશબોર્ડ', 'Live Map': 'લાઇવ નકશો', Alerts: 'ચેતવણીઓ', 'Disaster Intel': 'આપત્તિ માહિતી',
    'Air Quality': 'હવાની ગુણવત્તા', Forecast: 'આગાહી', Climate: 'આબોહવા', 'AI Assistant': 'AI સહાયક',
    SOS: 'SOS', 'Offline Mode': 'ઓફલાઇન મોડ', 'Experience mode': 'અનુભવ મોડ',
    'General weather awareness': 'સામાન્ય હવામાન માહિતી', 'User Account': 'વપરાશકર્તા ખાતું', Live: 'લાઇવ',
    'Updated 5 min ago': '5 મિનિટ પહેલાં અપડેટ', Notifications: 'સૂચનાઓ', 'No notifications': 'કોઈ સૂચનાઓ નથી',
    Language: 'ભાષા', 'Select language': 'ભાષા પસંદ કરો', 'View all alerts': 'બધી ચેતવણીઓ જુઓ',
    'Current alerts': 'વર્તમાન ચેતવણીઓ', 'Mark all read': 'બધાને વાંચેલા તરીકે ચિહ્નિત કરો', Close: 'બંધ કરો',
  },
  or: {
    Dashboard: 'ଡ୍ୟାସବୋର୍ଡ', 'Live Map': 'ଲାଇଭ୍ ମାନଚିତ୍ର', Alerts: 'ସତର୍କତା', 'Disaster Intel': 'ବିପର୍ଯ୍ୟୟ ସୂଚନା',
    'Air Quality': 'ବାୟୁ ଗୁଣବତ୍ତା', Forecast: 'ପୂର୍ବାନୁମାନ', Climate: 'ଜଳବାୟୁ', 'AI Assistant': 'AI ସହାୟକ',
    SOS: 'SOS', 'Offline Mode': 'ଅଫଲାଇନ୍ ମୋଡ୍', 'Experience mode': 'ଅନୁଭବ ମୋଡ୍',
    'General weather awareness': 'ସାଧାରଣ ପାଣିପାଗ ସୂଚନା', 'User Account': 'ବ୍ୟବହାରକାରୀ ଖାତା', Live: 'ଲାଇଭ୍',
    'Updated 5 min ago': '5 ମିନିଟ୍ ପୂର୍ବେ ଅଦ୍ୟତନ', Notifications: 'ବିଜ୍ଞପ୍ତି', 'No notifications': 'କୌଣସି ବିଜ୍ଞପ୍ତି ନାହିଁ',
    Language: 'ଭାଷା', 'Select language': 'ଭାଷା ଚୟନ କରନ୍ତୁ', 'View all alerts': 'ସମସ୍ତ ସତର୍କତା ଦେଖନ୍ତୁ',
    'Current alerts': 'ବର୍ତ୍ତମାନ ସତର୍କତା', 'Mark all read': 'ସବୁ ପଢ଼ା ଭାବେ ଚିହ୍ନଟ କରନ୍ତୁ', Close: 'ବନ୍ଦ କରନ୍ତୁ',
  },
};

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return UI_LANGUAGES[0];
  try {
    const code = window.localStorage.getItem('akashvani_language');
    return UI_LANGUAGES.find((language) => language.code === code) || UI_LANGUAGES[0];
  } catch {
    return UI_LANGUAGES[0];
  }
}

export function setStoredLanguage(code: string) {
  if (typeof window === 'undefined') return;
  const language = UI_LANGUAGES.find((item) => item.code === code) || UI_LANGUAGES[0];
  window.localStorage.setItem('akashvani_language', language.code);
  document.documentElement.lang = language.code;
  window.dispatchEvent(new CustomEvent('akashvani:language-changed', { detail: language.code }));
}

export function translateText(value: string, code: string) {
  return UI_TRANSLATIONS[code]?.[value] || value;
}

export function translatePage(code: string) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = code;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) nodes.push(node as Text);
  for (const textNode of nodes) {
    const raw = textNode.nodeValue?.trim();
    if (!raw || !/\S/.test(raw)) continue;
    const translated = translateText(raw, code);
    if (translated !== raw) {
      textNode.parentElement?.setAttribute('data-akashvani-original-text', raw);
      textNode.nodeValue = textNode.nodeValue?.replace(raw, translated) || translated;
    }
  }
}
