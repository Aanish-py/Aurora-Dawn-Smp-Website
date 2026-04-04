import { lazy } from 'react';

/**
 * Enhanced lazy loading wrapper that attempts to reload the page if a chunk load fails.
 * This handles issues where a new deployment has rendered old chunks inaccessible.
 */
export const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    // Check if the current session has already tried to force-refresh to avoid infinite loops
    const hasRefreshed = sessionStorage.getItem('chunk-loading-refresh-attempted') === 'true';

    try {
      const module = await componentImport();
      // On success, reset the refresh flag
      sessionStorage.setItem('chunk-loading-refresh-attempted', 'false');
      return module;
    } catch (error) {
      console.error('Failed to load dynamic chunk:', error);

      // If we haven't tried refreshing during this session, do it now
      if (!hasRefreshed) {
        sessionStorage.setItem('chunk-loading-refresh-attempted', 'true');
        window.location.reload();
        // Return a promise that never resolves while the page reloads
        return new Promise(() => {});
      }

      // If we already tried refreshing once, re-throw the error
      throw error;
    }
  });
