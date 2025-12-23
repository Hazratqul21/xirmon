export const categories = [
  { id: 1, name: "Don mahsulotlari", icon: "🌾", slug: "don" },
  { id: 2, name: "Sabzavotlar", icon: "🥕", slug: "sabzavot" },
  { id: 3, name: "Mevalar", icon: "🍎", slug: "meva" },
  { id: 4, name: "Poliz mahsulotlari", icon: "🌱", slug: "poliz" },
  { id: 5, name: "Chorva mollari", icon: "🐄", slug: "chorva" },
  { id: 6, name: "Parranda", icon: "🐔", slug: "parranda" },
  { id: 7, name: "Texnika", icon: "🚜", slug: "texnika" },
  { id: 8, name: "O'g'it va dorilar", icon: "💊", slug: "ogit" },
]

export const regions = [
  { id: 1, name: "Toshkent shahri", districts: ["Chilonzor", "Yunusobod", "Mirzo Ulug'bek", "Yakkasaroy"] },
  { id: 2, name: "Toshkent viloyati", districts: ["Angren", "Olmaliq", "Chirchiq", "Bekobod"] },
  { id: 3, name: "Samarqand", districts: ["Samarqand shahri", "Bulung'ur", "Jomboy", "Kattaqo'rg'on"] },
  { id: 4, name: "Farg'ona", districts: ["Farg'ona shahri", "Marg'ilon", "Quvasoy", "Qo'qon"] },
  { id: 5, name: "Andijon", districts: ["Andijon shahri", "Asaka", "Xo'jaobod", "Paxtaobod"] },
  { id: 6, name: "Namangan", districts: ["Namangan shahri", "Chortoq", "Pop", "To'raqo'rg'on"] },
  { id: 7, name: "Qashqadaryo", districts: ["Qarshi", "Shahrisabz", "Koson", "Kitob"] },
  { id: 8, name: "Surxondaryo", districts: ["Termiz", "Denov", "Boysun", "Sho'rchi"] },
  { id: 9, name: "Buxoro", districts: ["Buxoro shahri", "Kogon", "Romitan", "Vobkent"] },
  { id: 10, name: "Xorazm", districts: ["Urganch", "Xiva", "Yangiariq", "Bog'ot"] },
  { id: 11, name: "Navoiy", districts: ["Navoiy shahri", "Zarafshon", "Nurota", "Karmana"] },
  { id: 12, name: "Jizzax", districts: ["Jizzax shahri", "Do'stlik", "Zarbdor", "Forish"] },
  { id: 13, name: "Sirdaryo", districts: ["Guliston", "Yangiyer", "Shirin", "Boyovut"] },
  { id: 14, name: "Qoraqalpog'iston", districts: ["Nukus", "Beruniy", "Qo'ng'irot", "Chimboy"] },
]

export const units = ["kg", "tonna", "dona", "qop", "litr", "m²", "gektar"]

export const currencies = ["UZS", "USD"]

export type ListingType = "sell" | "barter" | "free"

export interface Listing {
  id: number
  title: string
  description: string
  category: string
  listingType: ListingType
  quantity: number
  unit: string
  price?: number
  currency?: string
  negotiable: boolean
  region: string
  district: string
  images: string[]
  contactName: string
  contactPhone: string
  contactEmail?: string
  createdAt: string
  featured?: boolean
}

