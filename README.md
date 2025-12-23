# Xirmon Market UI

O'zbekiston qishloq xo'jaligi mahsulotlari uchun zamonaviy onlayn bozor - Frontend UI

## 🌟 Xususiyatlar

* 🎨 **Modern UI** - Shadcn UI komponentlari bilan qurilgan
* 📱 **Responsive Design** - Barcha qurilmalarda mukammal ishlaydi
* 🌓 **Dark Mode** - Tema qo'llab-quvvatlash
* ⚡ **Next.js 16** - App Router bilan zamonaviy arxitektura
* 🎯 **TypeScript** - Type-safe kod
* 🎨 **Tailwind CSS** - Utility-first CSS framework

## 🚀 Quick Start

### Prerequisites

* Node.js 18+
* npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
xirmon-market-ui/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── auth/              # Authentication pages
│   │   ├── login/        # Login page
│   │   └── register/      # Registration page
│   ├── listings/          # Listings pages
│   │   ├── [id]/         # Listing detail page
│   │   └── create/       # Create listing page
│   ├── profile/           # User profile page
│   └── search/            # Search page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── header.tsx        # Header component
│   ├── footer.tsx        # Footer component
│   ├── listing-card.tsx  # Listing card component
│   └── category-card.tsx # Category card component
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and helpers
│   ├── utils.ts         # Utility functions
│   └── mock-data.ts     # Mock data for development
└── public/              # Static assets

```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## 🛠️ Tech Stack

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** Shadcn UI
* **State Management:** React Hooks
* **Forms:** React Hook Form + Zod
* **Icons:** Lucide React

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy!

## 📚 Available Scripts

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm start` - Start production server
* `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License

## 👥 Team

* **Abduraufov Hazratqul** - AI/ML Engineer, Backend Developer
* **Kamoliddin Nasridinov** - Marketolog
* **Shakhzod Bakhtiyorov** - Team Lead, Business Consultant

## 📞 Contact

* **Website:** https://xirmon.uz
* **Email:** info@xirmon.uz
* **Telegram:** @xirmon_support

---

Made with ❤️ in Uzbekistan 🇺🇿

