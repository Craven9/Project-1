/**
 * Copyright 2025 Craven9
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * photo-card
 * @element photo-card
 */
export class PhotoCard extends DDDSuper(LitElement) {

  static get tag() {
    return "photo-card";
  }

  constructor() {
    super();
    this.photoData = {};
    this.isLiked = false;
    this.isDisliked = false;
    this.likesCount = 0;
    this.dislikesCount = 0;
    this.showFullSize = false;
    this.imageLoaded = false;
    this.loadImage = false;
    this.showDetails = false;
    this.imageError = false;
  }

  _getAuthorName() {
    if (this.photoData.author?.first && this.photoData.author?.last) {
      return `${this.photoData.author.first} ${this.photoData.author.last}`;
    } else if (this.photoData.author?.name) {
      return this.photoData.author.name;
    }
    return 'Unknown Author';
  }

  _getAuthorImage() {

    if (this.photoData.author?.image) {
      return this.photoData.author.image;
    } else {
      const name = this._getAuthorName();
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=40`;
    }
  }
  static get properties() {
    return {
      ...super.properties,
      photoData: { type: Object },
      isLiked: { type: Boolean },
      isDisliked: { type: Boolean },
      likesCount: { type: Number },
      dislikesCount: { type: Number },
      showFullSize: { type: Boolean },
      imageLoaded: { type: Boolean },
      loadImage: { type: Boolean },
      showDetails: { type: Boolean },
      imageError: { type: Boolean }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        max-width: 400px;
        margin: var(--ddd-spacing-4);
        border: var(--ddd-border-sm);
        border-radius: var(--ddd-radius-md);
        background-color: var(--ddd-theme-default-white);
        box-shadow: var(--ddd-boxShadow-sm);
        transition: all 0.3s ease;
        overflow: hidden;
      }



      :host(:hover) {
        box-shadow: var(--ddd-boxShadow-md);
        transform: translateY(-2px);
      }

      .card-header {
        display: flex;
        align-items: center;
        padding: var(--ddd-spacing-3);
        gap: var(--ddd-spacing-3);
      }

      .author-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid var(--ddd-theme-default-limestoneGray);
        object-fit: cover;
      }

      .author-info {
        flex: 1;
      }

      .author-name {
        font-weight: var(--ddd-font-weight-bold);
        font-size: var(--ddd-font-size-s);
        margin: 0;
        color: var(--ddd-theme-default-coalyGray);
      }



      .channel-name {
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-default-slateGray);
        margin: 0;
        margin-top: var(--ddd-spacing-1);
      }

      .image-container {
        position: relative;
        width: 100%;
        aspect-ratio: 1;
        background-color: var(--ddd-theme-default-limestoneGray);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .main-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.3s ease;
      }

      .image-placeholder {
        color: var(--ddd-theme-default-slateGray);
        font-size: var(--ddd-font-size-s);
      }

      .image-placeholder.error {
        color: var(--ddd-theme-default-original87Pink);
        text-align: center;
        font-size: var(--ddd-font-size-s);
      }

      .image-placeholder.error p {
        margin: var(--ddd-spacing-1) 0;
      }

      .image-placeholder.error p:first-child {
        font-size: var(--ddd-font-size-l);
        margin-bottom: var(--ddd-spacing-2);
      }

      .photo-title {
        padding: var(--ddd-spacing-3);
        margin: 0;
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-coalyGray);
      }



      .card-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--ddd-spacing-3);
        border-top: var(--ddd-border-sm);
        border-color: var(--ddd-theme-default-limestoneGray);
        gap: var(--ddd-spacing-3);
      }

      :host([data-dark-mode]) .card-actions {
        border-color: var(--ddd-theme-default-slateGray);
      }

      .action-buttons {
        display: flex;
        gap: var(--ddd-spacing-2);
      }

      .action-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-sm);
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-1);
        font-size: var(--ddd-font-size-xs);
        transition: all 0.2s ease;
        color: var(--ddd-theme-default-slateGray);
      }

      :host([data-dark-mode]) .action-btn {
        color: var(--ddd-theme-default-limestoneGray);
      }

      .action-btn:hover {
        background-color: var(--ddd-theme-default-limestoneGray);
        color: var(--ddd-theme-default-coalyGray);
      }

      :host([data-dark-mode]) .action-btn:hover {
        background-color: var(--ddd-theme-default-slateGray);
        color: var(--ddd-theme-default-white);
      }

      .action-btn.liked {
        color: var(--ddd-theme-default-error);
        background-color: rgba(220, 53, 69, 0.1);
        border: 1px solid rgba(220, 53, 69, 0.3);
      }

      .action-btn.liked:hover {
        background-color: rgba(220, 53, 69, 0.2);
        color: var(--ddd-theme-default-error);
      }

      .action-btn.disliked {
        color: var(--ddd-theme-default-warning);
        background-color: rgba(255, 193, 7, 0.1);
        border: 1px solid rgba(255, 193, 7, 0.3);
      }

      .action-btn.disliked:hover {
        background-color: rgba(255, 193, 7, 0.2);
        color: var(--ddd-theme-default-warning);
      }

      :host([data-dark-mode]) .action-btn.liked {
        background-color: rgba(220, 53, 69, 0.2);
        border-color: rgba(220, 53, 69, 0.4);
      }

      :host([data-dark-mode]) .action-btn.disliked {
        background-color: rgba(255, 193, 7, 0.2);
        border-color: rgba(255, 193, 7, 0.4);
      }

      /* Like Button Styles */
      .heart-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--ddd-spacing-2);
      }

      .heart-container p {
        margin: 0;
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-default-slateGray);
        text-align: center;
      }

      .heart-icon {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-sm);
        transition: all 0.2s ease;
      }

      .heart-icon:hover {
        background-color: rgba(255, 0, 0, 0.1);
        transform: scale(1.1);
      }

      .heart-icon {
        font-size: var(--ddd-font-size-xl);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-sm);
        transition: all 0.2s ease;
      }

      .heart-icon.liked {
        animation: pulse .4s ease;
      }

      .likes-count {
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-coalyGray);
        font-weight: var(--ddd-font-weight-medium);
      }

      /* Dislike button */
      .dislike-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--ddd-spacing-2);
        margin-top: var(--ddd-spacing-4);
      }

      .dislikes-count {
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-coalyGray);
        font-weight: var(--ddd-font-weight-medium);
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      .btn {
        cursor: pointer;
        outline: 0;
        background: none;
        border: none;
        padding: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-sm);
        transition: all 0.2s ease;
        font-size: var(--ddd-font-size-l);
        filter: grayscale(100%);
      }

      .btn:focus {
        outline: none;
      }

      .dislike-btn:hover {
        background-color: rgba(255, 0, 0, 0.1);
        transform: scale(1.1);
      }

      .btn.red {
        filter: none;
        animation: pulse 0.3s ease;
      }

      .info-btn {
        background-color: var(--ddd-theme-default-accent);
        color: var(--ddd-theme-default-white);
        border: none;
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-md);
        cursor: pointer;
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-medium);
        text-transform: capitalize;
        transition: all 0.3s ease;
        box-shadow: var(--ddd-boxShadow-sm);
        min-width: 80px;
        text-align: center;
        margin-right: var(--ddd-spacing-5);
      }

      :host([data-dark-mode]) .info-btn {
        background-color: var(--ddd-theme-default-accent);
        color: var(--ddd-theme-default-white);
      }

      .info-btn:hover {
        background-color: var(--ddd-theme-default-keystoneYellow);
        transform: translateY(-1px);
        box-shadow: var(--ddd-boxShadow-md);
      }

      :host([data-dark-mode]) .info-btn:hover {
        background-color: var(--ddd-theme-default-keystoneYellow);
        color: var(--ddd-theme-default-coalyGray);
      }

      .info-btn.active {
        background-color: var(--ddd-theme-default-keystoneYellow);
        color: var(--ddd-theme-default-coalyGray);
        transform: translateY(-1px);
        box-shadow: var(--ddd-boxShadow-md);
      }

      :host([data-dark-mode]) .info-btn.active {
        background-color: var(--ddd-theme-default-keystoneYellow);
        color: var(--ddd-theme-default-coalyGray);
      }

      .photo-details {
        padding: var(--ddd-spacing-3);
        border-top: var(--ddd-border-sm);
        border-color: var(--ddd-theme-default-limestoneGray);
        background-color: var(--ddd-theme-default-limestoneLight);
        animation: slideDown 0.3s ease-out;
      }

      :host([data-dark-mode]) .photo-details {
        background-color: var(--ddd-theme-default-slateGray);
        border-color: var(--ddd-theme-default-slateGray);
      }

      .detail-date {
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-default-slateGray);
        margin: 0 0 var(--ddd-spacing-2) 0;
        font-weight: var(--ddd-font-weight-bold);
      }

      :host([data-dark-mode]) .detail-date {
        color: var(--ddd-theme-default-limestoneGray);
      }

      .detail-description {
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-coalyGray);
        line-height: 1.5;
        margin: 0;
      }

      :host([data-dark-mode]) .detail-description {
        color: var(--ddd-theme-default-white);
      }



      @keyframes slideDown {
        from {
          opacity: 0;
          max-height: 0;
          padding-top: 0;
          padding-bottom: 0;
        }
        to {
          opacity: 1;
          max-height: 200px;
          padding-top: var(--ddd-spacing-3);
          padding-bottom: var(--ddd-spacing-3);
        }
      }

      .fullsize-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
      }

      .fullsize-image {
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
      }

      .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        font-size: var(--ddd-font-size-m);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @media (max-width: 768px) {
        :host {
          margin: var(--ddd-spacing-2);
          max-width: calc(100vw - var(--ddd-spacing-4));
        }

        .card-header {
          padding: var(--ddd-spacing-2);
        }

        .card-actions {
          padding: var(--ddd-spacing-2);
        }

        .action-buttons {
          gap: var(--ddd-spacing-1);
        }

        .action-btn {
          padding: var(--ddd-spacing-1);
        }

        .heart-container p {
          font-size: var(--ddd-font-size-xs);
        }

        .heart-icon {
          font-size: var(--ddd-font-size-l);
        }

        .btn {
          font-size: var(--ddd-font-size-m);
        }
      }
    `];
  }

