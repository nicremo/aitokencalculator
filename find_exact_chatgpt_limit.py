#!/usr/bin/env python3
"""
Find exact ChatGPT chat limit with fine-grained testing between 80K-160K characters
"""

import os

def create_precise_chatgpt_tests():
    """Create files with precise increments to find exact ChatGPT limit"""
    
    os.makedirs("chatgpt_exact_limit", exist_ok=True)
    
    base_text = """Künstliche Intelligenz revolutioniert unsere moderne Welt auf vielfältige Weise. Machine Learning algorithms process vast amounts of data to identify patterns and make predictions. Die Entwicklung von Large Language Models hat neue Möglichkeiten in der Textverarbeitung eröffnet. Natural language processing enables computers to understand and generate human language effectively. Deep Learning Algorithmen nutzen neuronale Netzwerke mit mehreren Schichten. Transformer-Architekturen haben das Deep Learning grundlegend verändert. The attention mechanism allows models to focus on relevant information. """
    
    # Fine-grained test sizes between 80K-160K characters
    test_sizes = [
        80000,   # Known to work
        90000,   # +10K
        100000,  # +10K
        110000,  # +10K
        120000,  # +10K
        130000,  # +10K
        140000,  # +10K
        150000,  # +10K
        160000,  # Known to fail
        # Even finer if needed
        85000,   # Between 80-90K
        95000,   # Between 90-100K
        105000,  # Between 100-110K
        115000,  # Between 110-120K
        125000,  # Between 120-130K
        135000,  # Between 130-140K
        145000,  # Between 140-150K
        155000,  # Between 150-160K
    ]
    
    # Sort sizes for easier testing
    test_sizes.sort()
    
    print("🎯 Creating precise ChatGPT limit test files...\n")
    print("📋 Test Strategy:")
    print("1. Start with 80K (known working)")
    print("2. Try each size until you get 'message too long'")
    print("3. The last working size = exact ChatGPT limit\n")
    
    for size in test_sizes:
        # Repeat base text to reach target size
        repeat_count = (size // len(base_text)) + 1
        content = (base_text * repeat_count)[:size]
        
        filename = f"chatgpt_{size//1000}k_{size}.txt"
        filepath = os.path.join("chatgpt_exact_limit", filename)
        
        header = f"# ChatGPT Exact Limit Test\n# Size: {size:,} characters (~{size//4:,} tokens)\n# Test this in ChatGPT to find exact limit\n\n"
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(header + content)
        
        actual_size = len(content) + len(header)
        tokens_approx = actual_size // 4
        print(f"✅ {filename}: {actual_size:,} chars (~{tokens_approx:,} tokens)")
    
    print(f"\n🔍 Testing Instructions:")
    print("Copy-paste each file content into ChatGPT in this order:")
    print("80k → 85k → 90k → 95k → 100k → 105k → 110k → 115k → 120k → 125k → 130k → 135k → 140k → 145k → 150k → 155k → 160k")
    print("\n📊 Expected result:")
    print("- Find the EXACT size where ChatGPT says 'message too long'")
    print("- Previous size = maximum ChatGPT input limit")
    print("- Report back: 'XYZk works, ABC k fails' → exact limit found!")

if __name__ == "__main__":
    create_precise_chatgpt_tests()