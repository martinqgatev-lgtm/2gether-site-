import { Product, ServiceItem, LegalContent } from '../types';

export const COMPANY_INFO = {
  name: "\"Евро Код 1\" ЕООД",
  eik: "203949089",
  address: "Варна, ул. Братя Шкорпил 12",
  phone: "088 285 8774",
  email: "info@2getherbikes.bg",
  storeHours: "10:30 – 19:00",
  supportHours: "Пон-Пет 9:30 – 18:00",
  location: "бул. 8-ми Приморски Полк 125"
};

export const DELIVERY_RULES = {
  partner: "ЕКОНТ",
  costOffice: 7.50,
  costAddress: 12.00,
  freeThreshold: 49.90,
  deliveryDays: "3-5"
};

export const SERVICES: ServiceItem[] = [
  { id: 's1', name: 'Смяна на жило', price: 20, description: 'Демонтаж на старо жило/броня и монтаж на нови.' },
  { id: 's2', name: 'Центроване на капла', price: 15, description: 'Прецизно изправяне на радиални и аксиални отклонения.' },
  { id: 's3', name: 'Пълна профилактика', price: 60, description: 'Цялостно разглобяване, почистване и смазване на велосипеда.' },
  { id: 's4', name: 'Смяна на курбели', price: 25, description: 'Включва проверка на средното движение.' },
  { id: 's5', name: 'Обезвъздушаване на хидр. спирачка', price: 25, description: 'На спирачка. Включва спирачна течност.' },
  { id: 's6', name: 'Internal Routing (Вътрешно окабеляване)', price: 35, description: 'Прекарване на жило/броня през рамката.' },
];

export const PRODUCTS: Product[] = [
  { 
    id: 'o-alma-h10', 
    slug: 'orbea-alma-h10',
    name: 'Orbea Alma H10', 
    price: 3499, 
    brand: 'Orbea', 
    category: 'Планински', 
    images: [
      'https://images.unsplash.com/photo-1576435728678-68d01fa6b4f3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    description: '<p>Alma е изборът за състезатели и любители на XC, които търсят най-лекото и ефективно hardtail колело. Хидроформованата алуминиева рамка предлага изключителна здравина.</p>',
    specs: { 
      frame: 'Orbea Alma Hydro Alloy, Boost 12x148', 
      fork: 'RockShox Judy Silver TK Remote 100mm', 
      gear: 'Shimano XT M8100 12s',
      brake: 'Shimano MT201',
      tire: 'Maxxis Ikon 2.20'
    }
  },
  { 
    id: 'o-oiz-mltd', 
    slug: 'orbea-oiz-m-ltd',
    name: 'Orbea Oiz M-LTD', 
    price: 16639, 
    originalPrice: 18999,
    brand: 'Orbea', 
    category: 'Планински', 
    images: ['https://images.unsplash.com/photo-1596563459526-7d6f554e2237?auto=format&fit=crop&q=80&w=800'],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    isSale: true,
    description: '<p>Най-леката и бърза XC машина. 120мм ход, без компромиси в теглото. Това е велосипедът, който печели подиуми на най-високо ниво.</p>',
    specs: { 
      frame: 'Orbea Oiz Carbon OMX', 
      fork: 'Fox 34 Float SC Factory 120', 
      gear: 'SRAM XX1 Eagle AXS',
      brake: 'SRAM Level Ultimate',
      weight: '9.98 kg'
    }
  },
  { 
    id: 'sc-hightower', 
    slug: 'santa-cruz-hightower',
    name: 'Santa Cruz Hightower', 
    price: 10999, 
    brand: 'Santa Cruz', 
    category: 'Планински', 
    images: ['https://images.unsplash.com/photo-1572111504021-40abd34be9dd?auto=format&fit=crop&q=80&w=800'],
    sizes: ['L', 'XL'],
    inStock: true,
    description: '<p>Най-универсалният велосипед в гамата на Santa Cruz. Hightower е "all-terrain" машина с VPP окачване.</p>',
    specs: { 
      frame: 'Carbon C 145mm Travel VPP', 
      fork: 'Fox 36 Float Performance 150mm', 
      gear: 'SRAM GX Eagle',
      brake: 'SRAM Code R',
      tire: 'Maxxis Minion DHR II'
    }
  },
  { 
    id: 'g-talon-3', 
    slug: 'giant-talon-3',
    name: 'Giant Talon 3', 
    price: 1299, 
    brand: 'Giant', 
    category: 'Планински', 
    images: ['https://images.unsplash.com/photo-1618762044398-ec1e7e048bbd?auto=format&fit=crop&q=80&w=800'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    description: '<p>Перфектният старт в планината. Лека алуминиева рамка и надеждни компоненти на достъпна цена.</p>',
    specs: { 
      frame: 'ALUXX-Grade Aluminum', 
      fork: 'SR Suntour XCE 100mm', 
      gear: 'Shimano Tourney',
      brake: 'Tektro TKD 143 Hydraulic',
      tire: 'Kenda Booster 2.2"'
    }
  },
  // Adding previous items for variety
  { 
    id: 'o-orca-m30', 
    slug: 'orbea-orca-m30',
    name: 'Orbea Orca M30', 
    price: 4299, 
    brand: 'Orbea', 
    category: 'Шосейни', 
    images: ['https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=800'],
    sizes: ['51', '53', '55', '57', 'XL'],
    inStock: true,
    description: '<p>Шосеен велосипед, създаден за дълги дистанции и катерене с лекота.</p>',
    specs: { 
      frame: 'Orbea Orca carbon OMR', 
      gear: 'Shimano 105 R7000',
      brake: 'Shimano R7070'
    }
  },
    { 
    id: 'm-tshirt', 
    slug: 'merch-tshirt-2gether',
    name: 'Тениска 2GETHER x SANTA CRUZ', 
    price: 39.90, 
    brand: 'Merch', 
    category: 'Екипировка', 
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    description: '<p>Лимитирана серия памучна тениска от нашата колаборация със Santa Cruz.</p>',
    specs: { 
      material: '100% Органичен памук'
    }
  },
];

export const LEGAL_TERMS: Record<string, LegalContent> = {
  terms: {
    title: "Общи условия",
    content: [
      "Договорът се счита за сключен при потвърждаване на поръчката.",
      "Всички цени са с включен ДДС.",
      "Потребителят се съгласява да заплати разходите за доставка, освен ако поръчката не надвишава прага за безплатна доставка.",
      "Запазваме си правото да променяме цените без предизвестие."
    ]
  },
  privacy: {
    title: "Политика за поверителност",
    content: [
      "Събираме IP адреси, Имена и Телефонни номера единствено за целите на доставката.",
      "Използваме Бисквитки (Google Analytics, Facebook Pixel) за маркетингови цели.",
      "Вашите данни се обработват от 'Евро Код 1' ЕООД съгласно GDPR."
    ]
  },
  delivery: {
    title: "Доставка и Връщане",
    content: [
      `Партньор за доставка: ${DELIVERY_RULES.partner}`,
      `Цена до офис: ~${DELIVERY_RULES.costOffice.toFixed(2)} лв`,
      `Цена до адрес: ~${DELIVERY_RULES.costAddress.toFixed(2)} лв`,
      `Безплатна доставка: Над ${DELIVERY_RULES.freeThreshold.toFixed(2)} лв (до офис)`,
      `Срок за доставка: ${DELIVERY_RULES.deliveryDays} работни дни`,
      "Връщане до 14 дни (Транспортните разходи са за сметка на купувача)."
    ]
  }
};