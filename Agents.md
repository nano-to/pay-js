# Repository Relationship

The Nano.to ecosystem is centered on `~/nano-rpc`, which owns the RPC and
checkout server contracts, payment monitoring, webhooks, and production
behavior. Companion repositories include `~/nano-js` (client SDK), `~/pay-js`
(this NanoPay browser library), `~/nano-blog` (legacy documentation and
demonstrations), and `~/nano-docs` (current Nano.to documentation site).
Coordinate API, checkout, and documentation changes across these repositories.

`pay-js` is the NanoPay JavaScript payment library. The companion repository
`nano-blog` documents and demonstrates NanoPay, including the Nano Blog
paywall integration and the article at
`articles/introducing-nano-pay-simple-web-payments.md`.

Some fixes span a third repository: `~/nano-rpc` is the backend used by Nano
checkout and username/address resolution. Prefer preserving the public
`pay-js` frontend syntax and make compatibility fixes in `nano-blog` or
`nano-rpc` when possible.

When changing the public API, CDN usage, or user-facing behavior here, check
the NanoPay article and examples in `nano-blog` for compatibility. Changes to
the blog's payment examples should be checked against this repository's
implemented API. The repositories are maintained separately; `nano-blog` is
not a build-time dependency of `pay-js`.
