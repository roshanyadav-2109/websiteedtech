
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      console.log("Razorpay script already loaded");
      resolve(true);
      return;
    }
    
    console.log("Loading Razorpay script");
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
      resolve(true);
    };
    
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
};

export const initializeRazorpayCheckout = (options: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Initializing Razorpay checkout with options:", options);
      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.success', (response: any) => {
        console.log("Payment successful:", response);
        resolve(response);
      });
      
      rzp.on('payment.error', (error: any) => {
        console.error("Payment error:", error);
        reject(error);
      });
      
      rzp.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      reject(error);
    }
  });
};
