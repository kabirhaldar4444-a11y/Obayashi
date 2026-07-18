import os from 'os';
import path from 'path';
import fs from 'fs';

// Helper for bold and colored terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

console.log(`${colors.bright}${colors.cyan}===============================================`);
console.log(`    ANTIGRAVITY IDE - AGENT BRAIN MIGRATOR     `);
console.log(`===============================================${colors.reset}\n`);

const mode = process.argv[2];
if (mode !== '--export' && mode !== '--import') {
  console.log(`${colors.bright}Usage:${colors.reset}`);
  console.log(`  Export Brain:  npm run brain:export  (or: node scripts/migrate-brain.js --export)`);
  console.log(`  Import Brain:  npm run brain:import  (or: node scripts/migrate-brain.js --import)\n`);
  process.exit(1);
}

const homedir = os.homedir();
const projectDir = process.cwd();

// Define source and target folders
const paths = {
  config: {
    src: path.join(homedir, '.gemini', 'config'),
    dest: path.join(projectDir, 'agent-brain-backup', 'config')
  },
  knowledge: {
    src: path.join(homedir, '.gemini', 'antigravity-ide', 'knowledge'),
    dest: path.join(projectDir, 'agent-brain-backup', 'antigravity-ide', 'knowledge')
  },
  skills: {
    src: path.join(homedir, '.gemini', 'antigravity-ide', 'skills'),
    dest: path.join(projectDir, 'agent-brain-backup', 'antigravity-ide', 'skills')
  },
  mcpConfig: {
    src: path.join(homedir, '.gemini', 'antigravity-ide', 'mcp_config.json'),
    dest: path.join(projectDir, 'agent-brain-backup', 'antigravity-ide', 'mcp_config.json')
  }
};

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`  ${colors.yellow}⚠ Path does not exist, skipping: ${src}${colors.reset}`);
    return false;
  }

  try {
    // Create destination directory if it doesn't exist
    const parentDir = path.dirname(dest);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }

    // Using fs.cpSync for recursive folder copies (supported in Node 16.7.0+)
    fs.cpSync(src, dest, { recursive: true, force: true });
    console.log(`  ${colors.green}✔ Successfully copied:${colors.reset}\n    From: ${src}\n    To:   ${dest}`);
    return true;
  } catch (error) {
    console.error(`  ${colors.red}❌ Error copying from ${src} to ${dest}: ${error.message}${colors.reset}`);
    return false;
  }
}

if (mode === '--export') {
  console.log(`${colors.bright}Starting Export...${colors.reset}`);
  console.log(`Backing up agent files into workspace folder: ${colors.cyan}agent-brain-backup/${colors.reset}\n`);

  let successCount = 0;
  
  // 1. Export Global Config
  if (copyRecursive(paths.config.src, paths.config.dest)) successCount++;
  
  // 2. Export Knowledge Items
  if (copyRecursive(paths.knowledge.src, paths.knowledge.dest)) successCount++;
  
  // 3. Export Skills
  if (copyRecursive(paths.skills.src, paths.skills.dest)) successCount++;
  
  // 4. Export MCP Config
  if (copyRecursive(paths.mcpConfig.src, paths.mcpConfig.dest)) successCount++;

  console.log('\n-----------------------------------------------');
  if (successCount > 0) {
    console.log(`${colors.bright}${colors.green}🎉 Export completed successfully!${colors.reset}`);
    console.log(`You can now copy the ${colors.cyan}agent-brain-backup/${colors.reset} folder to your other computer/agent.`);
  } else {
    console.log(`${colors.bright}${colors.yellow}⚠ No files were backed up. Please check if your agent is configured.${colors.reset}`);
  }
} else if (mode === '--import') {
  console.log(`${colors.bright}Starting Import...${colors.reset}`);
  console.log(`Restoring agent files from workspace folder: ${colors.cyan}agent-brain-backup/${colors.reset}\n`);

  // Verify backup folder exists
  const backupFolder = path.join(projectDir, 'agent-brain-backup');
  if (!fs.existsSync(backupFolder)) {
    console.error(`${colors.bright}${colors.red}❌ Error: Backup directory "agent-brain-backup" not found!${colors.reset}`);
    console.error(`Please make sure the backup folder exists in your project workspace before running import.`);
    process.exit(1);
  }

  let successCount = 0;

  // 1. Import Global Config (dest to src in terms of export, so we reverse it: copy from backup dest to system src)
  if (copyRecursive(paths.config.dest, paths.config.src)) successCount++;
  
  // 2. Import Knowledge Items
  if (copyRecursive(paths.knowledge.dest, paths.knowledge.src)) successCount++;
  
  // 3. Import Skills
  if (copyRecursive(paths.skills.dest, paths.skills.src)) successCount++;
  
  // 4. Import MCP Config
  if (copyRecursive(paths.mcpConfig.dest, paths.mcpConfig.src)) successCount++;

  console.log('\n-----------------------------------------------');
  if (successCount > 0) {
    console.log(`${colors.bright}${colors.green}🎉 Import completed successfully!${colors.reset}`);
    console.log(`Please restart your IDE or Agent session to load the imported settings.`);
  } else {
    console.log(`${colors.bright}${colors.red}❌ Import failed. No configurations were restored.${colors.reset}`);
  }
}
