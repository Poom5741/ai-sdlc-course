/**
 * Quest 26.2: REFERENCE solution (do NOT read during the exercise)
 *
 * Generates SQL migration files with data preservation.
 */

function generateMigration(action, table, changes) {
  const errors = [];

  if (!table || table.trim() === '') {
    errors.push('table name is required');
  }
  if (!['create', 'alter', 'drop'].includes(action)) {
    errors.push(`invalid action: ${action}`);
  }

  if (errors.length > 0) {
    return { up: '', down: '', isValid: false, errors };
  }

  let up = '';
  let down = '';

  switch (action) {
    case 'create': {
      const columns = changes.columns || [];
      up = `CREATE TABLE ${table} (\n  ${columns.join(',\n  ')}\n);`;
      down = `DROP TABLE IF EXISTS ${table};`;
      break;
    }

    case 'alter': {
      if (changes.add) {
        const adds = changes.add.map(col => `ADD COLUMN ${col}`).join(',\n  ');
        up = `ALTER TABLE ${table}\n  ${adds};`;
        // Down: drop the added columns
        const drops = changes.add.map(col => {
          const colName = col.split(' ')[0];
          return `DROP COLUMN ${colName}`;
        }).join(',\n  ');
        down = `ALTER TABLE ${table}\n  ${drops};`;
      }

      if (changes.drop) {
        // EDGE CASE: naive AI drops without preserving data
        // Create backup table first
        const dropCols = changes.drop.join(', ');
        up = `-- Preserve data before dropping columns\n` +
             `CREATE TABLE ${table}_backup AS SELECT * FROM ${table};\n` +
             `ALTER TABLE ${table} DROP COLUMN ${dropCols};`;
        // Down: restore from backup
        down = `-- Restore dropped columns from backup\n` +
               `INSERT INTO ${table} SELECT * FROM ${table}_backup;\n` +
               `DROP TABLE ${table}_backup;`;
      }
      break;
    }

    case 'drop': {
      up = `DROP TABLE IF EXISTS ${table};`;
      down = `-- WARNING: Cannot recover dropped table data\n` +
             `-- Ensure you have backups before running this migration`;
      break;
    }
  }

  return {
    up,
    down,
    isValid: true,
    errors: [],
  };
}

module.exports = { generateMigration };