  firstUpdated() {
    this._loadInteractionState();
  }

  updated(changedProperties) {
    if (changedProperties.has('loadImage') && this.loadImage && !this.imageLoaded) {
      this.imageLoaded = true;
    }
  }

  _loadInteractionState() {
    if (this.photoData.id) {
      const storedData = this._getInteractionData();
      if (storedData) {
        this.isLiked = storedData.liked || false;
        this.isDisliked = storedData.disliked || false;
        this.likesCount = storedData.likesCount || Math.floor(Math.random() * 1000) + 10;
        this.dislikesCount = storedData.dislikesCount || Math.floor(Math.random() * 100) + 5;
      } else {
        this.likesCount = Math.floor(Math.random() * 1000) + 10;
        this.dislikesCount = Math.floor(Math.random() * 100) + 5;
      }
    }
  }

  _saveInteractionState() {
    if (this.photoData.id) {
      const interactions = JSON.parse(localStorage.getItem('photo-interactions') || '{}');
      interactions[this.photoData.id] = {
        liked: this.isLiked,
        disliked: this.isDisliked,
        likesCount: this.likesCount + (this.isLiked ? 1 : 0),
        dislikesCount: this.dislikesCount + (this.isDisliked ? 1 : 0)
      };
      localStorage.setItem('photo-interactions', JSON.stringify(interactions));
    }
  }

