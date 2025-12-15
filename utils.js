/**
 * PayU Integration Lab - Utility Functions
 * =========================================
 * Common utility functions used across the application
 */

/**
 * SECURITY: HTML Escaping Function to Prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML string
 */
function escapeHtml(text) {
    if (text == null) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// GOOGLE ANALYTICS TRACKING
// ============================================

/**
 * Track Google Analytics event
 * @param {string} eventName - Name of the event
 * @param {string} eventCategory - Category of the event
 * @param {string} eventLabel - Label for the event (optional)
 * @param {string} eventValue - Value for the event (optional)
 */
function trackGAEvent(eventName, eventCategory, eventLabel, eventValue) {
    if (typeof gtag !== 'undefined') {
        const eventParams = {
            'event_category': eventCategory,
            'event_label': eventLabel || '',
            'value': eventValue || 0
        };
        gtag('event', eventName, eventParams);
        console.log('📊 GA Event Tracked:', eventName, eventParams);
    } else {
        console.warn('⚠️ Google Analytics (gtag) not loaded');
    }
}

/**
 * Track button click event
 * @param {string} buttonName - Name/ID of the button
 * @param {string} buttonText - Text content of the button
 * @param {string} flow - Current flow context (optional)
 */
function trackButtonClick(buttonName, buttonText, flow) {
    const flowContext = flow || currentFlow || 'home';
    trackGAEvent('button_click', 'user_interaction', buttonName, 0);
    trackGAEvent('button_click_' + flowContext, 'user_interaction', buttonName + ' - ' + buttonText, 0);
}

/**
 * Track flow selection event
 * @param {string} flowId - Flow identifier
 */
function trackFlowClick(flowId) {
    const flowNames = {
        'crossborder': 'Cross Border Payment',
        'nonseamless': 'Pre-built Checkout',
        'subscription': 'Subscription Payment',
        'tpv': 'TPV Payment',
        'upiotm': 'UPI OTM',
        'preauth': 'PreAuth Card Flow',
        'checkoutplus': 'Checkout Plus',
        'split': 'Split Payment',
        'bankoffer': 'Bank Offers'
    };
    const flowName = flowNames[flowId] || flowId;
    trackGAEvent('flow_selected', 'navigation', flowName, 0);
    trackGAEvent('flow_click', 'navigation', flowId, 0);
}



