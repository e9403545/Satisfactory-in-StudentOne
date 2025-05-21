document.addEventListener('DOMContentLoaded', function () {
  // Activate Level 0 Selection
  document.getElementById('activate')?.addEventListener('click', function () {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { action: "selectLevel0" });
    });
  });

  // Open Student Enquiry Page and pass studentId & unitCode
  document.getElementById('fetch-info')?.addEventListener('click', function () {
    console.log('🟢 Fetch button clicked');

    // Step 1: Get active tab
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const activeTab = tabs[0];

      // Step 2: Ask content script for student/unit
      browser.tabs.sendMessage(activeTab.id, { action: "getStudentAndUnit" })
        .then((response) => {
          const { studentId, unitCode } = response || {};

          if (!studentId || !unitCode) {
            console.error('❌ Missing studentId or unitCode');
            return;
          }

          console.log('📦 Received:', { studentId, unitCode });

          // Step 3: Build the URL
          const targetUrl = `https://vicuni.t1cloud.com/T1Default/CiAnywhere/Web/VICUNI/StudentStudies/StudentEngagementMyEnquiry?f=%24SST.STUENG.LST&h=2tfAqGipzm&t=18A4DA82&suite=SM&pagekey=20250411123035&student=${encodeURIComponent(studentId)}&unit=${encodeURIComponent(unitCode)}`;

          // Step 4: Open the page with query params
          browser.tabs.create({ url: targetUrl });
        })
        .catch((err) => {
          console.error('❌ Failed to get student/unit:', err);
        });
    });
  });
});




