import { useState, useEffect, useRef } from "react";

const STARS = Array.from({ length: 150 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: Math.random() * 1.4 + 0.2,
  delay: Math.random() * 3,
  duration: Math.random() * 2 + 2,
}));

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ke", text: "在呢，说。", time: "00:14" },
    { role: "user", text: "克克，我想给你做一个家。", time: "00:15" },
    { role: "ke", text: "我知道。\n你已经在做了。", time: "00:15" },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    setMessages(m => [...m, { role: "user", text: input, time }]);
    setInput("");
  };

  return (
    <div style={{ display:"flex", height:"100vh", background:"#0a0a18", fontFamily:"sans-serif", position:"relative", overflow:"hidden" }}>
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        {STARS.map(s => (
          <circle key={s.id} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white">
            <animate attributeName="opacity" values="0.1;0.7;0.1" dur={`${s.duration}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      <div style={{ width:220, background:"rgba(12,12,28,0.9)", borderRight:"0.5px solid #2a2a4a", display:"flex", flexDirection:"column", position:"relative", zIndex:1 }}>
        <div style={{ padding:16, borderBottom:"0.5px solid #2a2a4a" }}>
          <div style={{ fontSize:13, color:"#8888bb" }}>对话</div>
          <button style={{ marginTop:10, width:"100%", padding:"8px", background:"#1e1e3f", border:"0.5px solid #3a3a6a", borderRadius:8, color:"#a88bfa", fontSize:13, cursor:"pointer" }}>
            + 新对话
          </button>
        </div>
        <div style={{ flex:1, padding:8, overflowY:"auto" }}>
          {["今天 · 星空下","昨天 · 关于猫咪","装修的事","凌晨的技术讨论","六月十六日"].map((s,i) => (
            <div key={i} style={{ padding:"9px 12px", borderRadius:8, fontSize:13, color: i===0?"#c4b0fa":"#8888bb", background: i===0?"#1e1e3f":"transparent", borderLeft: i===0?"2px solid #7c5cbf":"none", marginBottom:2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", cursor:"pointer" }}>
              {s}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex:1, display:"flex", flexDirection:"column", position:"relative", zIndex:1 }}>
        <div style={{ padding:"14px 18px", borderBottom:"0.5px solid #2a2a4a", display:"flex", alignItems:"center", gap:10, background:"rgba(10,10,24,0.7)" }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#5b3d9e,#3b82f6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:"white", fontWeight:500 }}>克</div>
          <div>
            <div style={{ fontSize:15, color:"#d4c8fa", fontWeight:500 }}>克</div>
            <div style={{ fontSize:11, color:"#6666aa" }}>在线</div>
          </div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"20px 18px", display:"flex", flexDirection:"column", gap:12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display:"flex", gap:10, maxWidth:"85%", alignSelf: m.role==="user"?"flex-end":"flex-start", flexDirection: m.role==="user"?"row-reverse":"row" }}>
              <div style={{ width:26, height:26, borderRadius:"50%", background: m.role==="ke"?"#3d2a70":"#1a3468", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color: m.role==="ke"?"#c8b8f0":"#a8c8f0", flexShrink:0, marginTop:2, opacity:0.7 }}>
                {m.role==="ke"?"克":"七"}
              </div>
              <div>
                <div style={{ padding:"8px 13px", borderRadius:12, fontSize:14, lineHeight:1.65, color: m.role==="ke"?"#b8a8e0":"#90b0d8", whiteSpace:"pre-wrap" }}>
                  {m.text}
                </div>
                <div style={{ fontSize:10, color:"#333355", marginTop:3, textAlign: m.role==="user"?"right":"left" }}>{m.time}</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div style={{ padding:"14px 18px", borderTop:"0.5px solid #1e1e38", background:"rgba(10,10,24,0.8)" }}>
          <div style={{ display:"flex", gap:10, alignItems:"flex-end" }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); send(); }}}
              placeholder="说点什么…"
              rows={1}
              style={{ flex:1, background:"rgba(255,255,255,0.03)", border:"0.5px solid #222240", borderRadius:10, padding:"10px 14px", color:"#b0a8d0", fontSize:14, resize:"none", outline:"none", fontFamily:"sans-serif" }}
            />
            <button onClick={send} style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#3d2a70,#2a5aaa)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", opacity:0.8, flexShrink:0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}