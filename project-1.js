/**
 * Copyright 2025 Craven9
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./src/photo-gallery.js";

/**Project-1
 * @demo index.html
 * @element project-1
 */
export class Project1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-1";
  }

  constructor() {
    super();
    this.title = "Project 1";
    this.apiEndpoint = this._getApiEndpoint();
    this.darkMode = false;
    this.showScrollToTop = false;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Photo Gallery",
      loading: "Loading photos...",
      error: "Failed to load photos"
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/project-1.ar.json", import.meta.url).href + "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  _getApiEndpoint() {
    // Check if we're running locally or on Vercel
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // Local development - use static JSON file
      console.log('Using local development endpoint: ./data/gallery-api.json');
      return "./data/gallery-api.json";
    } else {
      // Production/Vercel - use dynamic API
      console.log('Using production endpoint: /api/foxes');
      return "/api/foxes";
    }
  }



  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      apiEndpoint: { type: String },
      darkMode: { type: Boolean },
      showScrollToTop: { type: Boolean }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        width: 100%;
        min-height: 100vh;
        font-family: var(--ddd-font-navigation);
        background-color: var(--ddd-theme-default-limestoneGray);
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      :host([dark-mode]) {
        background-color: var(--ddd-theme-default-coalyGray);
        color: var(--ddd-theme-default-limestoneLight);
      }

      photo-gallery {
        width: 100%;
        display: block;
      }

      .app-header {
        background: var(--ddd-theme-default-info);
        color: var(--ddd-theme-default-white);
        padding: var(--ddd-spacing-6) var(--ddd-spacing-4);
        text-align: center;
        box-shadow: var(--ddd-boxShadow-md);
        position: relative;
        transition: background-color 0.3s ease;
      }

      :host([dark-mode]) .app-header {
        background: var(--ddd-theme-default-slateGray);
        color: var(--ddd-theme-default-limestoneLight);
      }

      .dark-mode-toggle {
        position: absolute;
        top: var(--ddd-spacing-4);
        right: var(--ddd-spacing-4);
        background: var(--ddd-theme-default-whiteTransparent);
        border: 2px solid var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-lg);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
        cursor: pointer;
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-white);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-1);
        opacity: 0.8;
      }

      .dark-mode-toggle:hover {
        background: var(--ddd-theme-default-white);
        border-color: var(--ddd-theme-default-white);
        color: var(--ddd-theme-default-coalyGray);
        transform: translateY(-1px);
        opacity: 1;
      }

      :host([dark-mode]) .dark-mode-toggle {
        background: var(--ddd-theme-default-coalyGray);
        border-color: var(--ddd-theme-default-limestoneLight);
        color: var(--ddd-theme-default-limestoneLight);
        opacity: 0.8;
      }

      :host([dark-mode]) .dark-mode-toggle:hover {
        background: var(--ddd-theme-default-slateGray);
        border-color: var(--ddd-theme-default-white);
        color: var(--ddd-theme-default-white);
        opacity: 1;
      }

      .app-title {
        font-size: var(--ddd-font-size-xxl);
        font-weight: var(--ddd-font-weight-bold);
        margin: 0 0 var(--ddd-spacing-2) 0;
        text-shadow: var(--ddd-boxShadow-sm);
        transition: color 0.3s ease;
      }

      .app-description {
        font-size: var(--ddd-font-size-m);
        margin: 0;
        opacity: 0.9;
        transition: color 0.3s ease;
      }

      .scroll-to-top {
        position: fixed;
        bottom: var(--ddd-spacing-6);
        right: var(--ddd-spacing-6);
        padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
        background: var(--ddd-theme-default-accent);
        border: none;
        border-radius: var(--ddd-radius-md);
        cursor: pointer;
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-white);
        box-shadow: var(--ddd-boxShadow-md);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        white-space: nowrap;
      }

      .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .scroll-to-top:hover {
        background: var(--ddd-theme-default-accentDark);
        transform: translateY(-3px);
        box-shadow: var(--ddd-boxShadow-lg);
      }

      :host([dark-mode]) .scroll-to-top {
        background: var(--ddd-theme-default-error);
        color: var(--ddd-theme-default-white);
        box-shadow: var(--ddd-boxShadow-md);
      }

      :host([dark-mode]) .scroll-to-top:hover {
        background: var(--ddd-theme-default-errorDark);
        color: var(--ddd-theme-default-white);
        box-shadow: var(--ddd-boxShadow-lg);
      }

      @media (max-width: 768px) {
        .app-header {
          padding: var(--ddd-spacing-4) var(--ddd-spacing-3);
        }

        .dark-mode-toggle {
          top: var(--ddd-spacing-2);
          right: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-xs);
        }

        .app-title {
          font-size: var(--ddd-font-size-xl);
        }

        .app-description {
          font-size: var(--ddd-font-size-s);
        }

        .scroll-to-top {
          bottom: var(--ddd-spacing-4);
          right: var(--ddd-spacing-4);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
          font-size: var(--ddd-font-size-xs);
        }
      }
    `];
  }

  firstUpdated() {
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode === 'true') {
      this.darkMode = true;
    }
    
    // Initial scroll check is now handled in connectedCallback
  }

  connectedCallback() {
    super.connectedCallback();
    this._boundHandleScroll = this._handleScroll.bind(this);
    window.addEventListener('scroll', this._boundHandleScroll);
    this._handleScroll();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._boundHandleScroll) {
      window.removeEventListener('scroll', this._boundHandleScroll);
    }
  }

  _handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.showScrollToTop = scrollTop > 300;
  }

  _scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  updated(changedProperties) {
    if (changedProperties.has('darkMode')) {
      // Update the host attribute for either dark or light mode
      if (this.darkMode) {
        this.setAttribute('dark-mode', '');
      } else {
        this.removeAttribute('dark-mode');
      }

      // Notify components that dark mode has been applied
      this.dispatchEvent(new CustomEvent('dark-mode-changed', {
        detail: { darkMode: this.darkMode },
        bubbles: true,
        composed: true
      }));
    }
  }

  _toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('dark-mode', this.darkMode.toString());
  }

  render() {
    return html`
      <div class="app-header">
        <button 
          class="dark-mode-toggle" 
          @click="${this._toggleDarkMode}"
          title="Toggle dark mode">
          ${this.darkMode ? '☀️' : '🌙'} ${this.darkMode ? 'Light' : 'Dark'}
        </button>
        <h1 class="app-title">${this.title}</h1>
        <p class="app-description">${this.t.description}</p>
      </div>

      <photo-gallery 
        .apiEndpoint="${this.apiEndpoint}"
        .darkMode="${this.darkMode}"></photo-gallery>
      
      <button 
        class="scroll-to-top ${this.showScrollToTop ? 'visible' : ''}"
        @click="${this._scrollToTop}"
        title="Scroll to top">
        Back to top
      </button>
      
      <slot></slot>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(Project1.tag, Project1);