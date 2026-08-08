# AI SDLC Course Outline
## หลักสูตรการพัฒนาซอฟต์แวร์ด้วย AI และเทคโนโลยี LLM สมัยใหม่

---

## 📋 Course Overview

**Course Title:** AI-Powered Software Development Lifecycle (AI SDLC)
**Source Material:** NotebookLM notebook with Stanford CME295 lectures, AI-Assisted Coding tutorials, and Agent-Assisted SE syllabus
**Target Audience:** 
- Non-technical beginners who want to build software with AI
- Senior engineers integrating agentic workflows into enterprise codebases

---

## 🎯 Learning Objectives

เมื่อเรียนจบหลักสูตรนี้ ผู้เรียนจะสามารถ:
1. เข้าใจสถาปัตยกรรม Transformer และ LLM อย่างลึกซึ้ง
2. ประยุกต์ใช้ AI tools ในทุกขั้นตอนของ SDLC
3. ออกแบบและสร้าง AI-powered applications ด้วย vibe engineering
4. ทดสอบและรับรองคุณภาพโค้ดที่สร้างด้วย AI
5. จัดการความปลอดภัยและ governance ใน AI-assisted development

---

## 📚 Course Structure

### **Module 1: Foundations of AI & LLM Technology**
**Duration:** 2 weeks

#### Week 1: Introduction to AI-Assisted Development
- **1.1** What is AI-Assisted Coding?
  - Tokens, Context Windows, Hallucinations
  - The shift from manual coding to intent-driven development
  - "Vibe Coding" vs "Vibe Engineering" (Andrej Karpathy concept)
  
- **1.2** Overview of AI Coding Tools
  - IDE-based: GitHub Copilot, Cursor, Windsurf
  - CLI-based: Claude Code, Gemini CLI, Aider
  - Code Review: CodeRabbit
  - Autonomous Agents: OpenClaw, Replit Agent

- **1.3** Setting Up Your AI Development Environment
  - VS Code + GitHub Copilot setup
  - CLI tools installation and authentication
  - Choosing the right tool for your workflow

#### Week 2: Understanding LLM Fundamentals
- **2.1** Transformer Architecture Deep Dive
  - Self-Attention mechanism
  - Query, Key, Value matrices
  - Why Transformers replaced RNNs/LSTMs

- **2.2** Position Encoding & Optimization
  - Absolute vs Rotary Position Embeddings (RoPE)
  - RMS Norm vs Layer Norm
  - KV Cache, MQA, GQA optimizations

- **2.3** Model Architectures
  - Encoder-only (BERT) for classification
  - Encoder-Decoder (T5) for translation
  - Decoder-only (GPT, Llama, Claude) for generation

---

### **Module 2: LLM Training & Capabilities**
**Duration:** 2 weeks

#### Week 3: How LLMs Are Trained
- **3.1** Pre-training Process
  - Next token prediction
  - Scaling Laws (Chinchilla)
  - Data curation and quality

- **3.2** Fine-tuning & Alignment
  - Supervised Fine-Tuning (SFT)
  - RLHF (Reinforcement Learning from Human Feedback)
  - DPO (Direct Preference Optimization)

- **3.3** Mixture of Experts (MoE)
  - Sparse MoE architecture
  - Efficiency gains and cost optimization

#### Week 4: Advanced LLM Capabilities
- **4.1** Decoding & Sampling Strategies
  - Greedy, Beam Search
  - Top-K, Top-P sampling
  - Temperature control

- **4.2** Reasoning & Chain of Thought
  - CoT prompting techniques
  - GRPO and reasoning models (DeepSeek R1)

- **4.3** Retrieval-Augmented Generation (RAG)
  - Document chunking strategies
  - Semantic search and reranking
  - Preventing hallucinations

---

### **Module 3: AI Tools for Each SDLC Phase**
**Duration:** 3 weeks

#### Week 5: Planning & Requirements with AI
- **5.1** AI-Powered Requirements Gathering
  - Using LLMs for user story generation
  - Automated stakeholder analysis
  - Context engineering for requirements

- **5.2** Architecture Design with AI
  - System design assistance
  - Technology stack recommendations
  - Architecture decision records (ADRs)

- **5.3** Project Planning & Estimation
  - AI-assisted task breakdown
  - Sprint planning with AI insights
  - Risk identification and mitigation

#### Week 6: Development with AI
- **6.1** Code Generation Best Practices
  - Prompt engineering for code
  - Iterative refinement techniques
  - Managing context windows effectively

- **6.2** Tool Calling & Agents
  - Function calling mechanics
  - MCP (Model Context Protocol)
  - ReAct pattern for agentic workflows

- **6.3** Multi-Agent Development
  - Subagent delegation
  - Background agent workflows
  - Context preservation strategies

#### Week 7: Testing with AI
- **7.1** Agentic Test-Driven Development
  - Intent specifications for tests
  - Automated test generation
  - Test verification and validation

