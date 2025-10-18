# 🚀 Prisma Quick Start

## Option 1: Automated Setup (Windows)

Just double-click the `setup-prisma.bat` file and it will:
- ✅ Create `.env` file
- ✅ Install dependencies
- ✅ Run database migration
- ✅ Seed with sample data

## Option 2: Manual Setup

### Step 1: Create .env File

Create a file named `.env` in the project root:

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=""
```

### Step 2: Run Setup Commands

```bash
# Install dependencies
pnpm install

# Create database and tables
pnpm prisma migrate dev --name add_project_admin_and_calendar

# Add sample data
pnpm db:seed

# Start the app
pnpm dev
```

## ✅ Verification

After setup, you should see:
- ✅ `prisma/dev.db` file created
- ✅ `prisma/migrations/` folder with migration files
- ✅ Console message: "🌱 Seeding database..."

## 🎯 What You Get

- 2 sample projects with full admin metadata
- 4 fabrication items with labor hours
- Complete project/item relationships
- Ready-to-use database for testing

## 📊 View Your Data

```bash
# Open Prisma Studio (visual database editor)
pnpm prisma studio
```

This opens a GUI at http://localhost:5555 where you can view and edit your data!

## 🔧 Troubleshooting

**Error: "prisma: command not found"**
```bash
pnpm install
```

**Error: "Environment variable not found: DATABASE_URL"**
- Make sure `.env` file exists in project root
- Check it contains: `DATABASE_URL="file:./dev.db"`

**Database locked error:**
- Close any Prisma Studio instances
- Close your app if running
- Try again

## 🆘 Need Help?

All setup is in these files:
- `.env` - Database connection string
- `prisma/schema.prisma` - Database structure
- `lib/prisma.ts` - Prisma client instance
- `prisma/seed.ts` - Sample data script

