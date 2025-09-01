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

# Test execution command helper
alias le='./show_test_commands.sh'

# Show welcome message
echo ""
echo "🎯 Welcome to OnPager Test Framework!"
echo "💡 Type 'ls' to see available test commands"
echo "🧪 Type 'le' to see test execution options"
echo "🚀 Use aliases like 'test-unit', 'test-all', etc. for quick access"
echo ""