  _getInteractionData() {
    if (this.photoData.id) {
      const interactions = JSON.parse(localStorage.getItem('photo-interactions') || '{}');
      return interactions[this.photoData.id] || null;
    }
    return null;
  }

  _toggleLike() {
    // Get current interaction data from localStorage
    const currentData = this._getInteractionData();
    
    this.isLiked = !this.isLiked;
    if (this.isLiked && this.isDisliked) {
      this.isDisliked = false;
    }
    
    // Update likes count based on action
    if (this.isLiked) {
      this.likesCount = currentData?.likesCount || this.likesCount;
    }
    
    // Save updated state to localStorage using setItem
    this._saveInteractionState();
    
    this.dispatchEvent(new CustomEvent('photo-liked', {
      detail: { 
        photoId: this.photoData.id, 
        liked: this.isLiked,
        likesCount: this.likesCount + (this.isLiked ? 1 : 0)
      },
      bubbles: true
    }));
  }

  _toggleDislike() {
    // Get current interaction data from localStorage
    const currentData = this._getInteractionData();
    
    this.isDisliked = !this.isDisliked;
    if (this.isDisliked && this.isLiked) {
      this.isLiked = false;
    }
    
    // Update dislikes count based on action
    if (this.isDisliked) {
      this.dislikesCount = currentData?.dislikesCount || this.dislikesCount;
    }
    
    // Save updated state to localStorage using setItem
    this._saveInteractionState();
    
    this.dispatchEvent(new CustomEvent('photo-disliked', {
      detail: { 
        photoId: this.photoData.id, 
        disliked: this.isDisliked,
        dislikesCount: this.dislikesCount + (this.isDisliked ? 1 : 0)
      },
      bubbles: true
    }));
  }

