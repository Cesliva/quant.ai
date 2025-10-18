@echo off
echo ========================================
echo Setting up Prisma Database
echo ========================================
echo.

REM Check if .env exists
if not exist .env (
    echo Creating .env file...
    echo DATABASE_URL="file:./dev.db"> .env
    echo OPENAI_API_KEY="">> .env
    echo ✓ .env file created
) else (
    echo ✓ .env file already exists
)
echo.

echo Installing dependencies...
call pnpm install
echo.

echo Running Prisma migration...
call pnpm prisma migrate dev --name add_project_admin_and_calendar
echo.

echo Seeding database with sample data...
call pnpm db:seed
echo.

echo ========================================
echo ✓ Prisma setup complete!
echo ========================================
echo.
echo Your database is ready at: prisma/dev.db
echo.
echo Next steps:
echo 1. Run: pnpm dev
echo 2. Open: http://localhost:3000
echo.
pause

