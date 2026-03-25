export const chapter1_2 = {
  moduleNum: 1,
  title: 'Watch and Learn',
  subtitle: 'Watch this exciting video about community helpers and what they do',
  sceneArea: 'hospital',
  getHTML() {
    return `
      <!-- Header card -->
      <div class="topic-card header-card">
        <span class="module-badge module-1">Module 1 - Chapter 2</span>
        <h1>Watch and Learn</h1>
        <p class="chapter-subtitle">Watch this exciting video about community helpers and what they do</p>
        <p>Get ready to watch a fun video that will teach you all about community helpers. Pay close attention because there will be a quiz after the video.</p>
      </div>

      <!-- Video card -->
      <div class="topic-card">
        <h2>Community Helpers Video</h2>
        <p>This video will show you different community helpers in action. Watch how they help people every day.</p>
        <div class="video-embed">
          <iframe
            src="https://www.youtube.com/embed/8HRCH02DoDI?rel=0"
            title="Community Helpers for Kids"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="video-embed">
          <iframe
            src="https://www.youtube.com/embed/GqJwOwMqYzk?rel=0"
            title="Community Helpers for Kids"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- What to look for -->
      <div class="topic-card">
        <h2>What to Look For</h2>
        <p>While watching the video, try to notice these things:</p>
        <ol>
          <li>What different community helpers are shown in the video?</li>
          <li>What tools or equipment do they use?</li>
          <li>Where do they work?</li>
          <li>How do they help people in the community?</li>
        </ol>
      </div>

      <!-- Fun Facts -->
      <div class="topic-card">
        <h2>Fun Facts</h2>
        <ul>
          <li>Firefighters can respond to emergencies in less than 5 minutes</li>
          <li>Doctors study for many years to learn how to help sick people</li>
          <li>Police officers drive special cars with sirens and flashing lights</li>
          <li>Teachers plan every lesson to make learning fun for students</li>
        </ul>
        <p>After watching the video, head to the next chapter to test your knowledge with a fun quiz.</p>
      </div>
    `;
  },
};
