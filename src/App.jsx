import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase ─────────────────────────────────────────────────────────────────
const sb = createClient(
  'https://oooegbbvrwifilavlvgt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vb2VnYmJ2cndpZmlsYXZsdmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMTk5NTAsImV4cCI6MjA4NTc5NTk1MH0.x6wDd7c8V3eb1gYgQcEILEBEJKkPfJuF4o2_UuAV7Gk'
);

// ─── Global Styles ────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--accent:#e8ff47;--danger:#ff4757;--success:#2ecc71;--radius:10px;--mono:'JetBrains Mono',monospace;--display:'Syne',sans-serif}
    body.dark{--bg:#0a0a0b;--surface:#111114;--card:#18181d;--border:#252530;--muted:#5a5a6e;--text:#e8e8f0;--text2:#8888a0}
    body.light{--bg:#f0f0eb;--surface:#fff;--card:#fafaf7;--border:#ddddd5;--muted:#aaa;--text:#1a1a22;--text2:#66667a;--accent:#9db800}
    body{background:var(--bg);color:var(--text);font-family:var(--display);min-height:100vh;overflow-x:hidden;transition:background .3s,color .3s}
    input,textarea,select{font-family:var(--mono);font-size:13px;background:var(--surface);border:1px solid var(--border);color:var(--text);border-radius:var(--radius);padding:10px 14px;width:100%;outline:none;transition:border-color .2s,background .3s}
    input:focus,textarea:focus,select:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(232,255,71,.08)}
    select option{background:var(--surface);color:var(--text)}
    textarea{resize:vertical;min-height:160px;line-height:1.6}
    .btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border:none;border-radius:var(--radius);font-family:var(--display);font-weight:700;font-size:13px;cursor:pointer;transition:all .2s;letter-spacing:.04em;text-transform:uppercase}
    .btn:disabled{opacity:.5;cursor:not-allowed}
    .btn-primary{background:var(--accent);color:#0a0a0b}
    .btn-primary:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-1px);box-shadow:0 6px 20px rgba(232,255,71,.25)}
    .btn-secondary{background:var(--card);color:var(--text);border:1px solid var(--border)}
    .btn-secondary:hover:not(:disabled){border-color:var(--accent);color:var(--accent)}
    .btn-ghost{background:transparent;color:var(--text2);border:1px solid var(--border)}
    .btn-ghost:hover:not(:disabled){color:var(--text);border-color:var(--text)}
    .btn-sm{padding:6px 12px;font-size:11px}
    .btn-ai{background:var(--card);position:relative;color:var(--text);border:1.5px solid transparent;z-index:0}
    .btn-ai::before{content:'';position:absolute;inset:-1.5px;border-radius:calc(var(--radius) + 1.5px);background:linear-gradient(135deg,#cc785c,#c17a5a,#a06040,#d4845a);z-index:-1;opacity:.85;transition:opacity .2s}
    .btn-ai:hover:not(:disabled)::before{opacity:1}
    .btn-ai:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 24px rgba(204,120,92,.35)}
    .label{display:block;font-family:var(--mono);font-size:11px;color:var(--accent);letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}
    .field{margin-bottom:18px}
    .tag{display:inline-block;padding:3px 10px;background:rgba(232,255,71,.1);color:var(--accent);border:1px solid rgba(232,255,71,.25);border-radius:99px;font-family:var(--mono);font-size:10px;white-space:nowrap}
    .card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;transition:border-color .2s,transform .2s,background .3s}
    .card:hover{border-color:var(--accent);transform:translateY(-2px)}
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);z-index:999;display:flex;align-items:center;justify-content:center;padding:24px}
    .modal-box{background:var(--surface);border:1px solid var(--border);border-radius:18px;width:100%;max-width:860px;max-height:92vh;overflow-y:auto;padding:36px;animation:fadeIn .25s ease}
    .prd-output{font-family:var(--mono);font-size:13px;line-height:1.85;color:var(--text)}
    .prd-output h1{font-family:var(--display);font-size:22px;font-weight:800;border-bottom:2px solid var(--accent);padding-bottom:10px;margin-bottom:20px}
    .prd-output h2{font-family:var(--display);font-size:14px;font-weight:700;margin-top:28px;margin-bottom:8px;color:var(--accent);text-transform:uppercase;letter-spacing:.07em}
    .prd-output h3{font-size:13px;font-weight:700;margin-top:16px;margin-bottom:6px;color:var(--text2)}
    .prd-output p{margin-bottom:10px}
    .prd-output ul,.prd-output ol{padding-left:20px;margin-bottom:10px}
    .prd-output li{margin-bottom:4px}
    .prd-output strong{color:var(--text);font-weight:700}
    .prd-output code{background:var(--card);border:1px solid var(--border);padding:2px 6px;border-radius:4px;font-size:12px}
    .prd-output table{width:100%;border-collapse:collapse;margin:14px 0;font-size:12px}
    .prd-output th{background:var(--card);padding:8px 12px;text-align:left;border:1px solid var(--border);color:var(--accent);font-weight:700}
    .prd-output td{padding:8px 12px;border:1px solid var(--border)}
    .prd-output hr{border:none;border-top:1px solid var(--border);margin:20px 0}
    .toast{position:fixed;bottom:24px;right:24px;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px 20px;font-family:var(--mono);font-size:13px;z-index:9999;animation:fadeIn .2s ease;box-shadow:0 8px 32px rgba(0,0,0,.3)}
    .toast.success{border-color:var(--success);color:var(--success)}
    .toast.error{border-color:var(--danger);color:var(--danger)}
    .center-screen{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:16px}
    @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .animate-in{animation:fadeIn .35s ease both}
    @keyframes spin{to{transform:rotate(360deg)}}
    .spinner{display:inline-block;width:40px;height:40px;border-radius:50%;border:3px solid var(--border);border-top-color:var(--accent);animation:spin .75s linear infinite}
    .spinner-sm{width:14px;height:14px;border-width:2px}
    ::-webkit-scrollbar{width:6px}
    ::-webkit-scrollbar-track{background:var(--surface)}
    ::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
  `}</style>
);

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ic = ({d,s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const ISearch = () => <Ic d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>;
const IPlus   = () => <Ic d="M12 5v14M5 12h14"/>;
const IEdit   = () => <Ic d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>;
const ITrash  = () => <Ic d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>;
const IBack   = () => <Ic d="M15 18l-6-6 6-6"/>;
const IDown   = () => <Ic d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>;
const ICopy   = () => <Ic d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2M8 4v2h8V4M8 4h8"/>;
const ITag    = () => <Ic d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01"/>;
const IOut    = () => <Ic d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>;
const IVault  = () => <Ic d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 5v8m-4-4h8"/>;
const ISun    = () => <Ic d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z"/>;
const IMoon   = () => <Ic d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>;
const IClose  = () => <Ic d="M18 6L6 18M6 6l12 12"/>;
const ISave   = () => <Ic d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8"/>;
const ISpark  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74z"/></svg>;
const IGoog   = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function mdToHtml(md) {
  return md
    .replace(/^### (.+)$/gm,"<h3>$1</h3>").replace(/^## (.+)$/gm,"<h2>$1</h2>").replace(/^# (.+)$/gm,"<h1>$1</h1>")
    .replace(/\*\*\*(.+?)\*\*\*/g,"<strong><em>$1</em></strong>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>")
    .replace(/`([^`]+)`/g,"<code>$1</code>").replace(/^> (.+)$/gm,"<blockquote>$1</blockquote>").replace(/^---$/gm,"<hr/>")
    .replace(/^\s*[-*] (.+)$/gm,"<li>$1</li>").replace(/^\s*\d+\. (.+)$/gm,"<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g,m=>`<ul>${m}</ul>`)
    .split(/\n\n+/).map(b=>{if(/^<(h[1-6]|ul|ol|blockquote|hr)/.test(b.trim()))return b;const t=b.trim();return t?`<p>${t}</p>`:""}).join("\n");
}

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({msg, type, onHide}) => {
  useEffect(()=>{const t=setTimeout(onHide,3200);return()=>clearTimeout(t);},[]);
  return <div className={`toast ${type}`}>{type==="success"?"✓ ":"⚠ "}{msg}</div>;
};

// ─── PRD Modal ────────────────────────────────────────────────────────────────
const PRDModal = ({onClose, onSave}) => {
  const [idea,setIdea]=useState(""); const [stage,setStage]=useState("input");
  const [raw,setRaw]=useState(""); const [html,setHtml]=useState("");
  const [err,setErr]=useState(""); const [copied,setCopied]=useState(false);
  const [dots,setDots]=useState(".");
  useEffect(()=>{if(stage!=="loading")return;const id=setInterval(()=>setDots(d=>d.length>=3?".":d+"."),500);return()=>clearInterval(id);},[stage]);

  const SYS=`Você é um PM sênior. Crie um PRD COMPLETO em Markdown com as seções: # Nome — Subtítulo, ## 1. Visão Geral & Problema, ## 2. Proposta de Valor, ## 3. Objetivos SMART, ## 4. Personas (mín 2), ## 5. Escopo MVP / Fora do escopo, ## 6. Requisitos Funcionais (tabela P0/P1/P2) e Não-Funcionais, ## 7. Telas & Fluxos, ## 8. Integrações, ## 9. Stack Tecnológica (tabela), ## 10. KPIs (tabela), ## 11. Riscos & Mitigações (tabela), ## 12. Cronograma, ## 13. Critérios de Aceitação. Seja detalhado e específico.`;

  const generate = async () => {
    if(!idea.trim()){setErr("Descreva sua ideia.");return;}
    setErr(""); setStage("loading");
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:8000,system:SYS,messages:[{role:"user",content:`Ideia:\n\n${idea}`}]})});
      const d = await r.json();
      if(d.error) throw new Error(d.error.message);
      const t = d.content?.map(b=>b.text||"").join("")||"";
      if(!t) throw new Error("Resposta vazia.");
      setRaw(t); setHtml(mdToHtml(t)); setStage("result");
    } catch(e) { setErr("Erro: "+e.message); setStage("input"); }
  };

  const dlMd = () => { const a=document.createElement("a");a.href="data:text/markdown;charset=utf-8,"+encodeURIComponent(raw);a.download="prd.md";document.body.appendChild(a);a.click();document.body.removeChild(a); };

  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-box animate-in">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:28}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:46,height:46,borderRadius:13,background:"linear-gradient(135deg,#cc785c,#d4895a,#c06040)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(204,120,92,.4)"}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74z"/></svg>
            </div>
            <div>
              <h2 style={{fontSize:20,fontWeight:800,letterSpacing:"-.02em"}}>Gerador de PRD com IA</h2>
              <p style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--text2)",marginTop:2}}>Powered by Claude · Documento profissional em segundos</p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm"><IClose/></button>
        </div>

        {stage==="input" && <div>
          <div className="field">
            <label className="label">💡 Descreva sua ideia de produto</label>
            <textarea value={idea} onChange={e=>setIdea(e.target.value)} style={{minHeight:200}} autoFocus
              placeholder="Ex: App para personal trainers gerenciarem alunos, treinos e pagamentos..."/>
            <p style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--muted)",marginTop:8}}>💡 Mais detalhes = PRD melhor.</p>
          </div>
          {err && <div style={{background:"rgba(255,71,87,.1)",border:"1px solid rgba(255,71,87,.3)",borderRadius:8,padding:"12px 16px",fontFamily:"var(--mono)",fontSize:12,color:"var(--danger)",marginBottom:16}}>⚠️ {err}</div>}
          <div style={{display:"flex",justifyContent:"flex-end",gap:10}}>
            <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
            <button className="btn btn-ai" onClick={generate}><ISpark/> Gerar PRD Profissional</button>
          </div>
        </div>}

        {stage==="loading" && <div style={{textAlign:"center",padding:"64px 0"}}>
          <div style={{marginBottom:28}}><div className="spinner"/></div>
          <p style={{fontFamily:"var(--display)",fontWeight:800,fontSize:20,marginBottom:12}}>Gerando seu PRD{dots}</p>
          <div style={{display:"flex",flexDirection:"column",gap:6,maxWidth:360,margin:"0 auto"}}>
            {["Analisando sua ideia","Estruturando requisitos e personas","Definindo stack tecnológica","Elaborando KPIs e cronograma"].map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,fontFamily:"var(--mono)",fontSize:12,color:"var(--text2)"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"var(--accent)",flexShrink:0}}/>{s}
              </div>
            ))}
          </div>
        </div>}

        {stage==="result" && <div>
          <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap",alignItems:"center",padding:"12px 16px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:10}}>
            <span style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--success)"}}>✓ PRD gerado com sucesso!</span>
            <div style={{flex:1}}/>
            <button className="btn btn-secondary btn-sm" onClick={()=>{navigator.clipboard.writeText(raw);setCopied(true);setTimeout(()=>setCopied(false),2000);}}><ICopy/>{copied?"✓ Copiado!":"Copiar"}</button>
            <button className="btn btn-secondary btn-sm" onClick={dlMd}><IDown/> Baixar .md</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>onSave(raw)}><ISave/> Salvar no Vault</button>
            <button className="btn btn-ghost btn-sm" onClick={()=>{setStage("input");setRaw("");setHtml("");}}>← Nova ideia</button>
          </div>
          <div className="prd-output animate-in" style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:12,padding:"28px 32px"}} dangerouslySetInnerHTML={{__html:html}}/>
          <div style={{marginTop:20,display:"flex",justifyContent:"flex-end"}}><button className="btn btn-ghost" onClick={onClose}>Fechar</button></div>
        </div>}
      </div>
    </div>
  );
};

