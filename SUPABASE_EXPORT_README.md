# Supabase Data Export Guide

This guide explains how to export your Supabase database schema and data for migration to a new region.

## Quick Start

Run the export script to extract your pants table data:

```bash
npm run export-supabase
```

## What the Script Does

The export script will:

1. **Extract Schema**: Generate a `schema.sql` file with the table structure, indexes, and RLS policies
2. **Extract Data**: Generate an `insert.sql` file with all the data from your pants table
3. **Create Combined File**: Generate a `complete-migration.sql` file that includes both schema and data
4. **Generate Summary**: Create an `export-summary.json` file with export details

## Generated Files

After running the script, you'll find these files in the `supabase-export/` directory:

- `schema.sql` - Table structure, indexes, and policies
- `insert.sql` - All data from the pants table
- `complete-migration.sql` - Combined schema and data
- `export-summary.json` - Export metadata and instructions

## Using the Exported Files

### Option 1: Use the Combined File (Recommended)

1. Go to your new Supabase project
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `complete-migration.sql`
4. Run the script

### Option 2: Use Separate Files

1. First run `schema.sql` to create the table structure
2. Then run `insert.sql` to populate the data

## Migration Steps

1. **Create New Project**:

   - Go to [supabase.com](https://supabase.com)
   - Create a new project in your desired region
   - Note the new project URL and anon key

2. **Export Current Data**:

   ```bash
   npm run export-supabase
   ```

3. **Import to New Project**:

   - Go to your new project's SQL Editor
   - Run the `complete-migration.sql` file

4. **Update Environment Variables**:

   ```bash
   # Update your .env.local file
   NEXT_PUBLIC_SUPABASE_URL=https://your-new-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-new-anon-key
   ```

5. **Test the Migration**:
   - Run your application locally
   - Verify all data is accessible
   - Test all functionality

## Troubleshooting

### Common Issues

**"Environment variables not found"**

- Make sure your `.env.local` file exists and contains the correct Supabase credentials
- Verify the file is in the project root directory

**"No data found in pants table"**

- This means your pants table is empty
- The script will still create the schema files

**Large datasets take time**

- The script shows progress every 100 records
- For very large datasets, consider running during off-peak hours

### Data Validation

After migration, verify your data:

```sql
-- Check record count
SELECT COUNT(*) FROM pants;

-- Check sample data
SELECT * FROM pants LIMIT 5;

-- Verify categories
SELECT DISTINCT category FROM pants;
```

## File Structure

```
supabase-export/
├── schema.sql              # Table structure and policies
├── insert.sql              # Data insert statements
├── complete-migration.sql  # Combined schema + data
└── export-summary.json     # Export metadata
```

## Security Notes

- The exported files contain your actual data
- Keep them secure and don't commit them to version control
- Consider deleting the export directory after successful migration
- The script includes proper SQL escaping for special characters

## Support

If you encounter issues:

1. Check the console output for error messages
2. Verify your Supabase credentials are correct
3. Ensure you have read access to the pants table
4. Check that your `.env.local` file is properly configured
