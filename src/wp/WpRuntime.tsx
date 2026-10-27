"use client";

import { useEffect } from "react";

/**
 * Runs the WordPress theme's own JavaScript (jQuery, GSAP, Swiper, Lenis,
 * WOW...) against the ported markup, so animations and interactions behave
 * exactly as on WordPress.
 *
 * The scripts load one by one, in WordPress's order, only after React has
 * hydrated: they rewrite the DOM (SplitText, marquee clones), and doing that
 * before hydration would make React throw the page away and re-render it.
 */

declare global {
  interface Window {
    __wpRuntimeStarted?: boolean;
  }
}

function loadScript(src: string) {
  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => {
      console.warn("WP runtime: failed to load", src);
      resolve();
    };
    document.body.appendChild(script);
  });
}

/**
 * The theme waits for DOMContentLoaded / window load, which fired long before
 * these scripts arrive. While they load, run such listeners on the next tick
 * instead of registering them for an event that will never come again.
 */
function shimReadyEvents() {
  const winAdd = window.addEventListener;
  const docAdd = document.addEventListener;
  const later = (listener: EventListenerOrEventListenerObject) =>
    setTimeout(() => (typeof listener === "function" ? listener.call(window, new Event("load")) : listener.handleEvent(new Event("load"))), 0);

  window.addEventListener = function (this: Window, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
    if (type === "load" && listener) return void later(listener);
    return winAdd.call(this, type, listener, options);
  } as typeof window.addEventListener;
  document.addEventListener = function (this: Document, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
    if (type === "DOMContentLoaded" && listener) return void later(listener);
    return docAdd.call(this, type, listener, options);
  } as typeof document.addEventListener;

  return () => {
    window.addEventListener = winAdd;
    document.addEventListener = docAdd;
  };
}

/** WordPress marks the menu item for the current page; mirror that. */
function markCurrentMenuItem() {
  const here = window.location.pathname.replace(/\/?$/, "/");
  document.querySelectorAll<HTMLAnchorElement>(".menu-item > a[href]").forEach((link) => {
    const item = link.parentElement;
    if (!item) return;
    item.classList.remove("current-menu-item", "current_page_item");
    // "#" links are dropdown parents (Services, About...), never the current page.
    const href = link.getAttribute("href") ?? "";
    if (!href || href.startsWith("#")) return;
    const target = new URL(href, window.location.origin).pathname.replace(/\/?$/, "/");
    if (target === here) item.classList.add("current-menu-item", "current_page_item");
  });
}

/**
 * The ported CF7 forms post to /api/leads instead of WordPress. The theme's
 * pc-form-validation.js still validates first (it listens in the capture
 * phase and stops invalid submits), and its success modal still opens on
 * `wpcf7mailsent`, so this only replaces the network round trip.
 */
const PC_CONTACT_SENT = `<div class="pc-cf-ok"><div class="pc-cf-ok-ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e8186d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h4>Message Received.</h4><p>We'll be in touch within 1 business hour.<br>Check your inbox for a confirmation email.</p></div>`;

/**
 * The Contact page form ([pc_contact_form], a WPCode snippet) posted back to
 * the page on WordPress and re-rendered with a success panel or an error box.
 * Same outcome here, without the reload.
 */
async function submitContactPageForm(form: HTMLFormElement) {
  const box = form.closest(".pc-cf");
  if (!box || form.dataset.sending) return;
  form.dataset.sending = "1";
  const data = Object.fromEntries([...new FormData(form).entries()].map(([key, value]) => [key, String(value)]));
  const showError = (message: string) => {
    let err = box.querySelector(".pc-cf-err");
    if (!err) {
      err = document.createElement("div");
      err.className = "pc-cf-err";
      box.insertBefore(err, form);
    }
    err.textContent = message;
  };
  try {
    const response = await fetch("/api/leads/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId: "pc-contact", data, pageUrl: window.location.href, pageTitle: document.title }),
    });
    const result = await response.json().catch(() => ({}));
    if (response.ok) {
      box.innerHTML = PC_CONTACT_SENT;
      return;
    }
    const firstError = result.errors ? Object.values(result.errors)[0] : null;
    showError(String(firstError ?? result.error ?? "Please fill in all required fields (Name, Email, Message)."));
  } catch {
    showError("There was an error trying to send your message. Please try again later.");
  } finally {
    delete form.dataset.sending;
  }
}

