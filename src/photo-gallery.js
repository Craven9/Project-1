/**
 * Copyright 2025 Craven9
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./photo-card.js";

/**
 * photo-gallery
 * @element photo-gallery
 */
export class PhotoGallery extends DDDSuper(LitElement) {

  static get tag() {
    return "photo-gallery";
  }

  constructor() {
    super();
    this.apiEndpoint = ""; 
    this.photos = [];
    this.loading = false;
    this.error = null;
    this.viewMode = 'grid'; 
    this.intersectionObserver = null;
    this.darkMode = false;
  }

  static get properties() {
    return {
      ...super.properties,
      apiEndpoint: { type: String },
      photos: { type: Array },
      loading: { type: Boolean },
      error: { type: String },
      viewMode: { type: String },
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
        background-color: var(--ddd-theme-default-limestoneGray);
        transition: background-color 0.3s ease;
      }

      :host([dark-mode]) {
        background-color: var(--ddd-theme-default-coalyGray);
      }

      .gallery-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-white);
        box-shadow: var(--ddd-boxShadow-sm);
        position: sticky;
        top: 0;
        z-index: 100;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      :host([dark-mode]) .gallery-header {
        background-color: #2d3748;
        color: #e0e0e0;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }

      .gallery-title {
        font-size: var(--ddd-font-size-xl);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-coalyGray);
        margin: 0;
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .gallery-title {
        color: #e0e0e0;
      }

      .gallery-controls {
        display: flex;
        gap: var(--ddd-spacing-3);
        align-items: center;
      }

      .view-toggle {
        background: none;
        border: var(--ddd-border-sm);
        border-color: var(--ddd-theme-default-slateGray);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        font-size: var(--ddd-font-size-xs);
        transition: all 0.2s ease;
        color: var(--ddd-theme-default-coalyGray);
        background-color: var(--ddd-theme-default-white);
      }

      :host([dark-mode]) .view-toggle {
        background-color: #4a5568;
        color: #e0e0e0;
        border-color: #718096;
      }

      .view-toggle:hover {
        background-color: var(--ddd-theme-default-accent);
        color: var(--ddd-theme-default-white);
        border-color: var(--ddd-theme-default-accent);
      }

      :host([dark-mode]) .view-toggle:hover {
        background-color: #63b3ed;
        color: #1a202c;
        border-color: #63b3ed;
      }

      .view-toggle.active {
        background-color: var(--ddd-theme-default-keystoneYellow);
        color: var(--ddd-theme-default-coalyGray);
        border-color: var(--ddd-theme-default-keystoneYellow);
      }

      :host([dark-mode]) .view-toggle.active {
        background-color: #f6ad55;
        color: #1a202c;
        border-color: #f6ad55;
      }

      .photo-count {
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-slateGray);
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .photo-count {
        color: #a0aec0;
      }

      .gallery-container {
        padding: var(--ddd-spacing-4);
        max-width: 1400px;
        margin: 0 auto;
      }

      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        grid-template-rows: masonry;
        gap: var(--ddd-spacing-3);
        justify-items: center;
        align-items: start;
      }

      @supports not (grid-template-rows: masonry) {
        .gallery-grid {
          columns: 3;
          column-gap: var(--ddd-spacing-4);
          break-inside: avoid;
        }

        .gallery-grid photo-card {
          display: inline-block;
          width: 100%;
          margin-bottom: var(--ddd-spacing-4);
          break-inside: avoid;
        }
      }

      .gallery-slide {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        gap: var(--ddd-spacing-4);
        padding-bottom: var(--ddd-spacing-2);
        padding-left: var(--ddd-spacing-4);
        padding-right: var(--ddd-spacing-4);
      }

      .gallery-slide photo-card {
        flex: 0 0 240px;
        scroll-snap-align: center;
        scroll-snap-stop: always;
      }

      .gallery-slide::-webkit-scrollbar {
        height: 8px;
      }

      .gallery-slide::-webkit-scrollbar-track {
        background: var(--ddd-theme-default-limestoneGray);
        border-radius: var(--ddd-radius-sm);
      }

      .gallery-slide::-webkit-scrollbar-thumb {
        background: var(--ddd-theme-default-slateGray);
        border-radius: var(--ddd-radius-sm);
      }

