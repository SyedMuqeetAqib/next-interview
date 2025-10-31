import React, { useEffect, useRef, memo } from "react";

interface TradingViewWidgetProps {
  baseSymbol: string;
  quoteSymbol: string;
}

function TradingViewWidget({
  baseSymbol,
  quoteSymbol,
}: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  // Concatenate the two symbols
  const symbol = `${baseSymbol}${quoteSymbol}`.toUpperCase();

  useEffect(() => {
    if (!container.current) return;

    // Clear any existing scripts
    const existingScript = container.current.querySelector("script");
    if (existingScript) {
      container.current.removeChild(existingScript);
    }

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
      if (container.current && script.parentNode) {
        container.current.removeChild(script);
      }
    };
  }, [symbol]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
