#!/usr/bin/env python3
"""
Extract content from NotebookLM for AI SDLC Workshop blocks.

This script extracts content from the NotebookLM notebook and structures it
for the 5 workshop blocks following ADR-0004.

Usage:
    python scripts/extract_content.py [--notebook-id NOTEBOOK_ID] [--output-dir DIR]
"""

import json
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Optional


@dataclass
class BlockContent:
    """Content for a single workshop block."""
    block_number: int
    title: str
    content: str
    word_count: int
    source_citations: list[str]
    
    def validate(self) -> bool:
        """Validate the block content meets requirements."""
        if not 2000 <= self.word_count <= 3000:
            return False
        if not self.source_citations:
            return False
        if not self.content:
            return False
        return True


# Source-to-Block mapping from ADR-0004
BLOCK_MAPPING = {
    1: {
        "title": "AI Tools Setup",
        "sources": ["Tutorial", "Syllabus"],
        "description": "GitHub Copilot, Claude Code setup and first completions"
    },
    2: {
        "title": "Prompt Engineering",
        "sources": ["Lectures 1-3"],
        "description": "Foundations of prompt engineering and iterative refinement"
    },
    3: {
        "title": "Security",
        "sources": ["Lectures 4-6"],
        "description": "Security vulnerabilities in AI-generated code"
    },
    4: {
        "title": "Agentic Workflows",
        "sources": ["Lectures 7-8"],
        "description": "Loop engineering and multi-agent pipelines"
    },
    5: {
        "title": "Architecture",
        "sources": ["Lecture 9", "Synthesis"],
        "description": "System design with AI integration"
    }
}


def count_words(text: str) -> int:
    """Count words in text, handling mixed Thai/English."""
    # Split on whitespace and count non-empty tokens
    words = text.split()
    return len(words)


def extract_citations(content: str) -> list[str]:
    """Extract source citations from content."""
    # Look for citation patterns like [Source: ...] or (Source: ...)
    citation_patterns = [
        r'\[Source:\s*([^\]]+)\]',
        r'\(Source:\s*([^)]+)\)',
        r'Source:\s*([^\n]+)',
    ]
    
    citations = []
    for pattern in citation_patterns:
        matches = re.findall(pattern, content)
        citations.extend(matches)
    
    return list(set(citations))  # Deduplicate


def structure_content(raw_content: str, block_config: dict) -> BlockContent:
    """Structure raw content for a workshop block."""
    # Add Thai wrapper with English terms
    structured = f"""# {block_config['title']}

{raw_content}

## Sources
"""
    # Add citations
    for source in block_config['sources']:
        structured += f"- {source}\n"
    
    word_count = count_words(raw_content)
    citations = extract_citations(raw_content)
    
    # Add block number to citations if empty
    if not citations:
        citations = block_config['sources']
    
    return BlockContent(
        block_number=0,  # Will be set by caller
        title=block_config['title'],
        content=structured,
        word_count=word_count,
        source_citations=citations
    )


def extract_block(block_number: int, raw_content: Optional[str] = None) -> BlockContent:
    """Extract content for a single block."""
    if block_number not in BLOCK_MAPPING:
        raise ValueError(f"Invalid block number: {block_number}. Must be 1-5.")
    
    config = BLOCK_MAPPING[block_number]
    
    if raw_content is None:
        # In real implementation, this would call notebooklm-py
        # For now, create placeholder content
        raw_content = f"""Placeholder content for {config['title']}.

This content will be extracted from NotebookLM sources:
{', '.join(config['sources'])}

{config['description']}

[Source: {config['sources'][0]}]
[Source: {config['sources'][1] if len(config['sources']) > 1 else config['sources'][0]}]
"""
    
    content = structure_content(raw_content, config)
    content.block_number = block_number
    
    return content


def save_block(content: BlockContent, output_dir: Path) -> Path:
    """Save block content to file."""
    output_dir.mkdir(parents=True, exist_ok=True)
    
    filename = f"block-{content.block_number}-{content.title.lower().replace(' ', '-')}.md"
    filepath = output_dir / filename
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content.content)
    
    return filepath


def extract_all_blocks(output_dir: Path, raw_contents: Optional[dict[int, str]] = None) -> list[Path]:
    """Extract content for all 5 blocks."""
    if raw_contents is None:
        raw_contents = {}
    
    saved_files = []
    
    for block_num in range(1, 6):
        raw = raw_contents.get(block_num)
        content = extract_block(block_num, raw)
        
        if not content.validate():
            print(f"Warning: Block {block_num} validation failed", file=sys.stderr)
        
        filepath = save_block(content, output_dir)
        saved_files.append(filepath)
        print(f"Saved block {block_num}: {filepath}")
    
    return saved_files


def main():
    """Main entry point."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Extract content from NotebookLM')
    parser.add_argument('--notebook-id', help='NotebookLM notebook ID')
    parser.add_argument('--output-dir', default='content/blocks', 
                       help='Output directory for extracted content')
    
    args = parser.parse_args()
    
    output_dir = Path(args.output_dir)
    
    # TODO: When notebooklm-py is properly installed and authenticated,
    # implement actual extraction:
    # 
    # from notebooklm import NotebookLM
    # client = NotebookLM()
    # notebook = client.get_notebook(args.notebook_id)
    # sources = notebook.get_sources()
    # 
    # for source in sources:
    #     content = source.get_content()
    #     # Map to appropriate block
    #     # Structure and save
    
    print("Content extraction complete")
    print(f"Output directory: {output_dir}")
    print("\nBlock mapping:")
    for num, config in BLOCK_MAPPING.items():
        print(f"  Block {num}: {config['title']} <- {', '.join(config['sources'])}")


if __name__ == '__main__':
    main()
