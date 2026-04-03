import { RiddleComponent } from '../ui/RiddleComponent.js';

const riddlesData = [
  { text: "I don’t fight with people,\nBut I fight with flames.\nWith water and courage,\nI protect homes and names.\nWho am I?", answer: "Firefighter", image: "images/firefighter.png" },
  { text: "I wear a coat that’s usually white,\nI check your health to make things right.\nWith a stethoscope, I listen well,\nHelping you feel better when you’re unwell.\nWho am I?", answer: "Doctor", image: "images/doctor.png" },
  { text: "I don’t cook for myself alone,\nI serve meals that are widely known.\nIn a busy kitchen, I take the lead,\nMaking delicious food for all to eat.\nWho am I?", answer: "Chef", image: "images/chef.png" },
  { text: "I stand at gates both day and night,\nKeeping watch to make things right.\nI may not talk much, but I always see,\nMaking sure the place is safe to be.\nWho am I?", answer: "Security Guard / Watchman", image: "images/security_guard.png" },
  { text: "I travel near, I travel far,\nBringing packages by bike or car.\nRain or sun, I don’t delay,\nYour parcel reaches you on time each day.\nWho am I?", answer: "Delivery Person", image: "images/delivery_person.png" },
  { text: "I wear a uniform and a badge with pride,\nHelping people and standing by their side.\nLost and confused, you come to me,\nI keep the rules for safety.\nWho am I?", answer: "Police Officer", image: "images/police.png" },
  { text: "I help young minds grow each day,\nGuiding them along the way.\nWith books and lessons, I help you see,\nThe best version of who you can be.\nWho am I?", answer: "Teacher", image: "images/teacher.png" },
  { text: "With soil and seeds, I start my day,\nHelping green life grow my way.\nFlowers bloom because of me,\nMaking the world a better place to see.\nWho am I?", answer: "Gardener", image: "images/gardener.png" },
  { text: "I don’t build houses, but I help you stay,\nClean and healthy every day.\nIn hospitals, I’m always near,\nCaring for patients with kindness and care.\nWho am I?", answer: "Nurse", image: "images/nurse.png" },
  { text: "I control traffic without a car,\nWhistling loudly, heard from afar.\nRaising my hand, I make you stop,\nKeeping roads safe around the clock.\nWho am I?", answer: "Traffic Police", image: "images/traffic_police.png" },
  { text: "SUPER CHALLENGE:\nI help in danger, but I’m not alone,\nA team supports me wherever I’m known.\nWith tools and courage, we work as one,\nUntil the rescue work is done.\nWho am I?", answer: "Firefighter Team", image: "images/firefighter.png" },
  { text: "SUPER CHALLENGE:\nI don’t build schools, but I build minds,\nShaping futures of all kinds.\nEvery word I say can guide,\nHelping knowledge grow inside.\nWho am I?", answer: "Teacher", image: "images/teacher.png" },
  { text: "SUPER CHALLENGE:\nI don’t grow food, but I help it reach you,\nFrom faraway places to something you chew.\nWithout me, your order would never arrive,\nKeeping delivery systems alive.\nWho am I?", answer: "Delivery Person", image: "images/delivery_person.png" },
  { text: "SUPER CHALLENGE:\nI keep watch when others sleep,\nMy duty is strong, my promise I keep.\nNo danger escapes my sight,\nI guard your safety day and night.\nWho am I?", answer: "Security Guard", image: "images/security_guard.png" },
  { text: "SUPER CHALLENGE:\nI don’t make rules, but I make sure they’re followed,\nOn busy streets or roads that are hollowed.\nWith signals and signs, I guide the flow,\nEnsuring where vehicles can safely go.\nWho am I?", answer: "Traffic Police", image: "images/traffic_police.png" }
];

