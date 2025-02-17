
function loadWidget() {
    try {
        const i = "AXVUju";
        const a = window;
        const d = document;
      
        function g() {
            const g = d.createElement("script");
            const s = "https://www.goftino.com/widget/" + i;
            const l = localStorage.getItem("goftino_" + i);
            g.async = !0;
            g.src = l ? s + "?o=" + l : s;
            d.getElementsByTagName("head")[0].appendChild(g);
        }
      
        if (d.readyState === "complete") {
            g();
        } else {
            a.addEventListener("load", g, false);
        }
    } catch (error) {
        console.error("An error occurred while loading the widget:", error);
    }
}

export default loadWidget;
  