// ─── Topbar ───────────────────────────────────────────────────────────────────
const Topbar = ({route, setRoute, user, onLogout, dark, setDark, onPRD}) => (
  <header style={{background:"var(--surface)",borderBottom:"1px solid var(--border)",position:"sticky",top:0,zIndex:100,transition:"background .3s"}}>
    <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",height:60,gap:20}}>
      <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0}} onClick={()=>setRoute("dashboard")}>
        <div style={{width:32,height:32,background:"var(--accent)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#0a0a0b"}}><IVault/></div>
        <span style={{fontWeight:800,fontSize:17,letterSpacing:"-.01em"}}>PromptVault</span>
      </div>
      <nav style={{display:"flex",gap:2,flex:1}}>
        {[["Dashboard","dashboard"],["Categorias","categories"],["Exportar","export"]].map(([l,r])=>(
          <button key={r} onClick={()=>setRoute(r)} style={{background:route===r?"rgba(232,255,71,.1)":"none",border:"none",color:route===r?"var(--accent)":"var(--text2)",fontFamily:"var(--display)",fontWeight:600,fontSize:12,cursor:"pointer",padding:"6px 14px",borderRadius:8,transition:"all .2s",textTransform:"uppercase",letterSpacing:".05em"}}>{l}</button>
        ))}
      </nav>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <button className="btn btn-ai btn-sm" onClick={onPRD} style={{fontSize:12}}><ISpark/> Gerar PRD com IA</button>
        <button onClick={()=>setDark(!dark)} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:8,padding:"7px 12px",cursor:"pointer",color:"var(--text2)",display:"flex",alignItems:"center",gap:6,fontFamily:"var(--display)",fontWeight:600,fontSize:12}}>
          {dark?<ISun/>:<IMoon/>}<span>{dark?"Claro":"Escuro"}</span>
        </button>
        <span style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--muted)",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.email}</span>
        <button onClick={onLogout} className="btn btn-ghost btn-sm" title="Sair"><IOut/></button>
      </div>
    </div>
  </header>
);

