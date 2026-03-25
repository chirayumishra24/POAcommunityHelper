export class ContentOverlay {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this._currentChapter = null;
    this._transitioning = false;
  }

  show(chapter) {
    if (this._transitioning) return;

    if (this._currentChapter) {
      // Animate out all cards, then render new chapter
      this._transitioning = true;
      const cards = this.container.querySelectorAll('.topic-card');
      if (cards.length > 0) {
        cards.forEach((card) => card.classList.add('card-exit'));
        // Wait for animation to finish on last card
        const lastCard = cards[cards.length - 1];
        lastCard.addEventListener(
          'animationend',
          () => {
            this._renderChapter(chapter);
            this._transitioning = false;
          },
          { once: true }
        );
      } else {
        this._renderChapter(chapter);
        this._transitioning = false;
      }
    } else {
      this._renderChapter(chapter);
    }
  }

  _renderChapter(chapter) {
    this.container.innerHTML = chapter.getHTML();
    this._currentChapter = chapter;

    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Call onMount hook for interactive chapters (quiz)
    if (chapter.onMount) {
      requestAnimationFrame(() => chapter.onMount());
    }
  }
}
