import "./style.css";
import { Bime, type BimeComponents } from "./timekeep";

function displayTime(comp: BimeComponents) {
  const t = document.querySelector(".time")!;
  const componentEls = {
    bour: t.querySelector('.digit[data-digit="br"]')!,
    binute: t.querySelector('.digit[data-digit="bin"]')!,
    becond: t.querySelector('.digit[data-digit="bec"]')!,
    sibisecond: t.querySelector('.digit[data-digit="sibisec"]')!,
  };
  Object.entries(componentEls).forEach(([k, el]) => {
    let c = comp[k as keyof BimeComponents];
    el.querySelectorAll(".binboxes .box").forEach((el, i) => {
      const set = !!(c & (1 << (3 - i)));
      el.setAttribute("data-on", `${set}`);
    });
    el.querySelector(".hex")!.innerHTML = c.toString(16).toUpperCase();
    el.querySelector(".dec")!.innerHTML = c.toString(10);
  });

  document.querySelector(".day-value")!.innerHTML =
    comp.daySinceEpoch.toString();
}
const setLatestTime = () =>
  displayTime(Bime.fromDate(new Date()).timeAsComponents());
setLatestTime();
setInterval(setLatestTime, Bime.MS_PER_SIBISEC_APPROX);