// ─── Login ────────────────────────────────────────────────────────────────────
const Login = ({dark, setDark}) => {
  const [err,setErr]=useState(""); const [loading,setLoading]=useState(false);

  const loginGoogle = async () => {
    setLoading(true); setErr("");
    // URL desta aplicação (PromptVault). Deve estar em Supabase → Auth → Redirect URLs
    const redirectUrl = window.location.origin + (window.location.pathname || '/');
    const {error} = await sb.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: false,
      }
    });
    if(error){ setErr(error.message); setLoading(false); }
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",padding:24,position:"relative"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(ellipse at 20% 50%,rgba(232,255,71,.04) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(71,195,255,.04) 0%,transparent 60%)",pointerEvents:"none"}}/>
      <button onClick={()=>setDark(!dark)} style={{position:"fixed",top:20,right:20,background:"var(--card)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 14px",cursor:"pointer",color:"var(--text2)",display:"flex",alignItems:"center",gap:7,fontFamily:"var(--display)",fontWeight:600,fontSize:13,zIndex:10}}>
        {dark?<ISun/>:<IMoon/>}{dark?"Claro":"Escuro"}
      </button>
      <div className="animate-in" style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{width:56,height:56,background:"var(--accent)",borderRadius:14,display:"inline-flex",alignItems:"center",justifyContent:"center",color:"#0a0a0b",marginBottom:16}}><IVault s={28}/></div>
          <h1 style={{fontSize:28,fontWeight:800,letterSpacing:"-.02em"}}>PromptVault</h1>
          <p style={{color:"var(--text2)",fontFamily:"var(--mono)",fontSize:12,marginTop:6}}>Seu banco de prompts seguro</p>
        </div>
        <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:32}}>
          <p style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--text2)",textAlign:"center",marginBottom:24,lineHeight:1.6}}>
            Entre com sua conta Google para acessar seus prompts de qualquer lugar.
          </p>
          {err && <div style={{background:"rgba(255,71,87,.08)",border:"1px solid rgba(255,71,87,.3)",borderRadius:8,padding:"10px 14px",fontFamily:"var(--mono)",fontSize:12,color:"var(--danger)",marginBottom:16}}>{err}</div>}
          <button onClick={loginGoogle} disabled={loading}
            style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:12,padding:"13px 20px",background:"#fff",border:"1px solid #ddd",borderRadius:10,cursor:"pointer",fontFamily:"var(--display)",fontWeight:700,fontSize:14,color:"#1a1a1a",transition:"all .2s",boxShadow:"0 2px 8px rgba(0,0,0,.1)"}}>
            {loading ? <><div className="spinner spinner-sm" style={{borderTopColor:"#4285f4"}}/> Aguarde...</> : <><IGoog/> Entrar com Google</>}
          </button>
        </div>
        <p style={{textAlign:"center",color:"var(--muted)",fontFamily:"var(--mono)",fontSize:11,marginTop:24}}>Autenticação segura via Supabase + Google OAuth</p>
        <p style={{textAlign:"center",color:"var(--muted)",fontFamily:"var(--mono)",fontSize:10,marginTop:12,padding:"8px 12px",background:"var(--card)",borderRadius:8,border:"1px solid var(--border)"}}>
          Para abrir o PromptVault após o login, adicione esta URL no Supabase:<br/>
          <strong style={{color:"var(--accent)",wordBreak:"break-all"}}>{typeof window !== 'undefined' ? window.location.origin + (window.location.pathname || '/') : ''}</strong><br/>
          <span style={{fontSize:9}}>Supabase → Authentication → URL Configuration → Redirect URLs</span>
        </p>
      </div>
    </div>
  );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = ({setRoute, setEditingPrompt, userId, showToast}) => {
  const [search,setSearch]=useState(""); const [catFilter,setCatFilter]=useState("");
  const [prompts,setPrompts]=useState([]); const [cats,setCats]=useState([]);
  const [loading,setLoading]=useState(true); const [copied,setCopied]=useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [rp,rc] = await Promise.all([
      sb.from("prompts").select("*").eq("user_id",userId).order("created_at",{ascending:false}),
      sb.from("prompt_categories").select("*").eq("user_id",userId).order("name")
    ]);
    setPrompts(rp.data||[]); setCats(rc.data||[]); setLoading(false);
  },[userId]);

  useEffect(()=>{load();},[load]);

  const filtered = prompts.filter(p =>
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase())) &&
    (catFilter ? p.category_id===catFilter : true)
  );

  const catName = id => cats.find(c=>c.id===id)?.name || "—";
  const copy = p => { navigator.clipboard.writeText(p.content); setCopied(p.id); setTimeout(()=>setCopied(null),1800); };
  const del = async id => {
    if(!confirm("Excluir este prompt?")) return;
    const {error} = await sb.from("prompts").delete().eq("id",id);
    if(error){ showToast("Erro ao excluir","error"); return; }
    setPrompts(prev=>prev.filter(p=>p.id!==id));
    showToast("Prompt excluído","success");
  };

  if(loading) return <div className="center-screen"><div className="spinner"/></div>;

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px"}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:32,flexWrap:"wrap",gap:16}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:800,letterSpacing:"-.02em"}}>Meus Prompts</h2>
          <p style={{color:"var(--text2)",fontFamily:"var(--mono)",fontSize:12,marginTop:4}}>{filtered.length} encontrado{filtered.length!==1?"s":""}</p>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn btn-secondary" onClick={()=>setRoute("categories")}><ITag/> Categorias</button>
          <button className="btn btn-primary" onClick={()=>{setEditingPrompt(null);setRoute("new-prompt");}}><IPlus/> Novo Prompt</button>
        </div>
      </div>
      <div style={{display:"flex",gap:12,marginBottom:28,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:220,position:"relative"}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"var(--muted)"}}><ISearch/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar prompts..." style={{paddingLeft:40}}/>
        </div>
        <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} style={{width:"auto",minWidth:180}}>
          <option value="">Todas as categorias</option>
          {cats.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      {filtered.length===0
        ? <div style={{textAlign:"center",padding:"80px 0",color:"var(--muted)"}}><p style={{fontFamily:"var(--mono)",fontSize:14}}>{prompts.length===0?"Nenhum prompt ainda. Crie o primeiro! 🚀":"Nenhum resultado."}</p></div>
        : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
            {filtered.map((p,i)=>(
              <div key={p.id} className="card animate-in" style={{animationDelay:`${i*.04}s`,display:"flex",flexDirection:"column",gap:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <h3 style={{fontWeight:700,fontSize:15,lineHeight:1.3,flex:1}}>{p.title}</h3>
                  <span className="tag">{catName(p.category_id)}</span>
                </div>
                <p style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--text2)",lineHeight:1.6,flex:1,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}>{p.content}</p>
                <div style={{display:"flex",gap:8,marginTop:4}}>
                  <button className="btn btn-ghost btn-sm" style={{flex:1,justifyContent:"center"}} onClick={()=>copy(p)}><ICopy/>{copied===p.id?"Copiado!":"Copiar"}</button>
                  <button className="btn btn-secondary btn-sm" onClick={()=>{setEditingPrompt(p);setRoute("new-prompt");}}><IEdit/></button>
                  <button onClick={()=>del(p.id)} style={{background:"rgba(255,71,87,.1)",color:"var(--danger)",border:"1px solid rgba(255,71,87,.25)",borderRadius:"var(--radius)",cursor:"pointer",padding:"6px 10px",display:"flex",alignItems:"center"}}><ITrash/></button>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
};

// ─── Prompt Form ──────────────────────────────────────────────────────────────
const PromptForm = ({setRoute, editingPrompt, userId, showToast}) => {
  const [title,setTitle]=useState(editingPrompt?.title||"");
  const [catId,setCatId]=useState(editingPrompt?.category_id||"");
  const [content,setContent]=useState(editingPrompt?.content||"");
  const [cats,setCats]=useState([]); const [saving,setSaving]=useState(false);

  useEffect(()=>{ sb.from("prompt_categories").select("*").eq("user_id",userId).order("name").then(({data})=>setCats(data||[])); },[]);

  const save = async () => {
    if(!title.trim()||!content.trim()){showToast("Título e conteúdo obrigatórios","error");return;}
    setSaving(true);
    const payload = {title, content, category_id: catId||null, user_id: userId};
    const {error} = editingPrompt
      ? await sb.from("prompts").update(payload).eq("id",editingPrompt.id)
      : await sb.from("prompts").insert(payload);
    if(error){showToast("Erro: "+error.message,"error");setSaving(false);return;}
    showToast(editingPrompt?"Prompt atualizado!":"Prompt criado!","success");
    setRoute("dashboard");
  };

  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"40px 24px"}}>
      <button className="btn btn-ghost btn-sm" style={{marginBottom:24}} onClick={()=>setRoute("dashboard")}><IBack/> Voltar</button>
      <h2 style={{fontSize:24,fontWeight:800,marginBottom:32,letterSpacing:"-.02em"}}>{editingPrompt?"Editar Prompt":"Novo Prompt"}</h2>
      <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:32}}>
        <div className="field"><label className="label">Título</label><input placeholder="Ex: Landing page persuasiva" value={title} onChange={e=>setTitle(e.target.value)}/></div>
        <div className="field">
          <label className="label">Categoria</label>
          <select value={catId} onChange={e=>setCatId(e.target.value)}>
            <option value="">Sem categoria</option>
            {cats.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="field"><label className="label">Conteúdo</label><textarea placeholder="Escreva o prompt. Use {{variavel}} para partes dinâmicas..." value={content} onChange={e=>setContent(e.target.value)} style={{minHeight:220}}/></div>
        <div style={{display:"flex",gap:12,justifyContent:"flex-end"}}>
          <button className="btn btn-secondary" onClick={()=>setRoute("dashboard")}>Cancelar</button>
          <button className="btn btn-primary" onClick={save} disabled={saving}>
            {saving?<><div className="spinner spinner-sm"/> Salvando...</>:"Salvar Prompt"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Categories ───────────────────────────────────────────────────────────────
const Categories = ({setRoute, userId, showToast}) => {
  const [cats,setCats]=useState([]); const [name,setName]=useState("");
  const [editId,setEditId]=useState(null); const [editName,setEditName]=useState("");
  const [loading,setLoading]=useState(true);

  useEffect(()=>{ sb.from("prompt_categories").select("*").eq("user_id",userId).order("name").then(({data})=>{setCats(data||[]);setLoading(false);}); },[]);

  const add = async () => {
    if(!name.trim()) return;
    const {data,error} = await sb.from("prompt_categories").insert({name:name.trim(),user_id:userId}).select().single();
    if(error){showToast("Erro: "+error.message,"error");return;}
    setCats(prev=>[...prev,data].sort((a,b)=>a.name.localeCompare(b.name)));
    setName(""); showToast("Categoria criada!","success");
  };

  const del = async id => {
    if(!confirm("Excluir esta categoria?")) return;
    const {error} = await sb.from("prompt_categories").delete().eq("id",id);
    if(error){showToast("Erro: "+error.message,"error");return;}
    setCats(prev=>prev.filter(c=>c.id!==id)); showToast("Categoria excluída","success");
  };

  const sv = async () => {
    if(!editName.trim()) return;
    const {error} = await sb.from("prompt_categories").update({name:editName.trim()}).eq("id",editId);
    if(error){showToast("Erro: "+error.message,"error");return;}
    setCats(prev=>prev.map(c=>c.id===editId?{...c,name:editName.trim()}:c));
    setEditId(null); showToast("Categoria atualizada!","success");
  };

  if(loading) return <div className="center-screen"><div className="spinner"/></div>;

  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"40px 24px"}}>
      <button className="btn btn-ghost btn-sm" style={{marginBottom:24}} onClick={()=>setRoute("dashboard")}><IBack/> Voltar</button>
      <h2 style={{fontSize:24,fontWeight:800,marginBottom:8,letterSpacing:"-.02em"}}>Gerenciar Categorias</h2>
      <p style={{color:"var(--text2)",fontFamily:"var(--mono)",fontSize:12,marginBottom:32}}>{cats.length} categoria{cats.length!==1?"s":""}</p>
      <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:24,marginBottom:24}}>
        <label className="label">Nova Categoria</label>
        <div style={{display:"flex",gap:10}}>
          <input placeholder="Nome da categoria..." value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}/>
          <button className="btn btn-primary" style={{whiteSpace:"nowrap"}} onClick={add}><IPlus/> Adicionar</button>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {cats.length===0 && <p style={{textAlign:"center",color:"var(--muted)",fontFamily:"var(--mono)",fontSize:13,padding:"20px 0"}}>Nenhuma categoria ainda.</p>}
        {cats.map((c,i)=>(
          <div key={c.id} className="card animate-in" style={{animationDelay:`${i*.04}s`,display:"flex",alignItems:"center",gap:12}}>
            {editId===c.id
              ? <><input value={editName} onChange={e=>setEditName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sv()} style={{flex:1}} autoFocus/><button className="btn btn-primary btn-sm" onClick={sv}>Salvar</button><button className="btn btn-ghost btn-sm" onClick={()=>setEditId(null)}>Cancelar</button></>
              : <><span style={{flex:1,fontWeight:600}}>{c.name}</span><button className="btn btn-secondary btn-sm" onClick={()=>{setEditId(c.id);setEditName(c.name);}}><IEdit/> Editar</button><button onClick={()=>del(c.id)} style={{background:"rgba(255,71,87,.1)",color:"var(--danger)",border:"1px solid rgba(255,71,87,.25)",borderRadius:"var(--radius)",cursor:"pointer",padding:"6px 10px",display:"flex",alignItems:"center"}}><ITrash/></button></>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Export ───────────────────────────────────────────────────────────────────
const Export = ({setRoute, userId, showToast}) => {
  const [cats,setCats]=useState([]); const [catFilter,setCatFilter]=useState("");
  const [prompts,setPrompts]=useState([]); const [exp,setExp]=useState(false);

  useEffect(()=>{
    Promise.all([
      sb.from("prompt_categories").select("*").eq("user_id",userId).order("name"),
      sb.from("prompts").select("*").eq("user_id",userId)
    ]).then(([rc,rp])=>{setCats(rc.data||[]);setPrompts(rp.data||[]);});
  },[]);

  const exportF = () => {
    setExp(true);
    const items = catFilter ? prompts.filter(p=>p.category_id===catFilter) : prompts;
    const cn = catFilter ? cats.find(c=>c.id===catFilter)?.name : "Todos os Prompts";
    const h = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><title>PromptVault</title><style>body{font-family:Georgia,serif;max-width:750px;margin:40px auto;padding:0 24px;color:#1a1a2e;}h1{font-size:24px;border-bottom:3px solid #e8ff47;padding-bottom:12px;margin-bottom:20px;}.p{margin-bottom:28px;padding:20px;border:1px solid #e0e0e0;border-radius:8px;}.p h2{font-size:16px;margin-bottom:6px;}.cat{display:inline-block;background:#f0f9ff;color:#0077aa;padding:2px 10px;border-radius:99px;font-size:11px;font-family:monospace;margin-bottom:10px;}.p pre{font-family:monospace;font-size:13px;white-space:pre-wrap;line-height:1.6;}</style></head><body><h1>PromptVault — ${cn}</h1>${items.map(p=>{const c=cats.find(x=>x.id===p.category_id)?.name||"Sem categoria";return`<div class="p"><h2>${p.title}</h2><span class="cat">${c}</span><pre>${p.content}</pre></div>`;}).join("")}</body></html>`;
    const a=document.createElement("a");a.href="data:text/html;charset=utf-8,"+encodeURIComponent(h);a.download=`promptvault-${cn.toLowerCase().replace(/ /g,"-")}.html`;document.body.appendChild(a);a.click();document.body.removeChild(a);
    showToast("Exportado com sucesso!","success");
    setTimeout(()=>setExp(false),800);
  };

  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"40px 24px"}}>
      <button className="btn btn-ghost btn-sm" style={{marginBottom:24}} onClick={()=>setRoute("dashboard")}><IBack/> Voltar</button>
      <h2 style={{fontSize:24,fontWeight:800,marginBottom:8,letterSpacing:"-.02em"}}>Exportar</h2>
      <p style={{color:"var(--text2)",fontFamily:"var(--mono)",fontSize:12,marginBottom:32}}>Exporte seus prompts como HTML/PDF.</p>
      <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:28}}>
        <h3 style={{fontWeight:700,marginBottom:6}}>Exportar Relatório</h3>
        <p style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--text2)",marginBottom:20,lineHeight:1.6}}>Gera HTML. Use Ctrl+P para salvar como PDF.</p>
        <div className="field">
          <label className="label">Categoria</label>
          <select value={catFilter} onChange={e=>setCatFilter(e.target.value)}>
            <option value="">Todos os prompts ({prompts.length})</option>
            {cats.map(c=><option key={c.id} value={c.id}>{c.name} ({prompts.filter(p=>p.category_id===c.id).length})</option>)}
          </select>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <span style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--muted)"}}>{(catFilter?prompts.filter(p=>p.category_id===catFilter):prompts).length} prompt(s)</span>
          <button className="btn btn-primary" onClick={exportF} disabled={exp}><IDown/>{exp?"Gerando...":"Exportar PDF"}</button>
        </div>
      </div>
    </div>
  );
};

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user,setUser]=useState(null); const [route,setRoute]=useState("dashboard");
  const [editing,setEditing]=useState(null); const [dark,setDark]=useState(true);
  const [prd,setPrd]=useState(false); const [authLoading,setAuthLoading]=useState(true);
  const [toast,setToast]=useState(null);

  const showToast = (msg, type="success") => setToast({msg,type});

  useEffect(()=>{ document.body.className = dark?"dark":"light"; },[dark]);

  useEffect(()=>{
    // Trata o callback de autenticação OAuth
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await sb.auth.getSession();
      if (error) {
        console.error('Erro ao obter sessão:', error);
      }
      setUser(session?.user || null);
      setAuthLoading(false);
      
      // Limpa o hash da URL após processar o callback
      if (window.location.hash.includes('access_token') || window.location.hash.includes('error')) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };
    
    handleAuthCallback();
    
    // Escuta mudanças no estado de autenticação
    const {data:{subscription}} = sb.auth.onAuthStateChange((event, session)=>{
      setUser(session?.user||null);
      if (event === 'SIGNED_IN') {
        setAuthLoading(false);
      }
    });
    
    return () => subscription.unsubscribe();
  },[]);

  const logout = async () => { await sb.auth.signOut(); setUser(null); setRoute("dashboard"); };

  const saveVaultFromPRD = async raw => {
    const title = raw.split("\n")[0].replace(/^#\s*/,"").slice(0,60)||"PRD Gerado";
    const {error} = await sb.from("prompts").insert({title, content:raw, user_id:user.id, category_id:null});
    if(error){ showToast("Erro ao salvar: "+error.message,"error"); }
    else { showToast(`"${title}" salvo no Vault!`,"success"); setPrd(false); }
  };

  if(authLoading) return (
    <>
      <GlobalStyle/>
      <div className="center-screen">
        <div className="spinner"/>
        <p style={{fontFamily:"var(--mono)",fontSize:13,color:"var(--text2)"}}>Conectando...</p>
      </div>
    </>
  );

  if(!user) return <><GlobalStyle/><Login dark={dark} setDark={setDark}/></>;

  return <>
    <GlobalStyle/>
    <Topbar route={route} setRoute={setRoute} user={user} onLogout={logout} dark={dark} setDark={setDark} onPRD={()=>setPrd(true)}/>
    <main>
      {route==="dashboard"  && <Dashboard setRoute={setRoute} setEditingPrompt={setEditing} userId={user.id} showToast={showToast}/>}
      {route==="new-prompt" && <PromptForm setRoute={setRoute} editingPrompt={editing} userId={user.id} showToast={showToast}/>}
      {route==="categories" && <Categories setRoute={setRoute} userId={user.id} showToast={showToast}/>}
      {route==="export"     && <Export setRoute={setRoute} userId={user.id} showToast={showToast}/>}
    </main>
    {prd && <PRDModal onClose={()=>setPrd(false)} onSave={saveVaultFromPRD}/>}
    {toast && <Toast msg={toast.msg} type={toast.type} onHide={()=>setToast(null)}/>}
  </>;
}
