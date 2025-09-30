# Screenshots & Performance Reports

This directory contains performance testing results, screenshots, and analysis reports.

## Directory Structure

```
screenshots/
├── lighthouse/     # Lighthouse performance reports
├── jmeter/         # JMeter load testing results
└── app/            # Application screenshots
```

## Lighthouse Reports

Performance, accessibility, best practices, and SEO scores.

### How to Generate

```bash
# Install Lighthouse
npm install -g lighthouse

# Run Lighthouse
lighthouse http://localhost:3000 --output html --output-path ./screenshots/lighthouse/report.html

# Or use Chrome DevTools (F12 → Lighthouse tab)
```

### Expected Scores
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 90+

## JMeter Load Testing

Load testing results and performance metrics.

### How to Run JMeter Tests

1. Download Apache JMeter from https://jmeter.apache.org/
2. Create a test plan:
   - Thread Group: 100-1000 users
   - HTTP Request: Target your API endpoints
   - Listeners: Summary Report, View Results Tree
3. Run test and export results
4. Save reports to `screenshots/jmeter/`

### Key Metrics
- Average Response Time
- Throughput (requests/second)
- Error Rate
- 90th Percentile Response Time

### Sample Test Plan

```xml
<!-- Target endpoints -->
GET /
GET /api/rooms
POST /api/rooms
GET /timer-demo
GET /escape
```

## Application Screenshots

Screenshots of the application UI and features.

### Recommended Screenshots

1. **Home Page**
   - Desktop view
   - Mobile view
   - Dark theme

2. **Escape Room Game**
   - Game in progress
   - Stage completion
   - Timer countdown

3. **Rooms Demo**
   - Room list
   - Create room form
   - Room details

4. **API Demo**
   - HTML Generator
   - Events logging
   - Database management

5. **Responsive Design**
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)

## Taking Screenshots

### Using Browser DevTools

1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select device size
4. Take screenshot (Ctrl+Shift+P → "Capture screenshot")

### Using Playwright

```javascript
// In your test file
await page.screenshot({ 
  path: 'screenshots/app/home-page.png',
  fullPage: true 
});
```

### Automated Screenshot Script

```bash
# Create a script to capture all pages
npx playwright test --headed --screenshot=on
```

## Performance Benchmarks

### Target Performance

| Metric | Target | Actual |
|--------|--------|--------|
| First Contentful Paint | < 1.5s | TBD |
| Largest Contentful Paint | < 2.5s | TBD |
| Time to Interactive | < 3.0s | TBD |
| Cumulative Layout Shift | < 0.1 | TBD |
| Total Blocking Time | < 300ms | TBD |

### Load Testing Targets

| Metric | Target | Actual |
|--------|--------|--------|
| Concurrent Users | 1000 | TBD |
| Avg Response Time | < 200ms | TBD |
| Throughput | > 100 req/s | TBD |
| Error Rate | < 0.1% | TBD |

## Accessibility Testing

### WCAG Compliance

- Level AA compliance required
- Color contrast ratios >= 4.5:1
- Keyboard navigation support
- Screen reader compatibility
- ARIA attributes present

### Tools

1. **Lighthouse** (accessibility score)
2. **axe DevTools** (detailed ARIA analysis)
3. **WAVE** (web accessibility evaluation)
4. **Screen Readers** (NVDA, JAWS, VoiceOver)

## Best Practices Checklist

- [ ] All images have alt text
- [ ] HTTPS enabled
- [ ] No console errors
- [ ] Valid HTML
- [ ] Proper meta tags
- [ ] Mobile-friendly
- [ ] Fast load times
- [ ] Accessible forms
- [ ] Semantic HTML
- [ ] Optimized images

## Continuous Monitoring

### Recommended Tools

1. **Lighthouse CI** - Automated Lighthouse checks
2. **WebPageTest** - Detailed performance analysis
3. **GTmetrix** - Performance monitoring
4. **Pingdom** - Uptime and speed monitoring

## Report Format

### Lighthouse Report Naming

```
lighthouse-[page]-[date].html
lighthouse-home-2024-09-30.html
lighthouse-api-2024-09-30.html
```

### JMeter Report Naming

```
jmeter-[test-type]-[users]-[date].jtl
jmeter-load-test-1000-users-2024-09-30.jtl
```

### Screenshot Naming

```
[page]-[view]-[theme]-[date].png
home-desktop-light-2024-09-30.png
escape-mobile-dark-2024-09-30.png
```

## Analysis

After collecting reports:

1. Review all Lighthouse scores
2. Identify performance bottlenecks
3. Analyze JMeter results for scalability
4. Check accessibility compliance
5. Document findings
6. Create improvement plan

## Resources

- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [JMeter User Manual](https://jmeter.apache.org/usermanual/)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
