import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

const OLLAMA_URL = process.env.OLLAMA_URL || 'https://ollama2.revolutionai.io';

export async function POST(request: NextRequest) {
  try {
    const { topic, tone, keyPoints } = await request.json();

    // Input validation
    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    if (topic.length < 3 || topic.length > 200) {
      return NextResponse.json({ error: 'Topic must be 3-200 characters' }, { status: 400 });
    }

    const toneMap: Record<string, string> = {
      professional: 'formal, business-focused, data-driven',
      casual: 'friendly, conversational, relatable',
      'thought-leader': 'bold, opinionated, visionary',
    };
    const toneGuide = toneMap[tone as string] || 'professional';

    const keyPointsText = Array.isArray(keyPoints) && keyPoints.length > 0
      ? `Key points: ${keyPoints.join(', ')}`
      : '';

    const prompt = `Generate 3 LinkedIn posts about: ${topic}

Tone: ${toneGuide}
${keyPointsText}

Each post must have a different hook:
1. Story hook (starts with personal anecdote like "Last week I...")
2. Question hook (starts with thought-provoking question)
3. Contrarian hook (challenges common belief like "Unpopular opinion:")

Keep each under 300 chars. End with engagement question or call-to-action.

Return JSON:
{"posts":[{"content":"...","hookType":"story","charCount":250},{"content":"...","hookType":"question","charCount":280},{"content":"...","hookType":"contrarian","charCount":260}],"hashtags":["#Tag1","#Tag2"]}`;

    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma3:4b',
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Ollama API error');
    }

    const data = await response.json();
    const responseText = data.response || '';

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const result = JSON.parse(jsonMatch[0]);
        if (result.posts?.length > 0) {
          result.posts = result.posts.map((p: any) => ({
            ...p,
            charCount: p.charCount || p.content?.length || 0,
          }));
          return NextResponse.json(result);
        }
      } catch (e) {}
    }

    // Fallback with good default posts
    return NextResponse.json({
      posts: [
        { 
          content: `Here's what I learned about ${topic}:\n\nThe biggest insight? It's simpler than most people think.\n\nWhat's been your experience? 👇`, 
          hookType: 'story', 
          charCount: 130 
        },
        { 
          content: `What if everything you knew about ${topic} was outdated?\n\nI used to believe the old way too.\n\nNow I see things differently. Curious what you think?`, 
          hookType: 'question', 
          charCount: 145 
        },
        { 
          content: `Unpopular opinion: Most advice about ${topic} is wrong.\n\nHere's what actually works.\n\nAgree or disagree? Drop your take below.`, 
          hookType: 'contrarian', 
          charCount: 135 
        },
      ],
      hashtags: ['#LinkedIn', '#ContentCreation', '#GrowthMindset'],
    });
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json({ error: 'Failed to generate posts' }, { status: 500 });
  }
}
