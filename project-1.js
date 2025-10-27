/**
 * Copyright 2025 Craven9
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./src/photo-gallery.js";

/**
 * `project-1`
 * Photo Gallery Application with Instagram-like photo cards, 
 * featuring lazy loading, dark mode, and social sharing
 * 
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
    this.apiEndpoint = "./data/gallery-api.json";
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
        new URL("./locales/project-1.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      apiEndpoint: { type: String }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        width: 100%;
        min-height: 100vh;
        font-family: var(--ddd-font-navigation);
        background-color: var(--ddd-theme-default-limestoneGray);
      }

      photo-gallery {
        width: 100%;
        display: block;
      }

      .app-header {
        background: linear-gradient(135deg, 
          var(--ddd-theme-default-accent) 0%, 
          var(--ddd-theme-default-keystoneYellow) 100%);
        color: var(--ddd-theme-default-white);
        padding: var(--ddd-spacing-6) var(--ddd-spacing-4);
        text-align: center;
        box-shadow: var(--ddd-boxShadow-md);
      }

      .app-title {
        font-size: var(--ddd-font-size-xxl);
        font-weight: var(--ddd-font-weight-bold);
        margin: 0 0 var(--ddd-spacing-2) 0;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }

      .app-description {
        font-size: var(--ddd-font-size-m);
        margin: 0;
        opacity: 0.9;
      }

      @media (max-width: 768px) {
        .app-header {
          padding: var(--ddd-spacing-4) var(--ddd-spacing-3);
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

  // Lit render the HTML
  render() {
    return html`
      <div class="app-header">
        <h1 class="app-title">${this.title}</h1>
        <p class="app-description">${this.t.description}</p>
      </div>

      <photo-gallery .apiEndpoint="${this.apiEndpoint}"></photo-gallery>
      
      <slot></slot>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(Project1.tag, Project1);