import React, { useEffect, useRef, memo } from "react";
import { SUPPORTED_CHAINS } from "@/shared/constants/supportedChains.constant";

interface TradingViewWidgetProps {
  poolAddress?: string;
  chain: string;
  baseTokenSymbol?: string;
  quoteTokenSymbol?: string;
}

function TradingViewWidget({
  poolAddress,
  chain,
  baseTokenSymbol,
  quoteTokenSymbol,
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    if (chain === SUPPORTED_CHAINS.SOLANA && poolAddress) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://dexscreener.com/solana/${poolAddress}?embed=1&theme=dark&trades=0&info=0`;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      iframe.style.borderRadius = "0.5rem";
      iframe.setAttribute("loading", "lazy");
      iframe.title = "DexScreener Chart";
      container.current.appendChild(iframe);
      return;
    }

    let symbol: string;
    if (baseTokenSymbol && quoteTokenSymbol) {
      symbol = `${baseTokenSymbol}${quoteTokenSymbol}`.toUpperCase();
    } else {
      symbol = chain === SUPPORTED_CHAINS.SOLANA ? "SOLUSD" : "ETHUSD";
    }

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.height = "calc(100% - 32px)";
    widgetDiv.style.width = "100%";
    widgetDiv.style.borderRadius = "0.5rem";
    widgetDiv.style.overflow = "hidden";
    container.current.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "D",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "${symbol}",
          "theme": "dark",
          "timezone": "Etc/UTC",
          "backgroundColor": "#0F0F0F",
          "gridColor": "rgba(242, 242, 242, 0.06)",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "studies": [],
          "autosize": true
        }`;
    container.current.appendChild(script);

    return () => {
      if (container.current) {
        while (container.current.firstChild) {
          container.current.removeChild(container.current.firstChild);
        }
      }
    };
  }, [poolAddress, chain, baseTokenSymbol, quoteTokenSymbol]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    ></div>
  );
}

export default memo(TradingViewWidget);