export const chapter2_3 = {
  moduleNum: 2,
  title: 'Key Takeaways',
  subtitle: 'Everything you have learned about community helpers',
  sceneArea: 'overview',
  getHTML() {
    return `
      <!-- Header card -->
      <div class="topic-card header-card">
        <span class="module-badge module-2">Module 2 - Chapter 3</span>
        <h1>Key Takeaways</h1>
        <div class="chapter-images" style="margin: 10px 0;"><img src="/images/info_together.png" alt="Key Takeaways" style="max-width: 100%; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" /></div>
        <p class="chapter-subtitle">Everything you have learned about community helpers</p>
        <p>You have done an amazing job learning about community helpers. Let us review the most important things you have learned.</p>
      </div>

      <!-- Takeaway grid card -->
      <div class="topic-card">
        <h2>What You Should Remember</h2>
        <div class="chapter-images" style="margin: 16px 0;"><img src="/images/takeaways_all.png" alt="All Takeaways Summary" style="width: 65%; max-width: 65%; height: auto; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: block; margin: 0 auto;" /></div>
        <div class="takeaway-grid">
          <div class="takeaway-card">
            <div class="takeaway-icon">1</div>
            <div class="takeaway-title">Helpers Are Everywhere</div>
            <div class="takeaway-desc">Community helpers are all around us, working every day to keep us safe and happy.</div>
          </div>
          <div class="takeaway-card">
            <div class="takeaway-icon">2</div>
            <div class="takeaway-title">Each Has a Role</div>
            <div class="takeaway-desc">Every community helper has a special role. Doctors heal, firefighters rescue, teachers educate.</div>
          </div>
          <div class="takeaway-card">
            <div class="takeaway-icon">3</div>
            <div class="takeaway-title">They Use Special Tools</div>
            <div class="takeaway-desc">Community helpers use special tools and equipment to do their jobs well.</div>
          </div>
          <div class="takeaway-card">
            <div class="takeaway-icon">4</div>
            <div class="takeaway-title">They Work Together</div>
            <div class="takeaway-desc">Community helpers often work together. A firefighter and ambulance driver may arrive at the same emergency.</div>
          </div>
          <div class="takeaway-card">
            <div class="takeaway-icon">5</div>
            <div class="takeaway-title">We Can Help Too</div>
            <div class="takeaway-desc">Even kids can be community helpers by being kind, following rules, and helping others.</div>
          </div>
          <div class="takeaway-card">
            <div class="takeaway-icon">6</div>
            <div class="takeaway-title">Say Thank You</div>
            <div class="takeaway-desc">Always remember to thank community helpers for the important work they do every day.</div>
          </div>
        </div>
      </div>

      <!-- What You Learned -->
      <div class="topic-card">
        <h2>What You Learned</h2>
        <ol>
          <li>You identified different community helpers and their roles</li>
          <li>You learned where these helpers work</li>
          <li>You watched a video about community helpers in action</li>
          <li>You solved real-life scenarios by picking the right helper</li>
          <li>You did a fun roleplay activity pretending to be a helper</li>
        </ol>
      </div>

      <!-- Extra Challenge -->
      <div class="topic-card">
        <h2>Extra Challenge</h2>
        <div class="brownie-box">
          <div class="brownie-title">Become a Community Helper for a Day</div>
          <p>Try to be a community helper for one day. Help your family at home, be kind to your classmates, or pick up litter in your neighborhood. Write about your experience and share it with your class.</p>
        </div>
      </div>

      <!-- Riddle UI Component -->
      <div class="topic-card">
        <h2>Riddle Time</h2>
        <p>Test your brain with a fun riddle about community helpers.</p>
        <div id="riddle-mount"></div>
        <p style="margin-top: 16px;">Congratulations on completing the Community Helper Roleplay Activity. You are now a Community Helper expert.</p>
      </div>
    `;
  },
  onMount() {
    const mount = document.getElementById('riddle-mount');
    if (mount) {
      const riddleComp = new RiddleComponent(riddlesData);
      riddleComp.render(mount);
    }
  }
};
