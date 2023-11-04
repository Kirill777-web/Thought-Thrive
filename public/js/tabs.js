function showTab(tabName) {
  const contents = document.querySelectorAll('.tab-content');
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach((tab) => {
    if (tab.textContent.toLowerCase() === tabName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  contents.forEach((content) => {
    if (content.id === tabName) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}
