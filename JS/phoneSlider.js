document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("nav");
    const exitBtn = document.querySelector(".Exit");
    let isAnimating = false;
    let allowSlideUp = false;

    // לחיצה על כפתור יציאה גורמת לירידה
    exitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (isAnimating) return;

        isAnimating = true;
        allowSlideUp = false;
        nav.classList.add("slide-down");
    });

    // ברגע שהטרנזישן הסתיים, נאפשר עלייה
    nav.addEventListener("transitionend", function () {
        isAnimating = false;
        if (nav.classList.contains("slide-down")) {
            allowSlideUp = true;
        }
    });

    // כניסת עכבר תגרום לו לעלות רק אם מותר
    nav.addEventListener("mouseenter", function () {
        if (allowSlideUp && !isAnimating) {
            isAnimating = true;
            nav.classList.remove("slide-down");
            allowSlideUp = false;
        }
    });
});