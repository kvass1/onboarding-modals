const steps = [
  {
    title: "Create Interactive Activities",
    description:
      "Create interactive activities your students can use right away, from fillable worksheets and quizzes to games and more.",
    video: "./elements/videos/1_activities.mp4"
  },
  {
    title: "Agentic AI Grading (New)",
    description:
      "Grade a full set of student submissions at once using your own rubric. Colleague AI reviews each response and creates a detailed feedback report for every student.",
    video: "./elements/videos/2_agentic.mp4"
  },
  {
    title: "Plan Lessons with Confidence",
    description:
      "Generate complete, standards-aligned lesson plans for any grade level or subject. Then run a classroom simulation to preview the questions students might ask.",
    video: "./elements/videos/3_lesson.mp4"
  },
  {
    title: "Generate Image",
    description:
      "Generate high-quality images to support your lessons and presentations, making learning more visual and engaging. Designed for education.",
    video: "./elements/videos/4_images.mp4"
  }
];

let currentStep = 0;
let isTransitioning = false;
const OUT_MS = 210;
const IN_MS = 270;

const tourModal = document.getElementById("tourModal");
const doneModal = document.getElementById("doneModal");
const slideStage = document.getElementById("slideStage");
const featureVideo = document.getElementById("featureVideo");
const title = document.getElementById("modalTitle");
const description = document.getElementById("modalDescription");
const dots = document.getElementById("dots");
const nextBtn = document.getElementById("nextBtn");
const skipBtn = document.getElementById("skipBtn");
const doneCta = document.getElementById("doneCta");

function renderDots() {
  dots.innerHTML = "";

  steps.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = `dot ${index === currentStep ? "is-active" : ""}`;
    dots.append(dot);
  });
}

function render() {
  const step = steps[currentStep];

  title.textContent = step.title;
  description.textContent = step.description;

  featureVideo.src = step.video;
  featureVideo.currentTime = 0;
  featureVideo.play().catch(() => {});

  nextBtn.textContent = currentStep === steps.length - 1 ? "Finish" : "Continue";

  renderDots();
}

function closeTour() {
  featureVideo.pause();
  tourModal.classList.add("is-hidden");
  tourModal.setAttribute("aria-hidden", "true");
}

function finishTour() {
  closeTour();
  doneModal.classList.remove("is-hidden");
  doneModal.setAttribute("aria-hidden", "false");
}

async function transitionToStep(index, direction = "left") {
  if (isTransitioning) return;

  isTransitioning = true;
  nextBtn.disabled = true;
  const exitClass = direction === "left" ? "is-exiting-left" : "is-exiting-right";
  const enterClass = direction === "left" ? "is-entering-right" : "is-entering-left";
  slideStage.classList.add(exitClass);

  await new Promise((resolve) => setTimeout(resolve, OUT_MS));

  currentStep = index;
  render();
  slideStage.classList.remove(exitClass);
  slideStage.classList.add(enterClass);

  setTimeout(() => {
    slideStage.classList.remove(enterClass);
    nextBtn.disabled = false;
    isTransitioning = false;
  }, IN_MS);
}

nextBtn.addEventListener("click", () => {
  if (isTransitioning) return;

  if (currentStep === steps.length - 1) {
    finishTour();
    return;
  }

  transitionToStep(currentStep + 1, "left");
});

skipBtn.addEventListener("click", finishTour);

doneCta.addEventListener("click", () => {
  doneModal.classList.add("is-hidden");
  doneModal.setAttribute("aria-hidden", "true");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTour();
    doneModal.classList.add("is-hidden");
    doneModal.setAttribute("aria-hidden", "true");
  }
});

render();
