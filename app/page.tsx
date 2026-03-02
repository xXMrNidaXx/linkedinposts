'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [keyPoints, setKeyPoints] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [usage, setUsage] = useState({ count: 0, limit: 3 });

  const generate = async () => {
    if (!topic) {
      alert('Please enter a topic');
      return;
    }
    if (usage.count >= usage.limit) {
      alert('Daily limit reached! Upgrade to Pro for unlimited.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          tone,
          keyPoints: keyPoints.split(',').map(k => k.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setResult(data);
        setUsage(prev => ({ ...prev, count: prev.count + 1 }));
      }
    } catch (error) {
      alert('Error generating posts');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">📝 LinkedInPosts</h1>
        <span className="text-sky-300 text-sm">{usage.limit - usage.count}/3 free posts left</span>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-white mb-4">
          LinkedIn Posts That <span className="text-sky-400">Go Viral</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Generate 3 engagement-optimized posts in seconds. Story hooks, hot takes, thought-provoking questions.
        </p>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-left max-w-2xl mx-auto">
          <div className="mb-4">
            <label className="block text-white mb-2 font-medium">Topic *</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Remote work productivity, AI in hiring, Leadership lessons"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-sky-400 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2 font-medium">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-sky-400 focus:outline-none"
            >
              <option value="professional">🎯 Professional</option>
              <option value="casual">😊 Casual & Friendly</option>
              <option value="thought-leader">🚀 Thought Leader</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2 font-medium">Key Points (optional)</label>
            <input
              type="text"
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder="e.g., saves time, builds trust, increases engagement"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-sky-400 focus:outline-none"
            />
            <p className="text-gray-400 text-sm mt-1">Separate with commas</p>
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="w-full py-4 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg disabled:opacity-50 transition"
          >
            {loading ? '⏳ Generating (may take 30-60s)...' : '✨ Generate 3 LinkedIn Posts'}
          </button>
        </div>
      </div>

      {/* Results */}
      {result?.posts && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Posts</h3>
          <div className="grid gap-6">
            {result.posts.map((post: any, idx: number) => (
              <div key={idx} className="bg-white/10 backdrop-blur rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 rounded-full bg-sky-600/30 text-sky-300 text-sm capitalize">
                    {post.hookType} hook
                  </span>
                  <span className="text-gray-400 text-sm">{post.charCount || post.content?.length} chars</span>
                </div>
                <p className="text-white whitespace-pre-wrap mb-4 text-lg leading-relaxed">{post.content}</p>
                <button
                  onClick={() => copyToClipboard(post.content)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition"
                >
                  📋 Copy to Clipboard
                </button>
              </div>
            ))}
          </div>
          {result.hashtags && (
            <div className="mt-6 text-center p-4 bg-white/5 rounded-lg">
              <p className="text-gray-400 mb-2">Suggested hashtags:</p>
              <p className="text-sky-400 font-medium">{result.hashtags.join(' ')}</p>
            </div>
          )}
        </div>
      )}

      {/* How It Works */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-white text-center mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <h4 className="text-xl font-bold text-white mb-2">1. Enter Your Topic</h4>
            <p className="text-gray-400">Share what you want to post about</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h4 className="text-xl font-bold text-white mb-2">2. AI Generates</h4>
            <p className="text-gray-400">Get 3 unique posts with different hooks</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h4 className="text-xl font-bold text-white mb-2">3. Copy & Post</h4>
            <p className="text-gray-400">Pick your favorite and share it</p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-white text-center mb-8">Simple Pricing</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-xl font-bold text-white mb-2">Free</h4>
            <p className="text-3xl font-bold text-white mb-4">$0</p>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>✓ 3 posts per day</li>
              <li>✓ All hook styles</li>
              <li>✓ Hashtag suggestions</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-white/10 text-white">Current Plan</button>
          </div>
          <div className="bg-sky-600/20 rounded-xl p-6 border border-sky-500">
            <h4 className="text-xl font-bold text-white mb-2">Pro</h4>
            <p className="text-3xl font-bold text-white mb-4">$9<span className="text-lg font-normal">/mo</span></p>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>✓ Unlimited posts</li>
              <li>✓ Priority generation</li>
              <li>✓ Advanced tones</li>
              <li>✓ Save favorites</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold transition">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-4xl mx-auto px-4 flex justify-between text-gray-400 text-sm">
          <p>© 2024 LinkedInPosts by RevolutionAI</p>
          <div className="space-x-4">
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/terms" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
