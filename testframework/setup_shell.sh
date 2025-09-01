#!/bin/bash

# OnPager Test Framework Shell Setup
# This script configures your shell to show test framework options

echo "🎯 Setting up OnPager Test Framework shell environment..."

# Get the current directory
CURRENT_DIR=$(pwd)
BASH_PROFILE="$HOME/.bashrc"

# Check if we're in the testframework directory
if [[ ! -f "run_tests.py" ]]; then
    echo "❌ Error: Please run this script from the testframework directory"
    exit 1
fi

# Create the .bashrc file in the testframework directory
cat > .bashrc << 'EOF'
# OnPager Test Framework .bashrc
# This file customizes the shell environment for the test framework

# Function to show test framework options
show_test_options() {
    if [ -f "./show_options.sh" ]; then
        ./show_options.sh
    else
        # Fallback to regular ls if script not found
        /bin/ls "$@"
    fi
}

# Override ls command to show test framework options
alias ls='show_test_options'

# Additional helpful aliases for the test framework
alias test-unit='python run_tests.py --unit'
alias test-integration='python run_tests.py --integration'
alias test-regression='python run_tests.py --regression'
alias test-robot='python run_tests.py --robot'
alias test-all='python run_tests.py --all'
alias test-parallel='python run_tests.py --parallel'
alias test-list='python run_tests.py --list'
alias test-features='python run_tests.py --features'

# Show welcome message
echo ""
echo "🎯 Welcome to OnPager Test Framework!"
echo "💡 Type 'ls' to see available test commands"
echo "🚀 Use aliases like 'test-unit', 'test-all', etc. for quick access"
echo ""
EOF

# Add source command to user's .bashrc if not already there
if ! grep -q "source.*testframework.*bashrc" "$BASH_PROFILE"; then
    echo "" >> "$BASH_PROFILE"
    echo "# OnPager Test Framework Configuration" >> "$BASH_PROFILE"
    echo "if [ -f \"$CURRENT_DIR/.bashrc\" ]; then" >> "$BASH_PROFILE"
    echo "    source \"$CURRENT_DIR/.bashrc\"" >> "$BASH_PROFILE"
    echo "fi" >> "$BASH_PROFILE"
    echo "Configuration added to $BASH_PROFILE"
else
    echo "Configuration already exists in $BASH_PROFILE"
fi

# Make scripts executable
chmod +x show_options.sh
chmod +x setup_shell.sh

echo ""
echo "✅ Setup complete! Here's what was configured:"
echo "  📁 Created .bashrc in testframework directory"
echo "  🔧 Added source command to your main .bashrc"
echo "  🚀 Created convenient aliases for test commands"
echo "  💡 'ls' command now shows test framework options"
echo ""
echo "🔄 To activate the new configuration:"
echo "  source ~/.bashrc"
echo "  # OR restart your terminal"
echo ""
echo "🎯 Available aliases:"
echo "  test-unit, test-integration, test-regression, test-robot"
echo "  test-all, test-parallel, test-list, test-features"
echo ""
echo "💡 Try typing 'ls' to see the test framework options!"
