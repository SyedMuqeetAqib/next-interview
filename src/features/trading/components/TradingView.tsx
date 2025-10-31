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

    // Completely clear the container to remove any existing TradingView widget
    // TradingView creates more than just a script - it creates iframes and other DOM elements
    // We need to remove ALL children (scripts, iframes, divs) to prevent duplicate widgets
    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }

    // Recreate the widget container div that TradingView expects
    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.height = "calc(100% - 32px)";
    widgetDiv.style.width = "100%";
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
      // Cleanup: clear the entire container when component unmounts or symbol changes
      if (container.current) {
        while (container.current.firstChild) {
          container.current.removeChild(container.current.firstChild);
        }
      }
    };
  }, [symbol]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      {/* This div will be recreated by the useEffect to ensure clean state */}
    </div>
  );
}

export default memo(TradingViewWidget);