- **7.2** AI-Powered Quality Assurance
  - CodeRabbit for automated PR reviews
  - Security vulnerability detection
  - Code quality metrics

- **7.3** Continuous Testing Pipelines
  - AI-integrated CI/CD
  - Automated regression testing
  - Performance testing with AI

---

### **Module 4: Advanced AI SDLC Practices**
**Duration:** 2 weeks

#### Week 8: Security & Governance
- **8.1** Security in AI-Assisted Development
  - Common vulnerabilities in AI-generated code
  - SQL injection, hardcoded secrets prevention
  - Input validation and authentication

- **8.2** Code Review & Compliance
  - AI code review workflows
  - Compliance checking automation
  - Audit trails and documentation

- **8.3** Governance Frameworks
  - AI usage policies
  - Intellectual property considerations
  - Ethical AI development guidelines

#### Week 9: Deployment & Operations
- **9.1** AI-Assisted DevOps
  - Infrastructure as Code with AI
  - Deployment automation
  - Monitoring and observability

- **9.2** Production AI Systems
  - LLM evaluation and benchmarking
  - LLM as a Judge for quality assessment
  - Position bias and verbosity bias mitigation

- **9.3** Scaling AI Development
  - Cost optimization strategies
  - Performance tuning
  - Team collaboration patterns

---

### **Module 5: Future Trends & Capstone**
**Duration:** 1 week

#### Week 10: Emerging Technologies & Capstone
- **10.1** Future Trends
  - Vision Transformers (ViT) for multimodal
  - Diffusion-based LLMs
  - New optimization techniques (Muon)

- **10.2** Capstone Project
  - Build a complete AI-powered application
  - Apply all learned concepts
  - Present and defend your solution

- **10.3** Course Review & Next Steps
  - Key takeaways
  - Continuous learning resources
  - Career pathways in AI-assisted development

---

## 🛠️ Hands-on Labs & Projects

### Lab 1: Environment Setup
- Install and configure AI coding tools
- Create first AI-assisted project
- Practice basic prompt engineering

### Lab 2: RAG Implementation
- Build a simple RAG system
- Test with different chunking strategies
- Evaluate retrieval quality

### Lab 3: Agent Development
- Create a tool-calling agent
- Implement ReAct pattern
- Build multi-step workflows

### Lab 4: Testing Pipeline
- Set up AI-integrated testing
- Create automated review workflows
- Implement security scanning

### Lab 5: Capstone Project
- Full-stack application development
- AI-assisted from requirements to deployment
- Documentation and presentation

---

## 📊 Assessment Methods

1. **Quizzes** (20%) - Weekly knowledge checks
2. **Lab Reports** (30%) - Hands-on exercise documentation
3. **Midterm Project** (20%) - AI-assisted feature development
4. **Capstone Project** (30%) - Complete application development

---

## 📖 Required Resources

### Primary Sources (from NotebookLM)
1. Stanford CME295 Lectures (9 sessions)
   - Lecture 1-3: Transformer fundamentals
   - Lecture 4-6: LLM training and optimization
   - Lecture 7-8: Agentic LLMs and evaluation
   - Lecture 9: Future trends

2. AI-Assisted Coding Tutorial
   - OpenClaw, GitHub Copilot, Claude Code
   - CodeRabbit, Gemini CLI

3. Agent-Assisted SE Syllabus
   - Dual-track pedagogy
   - Comprehensive module structure

### Supplementary Materials
- Official documentation for each AI tool
- Research papers referenced in lectures
- Industry case studies and best practices

---

## 🎓 Prerequisites

- Basic computer literacy
- Familiarity with software development concepts (helpful but not required)
- Willingness to learn and experiment with AI tools

---

## 📝 Course Schedule

| Week | Module | Topic | Deliverable |
|------|--------|-------|-------------|
| 1 | 1 | AI-Assisted Dev Intro | Lab 1 Setup |
| 2 | 1 | LLM Fundamentals | Quiz 1 |
| 3 | 2 | LLM Training | Quiz 2 |
| 4 | 2 | Advanced Capabilities | Lab 2 RAG |
| 5 | 3 | Planning & Requirements | Quiz 3 |
| 6 | 3 | Development with AI | Lab 3 Agent |
| 7 | 3 | Testing with AI | Midterm Project |
| 8 | 4 | Security & Governance | Quiz 4 |
| 9 | 4 | Deployment & Ops | Lab 4 Testing |
| 10 | 5 | Future & Capstone | Final Presentation |

---

## 🔄 Continuous Improvement

This course outline is designed to be iterative. Based on:
- Student feedback and performance
- Rapidly evolving AI technology
- Industry trends and requirements
- New research and best practices

Regular updates will ensure content remains relevant and practical.

---

*Last Updated: 2026-08-08*
*Source: NotebookLM - คู่มือการพัฒนาซอฟต์แวร์ด้วย AI และเทคโนโลยี LLM สมัยใหม่*
