# CSP TradingView Fix

## Issue
TradingView charts were blocked by Content Security Policy (CSP) headers.

## Root Cause
The CSP was too restrictive and didn't allow all the domains and resources that TradingView widgets need:
- API connections to tradingview.com domains
- WebSocket connections (wss://)
- Frames from tradingview.com (not just s3.tradingview.com)
- Styles and fonts from tradingview.com

## Solution
Updated CSP in `next.config.js` to allow TradingView resources:

### Added Domains:
- `https://*.tradingview.com` to:
  - `script-src` - For widget scripts
  - `style-src` - For widget styles
  - `font-src` - For widget fonts
  - `connect-src` - For API calls and WebSocket connections
  - `frame-src` - For widget iframes
  - `child-src` - For nested browsing contexts

### Added Protocols:
- `wss://*.tradingview.com` to `connect-src` - For WebSocket connections

### Added Directives:
- `worker-src 'self' blob:` - For web workers

## Security Considerations
- Still maintains security by only allowing specific TradingView domains
- All connections are HTTPS/WSS only
- Other security headers remain intact
- No compromise on other CSP protections

## Testing
After deploying, verify:
1. TradingView charts load correctly
2. No CSP violations in browser console
3. Widget interactions work (zooming, timeframes, etc.)

## Files Modified
- `next.config.js` - Updated CSP headers

