/**
 * Copyright 2025 Craven9
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `photo-card`
 * Instagram-like photo card component with like/dislike and sharing functionality
 * 
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
    this.showFullSize = false;
    this.imageLoaded = false;
    this.loadImage = false;
    this.showDetails = false;
    this.showComments = false;
    this.commentText = '';
    this.postedComments = [];
    this.imageError = false;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      photoData: { type: Object },
      isLiked: { type: Boolean },
      isDisliked: { type: Boolean },
      likesCount: { type: Number },
      showFullSize: { type: Boolean },
      imageLoaded: { type: Boolean },
      loadImage: { type: Boolean },
      showDetails: { type: Boolean },
      showComments: { type: Boolean },
      commentText: { type: String },
      postedComments: { type: Array },
      imageError: { type: Boolean }
    };
  }

  // Lit scoped styles
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
        cursor: pointer;
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

      .info-btn {
        background-color: transparent;
        color: var(--ddd-theme-default-slateGray);
        border: none;
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        font-size: var(--ddd-font-size-m);
        transition: all 0.2s ease;
      }

      :host([data-dark-mode]) .info-btn {
        color: var(--ddd-theme-default-limestoneGray);
      }

      .info-btn:hover {
        background-color: var(--ddd-theme-default-limestoneGray);
        color: var(--ddd-theme-default-coalyGray);
      }

      :host([data-dark-mode]) .info-btn:hover {
        background-color: var(--ddd-theme-default-slateGray);
        color: var(--ddd-theme-default-white);
      }

      .info-btn.active {
        background-color: var(--ddd-theme-default-limestoneGray);
        color: var(--ddd-theme-default-coalyGray);
      }

      :host([data-dark-mode]) .info-btn.active {
        background-color: var(--ddd-theme-default-slateGray);
        color: var(--ddd-theme-default-white);
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

      .comment-btn {
        background-color: transparent;
        color: var(--ddd-theme-default-slateGray);
        border: none;
        padding: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        font-size: var(--ddd-font-size-xs);
        transition: all 0.2s ease;
        min-width: auto;
        flex-shrink: 0;
      }

      :host([data-dark-mode]) .comment-btn {
        color: var(--ddd-theme-default-limestoneGray);
      }

      .comment-btn:hover {
        background-color: var(--ddd-theme-default-skyBlue);
        color: var(--ddd-theme-default-white);
      }

      .comment-btn.active {
        background-color: var(--ddd-theme-default-accent);
        color: var(--ddd-theme-default-white);
      }

      .comment-section {
        padding: var(--ddd-spacing-3);
        border-top: var(--ddd-border-sm);
        border-color: var(--ddd-theme-default-limestoneGray);
        background-color: var(--ddd-theme-default-limestoneLight);
        animation: slideDown 0.3s ease-out;
      }

      :host([data-dark-mode]) .comment-section {
        background-color: var(--ddd-theme-default-slateGray);
        border-color: var(--ddd-theme-default-slateGray);
      }

      .comment-input {
        width: 100%;
        min-height: 80px;
        padding: var(--ddd-spacing-2);
        border: var(--ddd-border-sm);
        border-color: var(--ddd-theme-default-limestoneGray);
        border-radius: var(--ddd-radius-sm);
        font-family: inherit;
        font-size: var(--ddd-font-size-s);
        resize: vertical;
        box-sizing: border-box;
      }

      :host([data-dark-mode]) .comment-input {
        background-color: var(--ddd-theme-default-coalyGray);
        border-color: var(--ddd-theme-default-slateGray);
        color: var(--ddd-theme-default-white);
      }

      .comment-input:focus {
        outline: none;
        border-color: var(--ddd-theme-default-accent);
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }

      .comment-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--ddd-spacing-2);
        margin-top: var(--ddd-spacing-2);
      }

      .comment-submit {
        background-color: var(--ddd-theme-default-accent);
        color: var(--ddd-theme-default-white);
        border: none;
        padding: var(--ddd-spacing-1) var(--ddd-spacing-3);
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        font-size: var(--ddd-font-size-xs);
      }

      .comment-submit:hover {
        background-color: var(--ddd-theme-default-keystoneYellow);
      }

      .comment-cancel {
        background-color: var(--ddd-theme-default-slateGray);
        color: var(--ddd-theme-default-white);
        border: none;
        padding: var(--ddd-spacing-1) var(--ddd-spacing-3);
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        font-size: var(--ddd-font-size-xs);
      }

      .comment-cancel:hover {
        background-color: var(--ddd-theme-default-coalyGray);
      }

      .posted-comments {
        padding: var(--ddd-spacing-3);
        border-top: var(--ddd-border-sm);
        border-color: var(--ddd-theme-default-limestoneGray);
        background-color: var(--ddd-theme-default-limestoneLight);
      }

      :host([data-dark-mode]) .posted-comments {
        background-color: var(--ddd-theme-default-slateGray);
        border-color: var(--ddd-theme-default-slateGray);
      }

      .comment-item {
        padding: var(--ddd-spacing-2);
        margin-bottom: var(--ddd-spacing-2);
        background-color: var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-sm);
        border-left: 3px solid var(--ddd-theme-default-accent);
        animation: fadeIn 0.3s ease-in;
      }

      :host([data-dark-mode]) .comment-item {
        background-color: var(--ddd-theme-default-coalyGray);
        color: var(--ddd-theme-default-white);
      }

      .comment-item:last-child {
        margin-bottom: 0;
      }

      .comment-text {
        font-size: var(--ddd-font-size-s);
        line-height: 1.4;
        margin: 0;
        color: var(--ddd-theme-default-coalyGray);
      }

      :host([data-dark-mode]) .comment-text {
        color: var(--ddd-theme-default-white);
      }

      .comment-timestamp {
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-default-slateGray);
        margin-top: var(--ddd-spacing-1);
      }

      :host([data-dark-mode]) .comment-timestamp {
        color: var(--ddd-theme-default-limestoneGray);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
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
      }
    `];
  }

  firstUpdated() {
    // Load like/dislike status from localStorage
    this._loadInteractionState();
  }

  updated(changedProperties) {
    if (changedProperties.has('loadImage') && this.loadImage && !this.imageLoaded) {
      this.imageLoaded = true;
    }
  }

  _loadInteractionState() {
    if (this.photoData.id) {
      const interactions = JSON.parse(localStorage.getItem('photo-interactions') || '{}');
      const photoInteraction = interactions[this.photoData.id];
      if (photoInteraction) {
        this.isLiked = photoInteraction.liked || false;
        this.isDisliked = photoInteraction.disliked || false;
      }
      this.likesCount = Math.floor(Math.random() * 1000) + 10;
    }
  }

  _saveInteractionState() {
    if (this.photoData.id) {
      const interactions = JSON.parse(localStorage.getItem('photo-interactions') || '{}');
      interactions[this.photoData.id] = {
        liked: this.isLiked,
        disliked: this.isDisliked
      };
      localStorage.setItem('photo-interactions', JSON.stringify(interactions));
    }
  }

  _toggleLike() {
    this.isLiked = !this.isLiked;
    if (this.isLiked && this.isDisliked) {
      this.isDisliked = false;
    }
    this._saveInteractionState();
    
    this.dispatchEvent(new CustomEvent('photo-liked', {
      detail: { photoId: this.photoData.id, liked: this.isLiked },
      bubbles: true
    }));
  }

  _toggleDislike() {
    this.isDisliked = !this.isDisliked;
    if (this.isDisliked && this.isLiked) {
      this.isLiked = false;
    }
    this._saveInteractionState();
    
    this.dispatchEvent(new CustomEvent('photo-disliked', {
      detail: { photoId: this.photoData.id, disliked: this.isDisliked },
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

  _toggleComments() {
    this.showComments = !this.showComments;

    if (this.showComments) {
      this.updateComplete.then(() => {
        const textarea = this.shadowRoot.querySelector('.comment-input');
        if (textarea) {
          textarea.focus();
        }
      });
    }
    
    this.dispatchEvent(new CustomEvent('photo-comments-toggled', {
      detail: { photoId: this.photoData.id, showing: this.showComments },
      bubbles: true
    }));
  }

  _handleCommentInput(e) {
    this.commentText = e.target.value;
  }

  _submitComment() {
    if (!this.commentText.trim()) return;
    
    const newComment = {
      text: this.commentText.trim(),
      timestamp: new Date().toLocaleString()
    };
    
    this.postedComments = [...this.postedComments, newComment];
    
    this.commentText = '';
    this.showComments = false;
    
    this.dispatchEvent(new CustomEvent('photo-comment-submitted', {
      detail: { photoId: this.photoData.id, comment: newComment.text },
      bubbles: true
    }));
  }

  _cancelComment() {
    this.commentText = '';
    this.showComments = false;
  }

  _sharePhoto() {
    const shareData = {
      title: this.photoData.name,
      text: `Check out this amazing photo "${this.photoData.name}" by ${this.photoData.author.name}`,
      url: window.location.href + `#photo-${this.photoData.id}`
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback: copy URL to clipboard
      const shareUrl = `${window.location.href}#photo-${this.photoData.id}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Photo link copied to clipboard!');
      });
    }

    this.dispatchEvent(new CustomEvent('photo-shared', {
      detail: { photoId: this.photoData.id, method: navigator.share ? 'native' : 'clipboard' },
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
      return html`<div class="image-placeholder">Loading...</div>`;
    }

    return html`
      <div class="card-header">
        <img 
          class="author-avatar" 
          src="${this.photoData.author.image}" 
          alt="${this.photoData.author.name}"
          loading="lazy"
        />
        <div class="author-info">
          <h4 class="author-name">${this.photoData.author.name}</h4>
          <p class="channel-name">${this.photoData.author.channelName}</p>
        </div>
      </div>

      <div class="image-container" @click="${this._showFullSize}">
        ${this.loadImage && this.imageLoaded ? (
          this.imageError ? html`
            <div class="image-placeholder error">
              <p>📷</p>
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
          <button 
            class="action-btn ${this.isLiked ? 'liked' : ''}" 
            @click="${this._toggleLike}"
            title="Like this photo"
          >
            ❤️ ${this.likesCount + (this.isLiked ? 1 : 0)}
          </button>
          <button 
            class="action-btn ${this.isDisliked ? 'disliked' : ''}" 
            @click="${this._toggleDislike}"
            title="Dislike this photo"
          >
            👎 ${this.isDisliked ? 'Disliked' : 'Dislike'}
          </button>
          <button 
            class="comment-btn ${this.showComments ? 'active' : ''}" 
            @click="${this._toggleComments}"
            title="Add a comment"
          >
            💬
          </button>
        </div>
        <button 
          class="info-btn ${this.showDetails ? 'active' : ''}" 
          @click="${this._toggleDetails}" 
          title="Show/hide photo details"
        >
          ⋯
        </button>
      </div>

      ${this.showDetails ? html`
        <div class="photo-details">
          <div class="detail-date">📅 ${this._formatDate(this.photoData.dateTaken)}</div>
          <p class="detail-description">${this.photoData.description}</p>
        </div>
      ` : ''}

      ${this.showComments ? html`
        <div class="comment-section">
          <textarea 
            class="comment-input" 
            placeholder="Write a comment about this photo..."
            .value="${this.commentText}"
            @input="${this._handleCommentInput}"
          ></textarea>
          <div class="comment-actions">
            <button class="comment-cancel" @click="${this._cancelComment}">Cancel</button>
            <button class="comment-submit" @click="${this._submitComment}">Post Comment</button>
          </div>
        </div>
      ` : ''}

      ${this.postedComments.length > 0 ? html`
        <div class="posted-comments">
          ${this.postedComments.map(comment => html`
            <div class="comment-item">
              <p class="comment-text">${comment.text}</p>
              <div class="comment-timestamp">${comment.timestamp}</div>
            </div>
          `)}
        </div>
      ` : ''}

      ${this.showFullSize ? html`
        <div class="fullsize-overlay" @click="${this._hideFullSize}">
          <button class="close-btn" @click="${this._hideFullSize}">✕</button>
          <img 
            class="fullsize-image" 
            src="${this.photoData.fullSize}" 
            alt="${this.photoData.name}"
            @click="${(e) => e.stopPropagation()}"
          />
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