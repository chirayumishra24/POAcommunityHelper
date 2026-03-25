export class QuizComponent {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.answered = 0;
  }

  render(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'quiz-container';

    this.questions.forEach((q, qi) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'quiz-question';
      qDiv.id = `quiz-q-${qi}`;

      const qText = document.createElement('div');
      qText.className = 'q-text';
      qText.textContent = `${qi + 1}. ${q.question}`;
      qDiv.appendChild(qText);

      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'quiz-options';

      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, oi) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'quiz-option';
        optBtn.id = `quiz-q${qi}-opt${oi}`;

        const letter = document.createElement('span');
        letter.className = 'option-letter';
        letter.textContent = letters[oi];

        const text = document.createElement('span');
        text.textContent = opt;

        optBtn.appendChild(letter);
        optBtn.appendChild(text);

        optBtn.addEventListener('click', () => {
          this._handleAnswer(qi, oi, qDiv);
        });

        optionsDiv.appendChild(optBtn);
      });

      qDiv.appendChild(optionsDiv);
      wrapper.appendChild(qDiv);
    });

    // Score display
    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'quiz-score';
    scoreDiv.style.display = 'none';
    scoreDiv.style.textAlign = 'center';
    scoreDiv.style.marginTop = '24px';
    scoreDiv.style.padding = '20px';
    scoreDiv.style.borderRadius = '16px';
    scoreDiv.style.fontFamily = 'Outfit, sans-serif';
    scoreDiv.style.fontWeight = '800';
    scoreDiv.style.fontSize = '1.2rem';
    wrapper.appendChild(scoreDiv);

    container.appendChild(wrapper);
  }

  _handleAnswer(qi, selectedIdx, qDiv) {
    const question = this.questions[qi];
    const options = qDiv.querySelectorAll('.quiz-option');

    // Check if already answered
    if (options[0].classList.contains('disabled')) return;

    const isCorrect = selectedIdx === question.answer;

    options.forEach((opt, idx) => {
      opt.classList.add('disabled');
      if (idx === question.answer) {
        opt.classList.add('correct');
      }
      if (idx === selectedIdx && !isCorrect) {
        opt.classList.add('incorrect');
      }
    });

    // Show feedback
    const feedback = document.createElement('div');
    feedback.className = `quiz-feedback ${isCorrect ? 'correct-fb' : 'incorrect-fb'}`;
    feedback.textContent = isCorrect
      ? 'Great job! That is correct!'
      : `Not quite. The correct answer is ${['A', 'B', 'C', 'D'][question.answer]}: ${question.options[question.answer]}`;
    qDiv.appendChild(feedback);

    if (isCorrect) this.score++;
    this.answered++;

    // Show score when all answered
    if (this.answered === this.questions.length) {
      this._showScore();
    }
  }

  _showScore() {
    const scoreDiv = document.getElementById('quiz-score');
    if (!scoreDiv) return;

    const percentage = Math.round((this.score / this.questions.length) * 100);
    let message;
    let bgColor;

    if (percentage === 100) {
      message = `Perfect Score! ${this.score}/${this.questions.length} - You are a Community Helper expert!`;
      bgColor = 'linear-gradient(135deg, rgba(126, 211, 33, 0.15), rgba(76, 175, 80, 0.1))';
    } else if (percentage >= 60) {
      message = `Good job! ${this.score}/${this.questions.length} - You know your community helpers well!`;
      bgColor = 'linear-gradient(135deg, rgba(74, 144, 217, 0.15), rgba(33, 150, 243, 0.1))';
    } else {
      message = `${this.score}/${this.questions.length} - Keep learning! Watch the video again and try once more.`;
      bgColor = 'linear-gradient(135deg, rgba(245, 166, 35, 0.15), rgba(255, 193, 7, 0.1))';
    }

    scoreDiv.textContent = message;
    scoreDiv.style.background = bgColor;
    scoreDiv.style.display = 'block';
  }
}
