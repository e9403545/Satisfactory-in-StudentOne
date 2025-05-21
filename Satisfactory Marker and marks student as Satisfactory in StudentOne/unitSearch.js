

// (() => {
//     console.log('📘 unitSearch.js started new');
  
//     const studentId = localStorage.getItem('studentId');
//     const unitCode = localStorage.getItem('unitCode');
  
//     if (!studentId || !unitCode) {
//       console.warn('⚠️ Missing student or unit data from sessionStorage – automation will not run.');
//       console.log('🧾 studentId:', studentId);
//       console.log('🧾 unitCode:', unitCode);
//       return;
//     }
//     console.log('💾 Retrieved from sessionStorage:', { studentId, unitCode });  
  
//     setTimeout(() => {
//       const searchBox = document.querySelector('#StudentUnitEngagementListSection_RDP_SearchValue');
  
//       if (searchBox) {
//         console.log('✅ Unit search box found');
//         console.log(`🔍 Typing unit code: ${unitCode}`);
  
//         const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
//         setter?.call(searchBox, unitCode);
  
//         searchBox.dispatchEvent(new Event('input', { bubbles: true }));
//         searchBox.dispatchEvent(new Event('change', { bubbles: true }));
//         searchBox.focus();
  
//         setTimeout(() => {
//           searchBox.dispatchEvent(new KeyboardEvent('keydown', {
//             key: 'Enter',
//             code: 'Enter',
//             keyCode: 13,
//             which: 13,
//             bubbles: true,
//             composed: true
//           }));
  
//           searchBox.dispatchEvent(new KeyboardEvent('keyup', {
//             key: 'Enter',
//             code: 'Enter',
//             keyCode: 13,
//             which: 13,
//             bubbles: true,
//             composed: true
//           }));
  
//           console.log('🚀 Enter key pressed – waiting before clicking Options');
  
//           const optionsBtn = document.querySelector('button[title="Options"]');
//           if (optionsBtn) {
//             console.log('🔘 Options button found – clicking...');
//             optionsBtn.click();
  
//             setTimeout(() => {
//               const cardViewBtn = Array.from(document.querySelectorAll('button'))
//                 .find(btn => btn.textContent.includes('Card view'));
  
//               if (cardViewBtn) {
//                 console.log('📄 Card view option found – clicking...');
//                 cardViewBtn.click();
  
//                 setTimeout(() => {
//                   const moreBtn = document.querySelector('button[title="More"]');
//                   if (moreBtn) {
//                     console.log('➡️ Clicking "More" button...');
//                     moreBtn.click();
//                     console.log('⏳ Waiting for dropdown menu to render...');
  
//                     // NEW: Wait before trying to read href
//                     setTimeout(() => {
//                         const links = document.querySelectorAll('ul.menuLinks16 li a.dropdownItem');

//                         const targetLink = Array.from(links).find(link =>
//                             link.textContent.includes('View curriculum teaching')
//                           );
                          
//                           if (targetLink) {
//                             console.log('📘 Clicking View curriculum teaching link...');
//                             targetLink.click(); // Simply click — no need to modify href
//                           } else {
//                             console.error('❌ View curriculum teaching link not found');
//                           }
//                       }, 4000); // Adjust delay if needed


//                   } else {
//                     console.error('❌ More button not found');
//                   }
//                 }, 6000); // Wait for card view
//               } else {
//                 console.error('❌ Card view option not found');
//               }
//             }, 5000); // Wait for Options menu
//           } else {
//             console.error('❌ Options button not found');
//           }
//         }, 300);
//       } else {
//         console.error('❌ Unit search box not found');
//       }
//     }, 800);
//   })();



(() => {
    console.log('📘 unitSearch.js started – no timeouts');
  
    const studentId = localStorage.getItem('studentId');
    const unitCode = localStorage.getItem('unitCode');
  
    if (!studentId || !unitCode) {
      console.warn('⚠️ Missing student or unit data – automation will not run.');
      console.log('🧾 studentId:', studentId);
      console.log('🧾 unitCode:', unitCode);
      return;
    }
  
    console.log('💾 Retrieved from localStorage:', { studentId, unitCode });
  
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
  
    waitForElement('#StudentUnitEngagementListSection_RDP_SearchValue')
      .then(searchBox => {
        console.log('✅ Unit search box found – typing...');
        const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
        setter?.call(searchBox, unitCode);
  
        searchBox.dispatchEvent(new Event('input', { bubbles: true }));
        searchBox.dispatchEvent(new Event('change', { bubbles: true }));
        searchBox.focus();
  
        searchBox.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
        }));
        searchBox.dispatchEvent(new KeyboardEvent('keyup', {
          key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
        }));
  
        return waitForElement('button[title="Options"]');
      })
      .then(optionsBtn => {
        console.log('🔘 Options button found – clicking...');
        optionsBtn.click();
        return waitForElement('button');
      })
      .then(() => {
        const cardViewBtn = Array.from(document.querySelectorAll('button'))
          .find(btn => btn.textContent.includes('Card view'));
  
        if (!cardViewBtn) throw '❌ Card view option not found';
        console.log('📄 Card view option found – clicking...');
        cardViewBtn.click();
  
        return waitForElement('button[title="More"]');
      })
      .then(moreBtn => {
        console.log('➡️ Clicking "More" button...');
        moreBtn.click();
        return waitForElement('ul.menuLinks16 li a.dropdownItem');
      })
      .then(() => {
        const links = document.querySelectorAll('ul.menuLinks16 li a.dropdownItem');
        const targetLink = Array.from(links).find(link =>
          link.textContent.includes('View curriculum teaching')
        );
  
        if (!targetLink) {
          console.error('❌ View curriculum teaching link not found');
          return;
        }
  
        console.log('📘 Clicking View curriculum teaching link...');
        targetLink.click();
      })
      .catch(err => console.error(err));
  })();