  _showFullSize() {
    this.showFullSize = true;
    document.body.style.overflow = 'hidden';
  }

  _hideFullSize() {
    this.showFullSize = false;
    document.body.style.overflow = 'auto';
  }

  _toggleDetails() {
    this.showDetails = !this.showDetails;

    this.dispatchEvent(new CustomEvent('photo-details-toggled', {
      detail: { photoId: this.photoData.id, showing: this.showDetails },
      bubbles: true
    }));
  }

  _formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  render() {
    if (!this.photoData || !this.photoData.id) {
      return html`<div class="image-placeholder">Loading Image...</div>`;
    }

    return html`
      <div class="card-header">
        <img 
          class="author-avatar" 
          src="${this._getAuthorImage()}" 
          alt="${this._getAuthorName()}"
          loading="lazy"
        />
        <div class="author-info">
          <h4 class="author-name">${this._getAuthorName()}</h4>
          <p class="channel-name">${this.photoData.author?.channelName || 'Wildlife Photography'}</p>
        </div>
      </div>

      <div class="image-container">
        ${this.loadImage && this.imageLoaded ? (
          this.imageError ? html`
            <div class="image-placeholder error">
              <p>Image temporarily unavailable</p>
            </div>
          ` : html`
            <img 
              class="main-image" 
              src="${this.photoData.thumbnail}" 
              alt="${this.photoData.name}"
              loading="lazy"
              @error="${this._handleImageError}"
              @load="${this._handleImageLoad}"
            />
          `
        ) : html`
          <div class="image-placeholder">Click to load image</div>
        `}
      </div>

      <h3 class="photo-title">${this.photoData.name}</h3>

      <div class="card-actions">
        <div class="action-buttons">
          <div class="heart-container">
            <span 
              id="heart-${this.photoData.id}" 
              class="heart-icon ${this.isLiked ? 'liked' : ''}"
              @click="${this._toggleLike}"
              title="Like this photo">${this.isLiked ? '❤️' : '🤍'}</span>
            <span class="likes-count">${this.likesCount + (this.isLiked ? 1 : 0)}</span>
          </div>
          <div class="dislike-container">
            <button 
              class="btn dislike-btn ${this.isDisliked ? 'red' : ''}" 
              @click="${this._toggleDislike}"
              title="Dislike this photo">👎</button>
            <span class="dislikes-count">${this.dislikesCount + (this.isDisliked ? 1 : 0)}</span>
          </div>
        </div>
        <button 
          class="info-btn ${this.showDetails ? 'active' : ''}" 
          @click="${this._toggleDetails}" 
          title="Show/hide photo details">Details</button>
        </div>

      ${this.showDetails ? html`
        <div class="photo-details">
          <div class="detail-date"> ${this._formatDate(this.photoData.dateTaken)}</div>
          <p class="detail-description">${this.photoData.description}</p>
        </div>
      ` : ''}
    `;
  }

  _handleImageError() {
    this.imageError = true;
    this.requestUpdate();
  }

  _handleImageLoad() {
    this.imageError = false;
    this.requestUpdate();
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(PhotoCard.tag, PhotoCard);