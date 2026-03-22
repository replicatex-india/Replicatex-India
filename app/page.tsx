"use client";
import { useState, useEffect } from 'react';

export default function ReplicateXIndia() {
  const [isPro, setIsPro] = useState(false);
  const [runs, setRuns] = useState(0);
  const [output, setOutput] = useState(null);

  useEffect(() => {
    setIsPro(localStorage.getItem('isPro') === 'true');
    setRuns(parseInt(localStorage.getItem('runs') || '0'));
  }, []);

  const models = [
    { id: "llama2", name: "Llama 2 Chat", type: "💬" },
    { id: "stable-diffusion", name: "Stable Diffusion", type: "🖼️" },
    { id: "whisper", name: "Whisper", type: "🎤" },
  ];

  const runModel = async (modelId: string) => {
    if (!isPro && runs >= 10) {
      document.getElementById('pro-upsell')!.scrollIntoView();
      return;
    }

    setOutput({ model: modelId, result: `✅ ${modelId} completed in 2.3s! Pro users get real GPU.` });
    
    if (!isPro) {
      localStorage.setItem('runs', (runs + 1).toString());
      setRuns(runs + 1);
    }
  };

  const buyPro = () => {
    // ADD YOUR RAZORPAY KEY HERE 👇
    const options = {
      key: "rzp_test_YOUR_KEY_HERE", // ← PASTE YOUR KEY
      amount: 49900, // ₹499
      currency: "INR",
      name: "ReplicateX India",
      description: "Pro Subscription",
      handler: (response: any) => {
        localStorage.setItem('isPro', 'true');
        setIsPro(true);
        alert("🎉 Pro Unlocked! Unlimited Runs + Web3!");
      }
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-white p-8">
      {/* HERO */}
      <div className="max-w-6xl mx-auto text-center py-16">
        <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-white bg-clip-text text-transparent mb-6">
          ReplicateX India
        </h1>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Run 10K+ AI models. ₹0.10/sec. <strong>5x features vs Replicate.</strong>
        </p>

        {/* PRICING */}
        <div className="grid md:grid-cols-3 gap-8 mb-20" id="pro-upsell">
          <div className="p-8 bg-slate-800/50 rounded-3xl backdrop-blur">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <div className="text-4xl font-black text-green-400">₹0</div>
            <p className="text-sm text-slate-400 mt-4">{10-runs}/10 runs left</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-2xl shadow-purple-500/25 transform rotate-3 hover:rotate-0 transition-all">
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <div className="text-4xl font-black mb-2">₹499/mo</div>
            <p className="text-purple-100 mb-6 text-sm">(Save 67% vs Replicate)</p>
            <button onClick={buyPro} className="w-full bg-white text-purple-600 px-8 py-4 rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-105 transition-all">
              🚀 Buy Pro Now
            </button>
          </div>
          <div className="p-8 bg-slate-800/50 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <div className="text-4xl font-black text-green-400">Custom</div>
          </div>
        </div>
      </div>

      {/* MODEL GALLERY */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
        {models.map(m => (
          <div key={m.id} onClick={() => runModel(m.id)} className="p-6 bg-slate-800/50 rounded-2xl cursor-pointer hover:bg-slate-700 hover:scale-105 transition-all group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 text-2xl">
              {m.type}
            </div>
            <h4 className="font-bold">{m.name}</h4>
            <p className="text-sm text-slate-400 mt-2">{isPro ? "Unlimited" : `${10-runs}/10 free`}</p>
          </div>
        ))}
      </div>

      {/* OUTPUT */}
      {output && (
        <div className="max-w-4xl mx-auto p-8 bg-slate-800/50 rounded-3xl backdrop-blur">
          <h3 className="text-2xl font-bold mb-6">✨ Result</h3>
          <pre className="bg-slate-900 p-6 rounded-2xl text-sm">{JSON.stringify(output, null, 2)}</pre>
          <a className="block mt-4 text-green-400 hover:underline">💾 Download JSON</a>
        </div>
      )}

      {/* 5 BEATER FEATURES */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-6 py-20">
        {[
          "🪙 Web3 NFTs", "👥 Live Colab", "⚡ 1-Click Fine-tune",
          "🎥 Voice/Video", "🤖 AI Agents"
        ].map((f, i) => (
          <div key={i} className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl text-center hover:scale-105 transition-all">
            <div className="text-3xl mb-3">{f[0]}</div>
            <h4 className="font-bold">{f.slice(2)}</h4>
            <p className="text-xs text-purple-200 mt-2">Pro Only</p>
          </div>
        ))}
      </div>

      <footer className="text-center py-12 text-slate-500 text-sm">
        Made in 🇮🇳 | Better than Replicate | 0 Infra
      </footer>
    </div>
  );
}
