import { config } from "dotenv";
import path from "path";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
console.log("Loading environment variables from:", envPath);

// Check if .env.local exists
if (!fs.existsSync(envPath)) {
  console.error(`❌ Environment file not found: ${envPath}`);
  console.log(
    "Please create a .env.local file with your Supabase credentials:"
  );
  console.log("NEXT_PUBLIC_SUPABASE_URL=your_supabase_url");
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key");
  process.exit(1);
}

config({ path: envPath });

// Verify environment variables are set
if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  console.error("❌ Environment variables not found. Current env:", {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? "set"
      : "not set",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? "set"
      : "not set",
  });
  console.log("\nPlease check your .env.local file contains:");
  console.log("NEXT_PUBLIC_SUPABASE_URL=your_supabase_url");
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key");
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function exportSupabaseData() {
  try {
    console.log("🚀 Starting Supabase data export...");
    console.log(`📡 Connecting to: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);

    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), "supabase-export");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Step 1: Get table schema
    console.log("📋 Fetching table schema...");
    const { data: schemaData, error: schemaError } = await supabase.rpc(
      "get_table_schema",
      { table_name: "pants" }
    );

    if (schemaError) {
      console.log("ℹ️  RPC method not available, using fallback schema...");
      // Fallback: Create schema based on known structure
      const schemaSQL = `
-- Pants table schema
CREATE TABLE IF NOT EXISTS pants (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    description TEXT,
    sizes TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    stock INTEGER DEFAULT 0,
    category TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pants_category ON pants(category);
CREATE INDEX IF NOT EXISTS idx_pants_created_at ON pants(created_at);
CREATE INDEX IF NOT EXISTS idx_pants_price ON pants(price);

-- Enable Row Level Security (RLS)
ALTER TABLE pants ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON pants
    FOR SELECT USING (true);

-- Create policy for authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access" ON pants
    FOR ALL USING (auth.role() = 'authenticated');
`;

      fs.writeFileSync(path.join(outputDir, "schema.sql"), schemaSQL);
      console.log("✅ Schema exported to schema.sql");
    } else {
      // Use the actual schema from the database
      const schemaSQL = schemaData;
      fs.writeFileSync(path.join(outputDir, "schema.sql"), schemaSQL);
      console.log("✅ Schema exported to schema.sql");
    }

    // Step 2: Get all data from pants table
    console.log("📊 Fetching all pants data...");
    const { data: pantsData, error: dataError } = await supabase
      .from("pants")
      .select("*")
      .order("id", { ascending: true });

    if (dataError) {
      throw new Error(`Error fetching data: ${dataError.message}`);
    }

    if (!pantsData || pantsData.length === 0) {
      console.log("ℹ️  No data found in pants table");
      fs.writeFileSync(
        path.join(outputDir, "insert.sql"),
        "-- No data to insert"
      );
      return;
    }

    console.log(`📈 Found ${pantsData.length} records to export`);

    // Step 3: Generate INSERT statements
    console.log("🔄 Generating INSERT statements...");
    let insertSQL = "-- Pants data insert statements\n";
    insertSQL += "-- Generated on: " + new Date().toISOString() + "\n\n";

    // Add a transaction wrapper for better performance
    insertSQL += "BEGIN;\n\n";

    pantsData.forEach((pant, index) => {
      // Escape single quotes in text fields
      const escapedName = pant.name?.replace(/'/g, "''") || "";
      const escapedImageUrl = pant.image_url?.replace(/'/g, "''") || "";
      const escapedDescription = pant.description?.replace(/'/g, "''") || "";
      const escapedCategory = pant.category?.replace(/'/g, "''") || "";

      // Format sizes array properly for PostgreSQL
      const sizesArray = pant.sizes
        ? `ARRAY[${pant.sizes
            .map((size: string) => `'${size.replace(/'/g, "''")}'`)
            .join(", ")}]`
        : "NULL";

      insertSQL += `INSERT INTO pants (id, name, price, image_url, description, sizes, created_at, stock, category) VALUES (`;
      insertSQL += `${pant.id}, `;
      insertSQL += `'${escapedName}', `;
      insertSQL += `${pant.price}, `;
      insertSQL += pant.image_url ? `'${escapedImageUrl}'` : "NULL";
      insertSQL += `, `;
      insertSQL += pant.description ? `'${escapedDescription}'` : "NULL";
      insertSQL += `, `;
      insertSQL += `${sizesArray}, `;
      insertSQL += pant.created_at ? `'${pant.created_at}'` : "NOW()";
      insertSQL += `, `;
      insertSQL += `${pant.stock || 0}, `;
      insertSQL += pant.category ? `'${escapedCategory}'` : "NULL";
      insertSQL += `);\n`;

      // Add progress indicator for large datasets
      if ((index + 1) % 100 === 0) {
        console.log(`📝 Processed ${index + 1}/${pantsData.length} records...`);
      }
    });

    insertSQL += "\nCOMMIT;\n";

    // Write the insert SQL to file
    fs.writeFileSync(path.join(outputDir, "insert.sql"), insertSQL);
    console.log("✅ Data exported to insert.sql");

    // Step 4: Create a combined file for convenience
    const combinedSQL =
      fs.readFileSync(path.join(outputDir, "schema.sql"), "utf8") +
      "\n\n" +
      fs.readFileSync(path.join(outputDir, "insert.sql"), "utf8");
    fs.writeFileSync(
      path.join(outputDir, "complete-migration.sql"),
      combinedSQL
    );
    console.log("✅ Combined migration file created: complete-migration.sql");

    // Step 5: Create a summary report
    const summary = {
      exportDate: new Date().toISOString(),
      tableName: "pants",
      recordCount: pantsData.length,
      files: ["schema.sql", "insert.sql", "complete-migration.sql"],
      outputDirectory: outputDir,
      instructions: [
        "1. Run schema.sql first to create the table structure",
        "2. Run insert.sql to populate the data",
        "3. Or run complete-migration.sql to do both in one go",
      ],
    };

    fs.writeFileSync(
      path.join(outputDir, "export-summary.json"),
      JSON.stringify(summary, null, 2)
    );
    console.log("✅ Export summary created: export-summary.json");

    console.log("\n🎉 Export completed successfully!");
    console.log(`📁 Files saved in: ${outputDir}`);
    console.log(`📊 Total records exported: ${pantsData.length}`);
    console.log("\n📋 Next steps:");
    console.log(
      "1. Use these files to recreate your database in a new Supabase project"
    );
    console.log(
      "2. Update your environment variables with the new project details"
    );
    console.log("3. Test the migration in the new project before switching");
  } catch (error) {
    console.error("❌ Export failed:", error);
    process.exit(1);
  }
}

// Run the export
exportSupabaseData();
