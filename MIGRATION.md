# Agent Brain Migration Guide

This project includes a built-in migration utility script to easily transfer your Gemini agent's "brain" (learned knowledge, custom skills, system configurations, and MCP configs) from one computer or IDE instance to another.

## Files Handled by Migration

The migrator backs up and restores the following locations:
1. **Global Configuration Root**: `~/.gemini/config/` (contains custom skills, rules, global settings)
2. **Agent Skills**: `~/.gemini/antigravity-ide/skills/`
3. **Agent Knowledge**: `~/.gemini/antigravity-ide/knowledge/` (learned facts, repository contexts)
4. **MCP Configuration**: `~/.gemini/antigravity-ide/mcp_config.json`

---

## How to Export (Back Up) Your Agent Brain

To export your current agent settings and learned history, run the following command in the project root:

```bash
npm run brain:export
```

This will:
1. Scan your local user profile for the Gemini directories.
2. Safely copy the directories into a workspace-local folder named `agent-brain-backup/` inside this project directory.
3. Print a log confirming which elements were backed up.

*Tip: You can now commit this `agent-brain-backup/` folder to git (if you want to share it across teams or sync it) or zip it and copy it directly to your new device.*

---

## How to Import (Restore) Your Agent Brain

To restore the backed-up brain on a new PC or another IDE agent instance:
1. Ensure the `agent-brain-backup/` folder is present in this project's root folder.
2. Run the following command in the project root:

```bash
npm run brain:import
```

This will:
1. Read the contents of the `agent-brain-backup/` folder in the project.
2. Restore them back into the active user's system paths (`~/.gemini/config` and `~/.gemini/antigravity-ide`).
3. Print a log confirming the restored elements.

**Important**: After running import, **restart your IDE or Agent session** so the settings take effect immediately!