function handleLeadForms() {
  document.addEventListener("submit", async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.closest(".pc-cf")) {
      event.preventDefault();
      await submitContactPageForm(form);
      return;
    }
    if (!form.classList.contains("wpcf7-form")) return;
    event.preventDefault();
    if (form.classList.contains("submitting")) return;

    const output = form.querySelector(".wpcf7-response-output");
    const data = Object.fromEntries([...new FormData(form).entries()].map(([key, value]) => [key, String(value)]));
    form.classList.add("submitting");
    form.setAttribute("data-status", "submitting");

    try {
      const response = await fetch("/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: data._wpcf7, data, pageUrl: window.location.href, pageTitle: document.title }),
      });
      const result = await response.json().catch(() => ({}));
      form.classList.remove("submitting", "invalid", "failed", "sent");
      if (response.ok) {
        form.classList.add("sent");
        form.setAttribute("data-status", "sent");
        if (output) output.textContent = "";
        form.reset();
        form.dispatchEvent(new CustomEvent("wpcf7mailsent", { bubbles: true, detail: { apiResponse: { message: result.message } } }));
      } else {
        form.classList.add(response.status === 422 ? "invalid" : "failed");
        form.setAttribute("data-status", response.status === 422 ? "invalid" : "failed");
        if (output) {
          output.textContent =
            response.status === 422
              ? "One or more fields have an error. Please check and try again."
              : result.error ?? "There was an error trying to send your message. Please try again later.";
        }
      }
    } catch {
      form.classList.remove("submitting");
      form.classList.add("failed");
      if (output) output.textContent = "There was an error trying to send your message. Please try again later.";
    }
  });
}

/**
 * Popup Maker's "click open" trigger: any `.popmake-<id>` element (or a link
 * to `#popmake-<id>`) opens popup <id>. Replaces the plugin's own script.
 */
function handlePopups() {
  const show = (overlay: HTMLElement, open: boolean) => {
    overlay.style.display = open ? "block" : "none";
    overlay.classList.toggle("pum-active", open);
    overlay.classList.toggle("pum-open", open);
    const container = overlay.querySelector<HTMLElement>(".pum-container");
    if (container) {
      container.style.display = open ? "block" : "none";
      container.style.opacity = open ? "1" : "0";
    }
    document.documentElement.classList.toggle("pum-open", open);
    document.documentElement.classList.toggle("pum-open-overlay", open);
  };

  document.addEventListener("click", (event) => {
    const target = event.target as Element | null;
    const close = target?.closest(".pum-close, .popmake-close");
    if (close) {
      const overlay = close.closest<HTMLElement>(".pum-overlay");
      if (overlay) {
        event.preventDefault();
        show(overlay, false);
      }
      return;
    }
    const trigger = target?.closest<HTMLElement>('[class*="popmake-"], a[href^="#popmake-"]');
    if (!trigger) return;
    const id =
      trigger.getAttribute("href")?.match(/^#popmake-(\d+)$/)?.[1] ??
      [...trigger.classList].map((c) => c.match(/^popmake-(\d+)$/)?.[1]).find(Boolean);
    const overlay = id ? document.getElementById(`pum-${id}`) : null;
    if (!overlay) return;
    event.preventDefault();
    show(overlay, true);
  });
}

export function WpRuntime({ scripts }: { scripts: string[] }) {
  useEffect(() => {
    // Effects run twice in development; the theme must initialise once.
    if (window.__wpRuntimeStarted) return;
    window.__wpRuntimeStarted = true;

    markCurrentMenuItem();
    handleLeadForms();
    handlePopups();

    const restore = shimReadyEvents();
    (async () => {
      for (const src of scripts) await loadScript(src);
      // Let queued ready-callbacks run before the real listeners come back.
      setTimeout(() => {
        restore();
        document.dispatchEvent(new Event("elementor/lazyload/observe"));
        // GSAP measured pin spacers when the scripts ran; measure again once
        // the web fonts have settled, as WordPress effectively does on load.
        document.fonts.ready.then(() => (window as unknown as { ScrollTrigger?: { refresh(): void } }).ScrollTrigger?.refresh());
      }, 0);
    })();
  }, [scripts]);

  return null;
}
