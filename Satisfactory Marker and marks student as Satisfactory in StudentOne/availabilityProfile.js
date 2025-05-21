// (() => {
//     console.log('📘 gradeSearch.js started new');
  
//     const studentId = localStorage.getItem('studentId');
  
  
//     if (!studentId ) {
//       console.warn('⚠️ Missing student or unit data from sessionStorage – automation will not run.');
//       console.log('🧾 studentId:', studentId);
     
//       return;
//     }
//     console.log('💾 Retrieved from sessionStorage:', { studentId });
  
//     function waitForElement(selector, maxAttempts = 40, interval = 400) {
//       return new Promise((resolve, reject) => {
//         let attempts = 0;
//         const timer = setInterval(() => {
//           const el = document.querySelector(selector);
//           if (el) {
//             clearInterval(timer);
//             resolve(el);
//           } else if (++attempts >= maxAttempts) {
//             clearInterval(timer);
//             reject(`❌ Element not found: ${selector}`);
//           }
//         }, interval);
//       });
//     }
  
//     // Step 1: Click the third summary panel
//     setTimeout(() => {
//       const summaries = document.querySelectorAll('div.summary');
//       if (summaries.length >= 3) {
//         console.log('📊 Clicking the third Results summary panel...');
//         summaries[2].click();
//       } else {
//         console.error(`❌ Only found ${summaries.length} summary blocks – expected at least 3`);
//         return;
//       }
  
//       // Step 2: Wait for search box or click magnifier
//       setTimeout(() => {
//         const gradeSearchBox = document.querySelector('#GradeSummaryRdpSection_RDP_SearchValue');
  
//         if (gradeSearchBox) {
//           console.log('✅ Search field already visible – skipping magnifier click');
//           triggerStudentSearch();
//         } else {
//           const magnifierBtn = document.querySelector('div.searchToggle button.flatStyle');
//           if (magnifierBtn) {
//             console.log('🔍 Clicking magnifying glass...');
//             magnifierBtn.click();
  
//             setTimeout(() => {
//               triggerStudentSearch();
//             }, 8000);
//           } else {
//             console.error('❌ Magnifying glass button not found');
//           }
//         }
//       }, 5000);
//     }, 5000);
  
//     function triggerStudentSearch() {
//       const gradeSearchBox = document.querySelector('#GradeSummaryRdpSection_RDP_SearchValue');
//       if (!gradeSearchBox) {
//         console.error('❌ Grade Summary search box not found');
//         return;
//       }
  
//       console.log('✅ Grade Summary search box found – typing student ID...');
//       const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
//       setter?.call(gradeSearchBox, studentId);
  
//       gradeSearchBox.dispatchEvent(new Event('input', { bubbles: true }));
//       gradeSearchBox.dispatchEvent(new Event('change', { bubbles: true }));
//       gradeSearchBox.focus();
  
//       setTimeout(() => {
//         gradeSearchBox.dispatchEvent(new KeyboardEvent('keydown', {
//           key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
//         }));
//         gradeSearchBox.dispatchEvent(new KeyboardEvent('keyup', {
//           key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
//         }));
  
//         console.log('🚀 Student ID search triggered');
  
//         // Step 3: Wait and interact with the grade cell
//         setTimeout(() => {
//           const gradeCell = document.querySelector('.slick-cell.l6.r6.gridColumnEditable');
  
//           if (gradeCell) {
//             console.log('🖱️ Grade cell found – clicking and focusing...');
//             gradeCell.focus();
//             gradeCell.click();
//           } else {
//             console.error('❌ Grade cell not found');
//             return;
//           }
  
//           // Step 4: Type 'A' and select using keyboard
//           setTimeout(() => {
//             const input = document.querySelector('#StudentStudyPackage_EditableRDP_Grade');
  
//             if (input) {
//               console.log('🖱️ Clicking and focusing grade input...');
//               input.click();
//               input.focus();
  
//               setTimeout(() => {
//                 console.log('⌨️ Typing "A"...');
  
//                 input.dispatchEvent(new KeyboardEvent('keydown', {
//                   key: 'A', code: 'KeyA', keyCode: 65, which: 65, bubbles: true, composed: true
//                 }));
  
//                 input.value += 'A';
//                 input.dispatchEvent(new Event('input', { bubbles: true }));
  
//                 input.dispatchEvent(new KeyboardEvent('keyup', {
//                   key: 'A', code: 'KeyA', keyCode: 65, which: 65, bubbles: true, composed: true
//                 }));
  
//                 // Wait for dropdown to appear and select
//                 setTimeout(() => {
                 
//                   console.log('⏎ Pressing Enter...');
//                   input.dispatchEvent(new KeyboardEvent('keydown', {
//                     key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
//                   }));
//                   input.dispatchEvent(new KeyboardEvent('keyup', {
//                     key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
//                   }));

