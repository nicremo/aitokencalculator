#!/usr/bin/env python3
"""
Generate progressively sized test files to find real chat limits
"""

import os

def create_progressive_test_files():
    """Create files of different sizes to test chat limits"""
    
    os.makedirs("chat_limit_tests", exist_ok=True)
    
    base_text = """Künstliche Intelligenz revolutioniert unsere Welt. Machine Learning algorithms process vast amounts of data to identify patterns and make predictions. Die Entwicklung von Large Language Models hat neue Möglichkeiten in der Textverarbeitung eröffnet. Natural language processing enables computers to understand and generate human language effectively. """
    
    # Test sizes (characters)
    test_sizes = [
        5000,    # ~1.25K tokens
        10000,   # ~2.5K tokens  
        20000,   # ~5K tokens
        40000,   # ~10K tokens
        80000,   # ~20K tokens
        160000,  # ~40K tokens
        320000,  # ~80K tokens (likely ChatGPT limit somewhere here)
    ]
    
    print("🔍 Creating progressive chat limit test files...\n")
    
    for size in test_sizes:
        # Repeat base text to reach target size
        repeat_count = (size // len(base_text)) + 1
        content = (base_text * repeat_count)[:size]
        
        filename = f"chat_test_{size//1000}k.txt"
        filepath = os.path.join("chat_limit_tests", filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(f"# Chat Limit Test - {size:,} characters (~{size//4:,} tokens)\n\n")
            f.write(content)
        
        actual_size = len(content) + len(f"# Chat Limit Test - {size:,} characters (~{size//4:,} tokens)\n\n")
        print(f"✅ {filename}: {actual_size:,} chars (~{actual_size//4:,} tokens)")
    
    print(f"\n📋 Test Instructions:")
    print("1. Start with chat_test_5k.txt - should work everywhere")
    print("2. Try progressively larger files until you get 'message too long'")
    print("3. The largest working file = real chat limit")
    print("4. Test in: ChatGPT, Claude, Gemini")

if __name__ == "__main__":
    create_progressive_test_files()