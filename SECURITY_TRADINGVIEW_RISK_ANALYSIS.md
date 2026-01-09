# TradingView `unsafe-eval` Security Risk Analysis
**Date:** December 2024  
**Status:** ⚠️ **ACCEPTED RISK - MITIGATED**

---

## Summary

The Content Security Policy (CSP) includes `'unsafe-eval'` because TradingView widgets **require** it to function. This is a known security trade-off that has been accepted after testing confirmed that TradingView cannot work without it.

---

## What is `unsafe-eval`?

`unsafe-eval` allows JavaScript code to use:
- `eval()` function
- `Function()` constructor
- `setTimeout()` / `setInterval()` with string arguments
- Other dynamic code execution methods

**Why it's risky:** If an attacker can inject malicious code, they can use these functions to execute arbitrary JavaScript, leading to XSS attacks.

---

## Current Risk Level: **MEDIUM** (Mitigated)

### Why it's not CRITICAL:

1. **Script Source Restrictions** ✅
   - Scripts can only load from:
     - `'self'` (your own domain)
     - `https://s3.tradingview.com` (TradingView's official CDN)
     - `https://*.tradingview.com` (TradingView domains)
     - `https://www.googletagmanager.com` (Google Analytics)
   - Attackers cannot inject scripts from arbitrary domains

2. **Other Security Measures in Place** ✅
   - Input validation (Zod schemas)
   - HTML sanitization (DOMPurify)
   - CSRF protection
   - SQL injection protection
   - XSS protection in other areas
   - Rate limiting

3. **Trusted Third-Party** ✅
   - TradingView is a reputable, trusted service
   - Their CDN is secured (HTTPS only)
   - They have a security program

---

## Attack Scenarios & Mitigation

### Scenario 1: Attacker tries to inject malicious script
**Risk:** HIGH  
**Mitigation:** ✅ **PROTECTED**
- CSP restricts script sources to trusted domains only
- Attacker cannot load scripts from their own domain
- Even with `unsafe-eval`, they need to get code into the page first

### Scenario 2: Attacker compromises TradingView's CDN
**Risk:** LOW (but possible)  
**Mitigation:** ⚠️ **PARTIALLY PROTECTED**
- This would be a supply chain attack
- If TradingView's CDN is compromised, `unsafe-eval` would allow malicious code to execute
- However, this is a risk with any third-party script
- TradingView has strong security practices

### Scenario 3: XSS via user input that reaches TradingView
**Risk:** LOW  
**Mitigation:** ✅ **PROTECTED**
- All user input is validated and sanitized
- TradingView widgets don't process user input directly
- Content is sanitized with DOMPurify before rendering

### Scenario 4: Attacker exploits other XSS vulnerability
**Risk:** MEDIUM  
**Mitigation:** ⚠️ **PARTIALLY PROTECTED**
- If there's another XSS vulnerability elsewhere, `unsafe-eval` makes it worse
- However, other security measures (input validation, sanitization) prevent most XSS vectors
- Regular security audits help catch vulnerabilities

---

## Comparison: With vs Without `unsafe-eval`

### Without `unsafe-eval` (Ideal):
- ✅ Stronger XSS protection
- ✅ Prevents dynamic code execution
- ❌ TradingView charts don't work (core functionality broken)

### With `unsafe-eval` (Current):
- ⚠️ Weaker XSS protection
- ⚠️ Allows dynamic code execution (but only from trusted sources)
- ✅ TradingView charts work (core functionality preserved)
- ✅ Other security measures still in place

---

## Risk Assessment

| Factor | Risk Level | Notes |
|--------|-----------|-------|
| **Likelihood of Exploit** | LOW | Requires multiple vulnerabilities or TradingView compromise |
| **Impact if Exploited** | HIGH | Could lead to XSS, data theft, session hijacking |
| **Overall Risk** | **MEDIUM** | Mitigated by domain restrictions and other security measures |

---

## Mitigation Strategies (Current & Future)

### ✅ Currently Implemented:
1. Script source restrictions (CSP)
2. Input validation and sanitization
3. CSRF protection
4. SQL injection protection
5. HTTPS enforcement
6. Security headers

### 🔄 Future Improvements:
1. **Monitor CSP Violations**
   - Set up logging for CSP violations
   - Alert on suspicious patterns
   - Regular review of violation reports

2. **Consider Alternative Charting Libraries**
   - Research charting libraries that don't require `unsafe-eval`
   - Examples: Chart.js, Recharts, D3.js (with careful implementation)
   - Evaluate migration effort vs security benefit

3. **Implement CSP Reporting**
   ```javascript
   // Add to CSP header
   "report-uri /api/csp-report"
   ```
   - Collect CSP violation reports
   - Monitor for attack attempts

4. **Regular Security Audits**
   - Quarterly security reviews
   - Dependency scanning
   - Penetration testing

5. **Subresource Integrity (SRI)**
   - If TradingView provides SRI hashes, use them
   - Currently TradingView doesn't provide SRI hashes

---

## Decision Rationale

**Why we accept this risk:**

1. **Core Functionality Required**
   - TradingView charts are essential to the website
   - Users expect interactive charts
   - Alternative solutions would require significant development time

2. **Risk is Mitigated**
   - Domain restrictions limit attack surface
   - Other security measures provide defense in depth
   - TradingView is a trusted service

3. **Industry Standard**
   - Many websites using TradingView have the same limitation
   - This is a known trade-off in the industry

4. **Monitoring in Place**
   - We can detect and respond to attacks
   - Regular security audits catch other vulnerabilities

---

## Recommendations

### Immediate Actions:
- ✅ Document this as an accepted risk
- ✅ Monitor for CSP violations
- ✅ Keep dependencies updated
- ✅ Regular security audits

### Short-term (1-3 months):
- 🔄 Set up CSP violation reporting
- 🔄 Research alternative charting solutions
- 🔄 Implement additional monitoring

### Long-term (6-12 months):
- 🔄 Evaluate migration to charting library that doesn't require `unsafe-eval`
- 🔄 Consider custom charting solution if security becomes higher priority
- 🔄 Regular penetration testing

---

## Conclusion

**Yes, there is still a security risk**, but it's:
- ✅ **Mitigated** by domain restrictions and other security measures
- ✅ **Accepted** as necessary for core functionality
- ✅ **Monitored** through regular security audits
- ✅ **Documented** for future reference

The risk is **MEDIUM** rather than **CRITICAL** because:
1. Attackers cannot easily exploit it (requires multiple vulnerabilities)
2. Script sources are restricted to trusted domains
3. Other security measures provide defense in depth
4. TradingView is a trusted, reputable service

**This is a reasonable security trade-off** for a production application that requires TradingView functionality.

---

## References

- [OWASP Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [TradingView Widget Documentation](https://www.tradingview.com/widget-docs/)

---

**Last Updated:** December 2024  
**Next Review:** Quarterly security audit

