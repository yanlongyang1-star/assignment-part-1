"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container, Row, Col, Nav, Tab, Button, Form, Card } from "react-bootstrap";

type Step = { key: string; title: string; lines: string[] };

const defaults: Step[] = [
  { key: "step1", title: "Step 1", lines: ["Read the brief", "Open VSCode"] },
  { key: "step2", title: "Step 2", lines: ["Install VSCode", "Install Chrome", "Install Node", "etc"] },
  { key: "step3", title: "Step 3", lines: ["Run dev server", "Commit to GitHub"] },
];

export default function TabsGeneratorPage() {
  const [tabs, setTabs] = useState<Step[]>(defaults);
  const [activeKey, setActiveKey] = useState<string>(defaults[1].key); // 默认 Step 2
  const outRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("activeStepKey");
    if (saved && tabs.some(t => t.key === saved)) setActiveKey(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("activeStepKey", activeKey);
  }, [activeKey]);

  const htmlText = useMemo(() => {
    const buttons = tabs.map((t, i) => `
<button role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${t.key===activeKey}"
  onclick="selectTab(${i})" style="border:1px solid #000;padding:.5rem .75rem;margin:.25rem;border-radius:8px;${t.key===activeKey?'font-weight:bold;':''}">
  ${t.title}
</button>`).join("");

    const panels = tabs.map((t, i) => `
<section role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}" ${t.key===activeKey?"":"hidden"}
  style="border:1px solid #000;border-radius:10px;padding:1rem;margin-top:1rem;max-width:420px;">
  <h3 style="margin-top:0">${t.title}</h3>
  <ol style="padding-left:1.25rem;margin:0">${t.lines.map(li=>`<li>${li}</li>`).join("")}</ol>
</section>`).join("");

    return `<!doctype html>
<meta charset="utf-8">
<title>Tabs Output</title>
<style>body{font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;margin:2rem;color:#111;background:#fff}</style>
<h1>Tabs</h1>
<nav aria-label="Tabs">${buttons}</nav>
${panels}
<script>
  function selectTab(i){
    const tabs=[...document.querySelectorAll('[role="tab"]')];
    const panels=[...document.querySelectorAll('[role="tabpanel"]')];
    tabs.forEach((t,idx)=>{ t.setAttribute('aria-selected', String(idx===i)); });
    panels.forEach((p,idx)=>{ if(idx===i){ p.removeAttribute('hidden'); } else { p.setAttribute('hidden',''); }});
  }
</script>`;
  }, [tabs, activeKey]);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(htmlText);
    alert("已复制！粘贴到 Hello.html 直接打开即可运行。");
  };

  const addStep = () => {
    const idx = tabs.length + 1;
    setTabs(prev => [...prev, { key: `step${idx}`, title: `Step ${idx}`, lines: ["Todo 1", "Todo 2"] }]);
    setActiveKey(`step${idx}`);
  };
  const removeStep = (key: string) => {
    const left = tabs.filter(t => t.key !== key);
    setTabs(left.length ? left : defaults);
    if (left.length) setActiveKey(left[0].key);
  };
  const updateLine = (key: string, i: number, v: string) => {
    setTabs(prev => prev.map(t => t.key===key ? ({...t, lines: t.lines.map((x,idx)=> idx===i ? v : x)}) : t));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col><h2 className="mb-3">Tabs Generator</h2></Col>
        <Col className="text-end">
          <Button variant="outline-primary" onClick={addStep} aria-label="Add step">＋ Add Step</Button>
        </Col>
      </Row>

      <Tab.Container activeKey={activeKey} onSelect={(k)=>k && setActiveKey(k)} defaultActiveKey={tabs[1].key}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {tabs.map(t => (
                <Nav.Item key={t.key} className="d-flex align-items-center justify-content-between">
                  <Nav.Link eventKey={t.key} className="flex-grow-1">{t.title}</Nav.Link>
                  <Button size="sm" variant="outline-secondary" className="ms-2"
                    onClick={()=>removeStep(t.key)} aria-label={`Remove ${t.title}`}>✕</Button>
                </Nav.Item>
              ))}
            </Nav>
          </Col>

          <Col sm={5}>
            <Tab.Content>
              {tabs.map(t => (
                <Tab.Pane key={t.key} eventKey={t.key}>
                  <Card className="mb-3">
                    <Card.Header className="fw-semibold">{t.title} Content</Card.Header>
                    <Card.Body>
                      <ol className="ps-3">
                        {t.lines.map((ln, i) => (
                          <li key={i} className="mb-2">
                            <Form.Control
                              value={ln}
                              onChange={(e)=>updateLine(t.key, i, e.currentTarget.value)}
                              aria-label={`Step ${t.title} line ${i+1}`}
                            />
                          </li>
                        ))}
                      </ol>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>

          <Col sm={4}>
            <div className="mb-2 d-flex align-items-center justify-content-between">
              <label htmlFor="output" className="form-label fw-semibold mb-0">Output</label>
              <Button size="sm" variant="outline-dark" onClick={copyHtml}>Copy</Button>
            </div>
            <Form.Control as="textarea" id="output" ref={outRef} rows={18} value={htmlText} readOnly />
            <small className="text-body-secondary d-block mt-2">
              复制上方代码保存为 <code>Hello.html</code>，双击打开即可运行（纯 HTML+JS，无依赖）。
            </small>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
