

(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('student');
    const unitCode = urlParams.get('unit');
  
    if (!studentId || !unitCode) {
      console.warn('⚠️ Missing student or unit parameter – automation will not run.');
      console.log('🧾 studentId:', studentId);
      console.log('🧾 unitCode:', unitCode);
      return;
    }
  
    // Store student/unit info in sessionStorage
    localStorage.setItem('studentId', studentId);
    localStorage.setItem('unitCode', unitCode);
    console.log('💾 Stored in sessionStorage:', { studentId, unitCode });
  
    function waitForElement(selector, maxAttempts = 40, interval = 400) {
      return new Promise((resolve, reject) => {
        let attempts = 0;
        const timer = setInterval(() => {
          const el = document.querySelector(selector);
          if (el) {
            clearInterval(timer);
            resolve(el);
          } else if (++attempts >= maxAttempts) {
            clearInterval(timer);
            reject(`❌ Element not found: ${selector}`);
          }
        }, interval);
      });
    }
  
    waitForElement('#EnquiryRelatedDataPortlet_SearchValue')
      .then(searchBox => {
        console.log('✅ Search box found');
        console.log(`🔍 Typing student ID: ${studentId}`);
  
        const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
        setter?.call(searchBox, studentId);
  
        searchBox.dispatchEvent(new Event('input', { bubbles: true }));
        searchBox.dispatchEvent(new Event('change', { bubbles: true }));
        searchBox.focus();
  
        // Simulate Enter key
        searchBox.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
        }));
        searchBox.dispatchEvent(new KeyboardEvent('keyup', {
          key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
        }));
  
        console.log('🚀 Enter key pressed – waiting for View button...');
        return new Promise(resolve => setTimeout(resolve, 800)).then(() => {
          return waitForElement('ul.formActions a[title="View"]', 50, 500);
        });
      })
      .then(viewLink => {
        console.log('🖱️ Clicking View button...');
        viewLink.click(); // No need to modify href — sessionStorage will persist
      })
      .catch(err => console.error(err));
  })();