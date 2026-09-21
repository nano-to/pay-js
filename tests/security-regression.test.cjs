const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const source = fs.readFileSync(path.join(__dirname, '..', 'pay.js'), 'utf8')

test('checkout template escapes caller and checkout display values', () => {
    assert.match(source, /const html = SecurityUtils\.escapeHTML/)
    assert.match(source, /\$\{html\(description\)\}/)
    assert.match(source, /\$\{html\(config\.disclaimer\)\}/)
    assert.match(source, /\$\{html\(button\)\}/)
    assert.match(source, /\$\{html\(item\.title \|\| item\.name\)\}/)
    assert.doesNotMatch(source, /<span id="nano-pay-submit-text">\$\{button\}/)
    assert.doesNotMatch(source, /safeTemplateHTML/)
})

test('paywall and automatic buttons do not serialize values into handlers', () => {
    assert.doesNotMatch(source, /onclick="window\.NanoPay\.unlock_request/)
    assert.doesNotMatch(source, /onclick="window\.NanoPay\.unlock_content\('/)
    assert.match(source, /unlockButton\.addEventListener\('click'/)
    assert.match(source, /button\.addEventListener\('click'/)
    assert.match(source, /document\.createTextNode\(config\.button \|\| 'Unlock with Nano'\)/)
    assert.match(source, /for \(let i=0, max=all\.length; i < max; i\+\+\)/)
})

test('CSS colors and line-item image URLs are restricted before rendering', () => {
    assert.match(source, /sanitizeColor: \(value, fallback\)/)
    assert.match(source, /sanitizeImageURL: \(value\)/)
    assert.match(source, /url\.protocol === 'https:' \|\| url\.protocol === 'http:'/)
    assert.match(source, /SecurityUtils\.sanitizeColor\(config\.backdrop/)
    assert.match(source, /SecurityUtils\.sanitizeImageURL\(item\.image\)/)
})
