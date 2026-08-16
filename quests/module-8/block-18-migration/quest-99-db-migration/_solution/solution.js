/**
 * Quest 18.2: Database Migration Assistant — REFERENCE solution
 */

function generateMigration(changes) {
  const upLines = [];
  const downLines = [];

  for (const change of changes) {
    switch (change.type) {
      case 'add_column':
        upLines.push(`ALTER TABLE ${change.table} ADD COLUMN ${change.column} ${change.dataType || 'TEXT'};`);
        downLines.push(`ALTER TABLE ${change.table} DROP COLUMN ${change.column};`);
        break;
      case 'drop_column':
        upLines.push(`ALTER TABLE ${change.table} DROP COLUMN ${change.column};`);
        downLines.push(`ALTER TABLE ${change.table} ADD COLUMN ${change.column} TEXT;`);
        break;
      case 'rename_column':
        upLines.push(`ALTER TABLE ${change.table} RENAME COLUMN ${change.column} TO ${change.newColumn};`);
        downLines.push(`ALTER TABLE ${change.table} RENAME COLUMN ${change.newColumn} TO ${change.column};`);
        break;
      case 'add_table':
        upLines.push(`CREATE TABLE ${change.table} (${change.column || 'id'} SERIAL PRIMARY KEY);`);
        downLines.push(`DROP TABLE ${change.table};`);
        break;
    }
  }

  return {
    up: upLines.join('\n'),
    down: downLines.join('\n'),
  };
}

module.exports = { generateMigration };
