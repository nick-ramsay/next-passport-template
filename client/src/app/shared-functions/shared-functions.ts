import { useState } from 'react';
import API from '../utils/API';

export const checkAuthStatus = async (currentPath: string) => {
  console.log(currentPath);
  try {
    if (currentPath === '/login') {
      const response = await API.getCurrentUser(currentPath);
      if (response.user) {
        window.location.href = '/';
        return response;
      }
      return response;
    }
  } catch (error) {
    console.log('Not authenticated, redirecting to login');
    if (currentPath !== '/login') {
      window.location.href = '/login';
    }
  }
}