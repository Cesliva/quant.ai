# 📊 Quant HUD - Fabrication Project Dashboard

A real-time fabrication project management dashboard built with Next.js 15, Prisma, and shadcn/ui.

**QuantHUD v2.5** - Full-featured dashboard for tracking fabrication projects, items, labor hours, and revenue.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set Up Database
```bash
# Generate Prisma Client
pnpm prisma generate

# Create the SQLite database
pnpm prisma db push
```

### 3. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your **QuantHUD v2.5** dashboard with:
- ✅ Live stats cards (projects, hours, rates, revenue)
- ✅ Voice command interface
- ✅ Projects table with full details
- ✅ Recent items tracking
- ✅ Export and reporting tools

## 📦 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** lucide-react
- **Database:** Prisma + SQLite
- **State Management:** Zustand
- **Validation:** Zod
- **AI:** OpenAI SDK

## 🎨 Available Components

All components are ready to import:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
```

## 🗄️ Database Schema

### Trade Model
```prisma
model Trade {
  id        String   @id @default(cuid())
  symbol    String
  side      String   // "BUY" or "SELL"
  quantity  Float
  price     Float
  timestamp DateTime @default(now())
  pnl       Float?
  status    String   @default("OPEN")
}
```

### Position Model
```prisma
model Position {
  id            String   @id @default(cuid())
  symbol        String   @unique
  quantity      Float
  avgPrice      Float
  currentPrice  Float?
  unrealizedPnl Float?
}
```

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm prisma studio` - Open Prisma Studio (database GUI)

## 📚 Project Structure

```
quant-hud/
├── app/
│   ├── globals.css      # Tailwind + theme variables
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   └── ui/              # shadcn/ui components
├── lib/
│   └── utils.ts         # Utility functions
├── prisma/
│   └── schema.prisma    # Database schema
└── package.json
```

## 🔧 Environment Variables

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="your-api-key-here"
```

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
