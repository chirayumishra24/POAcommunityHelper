export class RiddleComponent {
  constructor(riddles) {
    this.riddles = riddles;
    this.currentIndex = 0;
    this.showingAnswer = false;
  }

  render(container) {
    this.container = container;
    this._renderCurrent();
  }

  _renderCurrent() {
    this.container.innerHTML = '';
    
    if (this.riddles.length === 0) return;

    const riddle = this.riddles[this.currentIndex];
    
    const wrapper = document.createElement('div');
    wrapper.className = 'riddle-wrapper';

    const header = document.createElement('div');
    header.className = 'riddle-header';
    header.textContent = `Riddle ${this.currentIndex + 1} of ${this.riddles.length}`;
    wrapper.appendChild(header);

    const isSuperChallenge = riddle.text.startsWith('SUPER CHALLENGE');
    if (isSuperChallenge) {
      const badge = document.createElement('div');
      badge.className = 'riddle-badge super-challenge';
      badge.textContent = '🌟 Super Challenge';
      wrapper.appendChild(badge);
    }

    const textDiv = document.createElement('div');
    textDiv.className = 'riddle-text';
    textDiv.innerHTML = riddle.text.replace('SUPER CHALLENGE:\n', '').replace(/\n/g, '<br>');
    wrapper.appendChild(textDiv);

    const answerDiv = document.createElement('div');
    answerDiv.className = 'riddle-answer ' + (this.showingAnswer ? 'visible' : '');
    answerDiv.innerHTML = `👉 <strong>${riddle.answer}</strong>`;
    wrapper.appendChild(answerDiv);

    const controls = document.createElement('div');
    controls.className = 'riddle-controls';

    const revealBtn = document.createElement('button');
    revealBtn.className = 'riddle-btn primary';
    revealBtn.textContent = this.showingAnswer ? 'Hide Answer' : 'Reveal Answer';
    revealBtn.addEventListener('click', () => {
      this.showingAnswer = !this.showingAnswer;
      this._renderCurrent();
    });
    controls.appendChild(revealBtn);

    const navLayout = document.createElement('div');
    navLayout.className = 'riddle-nav';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'riddle-btn outline';
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = this.currentIndex === 0;
    prevBtn.addEventListener('click', () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.showingAnswer = false;
        this._renderCurrent();
      }
    });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'riddle-btn outline';
    nextBtn.textContent = this.currentIndex === this.riddles.length - 1 ? 'Finish' : 'Next Riddle';
    nextBtn.addEventListener('click', () => {
      if (this.currentIndex < this.riddles.length - 1) {
        this.currentIndex++;
        this.showingAnswer = false;
        this._renderCurrent();
      } else {
        // Simple finish state
        this.container.innerHTML = `
          <div class="riddle-wrapper completion">
            <h2>🎉 Amazing Job!</h2>
            <p>You solved all the community helper riddles!</p>
            <button class="riddle-btn primary riddle-restart">Play Again</button>
          </div>
        `;
        this.container.querySelector('.riddle-restart').addEventListener('click', () => {
          this.currentIndex = 0;
          this.showingAnswer = false;
          this._renderCurrent();
        });
      }
    });

    navLayout.appendChild(prevBtn);
    navLayout.appendChild(nextBtn);
    controls.appendChild(navLayout);

    wrapper.appendChild(controls);
    this.container.appendChild(wrapper);
  }
}
