(async function () {
    while (!Spicetify?.Player || !Spicetify?.Player?.data) {
        await new Promise((r) => setTimeout(r, 300));
    }

    const root = document.querySelector(".Root__top-container");
    if (!root) return;

    const layerA = document.createElement("div");
    const layerB = document.createElement("div");

    layerA.classList.add("album-glow-bg", "active");
    layerB.classList.add("album-glow-bg");

    root.prepend(layerA, layerB);

    let useA = true;
    let lastCoverUrl = null;

    function getCoverUrl() {
        const raw = Spicetify.Player?.data?.item?.metadata?.image_url;
        if (!raw) return null;
        return raw.replace("spotify:image:", "https://i.scdn.co/image/");
    }

    async function updateBackground() {
        const coverUrl = getCoverUrl();
        if (coverUrl === lastCoverUrl) return;
        lastCoverUrl = coverUrl;
        if (!coverUrl) return;

        if (useA) {
            layerA.style.backgroundImage = `url("${coverUrl}")`;
            layerA.classList.add("active");
            layerB.classList.remove("active");
        } else {
            layerB.style.backgroundImage = `url("${coverUrl}")`;
            layerB.classList.add("active");
            layerA.classList.remove("active");
        }
        useA = !useA;
    }

    updateBackground();
    Spicetify.Player.addEventListener("songchange", updateBackground);
})();
