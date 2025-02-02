import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const token = localStorage.getItem('Token');
  const userId = localStorage.getItem('userId');

  if (token && userId) {
    // Redirect to dashboard if token and userId exist
    const router = new Router(); 
    return router.navigate(['/dashboard']);
  }
  
  // Allow access to the page if token and userId are not present
  return true;
};
