import Database from "better-sqlite3";
import type { Pants } from "./supabase";
import path from "path";

// Define the raw database row type
type PantsRow = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  sizes: string;
  created_at: string;
  stock: number;
  category: string;
};

type GreenPant = {
  name: string;
  price: number;
  image_url: string;
  description: string;
  sizes: string;
  stock: number;
  category: string;
};

// Use a local path for development, EBS volume path for production
const DB_PATH =
  process.env.SQLITE_DB_PATH ||
  (process.env.NODE_ENV === "production"
    ? "/mnt/ebs-volume/pants.db"
    : path.join(process.cwd(), "pants.db"));

// Initialize database and create tables if they don't exist
function initDatabase() {
  try {
    const db = new Database(DB_PATH);

    // Create pants table if it doesn't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS pants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT NOT NULL,
        sizes TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        stock INTEGER NOT NULL DEFAULT 0,
        category TEXT NOT NULL
      )
    `);

    // Check if we need to seed the database
    const count = db.prepare("SELECT COUNT(*) as count FROM pants").get() as {
      count: number;
    };
    if (count.count === 0) {
      console.log("Seeding SQLite database with initial data...");
      // Insert some initial data
      const insert = db.prepare(`
        INSERT INTO pants (name, price, image_url, description, sizes, stock, category)
        VALUES (@name, @price, @image_url, @description, @sizes, @stock, @category)
      `);

      const greenPants: GreenPant[] = [
        {
          name: "Classic Green Slim Fit",
          price: 89.99,
          image_url:
            "https://react-atx-demo-bucket.s3.us-east-1.amazonaws.com/pants/green/g1.webp",
          description: "Premium slim fit green pants for a natural look",
          sizes: JSON.stringify(["S", "M", "L", "XL"]),
          stock: 14,
          category: "green",
        },
        {
          name: "Green Relaxed Chinos",
          price: 79.99,
          image_url:
            "https://react-atx-demo-bucket.s3.us-east-1.amazonaws.com/pants/green/g2.webp",
          description: "Comfortable green chinos with a modern relaxed fit",
          sizes: JSON.stringify(["S", "M", "L", "XL"]),
          stock: 16,
          category: "green",
        },
        // Add more green pants as needed
      ];

      const insertMany = db.transaction((pants: GreenPant[]) => {
        for (const pant of pants) {
          insert.run(pant);
        }
      });

      insertMany(greenPants);
    }

    return db;
  } catch (error) {
    console.error("Error initializing SQLite database:", error);
    throw error;
  }
}

// Get database instance
const db = initDatabase();

// Helper to parse JSON stored in sizes column
function parseSizes(sizes: string): string[] {
  try {
    return JSON.parse(sizes);
  } catch {
    return [];
  }
}

// Get green pants
export function getGreenPants(): Pants[] {
  try {
    const pants = db
      .prepare<PantsRow>(
        `
      SELECT 
        id,
        name,
        price,
        image_url,
        description,
        sizes,
        created_at,
        stock,
        category
      FROM pants 
      WHERE category = 'green'
      ORDER BY created_at DESC
    `
      )
      .all() as PantsRow[]; // Type assertion to fix linter errors

    // Convert the SQLite results to match our Pants type
    return pants.map((pant) => ({
      id: pant.id,
      name: pant.name,
      price: pant.price,
      image_url: pant.image_url,
      description: pant.description,
      sizes: parseSizes(pant.sizes),
      created_at: new Date(pant.created_at).toISOString(),
      stock: pant.stock,
      category: pant.category,
    }));
  } catch (error) {
    console.error("Error fetching green pants from SQLite:", error);
    throw new Error("Failed to fetch green pants from SQLite database");
  }
}

// Insert pants data (for migration)
export function insertPants(pants: Omit<Pants, "id" | "created_at">[]) {
  const insert = db.prepare(`
    INSERT INTO pants (name, price, image_url, description, sizes, stock, category)
    VALUES (@name, @price, @image_url, @description, @sizes, @stock, @category)
  `);

  const insertMany = db.transaction(
    (pants: Omit<Pants, "id" | "created_at">[]) => {
      for (const pant of pants) {
        insert.run({
          ...pant,
          sizes: JSON.stringify(pant.sizes),
        });
      }
    }
  );

  insertMany(pants);
}

// Export the database instance for direct access if needed
export { db };
