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
    this.darkMode = false;
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
      imageError: { type: Boolean },
      darkMode: { type: Boolean }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        max-width: 320px;
        min-height: 400px;
        margin: var(--ddd-spacing-3);
        border: var(--ddd-border-sm);
        border-radius: var(--ddd-radius-md);
        background-color: var(--ddd-theme-default-white);
        box-shadow: var(--ddd-boxShadow-sm);
        transition: all 0.3s ease;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      :host([dark-mode]) {
        background-color: var(--ddd-theme-default-coalyGray);
        border-color: var(--ddd-theme-default-slateGray);
        box-shadow: var(--ddd-boxShadow-md);
        color: var(--ddd-theme-default-limestoneLight);
      }



      :host(:hover) {
        box-shadow: var(--ddd-boxShadow-md);
        transform: translateY(-2px);
      }

      :host([dark-mode]:hover) {
        box-shadow: var(--ddd-boxShadow-lg);
      }

      .card-header {
        display: flex;
        align-items: flex-start;
        padding: var(--ddd-spacing-3);
        padding-bottom: 0;
        gap: var(--ddd-spacing-3);
        min-height: 80px;
        max-height: 80px;
        flex-shrink: 0;
      }

      .author-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid var(--ddd-theme-default-limestoneGray);
        object-fit: cover;
      }

      .placeholder-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(45deg, var(--ddd-theme-default-limestoneLight), var(--ddd-theme-default-limestoneGray));
        border: 2px solid var(--ddd-theme-default-limestoneGray);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--ddd-theme-default-slateGray);
        font-size: var(--ddd-font-size-xs);
        font-weight: var(--ddd-font-weight-bold);
      }

      .placeholder-avatar::before {
        content: "👤";
        font-size: 16px;
      }

      .author-info {
        flex: 1;
        min-height: 64px;
        max-height: 64px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--ddd-spacing-1) 0;
      }

      .author-name {
        font-weight: var(--ddd-font-weight-bold);
        font-size: var(--ddd-font-size-xs);
        margin: 0 0 var(--ddd-spacing-1) 0;
        color: var(--ddd-theme-default-coalyGray);
        line-height: 1.2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 32px;
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .author-name {
        color: var(--ddd-theme-default-white);
      }



      .channel-name {
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-default-slateGray);
        margin: 0;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 22px;
        padding-bottom: var(--ddd-spacing-2);
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .channel-name {
        color: var(--ddd-theme-default-limestoneLight);
      }

      .image-container {
        position: relative;
        width: 100%;
        aspect-ratio: 1;
        background-color: var(--ddd-theme-default-limestoneGray);
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
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
        padding: var(--ddd-spacing-2) var(--ddd-spacing-2) var(--ddd-spacing-1) var(--ddd-spacing-2);
        margin: 0;
        font-size: var(--ddd-font-size-s);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-coalyGray);
        line-height: 1.3;
        text-align: center;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        min-height: auto;
        max-height: 40px;
        flex-shrink: 0;
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .photo-title {
        color: var(--ddd-theme-default-white);
      }



      .card-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--ddd-spacing-3);
        border-top: var(--ddd-border-sm);
        border-color: var(--ddd-theme-default-limestoneGray);
        gap: var(--ddd-spacing-3);
        min-height: 56px;
        flex-shrink: 0;
        transition: border-color 0.3s ease;
      }

      :host([dark-mode]) .card-actions {
        border-color: var(--ddd-theme-default-slateGray);
      }

      .action-buttons {
        display: flex;
        gap: var(--ddd-spacing-2);
        align-items: flex-end;
        justify-content: space-between;
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

      .action-btn:hover {
        background-color: var(--ddd-theme-default-limestoneGray);
        color: var(--ddd-theme-default-coalyGray);
      }

      .action-btn.liked {
        color: var(--ddd-theme-default-error);
        background-color: var(--ddd-theme-default-errorLight);
        border: 1px solid var(--ddd-theme-default-error);
      }

      .action-btn.liked:hover {
        background-color: var(--ddd-theme-default-errorLight);
        color: var(--ddd-theme-default-error);
      }

      .action-btn.disliked {
        color: var(--ddd-theme-default-warning);
        background-color: var(--ddd-theme-default-warningLight);
        border: 1px solid var(--ddd-theme-default-warning);
      }

      .action-btn.disliked:hover {
        background-color: var(--ddd-theme-default-warningLight);
        color: var(--ddd-theme-default-warning);
      }

      /* Like Button Styles */
      .heart-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--ddd-spacing-1);
        height: 77.33px;
        justify-content: center;
        padding: var(--ddd-spacing-1) 0;
      }

      .heart-container p {
        margin: 0;
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-default-slateGray);
        text-align: center;
      }

      .heart-icon {
        font-size: var(--ddd-font-size-l);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border-radius: var(--ddd-radius-sm);
        transition: all 0.2s ease;
        width: 40px;
        height: 40px;
        line-height: 1;
        box-sizing: border-box;
      }

      .heart-icon:hover {
        background-color: var(--ddd-theme-default-errorLight);
        transform: scale(1.1);
      }

      .heart-icon.liked {
        animation: pulse .4s ease;
      }

      .likes-count {
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-coalyGray);
        font-weight: var(--ddd-font-weight-medium);
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .likes-count {
        color: var(--ddd-theme-default-limestoneLight);
      }

      /* Dislike button */
      .dislike-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--ddd-spacing-1);
        height: 77.33px;
        justify-content: center;
        padding: var(--ddd-spacing-1) 0;
      }

      .dislikes-count {
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-coalyGray);
        font-weight: var(--ddd-font-weight-medium);
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .dislikes-count {
        color: var(--ddd-theme-default-limestoneLight);
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
        padding: 0;
        border-radius: var(--ddd-radius-sm);
        transition: all 0.2s ease;
        font-size: var(--ddd-font-size-l);
        filter: grayscale(100%);
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        box-sizing: border-box;
      }

      .btn:focus {
        outline: none;
      }

      .dislike-btn:hover {
        background-color: var(--ddd-theme-default-errorLight);
        transform: scale(1.1);
      }

      .btn.red {
        filter: none;
        animation: pulse 0.3s ease;
      }

      .info-btn {
        background: var(--ddd-theme-default-info);
        color: var(--ddd-theme-default-white);
        border: none;
        padding: var(--ddd-spacing-1) var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-md);
        cursor: pointer;
        font-size: var(--ddd-font-size-xs);
        font-weight: var(--ddd-font-weight-medium);
        text-transform: capitalize;
        transition: all 0.3s ease;
        box-shadow: var(--ddd-boxShadow-sm);
        min-width: 75px;
        text-align: center;
        margin-right: var(--ddd-spacing-4);
        letter-spacing: 0.3px;
      }

      :host([dark-mode]) .info-btn {
        background: var(--ddd-theme-default-slateGray);
        color: var(--ddd-theme-default-limestoneLight);
        box-shadow: var(--ddd-boxShadow-md);
      }

      .info-btn:hover {
        background: var(--ddd-theme-default-info);
        color: var(--ddd-theme-default-white);
        transform: translateY(-1px);
        box-shadow: var(--ddd-boxShadow-md);
        opacity: 0.9;
      }

      :host([dark-mode]) .info-btn:hover {
        background: var(--ddd-theme-default-info);
        color: var(--ddd-theme-default-coalyGray);
        box-shadow: var(--ddd-boxShadow-lg);
      }

      .info-btn.active {
        background: linear-gradient(135deg, var(--ddd-theme-default-accent), var(--ddd-theme-default-info));
        color: var(--ddd-theme-default-white);
        transform: translateY(-1px);
        box-shadow: var(--ddd-boxShadow-md);
        font-weight: var(--ddd-font-weight-bold);
      }

      :host([dark-mode]) .info-btn.active {
        background: var(--ddd-theme-default-info);
        color: var(--ddd-theme-default-white);
        box-shadow: var(--ddd-boxShadow-lg);
      }

      .photo-details {
        padding: var(--ddd-spacing-3);
        border-top: var(--ddd-border-sm);
        border-color: var(--ddd-theme-default-limestoneGray);
        background-color: var(--ddd-theme-default-limestoneLight);
        animation: slideDown 0.3s ease-out;
        transition: background-color 0.3s ease, border-color 0.3s ease;
      }

      :host([dark-mode]) .photo-details {
        background-color: var(--ddd-theme-default-coalyGray);
        border-color: var(--ddd-theme-default-slateGray);
      }

      .detail-date {
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-default-slateGray);
        margin: 0 0 var(--ddd-spacing-2) 0;
        font-weight: var(--ddd-font-weight-bold);
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .detail-date {
        color: var(--ddd-theme-default-limestoneLight);
      }

      .detail-description {
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-coalyGray);
        line-height: 1.5;
        margin: 0;
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .detail-description {
        color: var(--ddd-theme-default-limestoneLight);
      }



      .photo-details-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: var(--ddd-theme-default-coalyGray);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease-out;
        padding: var(--ddd-spacing-4);
        box-sizing: border-box;
      }

      :host([dark-mode]) .photo-details-modal {
        background-color: var(--ddd-theme-default-coalyGray);
      }

      .modal-card {
        background-color: var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-lg);
        box-shadow: var(--ddd-boxShadow-xl);
        max-width: 600px;
        max-height: 90vh;
        width: 100%;
        overflow-y: auto;
        position: relative;
        animation: slideUp 0.4s ease-out;
        transition: background-color 0.3s ease;
      }

      :host([dark-mode]) .modal-card {
        background-color: var(--ddd-theme-default-coalyGray);
        box-shadow: var(--ddd-boxShadow-xl);
      }

      .modal-close {
        position: absolute;
        top: var(--ddd-spacing-3);
        right: var(--ddd-spacing-3);
        background: var(--ddd-theme-default-coalyGray);
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        cursor: pointer;
        color: var(--ddd-theme-default-white);
        font-size: var(--ddd-font-size-l);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        transition: all 0.3s ease;
      }

      .modal-close:hover {
        background: var(--ddd-theme-default-slateGray);
        transform: scale(1.1);
      }

      .modal-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: var(--ddd-radius-lg) var(--ddd-radius-lg) 0 0;
      }

      .modal-content {
        padding: var(--ddd-spacing-4);
      }

      .modal-title {
        font-size: var(--ddd-font-size-xl);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-theme-default-coalyGray);
        margin: 0 0 var(--ddd-spacing-3) 0;
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .modal-title {
        color: var(--ddd-theme-default-white);
      }

      .modal-author-info {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-3);
        margin-bottom: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-3);
        background-color: var(--ddd-theme-default-limestoneLight);
        border-radius: var(--ddd-radius-md);
        transition: background-color 0.3s ease;
      }

      :host([dark-mode]) .modal-author-info {
        background-color: var(--ddd-theme-default-coalyGray);
      }

      .modal-author-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid var(--ddd-theme-default-limestoneGray);
        object-fit: cover;
      }

      .modal-author-details h4 {
        margin: 0 0 var(--ddd-spacing-1) 0;
        color: var(--ddd-theme-default-coalyGray);
        font-size: var(--ddd-font-size-m);
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .modal-author-details h4 {
        color: var(--ddd-theme-default-white);
      }

      .modal-author-details p {
        margin: 0;
        color: var(--ddd-theme-default-slateGray);
        font-size: var(--ddd-font-size-s);
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .modal-author-details p {
        color: var(--ddd-theme-default-limestoneLight);
      }

      .modal-date {
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-slateGray);
        margin: 0 0 var(--ddd-spacing-3) 0;
        font-weight: var(--ddd-font-weight-bold);
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .modal-date {
        color: var(--ddd-theme-default-limestoneLight);
      }

      .modal-description {
        font-size: var(--ddd-font-size-m);
        color: var(--ddd-theme-default-coalyGray);
        line-height: 1.6;
        margin: 0 0 var(--ddd-spacing-4) 0;
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .modal-description {
        color: var(--ddd-theme-default-limestoneLight);
      }

      .modal-stats {
        display: flex;
        gap: var(--ddd-spacing-4);
        align-items: center;
        padding: var(--ddd-spacing-3);
        background-color: var(--ddd-theme-default-limestoneLight);
        border-radius: var(--ddd-radius-md);
        transition: background-color 0.3s ease;
      }

      :host([dark-mode]) .modal-stats {
        background-color: var(--ddd-theme-default-coalyGray);
      }

      .modal-stat {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-1);
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-coalyGray);
        transition: color 0.3s ease;
      }

      :host([dark-mode]) .modal-stat {
        color: var(--ddd-theme-default-limestoneLight);
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from { 
          opacity: 0;
          transform: translateY(50px) scale(0.9);
        }
        to { 
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @media (max-width: 768px) {
        .modal-card {
          max-width: 95vw;
          margin: var(--ddd-spacing-2);
        }

        .modal-content {
          padding: var(--ddd-spacing-3);
        }

        .modal-image {
          height: 250px;
        }

        .modal-title {
          font-size: var(--ddd-font-size-l);
        }
      }

      .fullsize-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: var(--ddd-theme-default-coalyGray);
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
        background: var(--ddd-theme-default-white);
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
    
    if (changedProperties.has('darkMode')) {
      // Update the host attribute for CSS targeting
      if (this.darkMode) {
        this.setAttribute('dark-mode', '');
      } else {
        this.removeAttribute('dark-mode');
      }
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
    
    // Update dislikes 
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
        ${this.loadImage ? html`
          <img 
            class="author-avatar" 
            src="${this._getAuthorImage()}" 
            alt="${this._getAuthorName()}"
            loading="lazy"
          />
        ` : html`
          <div class="author-avatar placeholder-avatar"></div>
        `}
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
          <p class="detail-date">
            Posted on ${this.photoData.dateTaken ? this._formatDate(this.photoData.dateTaken) : 'Unknown date'}
          </p>
          <p class="detail-description">
            ${this.photoData.description || 'No description available for this photo.'}
          </p>
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