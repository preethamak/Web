const dialogs = [
    {
      oldMan: "Back in my day, we used to write code without frameworks.",
      boy: "That sounds so tough! I can't imagine coding without Tailwind."
    },
    {
      oldMan: "Everything was handwritten, even CSS!",
      boy: "CSS? I just use utility classes now."
    },
    {
      oldMan: "I still remember the sound of dial-up internet...",
      boy: "Wait, the internet made sounds?"
    }
  ];
  
  let currentIndex = 0;
  let lastScrollTop = 0;
  
  function fadeOutIn(element, newText) {
    element.style.opacity = 0;
    setTimeout(() => {
      element.textContent = newText;
      element.style.opacity = 1;
    }, 300);
  }
  
  function updateDialog() {
    const oldManDialog = document.getElementById("old-man-dialog");
    const boyDialog = document.getElementById("boy-dialog");
  
    fadeOutIn(oldManDialog, dialogs[currentIndex].oldMan);
    fadeOutIn(boyDialog, dialogs[currentIndex].boy);
  }
  
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    if (Math.abs(scrollTop - lastScrollTop) > 100) {
      currentIndex = (currentIndex + 1) % dialogs.length;
      updateDialog();
      lastScrollTop = scrollTop;
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    updateDialog();
  });
  