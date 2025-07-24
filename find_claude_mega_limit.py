#!/usr/bin/env python3
"""
Find Claude's massive chat limit - testing beyond 600K characters
"""

import os

def create_claude_mega_tests():
    """Create very large files to find Claude's actual limit"""
    
    os.makedirs("claude_mega_limit", exist_ok=True)
    
    base_text = """Künstliche Intelligenz revolutioniert unsere moderne Welt auf vielfältige Weise. Machine Learning algorithms process vast amounts of data to identify patterns and make predictions. Die Entwicklung von Large Language Models hat neue Möglichkeiten in der Textverarbeitung eröffnet. Natural language processing enables computers to understand and generate human language effectively. Deep Learning Algorithmen nutzen neuronale Netzwerke mit mehreren Schichten für komplexe Mustererkennungsaufgaben. Transformer-Architekturen haben das Deep Learning grundlegend verändert und ermöglichen es Modellen, komplexe Zusammenhänge zu verstehen. The attention mechanism allows models to focus on relevant information across long sequences. Reinforcement Learning ermöglicht es Systemen, durch Interaktion mit der Umgebung zu lernen und sich kontinuierlich zu verbessern. """
    
    # Much larger test sizes since Claude handled 600K easily
    test_sizes = [
        600000,   # Known to work
        700000,   # +100K (~184K tokens)
        800000,   # +100K (~211K tokens) - exceeds Claude's 200K context!
        900000,   # +100K (~237K tokens)
        1000000,  # 1M chars (~263K tokens)
        1200000,  # 1.2M chars (~316K tokens)
        1500000,  # 1.5M chars (~395K tokens)
        2000000,  # 2M chars (~526K tokens)
        2500000,  # 2.5M chars (~658K tokens)
        3000000,  # 3M chars (~789K tokens)
    ]
    
    print("🚀 Creating Claude MEGA limit test files...\n")
    print("📋 Claude is a BEAST!")
    print("- ChatGPT limit: 30K tokens (120K chars)")
    print("- Claude handled: 158K tokens (600K chars) - 5x higher!")
    print("- Testing up to 3M chars (~789K tokens)")
    print("- Claude's theoretical context: 200K tokens")
    print("- But chat limit might be much higher!\n")
    
    for size in test_sizes:
        # Repeat base text to reach target size
        repeat_count = (size // len(base_text)) + 1
        content = (base_text * repeat_count)[:size]
        
        filename = f"claude_mega_{size//1000}k_{size}.txt"
        filepath = os.path.join("claude_mega_limit", filename)
        
        # Calculate approximate tokens using Claude's 3.8 chars per token
        tokens_approx = size / 3.8
        
        header = f"""# Claude MEGA Limit Test
# Size: {size:,} characters (~{tokens_approx:.0f} tokens)
# Claude tokenization: ~3.8 chars per token
# This is MASSIVE - way beyond most other AI limits!

"""
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(header + content)
        
        actual_size = len(content) + len(header)
        tokens_claude = actual_size / 3.8
        mb_size = actual_size / (1024 * 1024)
        
        status = "🔥 MEGA" if tokens_claude > 200000 else "📊 Large"
        print(f"✅ {filename}: {actual_size:,} chars (~{tokens_claude:.0f} tokens, {mb_size:.1f}MB) {status}")
    
    print(f"\n🎯 Testing Instructions:")
    print("WARNING: These files are HUGE!")
    print("1. Start with claude_mega_600k (we know this works)")
    print("2. Try 700k, 800k, 900k, 1M...")
    print("3. Files >800k exceed Claude's theoretical 200K context!")
    print("4. This will reveal if Claude's chat limit > context window")
    
    print(f"\n📊 Expected discovery:")
    print("- We might find Claude's chat limit is HIGHER than context window")
    print("- Or there's a file size limit instead of token limit")
    print("- This could be groundbreaking data!")
    
    print(f"\n📝 Report back:")
    print("'XMB file works, YMB file fails' - we'll find the TRUE limit!")

if __name__ == "__main__":
    create_claude_mega_tests()