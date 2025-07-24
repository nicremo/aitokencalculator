#!/usr/bin/env python3
"""
Find exact Claude and Gemini chat limits
"""

import os

def create_claude_gemini_tests():
    """Create test files for Claude and Gemini limits"""
    
    # Create directories
    os.makedirs("claude_limit_tests", exist_ok=True)
    os.makedirs("gemini_limit_tests", exist_ok=True)
    
    base_text = """Künstliche Intelligenz revolutioniert unsere moderne Welt. Machine Learning algorithms process vast amounts of data to identify patterns. Die Entwicklung von Large Language Models hat neue Möglichkeiten eröffnet. Natural language processing enables computers to understand human language. Deep Learning nutzt neuronale Netzwerke mit mehreren Schichten für komplexe Aufgaben. """
    
    # Test sizes - broader range since we don't know their limits yet
    test_sizes = {
        'claude': [
            50000,   # 50K chars (~13K tokens)
            100000,  # 100K chars (~26K tokens) 
            150000,  # 150K chars (~39K tokens)
            200000,  # 200K chars (~53K tokens)
            300000,  # 300K chars (~79K tokens)
            400000,  # 400K chars (~105K tokens)
            500000,  # 500K chars (~132K tokens)
            600000,  # 600K chars (~158K tokens) - near Claude's 200K context
        ],
        'gemini': [
            50000,   # 50K chars
            100000,  # 100K chars
            200000,  # 200K chars
            400000,  # 400K chars  
            800000,  # 800K chars (~200K tokens)
            1200000, # 1.2M chars (~300K tokens)
            1600000, # 1.6M chars (~400K tokens)
            2000000, # 2M chars (~500K tokens)
        ]
    }
    
    print("🎯 Creating Claude and Gemini limit test files...\n")
    
    for platform, sizes in test_sizes.items():
        print(f"📝 Creating {platform.title()} test files:")
        
        for size in sizes:
            # Generate content
            repeat_count = (size // len(base_text)) + 1
            content = (base_text * repeat_count)[:size]
            
            filename = f"{platform}_{size//1000}k_{size}.txt"
            directory = f"{platform}_limit_tests"
            filepath = os.path.join(directory, filename)
            
            header = f"# {platform.title()} Limit Test\n# Size: {size:,} characters (~{size//4:,} tokens)\n# Test this in {platform.title()} to find limit\n\n"
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(header + content)
            
            actual_size = len(content) + len(header)
            tokens_approx = actual_size // 4
            print(f"  ✅ {filename}: {actual_size:,} chars (~{tokens_approx:,} tokens)")
        
        print()
    
    print("🔍 Testing Strategy:")
    print("\n📋 For Claude:")
    print("1. Start with claude_50k_50000.txt (should work)")
    print("2. Try progressively larger files")
    print("3. Expected limit: probably higher than ChatGPT (30K tokens)")
    print("4. Claude's context is 200K tokens, but chat limit likely much lower")
    
    print("\n📋 For Gemini:")
    print("1. Start with gemini_50k_50000.txt (should work)")
    print("2. Try progressively larger files") 
    print("3. Expected limit: unknown - could be very high or very low")
    print("4. Gemini's context is 2M tokens, but chat limit unknown")
    
    print("\n📊 Report back format:")
    print("- Claude: 'XYZk works, ABCk fails'")
    print("- Gemini: 'XYZk works, ABCk fails'")
    print("- Then we'll update realChatLimit values!")

if __name__ == "__main__":
    create_claude_gemini_tests()