      .loading-indicator {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--ddd-spacing-8);
        font-size: var(--ddd-font-size-m);
        color: var(--ddd-theme-default-slateGray);
      }

      .error-message {
        text-align: center;
        padding: var(--ddd-spacing-8);
        color: var(--ddd-theme-default-error);
        font-size: var(--ddd-font-size-m);
      }

      @media (max-width: 768px) {
        .gallery-header {
          flex-direction: column;
          gap: var(--ddd-spacing-3);
          padding: var(--ddd-spacing-3);
        }

        .gallery-controls {
          gap: var(--ddd-spacing-2);
        }

        .gallery-title {
          font-size: var(--ddd-font-size-l);
        }

        .gallery-container {
          padding: var(--ddd-spacing-2);
        }

        .gallery-grid {
          grid-template-columns: 1fr;
          gap: var(--ddd-spacing-2);
        }

        @supports not (grid-template-rows: masonry) {
          .gallery-grid {
            columns: 1;
          }
        }

        .gallery-slide photo-card {
          flex: 0 0 220px;
        }

        .view-toggle {
          padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-xxs);
        }
      }

      @media (max-width: 480px) {
        .gallery-slide photo-card {
          flex: 0 0 200px;
        }
      }

      @media (min-width: 769px) and (max-width: 1024px) {
        .gallery-grid {
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        @supports not (grid-template-rows: masonry) {
          .gallery-grid {
            columns: 2;
          }
        }
      }
    `];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  async _loadPhotos() {
    if (!this.apiEndpoint) {
      return;
    }
    
    this.loading = true;
    this.error = null;

    try {
      const response = await fetch(this.apiEndpoint);
      if (!response.ok) {
        throw new Error(`Failed to load photos: ${response.status}`);
      }
      
      const data = await response.json();
      this.photos = data.photos || [];
      
      this.updateComplete.then(() => {
        this._setupIntersectionObserver();
      });
    } catch (err) {
      this.error = err.message;
      console.error('Error loading photos:', err);
    } finally {
      this.loading = false;
    }
  }



  _setupIntersectionObserver() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.tagName === 'PHOTO-CARD') {
            entry.target.loadImage = true;
            this.intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { 
        rootMargin: '200px', 
        threshold: 0.1
      }
    );
    this._observeAllCards();
  }

  _observeAllCards() {
    const photoCards = this.shadowRoot?.querySelectorAll('photo-card');
    photoCards?.forEach(card => {
      if (this.intersectionObserver && !card.loadImage) {
        this.intersectionObserver.observe(card);
      }
    });
  }





  _changeViewMode(mode) {
    this.viewMode = mode;
    localStorage.setItem('gallery-view-mode', mode);
  }

  firstUpdated() {
    const savedViewMode = localStorage.getItem('gallery-view-mode');
    if (savedViewMode && ['grid', 'slide'].includes(savedViewMode)) {
      this.viewMode = savedViewMode;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('photos') && this.photos.length > 0) {
      this.updateComplete.then(() => {
        this._observeAllCards();
      });
    }
    
    if (changedProperties.has('darkMode')) {
      // Update the host attribute for CSS targeting
      if (this.darkMode) {
        this.setAttribute('dark-mode', '');
      } else {
        this.removeAttribute('dark-mode');
      }
    }
    
    // Load photos when API endpoint is set
    if (changedProperties.has('apiEndpoint') && this.apiEndpoint) {
      this._loadPhotos();
    }
  }

  _renderGallery() {
    if (this.error) {
      return html`<div class="error-message">Error: ${this.error}</div>`;
    }

    if (this.loading && this.photos.length === 0) {
      return html`<div class="loading-indicator">Loading photos...</div>`;
    }

    const galleryClass = `gallery-${this.viewMode}`;
    
    return html`
      <div class="${galleryClass}">
        ${this.photos.map(photo => html`
          <photo-card
            .photoData="${photo}"
            .loadImage="${false}"
            .darkMode="${this.darkMode}"
          ></photo-card>
        `)}
      </div>
    `;
  }

  render() {
    return html`
      <div class="gallery-header">
        <div>
          <h1 class="gallery-title">Photo Gallery</h1>
          <div class="photo-count">${this.photos.length} photos</div>
        </div>
        
        <div class="gallery-controls">
          <button 
            class="view-toggle ${this.viewMode === 'grid' ? 'active' : ''}"
            @click="${() => this._changeViewMode('grid')}"
            title="Grid view">Grid View</button>
          <button 
            class="view-toggle ${this.viewMode === 'slide' ? 'active' : ''}"
            @click="${() => this._changeViewMode('slide')}"
            title="Slide view">Slide View</button>
        </div>
      </div>

      <div class="gallery-container">
        ${this._renderGallery()}
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(PhotoGallery.tag, PhotoGallery);