import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Structural Steel - Building A',
      client: 'ABC Construction',
      location: 'Downtown',
      projectType: 'Structural Steel',
      estimateNumber: 'EST-2024-001',
      estimator: 'John Smith',
      contactName: 'Jane Doe',
      contactEmail: 'jane.doe@abc-const.com',
      contactPhone: '(555) 123-4567',
      units: 'Imperial',
      shopRate: 95.0,
      bidDueAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      items: {
        create: [
          {
            drawing: 'S2.4',
            detail: '2.5',
            gridline: 'A-1',
            category: 'Beam',
            shape: 'W-Shape',
            size: 'W12x26',
            lengthFt: 18.0,
            qty: 2,
            weightLb: 468.0,
            weldIn: 0.0,
            cutMin: 30,
            fitMin: 45,
            weldMin: 60,
            grindMin: 15,
            prepMin: 10,
            paintMin: 5,
            handleMin: 10,
            loadMin: 5,
            notes: 'Two W12x26 eighteen-foot zero'
          },
          {
            drawing: 'S2.4',
            detail: '2.5',
            category: 'Base Plate',
            shape: 'Plate',
            size: '12x12x1/2',
            qty: 1,
            weightLb: 20.4,
            weldIn: 48.0,
            cutMin: 15,
            fitMin: 20,
            weldMin: 30,
            grindMin: 10,
            paintMin: 5,
            handleMin: 5,
            loadMin: 0,
            notes: 'Base plate twelve by twelve by half, weld all around quarter fillet'
          },
          {
            drawing: 'S2.4',
            detail: '2.5',
            category: 'Cap Plate',
            shape: 'Plate',
            size: '6x6x1/2',
            qty: 1,
            weightLb: 5.1,
            weldIn: 24.0,
            cutMin: 10,
            fitMin: 15,
            weldMin: 25,
            grindMin: 8,
            paintMin: 4,
            handleMin: 3,
            loadMin: 0,
            notes: 'Cap plate six by six by half, weld all around quarter fillet'
          }
        ]
      }
    },
    include: {
      items: true
    }
  })

  const project2 = await prisma.project.create({
    data: {
      name: 'Rebar Fabrication',
      client: 'XYZ Contractors',
      location: 'West Side',
      projectType: 'Rebar',
      estimateNumber: 'EST-2024-002',
      estimator: 'Sarah Johnson',
      contactName: 'Bob Wilson',
      contactEmail: 'bob.wilson@xyz-cont.com',
      contactPhone: '(555) 987-6543',
      units: 'Imperial',
      shopRate: 85.0,
      bidDueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      items: {
        create: [
          {
            drawing: 'RB-001',
            detail: 'Column tie',
            category: 'Rebar',
            shape: 'Rectangle',
            size: '#4 @12"',
            qty: 24,
            weightLb: 96.0,
            cutMin: 20,
            fitMin: 35,
            weldMin: 0,
            grindMin: 0,
            prepMin: 15,
            handleMin: 10,
            loadMin: 5
          }
        ]
      }
    },
    include: {
      items: true
    }
  })

  console.log('✅ Created projects:')
  console.log(`  - ${project1.name} with ${project1.items.length} items`)
  console.log(`  - ${project2.name} with ${project2.items.length} items`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

