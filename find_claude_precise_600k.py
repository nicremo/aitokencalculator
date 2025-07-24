#!/usr/bin/env python3
"""
Find Claude's precise limit around 600K characters
"""

import os

def create_claude_precise_600k_tests():
    """Create files around 600K to find exact Claude limit"""
    
    os.makedirs("claude_precise_600k", exist_ok=True)
    
    # Use the same base text that worked in the first 600K file
    base_text = """Künstliche Intelligenz revolutioniert unsere moderne Welt auf vielfältige Weise. Machine Learning algorithms process vast amounts of data to identify patterns and make predictions. Die Entwicklung von Large Language Models hat neue Möglichkeiten in der Textverarbeitung eröffnet. Natural language processing enables computers to understand and generate human language effectively. Deep Learning Algorithmen nutzen neuronale Netzwerke mit mehreren Schichten für komplexe Mustererkennungsaufgaben. Transformer-Architekturen haben das Deep Learning grundlegend verändert. The attention mechanism allows models to focus on relevant information. Reinforcement Learning ermöglicht es Systemen, durch Interaktion zu lernen. """
    
    # Test around 600K in smaller steps
    test_sizes = [
        590000,  # -10K from known working
        595000,  # -5K
        600000,  # Known working size
        605000,  # +5K 
        610000,  # +10K
        615000,  # +15K
        620000,  # +20K
        625000,  # +25K
        630000,  # +30K
    ]
    
    print("🎯 Finding Claude's EXACT limit around 600K...\n")
    print("📋 Strategy:")
    print("- 600K chars worked in first script")
    print("- 600K chars failed in mega script") 
    print("- Testing precise range: 590K - 630K")
    print("- Same base text as working version\n")
    
    for size in test_sizes:
        # Use exact same approach as the working script
        repeat_count = (size // len(base_text)) + 1
        content = (base_text * repeat_count)[:size]
        
        filename = f"claude_precise_{size//1000}k_{size}.txt"
        filepath = os.path.join("claude_precise_600k", filename)
        
        tokens_approx = size / 3.8
        
        # Use same header format as working script
        header = f"""# Claude Exact Limit Test
# Size: {size:,} characters (~{tokens_approx:.0f} tokens)
# Claude tokenization: ~3.8 chars per token
# Test this in Claude.ai to find exact limit

"""
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(header + content)
        
        actual_size = len(content) + len(header)
        tokens_claude = actual_size / 3.8
        print(f"✅ {filename}: {actual_size:,} chars (~{tokens_claude:.0f} tokens)")
    
    print(f"\n🔍 Testing Instructions:")
    print("1. Try claude_precise_600k_600000.txt first (should work)")
    print("2. Then try 605K, 610K, 615K... until failure")
    print("3. Find exact boundary where Claude says 'too long'")
    
    print(f"\n📊 This will give us:")
    print("- Claude's EXACT character limit")
    print("- Precise token count for realChatLimit")
    print("- Understanding why mega script failed")

if __name__ == "__main__":
    create_claude_precise_600k_tests()