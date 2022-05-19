export default () => {
  let isrun = false;

  const lastPopup = () => {
    const popups = document.querySelectorAll("[popup]");
    if (!popups.length) return null;

    const el = popups.item(popups.length - 1);
    return el;
  };

  const unsetRun = () => {
    setTimeout(() => {
      isrun = false;
    }, 100);
  };

  const closer = () => {
    if (isrun) return;
    isrun = true;

    const popup = lastPopup();
    if (!popup) return unsetRun();

    const attr = popup.getAttribute("popup") as string;
    const ev = new CustomEvent(`close-popup-${attr}`);
    window.dispatchEvent(ev);

    unsetRun();
  };

  window.addEventListener("close-popup", closer);
  window.addEventListener("click", closer);
};
