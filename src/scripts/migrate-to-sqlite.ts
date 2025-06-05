import { supabase } from "@/lib/supabase";
import { insertPants } from "@/lib/db";
import fs from "fs";
import path from "path";

// Verify environment variables are set
if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  console.error(
    "Please make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your environment"
  );
  console.error("You can set them by running:");
  console.error("$env:NEXT_PUBLIC_SUPABASE_URL='your-url'");
  console.error("$env:NEXT_PUBLIC_SUPABASE_ANON_KEY='your-key'");
  process.exit(1);
}

// Check if we have enough disk space (at least 100MB free)
function checkDiskSpace(dbPath: string): boolean {
  try {
    const stats = fs.statfsSync(path.dirname(dbPath));
    const freeSpaceMB = (stats.bfree * stats.bsize) / (1024 * 1024);
    if (freeSpaceMB < 100) {
      console.error(
        `Insufficient disk space. Only ${freeSpaceMB.toFixed(
          2
        )}MB free. Need at least 100MB.`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error checking disk space:", error);
    return false;
  }
}

// Check if the database directory is writable
function checkDirectoryWritable(dbPath: string): boolean {
  try {
    const dir = path.dirname(dbPath);
    fs.accessSync(dir, fs.constants.W_OK);
    return true;
  } catch (error) {
    console.error(`Directory ${path.dirname(dbPath)} is not writable:`, error);
    return false;
  }
}

async function migrateData() {
  const DB_PATH =
    process.env.SQLITE_DB_PATH ||
    (process.env.NODE_ENV === "production"
      ? "/mnt/ebs-volume/pants.db"
      : path.join(process.cwd(), "pants.db"));

  // Run safety checks
  if (!checkDiskSpace(DB_PATH)) {
    console.error("Migration aborted due to insufficient disk space");
    process.exit(1);
  }

  if (!checkDirectoryWritable(DB_PATH)) {
    console.error("Migration aborted due to permission issues");
    process.exit(1);
  }

  try {
    console.log("Starting migration from Supabase to SQLite...");
    console.log(`Database will be created at: ${DB_PATH}`);

    // Fetch all pants from Supabase
    const { data, error } = await supabase
      .from("pants")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      console.log("No data found in Supabase to migrate");
      process.exit(0);
    }

    console.log(`Found ${data.length} records to migrate`);

    // Insert into SQLite
    insertPants(
      data.map((pant) => ({
        name: pant.name,
        price: pant.price,
        image_url: pant.image_url,
        description: pant.description,
        sizes: pant.sizes,
        stock: pant.stock,
        category: pant.category,
      }))
    );

    console.log(`Successfully migrated ${data.length} pants to SQLite`);
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

// Run migration
migrateData();
