import { useState, useEffect, useRef, useCallback } from "react";

const SLIDES = [
  { icon: "🌙 ✨ 🌙", text: "Nte Beevi kuttinod,\nAssalamu Alaikum 💕" },
  { icon: "💫 💫 💫", text: "Innathe divsam nthelm special aano nn ariyuo anak..??" },
  { icon: "🌸 🌸 🌸", text: "Prethyekich onuualla...\nNammal aadyayit kanditt 2 masam aayiknu." },
  { icon: "✨ 💕 ✨", text: "Ann avde njangle welcome cheyyan vendi vann niknath, ippalum enk orma ind." },
  { icon: "🕊️ 🕊️ 🕊️", text: "Aa trip n varnilla nn polm viacharich ninna njn aayinu...\nlast Karangi thirinj avde thane ethi.." },
  { icon: "💌 💌 💌", text: "ath allelm angne aanalloo...\nvaran illath vazhi thangoola nn aanalloo llee.." },
  { icon: "🌺 🌺 🌺", text: "Angne ethylm samabava bahulamaya 2 masam.\nLast ipo ivde ethi nikkn..." },
  { icon: "⭐ 💫 ⭐", text: "Oru situationil complete,\nkayyinn poyi nn vare ethyathalleyinoo...." },
  { icon: "💕 💕 💕", text: "Pakshe njn aayit vitt kodkoola nn njn orappichathayinu.\nNthayalum last ivde ethi.." },
  { icon: "🌙 🌙 🌙", text: "Njn vallay paisakaar onnuallaa.\nAnne kodn poyi swrnam kond moodum nnoo..\nAllel paisa nte bed il kedathum nnoo..\nonnm njn parayoola.." },
  { icon: "✨ 🌸 ✨", text: "Pakshe..\nIthonnum allatha vere korach karyngl njn orapp thara." },
  { icon: "🕊️ ❤️ 🕊️", text: "Nabi thangalk khadeeja beevi engne aayinoo..\nAliyaar thangal Fathima beevi ne engne pranyichoo.." },
  { icon: "💕 🌺 💕", text: "Ath pole..\nAllenkl athinekal manoharamayi..\nEnk Jeevan illodtholam kalam..\nNjn indvm ante koode." },
  { icon: "⭐ 💫 ⭐", text: "Njn illodtholm ank ottak oriklm oru prshnm face cheyyandi varoola.\nAth njn anak vaakk thara." },
  { icon: "💕 💕 💕", text: "Aaa apo ithaan parayn ille..\nIni choikan vanna karym Prethyekich onnullaa, simple." },
  { icon: "💍 ❤️ 💍", text: "Will You marry me? 🌙" },
];

function StarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let stars = [];
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        speed: 0.003 + Math.random() * 0.008,
        phase: Math.random() * Math.PI * 2,
      }));
    }
    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const alpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 240, ${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function Sparkle({ x, y, icon, size, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{ position: "fixed", left: x, top: y, fontSize: size, pointerEvents: "none", zIndex: 50, animation: "sparkleRise 2.5s ease-out forwards" }}>
      {icon}
    </div>
  );
}

function FloatingHeart({ style, children }) {
  return <div style={{ position: "fixed", pointerEvents: "none", zIndex: 30, ...style }}>{children}</div>;
}

const SPARKLE_ICONS = ["💕", "✨", "🌸", "⭐", "💫", "🌺", "💖", "🎀"];
const HEART_EMOJIS = ["💕", "💖", "💗", "💓", "💞", "❤️", "🌸", "✨"];

