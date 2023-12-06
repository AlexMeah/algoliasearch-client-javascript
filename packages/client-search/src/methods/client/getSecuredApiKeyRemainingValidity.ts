import atob from 'atob-lite';

import { createValidUntilNotFoundError } from '../..';

export const getSecuredApiKeyRemainingValidity = () => {
  return (securedApiKey: string): number => {
    const decodedString = atob(securedApiKey);
    const regex = /validUntil=(\d+)/;
    const match = decodedString.match(regex);

    if (match === null) {
      throw createValidUntilNotFoundError();
    }

    return parseInt(match[1], 10) - Math.round(new Date().getTime() / 1000);
  };
};
