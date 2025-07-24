#!/usr/bin/env python3
"""
Find Gemini's chat limit - could be massive given 2M token context
"""

import os

def create_gemini_test_files():
    """Create test files to find Gemini's chat limit"""
    
    os.makedirs("gemini_chat_tests", exist_ok=True)
    
    base_text = """Künstliche Intelligenz revolutioniert unsere moderne Welt auf vielfältige Weise. Machine Learning algorithms process vast amounts of data to identify patterns and make predictions. Die Entwicklung von Large Language Models hat neue Möglichkeiten in der Textverarbeitung eröffnet. Natural language processing enables computers to understand and generate human language effectively. Deep Learning Algorithmen nutzen neuronale Netzwerke mit mehreren Schichten für komplexe Mustererkennungsaufgaben. Transformer-Architekturen haben das Deep Learning grundlegend verändert und ermöglichen es Modellen, komplexe Zusammenhänge in großen Datenmengen zu erkennen. The attention mechanism allows models to focus on relevant information across very long sequences. Reinforcement Learning ermöglicht es Systemen, durch Interaktion mit der Umgebung optimal zu lernen. """
    
    # Start with known working sizes and scale up
    # Gemini context: 2M tokens = ~8M chars theoretical
    test_sizes = [
        # Start conservative based on other models
        200000,   # 200K chars (~50K tokens) - conservative start
        400000,   # 400K chars (~100K tokens)
        600000,   # 600K chars (~150K tokens) - Claude's limit
        800000,   # 800K chars (~200K tokens)
        1000000,  # 1M chars (~250K tokens)
        1500000,  # 1.5M chars (~375K tokens)
        2000000,  # 2M chars (~500K tokens) 
        3000000,  # 3M chars (~750K tokens)
        4000000,  # 4M chars (~1M tokens)
        6000000,  # 6M chars (~1.5M tokens)
        8000000,  # 8M chars (~2M tokens) - theoretical context limit
    ]
    
    print("🚀 Creating Gemini chat limit test files...\n")
    print("📋 Gemini Specifications:")
    print("- Context Window: 2,000,000 tokens (~8M chars theoretical)")
    print("- Unknown chat interface limits")
    print("- Could be anywhere from 50K to 2M tokens!")
    print("- Testing range: 200K chars to 8M chars\n")
    
    for size in test_sizes:
        # Generate content
        repeat_count = (size // len(base_text)) + 1
        content = (base_text * repeat_count)[:size]
        
        filename = f"gemini_{size//1000}k_{size}.txt"
        filepath = os.path.join("gemini_chat_tests", filename)
        
        # Gemini uses ~4 chars per token (like GPT)
        tokens_approx = size / 4
        mb_size = size / (1024 * 1024)
        
        header = f"""# Gemini Chat Limit Test
# Size: {size:,} characters (~{tokens_approx:.0f} tokens, {mb_size:.1f}MB)
# Gemini tokenization: ~4 chars per token  
# Context window: 2M tokens
# Test this in Gemini to find chat limit

"""
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(header + content)
        
        actual_size = len(content) + len(header)
        tokens_gemini = actual_size / 4
        mb_actual = actual_size / (1024 * 1024)
        
        status = "🔥 MASSIVE" if tokens_gemini > 500000 else "📊 Large" if tokens_gemini > 100000 else "✅ Normal"
        print(f"✅ {filename}: {actual_size:,} chars (~{tokens_gemini:.0f} tokens, {mb_actual:.1f}MB) {status}")
    
    print(f"\n🎯 Testing Strategy:")
    print("1. Start with gemini_200k (conservative)")
    print("2. If that works easily, jump to gemini_1000k")
    print("3. If 1M works, try 2M, 4M, 8M progressively")
    print("4. Find where Gemini says 'input too long'")
    
    print(f"\n📊 Expected Results:")
    print("- Could be anywhere from ChatGPT-level (30K) to massive (1M+ tokens)")
    print("- Google might have different limits than OpenAI/Anthropic")
    print("- Might handle much larger inputs given 2M context")
    
    print(f"\n📝 Report back format:")
    print("'XYZ MB/tokens work, ABC MB/tokens fail' → exact Gemini limit!")

if __name__ == "__main__":
    create_gemini_test_files()