export const mockListings: Listing[] = [
  {
    id: 1,
    title: "Yuqori navli bug'doy",
    description: "2024 yil hosili, toza bug'doy. Sifat kafolati bilan.",
    category: "Don mahsulotlari",
    listingType: "sell",
    quantity: 50,
    unit: "tonna",
    price: 2500000,
    currency: "UZS",
    negotiable: true,
    region: "Samarqand",
    district: "Jomboy",
    images: ["/wheat-grain-harvest.jpg"],
    contactName: "Aziz Rahimov",
    contactPhone: "+998 90 123 45 67",
    contactEmail: "aziz@example.com",
    createdAt: "2024-01-15",
    featured: true,
  },
  {
    id: 2,
    title: "Toza pomidor",
    description: "Issiqxonada o'stirilgan, yangi terib olingan pomidor.",
    category: "Sabzavotlar",
    listingType: "sell",
    quantity: 500,
    unit: "kg",
    price: 12000,
    currency: "UZS",
    negotiable: false,
    region: "Toshkent viloyati",
    district: "Chirchiq",
    images: ["/fresh-tomatoes-red.jpg"],
    contactName: "Dilshod Karimov",
    contactPhone: "+998 91 234 56 78",
    createdAt: "2024-01-18",
  },
  {
    id: 3,
    title: "Olma - Simirenko",
    description: "Ekologik toza olma, o'z hovlimizdan.",
    category: "Mevalar",
    listingType: "sell",
    quantity: 2,
    unit: "tonna",
    price: 8000,
    currency: "UZS",
    negotiable: true,
    region: "Farg'ona",
    district: "Farg'ona shahri",
    images: ["/green-apples-fresh.jpg"],
    contactName: "Shohruh Tursunov",
    contactPhone: "+998 93 345 67 89",
    createdAt: "2024-01-20",
    featured: true,
  },
  {
    id: 4,
    title: "John Deere traktor",
    description: "2018 yil ishlab chiqarilgan, yaxshi holatda. Barcha hujjatlar mavjud.",
    category: "Texnika",
    listingType: "sell",
    quantity: 1,
    unit: "dona",
    price: 45000,
    currency: "USD",
    negotiable: true,
    region: "Andijon",
    district: "Andijon shahri",
    images: ["/john-deere-tractor-green.jpg"],
    contactName: "Jamshid Aliyev",
    contactPhone: "+998 94 456 78 90",
    createdAt: "2024-01-22",
  },
  {
    id: 5,
    title: "Sog'lom sigir",
    description: "3 yoshli sut sigiri, kuniga 20 litr sut beradi.",
    category: "Chorva mollari",
    listingType: "sell",
    quantity: 1,
    unit: "dona",
    price: 12000000,
    currency: "UZS",
    negotiable: true,
    region: "Qashqadaryo",
    district: "Qarshi",
    images: ["/dairy-cow-healthy.jpg"],
    contactName: "Otabek Yuldashev",
    contactPhone: "+998 95 567 89 01",
    createdAt: "2024-01-23",
  },
  {
    id: 6,
    title: "Organik o'g'it",
    description: "Tabiiy kompost, kimyoviy qo'shimchalarsiz.",
    category: "O'g'it va dorilar",
    listingType: "barter",
    quantity: 10,
    unit: "tonna",
    negotiable: true,
    region: "Buxoro",
    district: "Buxoro shahri",
    images: ["/organic-compost-fertilizer.jpg"],
    contactName: "Sardor Mahmudov",
    contactPhone: "+998 97 678 90 12",
    createdAt: "2024-01-25",
  },
  {
    id: 7,
    title: "Bodring",
    description: "Yangi terib olingan bodring, toza va mazali.",
    category: "Sabzavotlar",
    listingType: "sell",
    quantity: 300,
    unit: "kg",
    price: 8000,
    currency: "UZS",
    negotiable: false,
    region: "Xorazm",
    district: "Urganch",
    images: ["/fresh-cucumbers-green.jpg"],
    contactName: "Bekzod Normatov",
    contactPhone: "+998 98 789 01 23",
    createdAt: "2024-01-26",
  },
  {
    id: 8,
    title: "Qo'y mollari",
    description: "10 bosh qo'y, nasldan o'tgan, sog'lom.",
    category: "Chorva mollari",
    listingType: "sell",
    quantity: 10,
    unit: "dona",
    price: 3500000,
    currency: "UZS",
    negotiable: true,
    region: "Surxondaryo",
    district: "Termiz",
    images: ["/sheep-flock-wool.jpg"],
    contactName: "Rustam Ergashev",
    contactPhone: "+998 99 890 12 34",
    createdAt: "2024-01-27",
    featured: true,
  },
]
