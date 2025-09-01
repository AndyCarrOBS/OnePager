# 🎯 OnPager Test Framework - Shell Setup

This document explains how to set up your shell environment to automatically show test framework options when you run `ls` in the testframework directory.

## 🚀 Quick Setup

### Option 1: Automatic Setup (Recommended)
```bash
cd testframework
./setup_shell.sh
source ~/.bashrc
```

### Option 2: Manual Setup
```bash
cd testframework
source .bashrc
```

## ✨ What This Gives You

### 🔍 Enhanced `ls` Command
When you run `ls` in the testframework directory, you'll see:
- Available test commands and options
- Directory structure explanation
- Quick examples and tips
- Actual directory contents

### 🚀 Convenient Aliases
- `test-unit` → `python run_tests.py --unit`
- `test-integration` → `python run_tests.py --integration`
- `test-regression` → `python run_tests.py --regression`
- `test-robot` → `python run_tests.py --robot`
- `test-all` → `python run_tests.py --all`
- `test-parallel` → `python run_tests.py --parallel`
- `test-list` → `python run_tests.py --list`
- `test-features` → `python run_tests.py --features`

## 📁 Files Created

- `show_options.sh` - Script that displays test framework options
- `.bashrc` - Local shell configuration for the testframework directory
- `setup_shell.sh` - Automated setup script

## 🔧 How It Works

1. **Shell Override**: The `ls` command is aliased to show test framework options
2. **Local Configuration**: A `.bashrc` file in the testframework directory provides local aliases
3. **Global Integration**: Your main `.bashrc` sources the local configuration when you're in the testframework directory

## 💡 Usage Examples

```bash
# Navigate to testframework directory
cd /path/to/testframework

# Run ls to see test framework options
ls

# Use convenient aliases
test-unit
test-all --parallel
test-list

# Regular ls still works with arguments
ls -la
ls reports/
```

## 🚨 Troubleshooting

### If `ls` doesn't show options:
```bash
source .bashrc
```

### If aliases don't work:
```bash
source ~/.bashrc
```

### To disable the override temporarily:
```bash
/bin/ls
```

### To remove the configuration:
```bash
# Remove the source line from ~/.bashrc
# Delete the .bashrc file in testframework directory
```

## 🎉 Benefits

- **Always know what commands are available** when working in the testframework
- **Quick access** to common test commands via aliases
- **No need to remember** complex command syntax
- **Professional development experience** with helpful command prompts
- **Easy onboarding** for new team members

## 🔄 Updating

If you add new test commands or options, update the `show_options.sh` script to reflect the changes.

---

**Happy Testing! 🎯**
