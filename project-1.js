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
      darkMode: { type: Boolean }
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
        background-color: #1a1a1a;
        color: #e0e0e0;
      }

      photo-gallery {
        width: 100%;
        display: block;
      }

      .app-header {
        background: #87CEEB;
        color: var(--ddd-theme-default-white);
        padding: var(--ddd-spacing-6) var(--ddd-spacing-4);
        text-align: center;
        box-shadow: var(--ddd-boxShadow-md);
        position: relative;
        transition: background-color 0.3s ease;
      }

      :host([dark-mode]) .app-header {
        background: #2d3748;
        color: #e0e0e0;
      }

      .dark-mode-toggle {
        position: absolute;
        top: var(--ddd-spacing-4);
        right: var(--ddd-spacing-4);
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.3);
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
      }

      .dark-mode-toggle:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-1px);
      }

      :host([dark-mode]) .dark-mode-toggle {
        background: rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 255, 255, 0.3);
        color: #e0e0e0;
      }

      :host([dark-mode]) .dark-mode-toggle:hover {
        background: rgba(0, 0, 0, 0.5);
        border-color: rgba(255, 255, 255, 0.5);
      }

      .app-title {
        font-size: var(--ddd-font-size-xxl);
        font-weight: var(--ddd-font-weight-bold);
        margin: 0 0 var(--ddd-spacing-2) 0;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        transition: color 0.3s ease;
      }

      .app-description {
        font-size: var(--ddd-font-size-m);
        margin: 0;
        opacity: 0.9;
        transition: color 0.3s ease;
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
      }
    `];
  }

  firstUpdated() {
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode === 'true') {
      this.darkMode = true;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('darkMode')) {
      // Update the host attribute for CSS targeting
      if (this.darkMode) {
        this.setAttribute('dark-mode', '');
      } else {
        this.removeAttribute('dark-mode');
      }
      
      // Notify child components about dark mode change
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
      
      <slot></slot>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(Project1.tag, Project1);