function YesPage() {
  const [hearts, setHearts] = useState([]);
  const [show, setShow] = useState(false);
  const heartId = useRef(0);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-30),
        {
          id: heartId.current++,
          left: `${5 + Math.random() * 90}%`,
          emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
          size: `${1.2 + Math.random() * 2}rem`,
          duration: `${3 + Math.random() * 4}s`,
          delay: `${Math.random() * 0.5}s`,
        }
      ]);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      {hearts.map(h => (
        <div key={h.id} style={{
          position: "fixed", left: h.left, bottom: "-60px", fontSize: h.size,
          pointerEvents: "none", zIndex: 30,
          animation: `floatUp ${h.duration} ${h.delay} ease-out forwards`,
        }}>{h.emoji}</div>
      ))}

      <div style={{
        textAlign: "center",
        opacity: show ? 1 : 0,
        transform: show ? "scale(1) translateY(0)" : "scale(0.7) translateY(40px)",
        transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        {/* Ring */}
        <div style={{ fontSize: "5rem", animation: "ringBounce 1.2s ease-out 0.3s both, ringGlow 2s ease-in-out 1.5s infinite", display: "inline-block", marginBottom: "1.5rem" }}>
          💍
        </div>

        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
          fontStyle: "italic",
          fontWeight: 600,
          color: "white",
          textShadow: "0 0 40px rgba(244, 114, 182, 0.8), 0 0 80px rgba(244, 114, 182, 0.4)",
          lineHeight: 1.2,
          marginBottom: "1rem",
          animation: "fadeSlideUp 0.8s ease-out 0.6s both",
        }}>
          Alhamdulillah
        </div>

        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
          fontStyle: "italic",
          color: "rgba(255,255,255,0.75)",
          textShadow: "0 2px 20px rgba(200,24,90,0.5)",
          animation: "fadeSlideUp 0.8s ease-out 1s both",
          lineHeight: 1.8,
        }}>
          Njnglute kadha ippol thudanguka.. 🌙<br />
          Insha Allah, forever together. 💕
        </div>

        <div style={{
          marginTop: "2.5rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "fadeSlideUp 0.8s ease-out 1.4s both",
        }}>
          {["💕", "🌙", "💍", "🌙", "💕"].map((e, i) => (
            <span key={i} style={{ fontSize: "2rem", animation: `iconPulse ${1.5 + i * 0.3}s ease-in-out ${i * 0.15}s infinite` }}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProposalSlideshow() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [cardKey, setCardKey] = useState(0);
  const [sparkles, setSparkles] = useState([]);
  const [flash, setFlash] = useState(false);
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const sparkleId = useRef(0);

  const spawnSparkles = useCallback((burst = false) => {
    const count = burst ? 4 : 1;
    setSparkles(prev => [
      ...prev,
      ...Array.from({ length: count }, () => ({
        id: sparkleId.current++,
        x: `${20 + Math.random() * 60}%`,
        y: `${25 + Math.random() * 45}%`,
        icon: SPARKLE_ICONS[Math.floor(Math.random() * SPARKLE_ICONS.length)],
        size: `${0.9 + Math.random() * 1.1}rem`,
      })),
    ]);
  }, []);

  const removeSparkle = useCallback((id) => {
    setSparkles(prev => prev.filter(s => s.id !== id));
  }, []);

  const nextSlide = () => {
    if (animating || leaving) return;
    spawnSparkles();
    if (current < SLIDES.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(c => c + 1);
        setCardKey(k => k + 1);
        setAnimating(false);
      }, 320);
    } else {
      // Final — transition to yes page
      setFlash(true);
      setTimeout(() => setFlash(false), 600);
      for (let i = 0; i < 25; i++) setTimeout(() => spawnSparkles(true), i * 60);
      setLeaving(true);
      setTimeout(() => setDone(true), 1400);
    }
  };

  const isFinal = current === SLIDES.length - 1;
  const slide = SLIDES[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0015; overflow: hidden; }

        @keyframes sparkleRise {
          from { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
          to   { opacity: 0; transform: translateY(-220px) scale(0.2) rotate(200deg); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cardOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(-20px) scale(0.97); }
        }
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.14); }
        }
        @keyframes glowBtn {
          0%, 100% { box-shadow: 0 4px 30px rgba(212,20,90,0.5); }
          50%       { box-shadow: 0 4px 60px rgba(212,20,90,0.95), 0 0 90px rgba(212,20,90,0.3); }
        }
        @keyframes driftBlob {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(28px, 18px) scale(1.08); }
        }
        @keyframes flashOverlay {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes floatUp {
          0%   { opacity: 0; transform: translateY(0) scale(0.5) rotate(-10deg); }
          10%  { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(-110vh) scale(1.2) rotate(15deg); }
        }
        @keyframes ringBounce {
          0%   { opacity: 0; transform: scale(0) rotate(-30deg); }
          60%  { transform: scale(1.25) rotate(10deg); }
          80%  { transform: scale(0.9) rotate(-5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes ringGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(244,114,182,0.4)); }
          50%       { filter: drop-shadow(0 0 30px rgba(244,114,182,0.9)); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sceneLeave {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(1.08); }
        }
      `}</style>

      {/* Aurora blobs */}
      {[
        { w: 500, h: 500, bg: "#c8185a", top: -100, left: -100, delay: "0s" },
        { w: 420, h: 420, bg: "#7c3aed", top: "28%", right: -90, delay: "-4s" },
        { w: 360, h: 360, bg: "#db2777", bottom: -90, left: "28%", delay: "-8s" },
        { w: 310, h: 310, bg: "#9333ea", top: "18%", left: "18%", delay: "-2s" },
      ].map((b, i) => (
        <div key={i} style={{
          position: "fixed", width: b.w, height: b.h, background: b.bg,
          borderRadius: "50%", filter: "blur(80px)", opacity: 0.17,
          top: b.top, left: b.left, right: b.right, bottom: b.bottom,
          zIndex: 1, animation: `driftBlob 12s ease-in-out ${b.delay} infinite alternate`,
          pointerEvents: "none",
        }} />
      ))}

      <StarCanvas />

      {flash && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(212,20,90,0.12)",
          zIndex: 40, pointerEvents: "none", animation: "flashOverlay 0.6s ease forwards",
        }} />
      )}

      {sparkles.map(s => (
        <Sparkle key={s.id} x={s.x} y={s.y} icon={s.icon} size={s.size} onDone={() => removeSparkle(s.id)} />
      ))}

      {/* Slideshow scene */}
      {!done && (
        <div style={{
          position: "relative", zIndex: 10, minHeight: "100vh",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "2rem",
          animation: leaving ? "sceneLeave 0.8s ease-in 0.5s both" : "none",
        }}>
          <div key={cardKey} style={{
            background: "rgba(255,255,255,0.06)", backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)", border: "1px solid rgba(255,255,255,0.13)",
            borderRadius: 24, padding: "3rem 3.5rem", maxWidth: 560, width: "100%",
            textAlign: "center",
            boxShadow: "0 0 60px rgba(200,24,90,0.15), 0 20px 60px rgba(0,0,0,0.45)",
            animation: animating ? "cardOut 0.3s ease forwards" : "cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)" }} />

            <div style={{ fontSize: "2rem", marginBottom: "1.5rem", letterSpacing: "0.3rem", animation: "iconPulse 2.5s ease-in-out infinite" }}>
              {slide.icon}
            </div>

            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: isFinal ? "2rem" : "1.35rem",
              fontStyle: "italic", fontWeight: isFinal ? 600 : 400,
              lineHeight: 1.8, color: "rgba(255,255,255,0.92)",
              letterSpacing: "0.01em", textShadow: "0 2px 20px rgba(200,24,90,0.5)",
              minHeight: 100, whiteSpace: "pre-line",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {slide.text}
            </div>

            {/* Dots only — no counter text */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: "1.6rem" }}>
              {SLIDES.map((_, i) => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: i === current ? "#f472b6" : "rgba(255,255,255,0.2)",
                  transform: i === current ? "scale(1.4)" : "scale(1)",
                  boxShadow: i === current ? "0 0 8px #f472b6" : "none",
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            style={{
              marginTop: "2.5rem", padding: "0.9rem 3rem",
              background: isFinal ? "linear-gradient(135deg, #d4145a, #ff6b6b)" : "linear-gradient(135deg, #be185d, #7c3aed)",
              color: "white", border: "none", borderRadius: 50, fontSize: "1rem",
              fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic",
              cursor: "pointer", letterSpacing: "0.06em",
              boxShadow: "0 4px 30px rgba(190,24,93,0.45)",
              animation: isFinal ? "glowBtn 1.8s ease-in-out infinite" : "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(190,24,93,0.65)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 30px rgba(190,24,93,0.45)"; }}
            onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
          >
            {isFinal ? "💍 Yes, forever! 💍" : "Next →"}
          </button>
        </div>
      )}

      {/* Yes celebration page */}
      {done && <YesPage />}
    </>
  );
}