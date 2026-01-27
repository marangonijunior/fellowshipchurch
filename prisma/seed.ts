import prisma from "../lib/db"
import bcrypt from "bcrypt"

async function main() {
  console.log("🌱 Starting database seed...")

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@fellowshipchurch.com" },
    update: {},
    create: {
      email: "admin@fellowshipchurch.com",
      name: "Admin User",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      emailVerified: new Date(),
    },
  })

  console.log("✅ Created admin user:", admin.email)

  // Create editor user
  const editorPassword = await bcrypt.hash("editor123", 10)
  
  const editor = await prisma.user.upsert({
    where: { email: "editor@fellowshipchurch.com" },
    update: {},
    create: {
      email: "editor@fellowshipchurch.com",
      name: "Editor User",
      password: editorPassword,
      role: "EDITOR",
      emailVerified: new Date(),
    },
  })

  console.log("✅ Created editor user:", editor.email)

  // Create categories
  const categories = [
    { name: "Relationship", slug: "relationship", description: "Posts about relationships and community" },
    { name: "Faith", slug: "faith", description: "Posts about faith and spirituality" },
    { name: "Ministry", slug: "ministry", description: "Posts about ministry and service" },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
    console.log("✅ Created category:", category.name)
  }

  // Create tags
  const tags = [
    { name: "Prayer", slug: "prayer" },
    { name: "Worship", slug: "worship" },
    { name: "Community", slug: "community" },
    { name: "Family", slug: "family" },
    { name: "Youth", slug: "youth" },
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    })
    console.log("✅ Created tag:", tag.name)
  }

  // Create sample posts
  const relationshipCategory = await prisma.category.findUnique({
    where: { slug: "relationship" },
  })

  const prayerTag = await prisma.tag.findUnique({
    where: { slug: "prayer" },
  })

  if (relationshipCategory && prayerTag) {
    const samplePost = await prisma.post.upsert({
      where: { slug: "how-to-show-compassion" },
      update: {},
      create: {
        title: "How to Show Compassion",
        slug: "how-to-show-compassion",
        excerpt: "Learn the importance of showing compassion in our daily lives and how it reflects our faith.",
        content: `
          <h2>Understanding Compassion</h2>
          <p>Compassion is at the heart of our faith. It's not just about feeling sorry for someone, but actively working to alleviate their suffering.</p>
          
          <h2>Practical Ways to Show Compassion</h2>
          <ul>
            <li>Listen without judgment</li>
            <li>Offer help when needed</li>
            <li>Be present in difficult times</li>
            <li>Practice forgiveness</li>
          </ul>
          
          <p>When we show compassion, we reflect God's love to the world around us.</p>
        `,
        featuredImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80",
        status: "PUBLISHED",
        type: "BLOG",
        publishedAt: new Date(),
        authorId: admin.id,
        categories: {
          connect: [{ id: relationshipCategory.id }],
        },
        tags: {
          connect: [{ id: prayerTag.id }],
        },
        seoTitle: "How to Show Compassion - Fellowship Church",
        seoDescription: "Discover practical ways to show compassion in your daily life and reflect God's love.",
      },
    })

    console.log("✅ Created sample post:", samplePost.title)
  }

  console.log("\n🎉 Database seeded successfully!")
  console.log("\n📝 Login Credentials:")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("Admin User:")
  console.log("  Email: admin@fellowshipchurch.com")
  console.log("  Password: admin123")
  console.log("\nEditor User:")
  console.log("  Email: editor@fellowshipchurch.com")
  console.log("  Password: editor123")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
