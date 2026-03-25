import { QuizComponent } from '../ui/QuizComponent.js';

const quizData = [
  {
    question: 'Who helps us when we are sick?',
    options: ['Firefighter', 'Doctor', 'Police Officer', 'Teacher'],
    answer: 1,
  },
  {
    question: 'Where does a firefighter work?',
    options: ['Hospital', 'School', 'Fire Station', 'Post Office'],
    answer: 2,
  },
  {
    question: 'Who teaches us at school?',
    options: ['Doctor', 'Police Officer', 'Farmer', 'Teacher'],
    answer: 3,
  },
  {
    question: 'What does a police officer do?',
    options: [
      'Puts out fires',
      'Teaches children',
      'Keeps the community safe',
      'Delivers letters',
    ],
    answer: 2,
  },
  {
    question: 'Who brings letters and packages to our house?',
    options: ['Firefighter', 'Doctor', 'Teacher', 'Postal Worker'],
    answer: 3,
  },
];

export const chapter1_3 = {
  moduleNum: 1,
  title: 'Quiz Time',
  subtitle: 'Test what you have learned about community helpers',
  sceneArea: 'school',
  getHTML() {
    return `
      <!-- Header card -->
      <div class="topic-card header-card">
        <span class="module-badge module-1">Module 1 - Chapter 3</span>
        <h1>Quiz Time</h1>
        <p class="chapter-subtitle">Test what you have learned about community helpers</p>
        <p>Great job watching the video. Now let us see how much you remember. Click on the correct answer for each question.</p>
      </div>

      <!-- Quiz card -->
      <div class="topic-card">
        <h2>Answer the Questions</h2>
        <div id="quiz-mount"></div>
      </div>
    `;
  },
  onMount() {
    const mount = document.getElementById('quiz-mount');
    if (mount) {
      const quiz = new QuizComponent(quizData);
      quiz.render(mount);
    }
  },
};
