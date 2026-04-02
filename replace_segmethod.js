const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\r\n');

console.log('Total lines before:', lines.length);
console.log('Line 522 (idx 521):', lines[521].substring(0, 60));
console.log('Line 801 (idx 800):', lines[800]);

// Verify the function boundaries
const startLine = 521; // 0-indexed, line 522
const endLine = 800;   // 0-indexed, line 801 (inclusive)
const count = endLine - startLine + 1; // lines to remove

const newFunc = `    /* \u2500\u2500 SEGMENTO 3 \u2014 M\u00e9todo de trabajo \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    function SegMethod({ t }) {
      const tm = t.method;
      const wf = tm.workflow || [];

      /* Colores del dise\u00f1o resumen_metodologia */
      const M = {
        blue:   '#283897',
        orange: '#d4652a',
        purple: '#6B3FA0',
        teal:   '#1a7a80',
        green:  '#1e8a4a',
        red:    '#cc2200',
        dark:   '#2A295C',
      };
      const stepColors = [M.blue, M.orange, M.purple, M.teal];

      /* SVG icons for workflow steps */
      const STEP_ICONS = [
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '55%', height: '55%' }}>
          <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M2 13h20" />
        </svg>,
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '55%', height: '55%' }}>
          <polygon points="12 2 2 7 22 7" /><rect x="4" y="10" width="2" height="8" /><rect x="9" y="10" width="2" height="8" /><rect x="14" y="10" width="2" height="8" /><rect x="19" y="10" width="2" height="8" /><rect x="2" y="19" width="20" height="2" />
        </svg>,
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '55%', height: '55%' }}>
          <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>,
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '55%', height: '55%' }}>
          <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>,
      ];

      /* Flecha simple */
      const SimpleArrow = () => (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'clamp(26px, 3.2vw, 46px)' }}>
          <div style={{ width: 'clamp(10px, 1.8vw, 20px)', height: 2, background: '#c8cfe8' }} />
          <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '7px solid #c8cfe8' }} />
        </div>
      );

      /* Gate de decisi\u00f3n (aprobado / no contin\u00faa) */
      const DecisionGate = () => (
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 'clamp(68px, 8.5vw, 108px)', gap: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
            <span style={{ color: M.green, fontSize: 'clamp(0.44rem, 0.68vw, 0.58rem)', fontWeight: 800, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>\u2713 {tm.approved}</span>
            <div style={{ flex: 1, height: 2, background: M.green, minWidth: 8 }} />
            <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '7px solid ' + M.green }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#fdecea', border: '1px solid #f5c0b8', borderRadius: 6, padding: '3px 7px' }}>
            <span style={{ color: M.red, fontSize: '0.72rem', fontWeight: 700 }}>\u2715</span>
            <span style={{ color: M.red, fontSize: 'clamp(0.42rem, 0.63vw, 0.56rem)', fontWeight: 700, whiteSpace: 'nowrap' }}>{tm.notContinue}</span>
          </div>
        </div>
      );

      /* Tarjeta de flujo */
      const WfCard = ({ step, color, iconEl }) => (
        <div style={{ flex: 1, background: 'white', borderRadius: 12, border: '1px solid #e0e4f0', borderTopWidth: 3, borderTopColor: color, boxShadow: '0 2px 10px rgba(40,56,151,0.07)', padding: 'clamp(0.45rem, 0.8vw, 0.85rem) clamp(0.4rem, 0.7vw, 0.75rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: 0, overflow: 'hidden' }}>
          <div style={{ width: 'clamp(30px, 3.6vw, 44px)', height: 'clamp(30px, 3.6vw, 44px)', borderRadius: step.members ? 10 : '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'clamp(0.3rem, 0.5vw, 0.5rem)', flexShrink: 0 }}>{iconEl}</div>
          <div style={{ color, fontSize: 'clamp(0.54rem, 0.88vw, 0.74rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'Arial, sans-serif', marginBottom: 'clamp(0.2rem, 0.35vw, 0.35rem)', lineHeight: 1.25 }}>{step.title}</div>
          <p style={{ fontSize: 'clamp(0.47rem, 0.73vw, 0.64rem)', color: '#555', lineHeight: 1.5, margin: '0 0 clamp(0.25rem, 0.4vw, 0.4rem)', flex: step.members ? 0 : 1 }}>{step.text}</p>
          {step.members && (
            <div style={{ width: '100%', borderTop: '1px solid #eef0f8', paddingTop: 'clamp(0.25rem, 0.45vw, 0.4rem)', flex: 1, minHeight: 0 }}>
              <div style={{ fontSize: 'clamp(0.42rem, 0.6vw, 0.53rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#bbb', marginBottom: 3, textAlign: 'center' }}>{tm.composedBy}</div>
              {step.members.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '1px 0', textAlign: 'left' }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ color: '#555', fontSize: 'clamp(0.41rem, 0.63vw, 0.56rem)' }}>{m}</span>
                </div>
              ))}
            </div>
          )}
          {step.badges && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, marginTop: 'clamp(0.25rem, 0.45vw, 0.4rem)', width: '100%' }}>
              {step.badges.map((b, i) => (
                <span key={i} style={{ background: color, color: 'white', borderRadius: 20, padding: '2px clamp(5px, 0.6vw, 8px)', fontSize: 'clamp(0.41rem, 0.62vw, 0.56rem)', fontWeight: 700 }}>{b}</span>
              ))}
            </div>
          )}
        </div>
      );

      const bullets = tm.bullets || [];
      const bulletColors = [M.blue, M.orange, M.purple];
      const aiData = (tm.stackSummary || [])[3] || {};

      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f4f6fb' }}>

          {/* \u2500\u2500 Pills \u2500\u2500 */}
          <div style={{ display: 'flex', gap: 'clamp(0.5rem, 1.2vw, 1rem)', justifyContent: 'center', padding: 'clamp(0.3rem, 0.55vw, 0.5rem) 1.5rem clamp(0.2rem, 0.4vw, 0.35rem)', flexShrink: 0, flexWrap: 'wrap' }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'white', border: '1px solid #e0e4f0', borderRadius: 30, padding: 'clamp(0.2rem, 0.35vw, 0.32rem) clamp(0.6rem, 1vw, 1rem)', boxShadow: '0 2px 8px rgba(40,56,151,0.07)', fontSize: 'clamp(0.58rem, 0.92vw, 0.76rem)', fontWeight: 700, color: M.dark }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: bulletColors[i] || M.blue, flexShrink: 0 }} />
                {b}
              </div>
            ))}
          </div>

          {/* \u2500\u2500 Flujo principal \u2500\u2500 */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'stretch', padding: 'clamp(0.2rem, 0.4vw, 0.35rem) clamp(0.6rem, 1.4vw, 1.2rem)' }}>
            {wf.map((step, i) => (
              <React.Fragment key={i}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                  <div style={{ fontSize: 'clamp(0.47rem, 0.72vw, 0.61rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b0b8d0', marginBottom: 'clamp(0.2rem, 0.38vw, 0.38rem)', textAlign: 'center' }}>{step.label}</div>
                  <WfCard step={step} color={stepColors[i]} iconEl={STEP_ICONS[i]} />
                </div>
                {i < wf.length - 1 && (step.gate ? <DecisionGate /> : <SimpleArrow />)}
              </React.Fragment>
            ))}
          </div>

          {/* Separador */}
          <div style={{ height: 1, background: '#e0e4f0', flexShrink: 0, margin: '0 1.2rem' }} />

          {/* \u2500\u2500 Secci\u00f3n inferior: 3 tarjetas \u2500\u2500 */}
          <div style={{ display: 'flex', gap: 'clamp(0.5rem, 0.9vw, 0.85rem)', padding: 'clamp(0.3rem, 0.55vw, 0.5rem) clamp(0.6rem, 1.4vw, 1.2rem) clamp(0.3rem, 0.55vw, 0.5rem)', flex: '0 0 auto', height: 'clamp(130px, 30%, 210px)' }}>

            {/* Seguridad */}
            <div style={{ flex: 1, background: 'white', borderRadius: 12, border: '1px solid #e0e4f0', borderTopWidth: 4, borderTopColor: M.red, boxShadow: '0 2px 10px rgba(40,56,151,0.07)', padding: 'clamp(0.5rem, 0.85vw, 0.8rem) clamp(0.55rem, 0.9vw, 0.85rem)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ color: M.red, fontWeight: 800, fontSize: 'clamp(0.63rem, 1vw, 0.83rem)', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'Arial, sans-serif', marginBottom: 4 }}>{tm.securityTitle || 'Seguridad'}</div>
              <p style={{ fontSize: 'clamp(0.53rem, 0.82vw, 0.7rem)', color: '#555', lineHeight: 1.55, margin: 0, flex: 1 }}>{tm.securityDesc || 'Todos los proyectos pasan por el proceso de seguridad regional.'}</p>
              <div style={{ textAlign: 'center', fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)', marginTop: 'auto', paddingTop: 3 }}>\uD83D\uDD12</div>
            </div>

            {/* Tipos de Soluci\u00f3n */}
            <div style={{ flex: 1, background: 'white', borderRadius: 12, border: '1px solid #e0e4f0', borderTopWidth: 4, borderTopColor: M.blue, boxShadow: '0 2px 10px rgba(40,56,151,0.07)', padding: 'clamp(0.5rem, 0.85vw, 0.8rem) clamp(0.55rem, 0.9vw, 0.85rem)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ color: M.blue, fontWeight: 800, fontSize: 'clamp(0.63rem, 1vw, 0.83rem)', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'Arial, sans-serif', marginBottom: 4 }}>{tm.solutionTitle || 'Tipos de Soluci\u00f3n'}</div>
              <p style={{ fontSize: 'clamp(0.53rem, 0.82vw, 0.7rem)', color: '#555', lineHeight: 1.55, margin: '0 0 5px' }}>{tm.solutionDesc || 'Trabajamos con las siguientes plataformas:'}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {(tm.solutionItems || []).map((item, i) => (
                  <div key={i} style={{ background: '#f0f2f8', borderRadius: 5, padding: 'clamp(2px, 0.3vw, 4px) clamp(5px, 0.7vw, 9px)', fontSize: 'clamp(0.5rem, 0.78vw, 0.66rem)', color: M.dark, fontWeight: 600 }}>{item}</div>
                ))}
              </div>
              <div style={{ textAlign: 'center', fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)', marginTop: 'auto', paddingTop: 3 }}>\uD83D\uDCBB</div>
            </div>

            {/* Inteligencia Artificial */}
            <div style={{ flex: 1, background: 'white', borderRadius: 12, border: '1px solid #e0e4f0', borderTopWidth: 4, borderTopColor: M.purple, boxShadow: '0 2px 10px rgba(40,56,151,0.07)', padding: 'clamp(0.5rem, 0.85vw, 0.8rem) clamp(0.55rem, 0.9vw, 0.85rem)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ color: M.purple, fontWeight: 800, fontSize: 'clamp(0.63rem, 1vw, 0.83rem)', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'Arial, sans-serif', marginBottom: 4 }}>{tm.aiTitle || 'Inteligencia Artificial'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                {(aiData.items || []).map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                    <span style={{ color: '#777', fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)', lineHeight: 1.3, flexShrink: 0 }}>\u2022</span>
                    <span style={{ fontSize: 'clamp(0.47rem, 0.73vw, 0.62rem)', color: '#444', lineHeight: 1.4 }}>
                      {item.text} <span style={{ color: M.green, fontWeight: 700, fontStyle: 'italic' }}>{item.status}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                {(aiData.stack || []).map((s, i) => (
                  <div key={i} style={{ background: '#f0f2f8', borderRadius: 5, padding: 'clamp(2px, 0.3vw, 4px) clamp(5px, 0.7vw, 9px)', fontSize: 'clamp(0.5rem, 0.78vw, 0.66rem)', color: M.dark, fontWeight: 600 }}>{s}</div>
                ))}
              </div>
            </div>

          </div>

          {/* Bot\u00f3n ver detalle */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 clamp(0.6rem, 1.4vw, 1.2rem) clamp(0.25rem, 0.45vw, 0.4rem)', flexShrink: 0 }}>
            <a
              href="pages/metodo_trabajo.html"
              style={{ background: M.blue, color: 'white', fontSize: 'clamp(0.53rem, 0.82vw, 0.7rem)', fontWeight: 700, padding: '0.28rem 0.85rem', borderRadius: 7, textDecoration: 'none', letterSpacing: '0.03em', transition: 'background 180ms ease' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1e2c7a'}
              onMouseLeave={e => e.currentTarget.style.background = M.blue}
            >
              {tm.viewDetail || 'ver detalle \u2192'}
            </a>
          </div>

        </div>
      );
    }`;

const newLines = newFunc.split('\n');

// Replace lines startLine..endLine (inclusive, 0-indexed)
lines.splice(startLine, count, ...newLines);

fs.writeFileSync('index.html', lines.join('\r\n'), 'utf8');
console.log('Done. New total lines:', lines.length);
console.log('Replaced', count, 'lines with', newLines.length, 'lines');
