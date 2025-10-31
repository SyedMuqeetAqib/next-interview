Full Frontend Web3 Assessment
“Basic Evm / Sol trading platform”
1 Goal
◦ Build a minimal, clean trading dashboard UI.
◦ User can search pools for either EVM or solana chain, go to trading page for that pool and
see live recent transactions for that pool, and have mock token buy functionality.
◦ The app has a switch to toggle between chains: [ Ethereum, Solana ]. We will only implement
one of them.
2 Core Layout / Pages
TRADING PAGE
● Global Nav Bar (persistent)
○ Logo / platform name
○ Toggle to switch between chains
○ “Trading Page” link (placeholder for future links, like “home”, “account”, “news”,
etc.)
○ Search bar - to search up token pools
● Logo / Project name
○ Project name: “Mockswap”
● Switch to toggle between chains
○ If “Solana” is selected, the web app functions for solana. Pools are searched on
solana, use jupiter/raydium api, etc. For “Ethereum”, searches ETH tokens, uses
uniswap etc.
○ You only have to implement functionality for either solana or ETH, not both.
However, please implement the toggle logic fully, to switch between chains, as if
both chains were fully functional.
● Trading Page
○ Basic chart component (just embed from dexscreener)
○ Latest Transactions table
■ Live, streaming updates from chain for this specific pair. You should
connect to a websocket/listener/streaming service or do continuous
polling to load them in real time.
■ Columns: Time, Action, Amount Sol/ETH, Amount Tokens, Wallet
(shortened), Tx link.
■ (in case you are unable to figure this out, as a backup you can just embed
this table from dexscreener, it is available from the same source as the
chart you embedded previously. This option is much easier and not
preferred, only do this if you are sure you cannot stream the updates
directly from chain as explained above)
○ Buy widget
■ Input: “You spend (SOL/ETH)”
■ Output: “You receive (TOKEN) (estimates actual amount of tokens based
on pool price, you can fetch price directly from on chain pool info or
jupiter/uniswap api whatever you like)”
■ “Buy” button, non-functional, instead, has some animation/popup/you
choose what, to inform user of pending action. after a set delay, inform
them of success (or failure)
● Search Bar (in Nav Bar)
○ Input pool address
○ On search: Redirect to trading page for that pool
3 Coding Principles
◦ Use TypeScript + Nextjs + React
◦ Keep components small and modular (Navbar, SearchBar, TradingPage, BuyWidget,
etc.).
◦ Use strong typing - define interfaces/types where appropriate, eg. Pool, Transaction,
Chain.
◦ Keep UI and logic separate (fetching, listeners, and rendering split cleanly).
◦ Use simple state management (React Context or top-level state).
◦ Include basic loading / error states.
◦ Readable, clean code with no console errors.
4 Styling Guidelines
◦ if you have experience with and can implement any of the following quickly, they will be
appreciated in terms of style and design:
◦ Visual style: Minimal, sleek, modern, “high tech” feel.
◦ Dark theme preferred with matching text style
◦ Clean borders or subtle shadows for cards/tables, no heavy gradients.
◦ Hover and active states (glow or brightness shift).
◦ Everything should feel fast and light, avoid slow animations or clutter.
◦ User action animations (eg. toggling chains, clicking buy, new transaction appears,
etc. 6. Deliverables
◦ Working front end (trading page)
◦ Github repo containing project with commit history (flexible, agile style is fine, but any commit
messages are appreciated)
Some references:
For streaming new transactions on sol:
https://www.helius.dev/docs/api-reference/rpc/websocket-methods
(If you require any api keys or resources please let us know)
