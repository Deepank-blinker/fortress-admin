export const API_ROUTES = {
  auth: {
    loginTypePassword: {
      url: '/user/login',
      queryKey: 'login',
    },
    loginTypeOtp: {
      url: '/user/login/sms',
      queryKey: 'login-otp',
    },
    sendEmailOtp: {
      url: '/otp/email/resend',
      queryKey: 'send-email-otp',
    },
    verifyEmailOtp: {
      url: '/otp/email/verify',
      queryKey: 'verify-email-otp',
    },
    sendMobileOtp: {
      url: '/otp/phone/resend',
      queryKey: 'send-mobile-otp',
    },
    sendMobileOtpNoAuth: {
      url: '/otp/phone/no-auth/resend',
      queryKey: 'send-mobile-otp-no-auth',
    },
    verifyMobileOtp: {
      url: '/otp/phone/verify',
      queryKey: 'verify-mobile-otp',
    },
  },
  user: {
    getUserProfile: {
      url: '/user/profile',
      queryKey: 'get-user-profile',
    },
    getAllIndividualCustomers: {
      url: '/user/all/individual-customers',
      queryKey: 'get-all-individual-customers',
    },
    getUserById: {
      url: '/user',
      queryKey: 'get-user-by-id',
    },
  },
  cryptoToken: {
    getCryptoTokenList: {
      url: '/crypto/token',
      queryKey: 'get-crypto-token-list',
    },
    createCryptoToken: {
      url: '/crypto/token',
      queryKey: 'create-crypto-token',
    },
  },
  token: {
    getAccessToken: {
      url: '/user/token/access',
      queryKey: 'get-access-token',
    },
  },
  whitelistedCountries: {
    getWhitelistedCountries: {
      url: '/whitelisted-countries',
      queryKey: 'get-whitelisted-countries',
    },
    whitelistCountry: {
      url: '/whitelisted-countries',
      queryKey: 'whitelist-country',
    },
    removeCountryFromWhitelist: {
      url: '/whitelisted-countries',
      queryKey: 'remove-country-from-whitelist',
    },
  },
  tickets: {
    getCustomerTickets: {
      url: '/trello/all',
      queryKey: 'get-customer-tickets',
    },
    getCustomerTicketDetails: {
      url: '/trello/:id',
      queryKey: 'get-customer-ticket-details',
    },
    createCustomerTicket: {
      url: '/trello/create',
      queryKey: 'create-customer-ticket',
    },
    updateCustomerTicket: {
      url: '/trello/:id',
      queryKey: 'update-customer-ticket',
    },
  },
  faqs: {
    fetchFaqs: {
      url: '/faqs',
      queryKey: 'get-faqs',
    },
    createFaq: {
      url: '/faqs',
      queryKey: 'create-faq',
    },
    updateFaq: {
      url: '/faqs',
      queryKey: 'update-faq',
    },
  },
  organization: {
    getAllOrganizations: {
      url: '/organization/all',
      queryKey: 'get-all-organizations',
    },
    getOrganizationById: {
      url: '/organization',
      queryKey: 'get-organization-by-id',
    },
  },
};