//                         // ✅ Clear studentId from localStorage
//                         localStorage.removeItem('studentId');
//                         console.log('🧹 Removed studentId from localStorage');
//                         // ✅ Clear unitCode from localStorage
//                         localStorage.removeItem('unitCode');
//                         console.log('🧹 Removed unitCode from localStorage');
  
              
//                 }, 2000); // Wait for dropdown after typing
//               }, 300); // Let input get focus
//             } else {
//               console.error('❌ Grade input not found');
//             }
//           }, 1000); // Delay after clicking cell
//         }, 800); // Delay after hitting Enter in search box
//       }, 300);
//     }
//   })();

(() => {
    console.log('📘 gradeSearch.js started new new');
  
    const studentId = localStorage.getItem('studentId');
  
    if (!studentId) {
      console.warn('⚠️ Missing student or unit data from sessionStorage – automation will not run.');
      console.log('🧾 studentId:', studentId);
      return;
    }
    console.log('💾 Retrieved from sessionStorage:', { studentId });
  
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
  
    // Step 1: Wait for and click the third summary panel
    waitForElement('div.summary')
      .then(() => {
        const summaries = document.querySelectorAll('div.summary');
        if (summaries.length >= 3) {
          console.log('📊 Clicking the third Results summary panel...');
          summaries[2].click();
        } else {
          console.error(`❌ Only found ${summaries.length} summary blocks – expected at least 3`);
          return;
        }
  
        // Step 2: Wait for search box or click magnifier
        waitForElement('#GradeSummaryRdpSection_RDP_SearchValue', 40, 500)
          .then(() => {
            const gradeSearchBox = document.querySelector('#GradeSummaryRdpSection_RDP_SearchValue');
  
            if (gradeSearchBox) {
              console.log('✅ Search field already visible – starting search');
              triggerStudentSearch(gradeSearchBox);
            } else {
              const magnifierBtn = document.querySelector('div.searchToggle button.flatStyle');
              if (magnifierBtn) {
                console.log('🔍 Clicking magnifying glass...');
                magnifierBtn.click();
  
                setTimeout(() => {
                  const searchBoxRetry = document.querySelector('#GradeSummaryRdpSection_RDP_SearchValue');
                  if (searchBoxRetry) {
                    triggerStudentSearch(searchBoxRetry);
                  } else {
                    console.error('❌ Search field still not found after magnifier');
                  }
                }, 4000);
              } else {
                console.error('❌ Magnifying glass button not found');
              }
            }
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  
    function triggerStudentSearch(gradeSearchBox) {
      console.log('✅ Grade Summary search box found – typing student ID...');
      const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
      setter?.call(gradeSearchBox, studentId);
  
      gradeSearchBox.dispatchEvent(new Event('input', { bubbles: true }));
      gradeSearchBox.dispatchEvent(new Event('change', { bubbles: true }));
      gradeSearchBox.focus();
  
      gradeSearchBox.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
      }));
      gradeSearchBox.dispatchEvent(new KeyboardEvent('keyup', {
        key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
      }));
  
      console.log('🚀 Student ID search triggered');
  
      // Step 3: Wait and interact with the grade cell
      waitForElement('.slick-cell.l6.r6.gridColumnEditable', 40, 500)
        .then(gradeCell => {
          console.log('🖱️ Grade cell found – clicking and focusing...');
          gradeCell.focus();
          gradeCell.click();
  
          // Step 4: Type 'A' and select using keyboard
          waitForElement('#StudentStudyPackage_EditableRDP_Grade', 40, 500)
            .then(input => {
              console.log('🖱️ Clicking and focusing grade input...');
              input.click();
              input.focus();
  
              setTimeout(() => {
                console.log('⌨️ Typing "A"...');
                input.dispatchEvent(new KeyboardEvent('keydown', {
                  key: 'A', code: 'KeyA', keyCode: 65, which: 65, bubbles: true, composed: true
                }));
  
                input.value += 'A';
                input.dispatchEvent(new Event('input', { bubbles: true }));
  
                input.dispatchEvent(new KeyboardEvent('keyup', {
                  key: 'A', code: 'KeyA', keyCode: 65, which: 65, bubbles: true, composed: true
                }));
  
                setTimeout(() => {
                  console.log('⏎ Pressing Enter...');
                  input.dispatchEvent(new KeyboardEvent('keydown', {
                    key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
                  }));
                  input.dispatchEvent(new KeyboardEvent('keyup', {
                    key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true
                  }));
  
                  // ✅ Clear local storage
                  localStorage.removeItem('studentId');
                  localStorage.removeItem('unitCode');
                  console.log('🧹 Removed studentId and unitCode from localStorage');
                }, 2000);
              }, 300);
            })
            .catch(err => console.error('❌ Grade input not found:', err));
        })
        .catch(err => console.error('❌ Grade cell not found:', err));
    }
  })();