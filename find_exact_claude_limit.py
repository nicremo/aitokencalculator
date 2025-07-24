#!/usr/bin/env python3
"""
Find exact Claude chat limit starting from 160K characters in 10K steps
"""

import os

def create_precise_claude_tests():
    """Create files with 10K increments starting from 160K to find exact Claude limit"""
    
    os.makedirs("claude_exact_limit", exist_ok=True)
    
    base_text = """Künstliche Intelligenz revolutioniert unsere moderne Welt auf vielfältige Weise. Machine Learning algorithms process vast amounts of data to identify patterns and make predictions. Die Entwicklung von Large Language Models hat neue Möglichkeiten in der Textverarbeitung eröffnet. Natural language processing enables computers to understand and generate human language effectively. Deep Learning Algorithmen nutzen neuronale Netzwerke mit mehreren Schichten für komplexe Mustererkennungsaufgaben. Transformer-Architekturen haben das Deep Learning grundlegend verändert. The attention mechanism allows models to focus on relevant information. Reinforcement Learning ermöglicht es Systemen, durch Interaktion zu lernen. """
    
    # Test sizes starting from 160K in 10K increments
    # Claude has 200K token context (~760K chars theoretical), but chat limit likely much lower
    test_sizes = [
        160000,  # Known to work (tested)
        170000,  # +10K
        180000,  # +10K
        190000,  # +10K
        200000,  # +10K
        210000,  # +10K
        220000,  # +10K
        230000,  # +10K
        240000,  # +10K
        250000,  # +10K
        260000,  # +10K
        270000,  # +10K
        280000,  # +10K
        290000,  # +10K
        300000,  # +10K (~79K tokens)
        320000,  # +20K
        340000,  # +20K
        360000,  # +20K
        380000,  # +20K (~100K tokens)
        400000,  # +20K (~105K tokens)
        450000,  # +50K (~118K tokens)
        500000,  # +50K (~132K tokens)
        600000,  # +100K (~158K tokens) - approaching Claude's theoretical limit
    ]
    
    print("🎯 Creating precise Claude limit test files...\n")
    print("📋 Test Strategy:")
    print("1. Claude accepted 160K chars (~42K tokens)")
    print("2. Test progressively larger files in 10K increments")
    print("3. Claude's context window: 200K tokens (~760K chars)")
    print("4. Expected chat limit: much lower than context window\n")
    
    for size in test_sizes:
        # Repeat base text to reach target size
        repeat_count = (size // len(base_text)) + 1
        content = (base_text * repeat_count)[:size]
        
        filename = f"claude_{size//1000}k_{size}.txt"
        filepath = os.path.join("claude_exact_limit", filename)
        
        # Calculate approximate tokens using Claude's 3.8 chars per token
        tokens_approx = size // 3.8  # More accurate for Claude
        
        header = f"""# Claude Exact Limit Test
# Size: {size:,} characters (~{tokens_approx:.0f} tokens)
# Claude tokenization: ~3.8 chars per token
# Test this in Claude.ai to find exact limit

"""
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(header + content)
        
        actual_size = len(content) + len(header)
        tokens_claude = actual_size / 3.8  # Claude-specific calculation
        print(f"✅ {filename}: {actual_size:,} chars (~{tokens_claude:.0f} Claude-tokens)")
    
    print(f"\n🔍 Testing Instructions:")
    print("Copy-paste each file content into Claude.ai in this order:")
    print("160k → 170k → 180k → 190k → 200k → 210k → ... → 600k")
    print("\n📊 Expected results:")
    print("- Start with 160k (we know this works)")
    print("- Find the EXACT size where Claude says message too long")
    print("- Claude likely higher limit than ChatGPT (30K tokens)")
    print("- But still much lower than 200K context window")
    print("\n📋 Report back format:")
    print("'XYZk works, ABCk fails' → we'll update Claude's realChatLimit!")

if __name__ == "__main__":
    create_precise_claude_tests()