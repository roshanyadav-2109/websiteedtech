
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      resolve(true);
    };
    
    script.onerror = () => {
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
};

export const initializeRazorpayCheckout = (options: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.success', (response: any) => {
      resolve(response);
    });
    
    rzp.on('payment.error', (error: any) => {
      reject(error);
    });
    
    rzp.open();
  });
};
