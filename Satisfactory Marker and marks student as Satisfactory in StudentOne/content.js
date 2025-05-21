console.log('📦 Content script loaded and listening for messages');
browser.runtime.onMessage.addListener((msg) => {
  if (msg.action === "selectLevel0") {
    const criteriaGroups = document.querySelector('d2l-consistent-evaluation')
      ?.shadowRoot?.querySelector('d2l-consistent-evaluation-page')
      ?.shadowRoot?.querySelector('#evaluation-template')
      ?.querySelector('div[slot="secondary"]')
      ?.querySelector('consistent-evaluation-right-panel')
      ?.shadowRoot?.querySelector('div.d2l-consistent-evaluation-right-panel')
      ?.querySelector('div.d2l-consistent-evaluation-right-panel-evaluation')
      ?.querySelector('consistent-evaluation-right-panel-evaluation')
      ?.shadowRoot?.querySelector('div')
      ?.querySelector('d2l-consistent-evaluation-right-panel-block')
      ?.querySelector('d2l-consistent-evaluation-right-panel-rubric')
      ?.shadowRoot?.querySelector('#pop-out-evaluation-template')
      ?.querySelector('.d2l-consistent-evaluation-rubric')
      ?.querySelector('d2l-rubric')
      ?.shadowRoot?.querySelector('d2l-rubric-adapter')
      ?.querySelector('.d2l-rubric-print-container')
      ?.querySelector('d2l-rubric-criteria-groups')
      ?.shadowRoot?.querySelectorAll('d2l-rubric-criteria-group-mobile');

    if (!criteriaGroups?.length) {
      console.log('No criteria groups found.');
    } else {
      criteriaGroups.forEach(group => {
        const allCriteria = group.shadowRoot?.querySelectorAll('d2l-rubric-criterion-mobile');
        allCriteria?.forEach(criterion => {
          const levelMobile = criterion.shadowRoot?.querySelector('d2l-rubric-levels-mobile');
          const level0 = levelMobile?.shadowRoot?.querySelector('#level0');
          const alreadySelected = level0?.classList.contains('selected') || level0?.getAttribute('aria-checked') === 'true';
          if (level0 && !alreadySelected) {
            level0.setAttribute('aria-checked', 'true');
            level0.setAttribute('tabindex', '0');
            level0.classList.add('selected', 'focused');
            level0.focus();
            level0.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
            setTimeout(() => {
              level0.dispatchEvent(new KeyboardEvent('keydown', {
                key: ' ',
                keyCode: 32,
                code: 'Space',
                bubbles: true,
                composed: true
              }));
              level0.dispatchEvent(new KeyboardEvent('keyup', {
                key: ' ',
                keyCode: 32,
                code: 'Space',
                bubbles: true,
                composed: true
              }));
              console.log('Selected level0 via spacebar');
            }, 100);
          }
        });
      });
    }
  }
});





browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getStudentAndUnit") {
    try {

      console.log('⚙️ getStudentAndUnit message received');
      
      const studentId = document
      .querySelector('d2l-consistent-evaluation')
      ?.shadowRoot?.querySelector('d2l-consistent-evaluation-page')
      ?.shadowRoot?.querySelector('d2l-template-primary-secondary')
      ?.querySelector('div[slot="header"]')
      ?.querySelector('d2l-consistent-evaluation-learner-context-bar')
      ?.shadowRoot?.querySelector('div.d2l-consistent-evaluation-learner-context-bar[aria-hidden="false"]')
      ?.querySelector('d2l-consistent-evaluation-lcb-user-context')
      ?.shadowRoot
      ?.querySelector('.d2l-user-context-container')
      ?.querySelector('d2l-user-profile-card')
      ?.shadowRoot?.querySelector('d2l-dropdown')
      ?.querySelector('d2l-dropdown-content')
      ?.querySelector('.d2l-profile-card')
      ?.querySelector('.d2l-profile-card-main')
      ?.querySelector('.d2l-profile-card-main-info')
      ?.querySelector('.d2l-profile-card-attributes')
      ?.querySelector('li')?.textContent.trim();

      const fullTitle = document
        .querySelector('d2l-consistent-evaluation')
        ?.shadowRoot?.querySelector('d2l-consistent-evaluation-page')
        ?.shadowRoot?.querySelector('d2l-template-primary-secondary')
        ?.querySelector('div[slot="header"]')
        ?.querySelector('d2l-consistent-evaluation-nav-bar')
        ?.shadowRoot?.querySelector('d2l-labs-navigation-immersive')
        ?.querySelector('div[slot="middle"] #titleName')?.textContent.trim();

      const unitCode = fullTitle?.split(' ')[0];

       // 🧪 Debug output
    console.log('🧪 studentId raw:', studentId);
    console.log('🧪 fullTitle raw:', fullTitle);
    console.log('🧪 unitCode parsed:', unitCode);


      console.log('📤 Sending student/unit to popup:', { studentId, unitCode });

      sendResponse({ studentId, unitCode });
    } catch (err) {
      console.error('❌ Could not retrieve student/unit info:', err);
      sendResponse({});
    }

    return true; // Keep the message channel open
  }
});
